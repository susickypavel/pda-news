import { PostgrestError } from "@supabase/supabase-js";
import { create } from "zustand";

import { supabase } from "@/api/supabase";

interface ArticleData {
	title: string
}

interface ExploreFeed {
	articles: ArticleData[];
	init: () => Promise<PostgrestError | null>;
}

export const useExploreFeed = create<ExploreFeed>(set => {
	return {
		articles: [],
		async init() {
			const response = await supabase.from("articles").select("title").limit(5);

			if (response.error) {
				return response.error;
			} else {
				set({ articles: response.data });
			}

			return null;
		}
	}
})
