import { PostgrestError } from "@supabase/supabase-js";
import { create } from "zustand";

import { supabase } from "@/api/supabase";

export interface ArticleData {
	content: string | null;
	source_id: {
		domain: string;
	};
	title: string;
	category: string;
}

interface DailyFeed {
	articles: ArticleData[];
	init: () => Promise<PostgrestError | null>;
}

export const useDailyFeed = create<DailyFeed>(set => {
	return {
		articles: [],
		async init() {
			const response = await supabase.from("articles").select("title, content, source_id (domain), category").limit(5);

			if (response.error) {
				console.log(response.error);

				return response.error;
			} else {
				// @ts-ignore
				set({ articles: response.data });
			}

			return null;
		}
	}
})
