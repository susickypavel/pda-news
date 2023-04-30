import { useNavigation } from "@react-navigation/native";
import { Button, SearchBar } from "@rneui/base";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { ArticlePreviewProps } from "@/components/article-preview";

import { PreviewRow } from "./preview_row";

const interests = [
	{ color: "#F0E360", label: "Tech" },
	{ color: "#7DA1F6", label: "Business" },
	{ color: "#58C17B", label: "Climate" },
	{ color: "#DDC0E7", label: "Culture" },
	{ color: "#B68353", label: "Science" },
	{ color: "#F2B040", label: "Sports" },
	{ color: "#F08957", label: "Health" },
	{ color: "#BEAD99", label: "Personal Growth" },
	{ color: "#DF5B4B", label: "World Affairs" },
	{ color: "#A7DEE4", label: "Finance" },
	{ color: "#D2F776", label: "Economy" }
];

const articles: ArticlePreviewProps[] = [
	{
		category: "technology",
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

const articlesTech: ArticlePreviewProps[] = [
	{
		category: "technology",
		title: "Pozor na falešné weby napodobující státní instituce. Působí velmi přesvědčivě, naletět je snadné",
		source_id: { name: "irozhlas" },
		content: ""
	},
	{
		category: "technology",
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

const articlesSports: ArticlePreviewProps[] = [
	{
		category: "sports",
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
		category: "sports",
		title: "První evropská dražba kostry pravěkého masožravce. Tyranosaurus rex se prodal za 131 milionů koru",
		source_id: { name: "irozhlas" },
		content:
			"Kostra dinosaura Tyrannosaurus rex se v úterý v dražbě ve Švýcarsku prodala za celkovou částku 5,5 milionu franků (131 milionů korun), informovala aukční síň Koller. Nový majitel skeletu je z Evropy, další podrobnosti o něm známy nejsou. Šlo o první dražbu kostry prehistorického masožravého živočicha v Evropě, předchozí se konaly ve Spojených státech. Curych 21:01 18. dubna 2023 Sdílet na Facebooku Sdílet na Twitteru Sdílet na LinkedIn Tisknout Kopírovat url adresu Zkrácená adresa Kopírovat do schránky Zavřít Agentura DPA píše, že pozůstatky těchto dinosaurů patří na aukcích k nejvyhledávanějším kouskům, protože Tyrannosaurus rex byl dlouho považován za největšího predátora, jaký kdy obýval Zemi. Mezitím se sice našly pozůstatky ještě větších dinosaurů, což ovšem T. rexovi na exkluzivitě neubírá. Doposud se v aukcích prodaly jen tři kostry těchto živočichů. V Británii byl vydražen Kupkův obraz za skoro 123 milionů korun. Pocházel z dědictví herce Conneryho Číst článek V úterý prodaná kostra nese název Trinity, protože je seskládaná z kostí tří různých zvířat, která byla v letech 2008 až 2013 objeveny v amerických státech Montana a Wyoming. Původní kostní materiál tvoří polovinu skeletu. Společnost Koller uvedla, že mimořádně vzácná a pozoruhodně dobře zachovalá je lebka pradávného zvířete. Kostra na délku měří 11,6 metru, na výšku 3,9 metru. Podle agentury AP částka, za niž se kostra prodala, zaostala za očekáváním. Karl Green, šéf marketingu aukční síně Koller, řekl, že možná kvůli tomu, že Trinity je „slepencem“ tří dinosaurů, nepřitáhla dražba „puristy“, tedy původní, neskládané kostry. „Jde o dobrou cenu za dinosaura. Doufám, že bude vystaven někde na veřejnosti,“ dodal. Tyrannosaurus rex žil před 68 až 66 miliony let na území dnešních Spojených států. Podle posledních výzkumů mohl tento obávaný prehistorický predátor dosáhnout hmotnosti až 15 tun. ČTK Sdílet na Facebooku Sdílet na Twitteru Sdílet na LinkedIn Tisknout Kopírovat url adresu Zkrácená adresa Kopírovat do schránky Zavřít"
	}
];

export const ExploreTab: React.FC = () => {
	const [searchVal, setSearchVal] = useState("");

	const { navigate } = useNavigation();

	const onPress = (category: string) => {
		navigate("InterestSubpage");
	};

	const styles = StyleSheet.create({
		H2: {
			color: "black",
			fontSize: 24,
			fontWeight: "500",
			marginBottom: 10
		},
		container: {
			flex: 1,
			paddingTop: 50
		},
		interestBtn: {
			borderRadius: 20,
			marginRight: 5,
			paddingLeft: 14,
			paddingRight: 14
		},
		interestTitle: {
			color: "#000000",
			fontSize: 14
		},

		interestsContainer: {
			flex: 1,
			flexDirection: "row",
			flexGrow: 0.1,
			marginBottom: 10,
			marginLeft: 6,
			marginTop: 10
		},
		personalSelContainer: {
			flex: 1,
			flexGrow: 0.1,
			marginHorizontal: 10,
			marginTop: 30
		},
		text: {
			color: "black",
			fontSize: 14
		}
	});

	return (
		<View style={styles.container}>
			<SearchBar
				platform="ios"
				containerStyle={{}}
				inputContainerStyle={{}}
				inputStyle={{}}
				leftIconContainerStyle={{}}
				rightIconContainerStyle={{}}
				loadingProps={{}}
				onChangeText={newVal => setSearchVal(newVal)}
				placeholder="Search articles"
				placeholderTextColor="#888"
				cancelButtonTitle="Cancel"
				cancelButtonProps={{}}
				value={searchVal}
			/>
			<ScrollView>
				<ScrollView horizontal style={styles.interestsContainer} showsHorizontalScrollIndicator={false}>
					{interests.map(interest => (
						<Button
							type="clear"
							key={interest.color}
							buttonStyle={[styles.interestBtn, { backgroundColor: interest.color }]}
							titleStyle={styles.interestTitle}
							onPress={() => onPress(interest.label)}
						>
							{interest.label}
						</Button>
					))}
				</ScrollView>
				<View style={styles.personalSelContainer}>
					<Text style={styles.H2}>Your personal selection</Text>
					<Text style={styles.text}>Based on your interests</Text>
				</View>
				<PreviewRow articles={articles} />
				<View style={styles.personalSelContainer}>
					<Text style={styles.H2}>Technology</Text>
					<Text style={styles.text}>Latest technology news</Text>
				</View>
				<PreviewRow articles={articlesTech} />
				<View style={styles.personalSelContainer}>
					<Text style={styles.H2}>Sports</Text>
					<Text style={styles.text}>Hot sporting news</Text>
				</View>
				<PreviewRow articles={articlesSports} />
			</ScrollView>
		</View>
	);
};
