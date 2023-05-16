import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { BadgeCategory } from "src/types/theme";

import { useAuthSafe } from "@/context/auth";

import { supabase } from "../supabase";

const ARTICLES_LIMIT_PER_LOAD = 5;

export function useArticleFeed(currentDate: Date) {
	const { user } = useAuthSafe();
	const { data, ...query } = useInfiniteQuery(
		["daily-feed", currentDate.toDateString()],
		async ({ pageParam = 0 }) => {
			const from = pageParam * ARTICLES_LIMIT_PER_LOAD;
			const to = from + ARTICLES_LIMIT_PER_LOAD - 1;

			const start = new Date(currentDate);
			const end = new Date(currentDate);
			end.setHours(23, 59, 59, 999);

			const { data, error } = await supabase
				.rpc("get_user_feed", {
					user_id: user.id
				})
				.gte("published_at", start.toUTCString())
				.lte("published_at", end.toUTCString())
				.order("published_at", {
					ascending: false
				})
				.range(from, to);

			if (error) {
				throw new Error(error.message);
			}

			return data;
		},
		{
			getNextPageParam: (lastPages, pages) => {
				if (lastPages.length < ARTICLES_LIMIT_PER_LOAD) {
					return undefined;
				}

				return Math.floor(pages.flatMap(page => page).length / ARTICLES_LIMIT_PER_LOAD);
			}
		}
	);

	const articles = useMemo(() => data?.pages.flatMap(page => page) || [], [data]);

	return [articles, query] as const;
}

export function useExploreFeed() {
	const query = useQuery(["category-articles"], async () => {
		// TODO: Fetch bookmark
		const { data, error } = await supabase.from("category_articles").select("*");

		if (error) {
			throw new Error(error.message);
		}

		return data;
	});

	return query;
}


export function useCategoryFeed(category: BadgeCategory) {
	const query = useQuery(["category-articles", category], async () => {
		// TODO: Fetch bookmark endpoint
		const { data, error } = await supabase
			.from("articles")
			.select("*, source_id (name)")
			.eq("category", category)
			.order("published_at", {
				ascending: false
			})
			.limit(10);

		if (error) {
			throw new Error(error.message);
		}

		return data;
	});

	return query;
}


export function useBookmarkedArticles() {
	const { user } = useAuthSafe()

	const query = useQuery(["saved-articles", user.id], async () => {
		const response = await supabase.rpc("get_user_saved_articles", {
			user_id: user.id
		});

		return response.data;
	});

	return query;
}
