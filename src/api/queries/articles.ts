import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ARTICLES_LIMIT_PER_LOAD, CATEGORIES } from "src/constants";

import { useAuthSafe } from "@/context/auth";
import type { BadgeCategory } from "@/types/theme";

import { supabase } from "../supabase";

export function useArticleFeed(currentDate: Date, region: string) {
	const { user } = useAuthSafe();

	const categories =
		Array.isArray(user.user_metadata.interests) && user.user_metadata.interests.length > 0
			? user.user_metadata.interests : CATEGORIES;

	const { data, ...query } = useInfiniteQuery(
		["daily-feed", currentDate.toDateString(), region, categories],
		async ({ pageParam = 0 }) => {
			const from = pageParam * ARTICLES_LIMIT_PER_LOAD;
			const to = from + ARTICLES_LIMIT_PER_LOAD - 1;

			const start = new Date(currentDate);
			const end = new Date(currentDate);
			end.setHours(23, 59, 59, 999);

			const { data, error } = await supabase
				.from("articles")
				.select("*, source_id (name)")
				.eq("region", region)
				.in("category", categories)
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
			staleTime: 1000 * 60 * 60 * 6,
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
		const { data, error } = await supabase.from("category_articles").select("*");

		if (error) {
			throw new Error(error.message);
		}

		return data;
	});

	return query;
}

export function useCategoryFeed(category: BadgeCategory) {
	const { user } = useAuthSafe()

	const { data, ...query } = useInfiniteQuery(
		["category-articles", user.id, category],
		async ({ pageParam = 0 }) => {
			// NOTE: For demonstration purposes only
			await new Promise(resolve => setTimeout(resolve, 500))

			const from = pageParam * ARTICLES_LIMIT_PER_LOAD;
			const to = from + ARTICLES_LIMIT_PER_LOAD - 1;

			const { data, error } = await supabase
				.from("articles")
				.select("*, source_id (name)")
				.eq("category", category)
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
			staleTime: 1000 * 60 * 60 * 6,
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

export type BookmarkSortOrder = "desc" | "asc" | "a-z" | "z-a"

export function useBookmarkedArticles(searchTerm = "", order: BookmarkSortOrder) {
	const { user } = useAuthSafe()

	const query = useQuery({
		enabled: searchTerm.length === 0 || searchTerm.length > 2,
		queryKey: ["saved-articles", user.id, searchTerm, order],
		queryFn: async () => {
			let request = supabase.rpc("get_user_saved_articles", {
				user_id: user.id
			});

			if (searchTerm) {
				request = request.textSearch("title", searchTerm, {
					type: "websearch"
				});
			}

			switch (order) {
				case "a-z":
				case "z-a":
					request = request.order("title", {
						ascending: order === "a-z",
					})
					break;
				case "desc":
				case "asc":
					request = request.order("published_at", {
						ascending: order === "asc",
					})
					break;
			}

			const response = await request.select("*, source_id (name)");

			return response.data;
		}
	})

	return query;
}

export function useSearchArticles(searchTerm: string) {
	const { data, ...query } = useInfiniteQuery({
		enabled: searchTerm.length > 2,
		queryKey: ["search-articles", searchTerm],
		queryFn: async ({ pageParam = 0 }) => {
			const from = pageParam * ARTICLES_LIMIT_PER_LOAD;
			const to = from + ARTICLES_LIMIT_PER_LOAD - 1;

			const { data, error } = await supabase
				.from("articles")
				.select("*, source_id (name)")
				.textSearch("title", searchTerm, {
					type: "websearch"
				})
				.range(from, to)
				.order("published_at", {
					ascending: false
				});

			if (error) {
				throw new Error(error.message);
			}

			return data;
		},
		getNextPageParam: (lastPages, pages) => {
			if (lastPages.length < ARTICLES_LIMIT_PER_LOAD) {
				return undefined;
			}

			return Math.floor(pages.flatMap(page => page).length / ARTICLES_LIMIT_PER_LOAD);
		}
	})

	const articles = useMemo(() => data?.pages.flatMap(page => page) || [], [data]);

	return [articles, query] as const;
}
