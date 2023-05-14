import "@rneui/themed";

export type BadgeCategory =
	| "technology"
	| "business"
	| "entertainment"
	| "environment"
	| "food"
	| "health"
	| "politics"
	| "science"
	| "sports";

declare module "@rneui/themed" {
	export interface Colors {
		brand: string;
		categories: readonly Record<
			BadgeCategory,
			{
				fg: string;
				bg: string;
			}
		>;
		misc: {
			backdrop: string;
		}
	}

	export interface BadgeProps {
		category?: BadgeCategory;
	}

	export interface ComponentTheme {
		Badge: BadgeProps;
	}
}
