import { NavigationProp, RouteProp } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "src/types/app";

type InterestSubpageScreenRouteProp = RouteProp<RootStackParamList, "InterestSubpage">;

type InterestSubpageScreenNavigationProp = NavigationProp<RootStackParamList, "InterestSubpage">;

type InterestSubpageScreenProps = {
	route: InterestSubpageScreenRouteProp;
	navigation: InterestSubpageScreenNavigationProp;
};

import { ArticlePreviewProps } from "@/components/article-preview";

import { ArticleCard } from "./article-card";

const articles: ArticlePreviewProps[] = [
	{
		category: "science",
		title: "Pozor na falešné weby napodobující státní instituce. Působí velmi přesvědčivě, naletět je snadné",
		source_id: { name: "irozhlas" },
		content: ""
	},
	{
		category: "sports",
		title: "První evropská dražba kostry pravěkého masožravce. Tyranosaurus rex se prodal za 131 milionů korun",
		source_id: { name: "irozhlas" },
		content:
			"Kostra dinosaura Tyrannosaurus rex se v úterý v dražbě ve Švýcarsku prodala za celkovou částku 5,5 milionu franků (131 milionů korun), informovala aukční síň Koller. Nový majitel skeletu je z Evropy, další podrobnosti o něm známy nejsou. Šlo o první dražbu kostry prehistorického masožravého živočicha v Evropě, předchozí se konaly ve Spojených státech. Curych 21:01 18. dubna 2023 Sdílet na Facebooku Sdílet na Twitteru Sdílet na LinkedIn Tisknout Kopírovat url adresu Zkrácená adresa Kopírovat do schránky Zavřít Agentura DPA píše, že pozůstatky těchto dinosaurů patří na aukcích k nejvyhledávanějším kouskům, protože Tyrannosaurus rex byl dlouho považován za největšího predátora, jaký kdy obýval Zemi. Mezitím se sice našly pozůstatky ještě větších dinosaurů, což ovšem T. rexovi na exkluzivitě neubírá. Doposud se v aukcích prodaly jen tři kostry těchto živočichů. V Británii byl vydražen Kupkův obraz za skoro 123 milionů korun. Pocházel z dědictví herce Conneryho Číst článek V úterý prodaná kostra nese název Trinity, protože je seskládaná z kostí tří různých zvířat, která byla v letech 2008 až 2013 objeveny v amerických státech Montana a Wyoming. Původní kostní materiál tvoří polovinu skeletu. Společnost Koller uvedla, že mimořádně vzácná a pozoruhodně dobře zachovalá je lebka pradávného zvířete. Kostra na délku měří 11,6 metru, na výšku 3,9 metru. Podle agentury AP částka, za niž se kostra prodala, zaostala za očekáváním. Karl Green, šéf marketingu aukční síně Koller, řekl, že možná kvůli tomu, že Trinity je „slepencem“ tří dinosaurů, nepřitáhla dražba „puristy“, tedy původní, neskládané kostry. „Jde o dobrou cenu za dinosaura. Doufám, že bude vystaven někde na veřejnosti,“ dodal. Tyrannosaurus rex žil před 68 až 66 miliony let na území dnešních Spojených států. Podle posledních výzkumů mohl tento obávaný prehistorický predátor dosáhnout hmotnosti až 15 tun. ČTK Sdílet na Facebooku Sdílet na Twitteru Sdílet na LinkedIn Tisknout Kopírovat url adresu Zkrácená adresa Kopírovat do schránky Zavřít"
	},
	{
		category: "technology",
		title: "První evropská dražba kostry pravěkého masožravce. Tyranosaurus rex se prodal za 131 milionů koru",
		source_id: { name: "irozhlas" },
		content:
			"Kostra dinosaura Tyrannosaurus rex se v úterý v dražbě ve Švýcarsku prodala za celkovou částku 5,5 milionu franků (131 milionů korun), informovala aukční síň Koller. Nový majitel skeletu je z Evropy, další podrobnosti o něm známy nejsou. Šlo o první dražbu kostry prehistorického masožravého živočicha v Evropě, předchozí se konaly ve Spojených státech. Curych 21:01 18. dubna 2023 Sdílet na Facebooku Sdílet na Twitteru Sdílet na LinkedIn Tisknout Kopírovat url adresu Zkrácená adresa Kopírovat do schránky Zavřít Agentura DPA píše, že pozůstatky těchto dinosaurů patří na aukcích k nejvyhledávanějším kouskům, protože Tyrannosaurus rex byl dlouho považován za největšího predátora, jaký kdy obýval Zemi. Mezitím se sice našly pozůstatky ještě větších dinosaurů, což ovšem T. rexovi na exkluzivitě neubírá. Doposud se v aukcích prodaly jen tři kostry těchto živočichů. V Británii byl vydražen Kupkův obraz za skoro 123 milionů korun. Pocházel z dědictví herce Conneryho Číst článek V úterý prodaná kostra nese název Trinity, protože je seskládaná z kostí tří různých zvířat, která byla v letech 2008 až 2013 objeveny v amerických státech Montana a Wyoming. Původní kostní materiál tvoří polovinu skeletu. Společnost Koller uvedla, že mimořádně vzácná a pozoruhodně dobře zachovalá je lebka pradávného zvířete. Kostra na délku měří 11,6 metru, na výšku 3,9 metru. Podle agentury AP částka, za niž se kostra prodala, zaostala za očekáváním. Karl Green, šéf marketingu aukční síně Koller, řekl, že možná kvůli tomu, že Trinity je „slepencem“ tří dinosaurů, nepřitáhla dražba „puristy“, tedy původní, neskládané kostry. „Jde o dobrou cenu za dinosaura. Doufám, že bude vystaven někde na veřejnosti,“ dodal. Tyrannosaurus rex žil před 68 až 66 miliony let na území dnešních Spojených států. Podle posledních výzkumů mohl tento obávaný prehistorický predátor dosáhnout hmotnosti až 15 tun. ČTK Sdílet na Facebooku Sdílet na Twitteru Sdílet na LinkedIn Tisknout Kopírovat url adresu Zkrácená adresa Kopírovat do schránky Zavřít"
	}
];

export const InterestSubpageScreen: React.FC<InterestSubpageScreenProps> = () => {
	const styles = StyleSheet.create({
		scrollView: {
			marginHorizontal: 10
		},
		title: {
			fontSize: 32,
			fontWeight: "500"
		},
		titleContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginLeft: 20,
			paddingBottom: 10
		},
		topContainer: {
			// backgroundColor: "#D2F776"
		}
	});
	return (
		<View style={styles.topContainer}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>category</Text>
				{/* add Follow/Following button */}
			</View>
			<ScrollView style={styles.scrollView}>
				{articles.map(article => (
					<ArticleCard {...article} key={article.title} />
				))}
			</ScrollView>
		</View>
	);
};

InterestSubpageScreen.displayName = "InterestSubpageScreen";
