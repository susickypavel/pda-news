import { create } from "zustand";

import { supabase } from "@/api/supabase";

interface ArticleData {
	title: string
}

interface ExploreFeed {
	articles: ArticleData[];
	init: () => void;
}

export const useExploreFeed = create<ExploreFeed>(set => {
	return {
		articles: [],
		async init() {
			const response = await supabase.from("articles").select("title").limit(5);

			if (response.error) {
				console.log(response.error);
			} else {
				set({ articles: response.data });
			}
		}
	}
})
