import { BadgeCategory } from "./types/theme";

export const CATEGORIES: BadgeCategory[] = ["politics", "science", "sports", "technology", "business", "entertainment", "environment", "food", "health"]

export const ARTICLES_LIMIT_PER_LOAD = 8;

export const SUPPORTED_REGIONS = ["cz", "de", "gb"] as const;

export type SupportedRegion = (typeof SUPPORTED_REGIONS)[number];

export const REGION_FULLNAME: Record<SupportedRegion, string> = {
	de: "Germany",
	cz: "Czech Republic",
	gb: "Great Britain",
}
