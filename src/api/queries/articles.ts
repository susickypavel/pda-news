import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

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
