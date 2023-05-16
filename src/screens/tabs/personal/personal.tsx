import { SearchBar } from "@rneui/themed";
import React, { Fragment, useState } from "react";

import withSafeArea from "@/components/hoc/with-safe-area";
import { SavedArticlesFeed } from "@/components/saved-articles-feed";

const Tab: React.FC = () => {
	const [query, setQuery] = useState("");

	return (
		<Fragment>
			<SearchBar
				platform="ios"
				onChangeText={newVal => setQuery(newVal)}
				placeholder="Search bookmarks..."
				placeholderTextColor="#888"
				cancelButtonTitle="Cancel"
				value={query}
			/>
			<SavedArticlesFeed />
		</Fragment>
	);
};

export const PersonalTab = withSafeArea(Tab, {
	edges: ["top"],
	style: {
		flex: 1
	}
});
