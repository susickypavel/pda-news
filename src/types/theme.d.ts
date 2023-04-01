import "@rneui/themed";

declare module "@rneui/themed" {
	export interface Colors {
		brand: string;
		categories: {
			technology: string;
			business: string;
			entertainment: string;
			environment: string;
			food: string;
			health: string;
			politics: string;
			science: string
			sports: string;
		}
	}
}
