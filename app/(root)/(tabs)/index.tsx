import ChannelsMainTabs from "@/components/layouts/ChannelsMainTabs";
import Header from "@/components/layouts/Header";
import { typography } from "@/constants/typography";
import variables from "@/constants/variables";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import TubeShorts from "@/components/screens/Tube/TubeShorts";
import TubeMax from "@/components/screens/Tube/TubeMax";
import TubePrime from "@/components/screens/Tube/TubePrime";
import Music from "@/components/screens/Audio/Music";
import Podcast from "@/components/screens/Audio/Podcast";
import Radio from "@/components/screens/Audio/Radio";



export default function HomeScreen() {
	const [tabsData, setTabsData] = useState({ tab: "", subTab: "" })
	
	const handleTabsChange = function(tabSlug: string, subTabSlug: string | null) {
		console.log(tabSlug, subTabSlug)

		setTabsData({
			tab: tabSlug,
			subTab: subTabSlug || ""
		})
	}

	return (
		<>
			<Stack.Screen options={{ header: () => <Header />, headerShown: true }} />
			<View style={styles.container}>

				{/* GETTING THE CURRENT TAB & SUB TAB THE TABS COMPONENT */}
				<ChannelsMainTabs handleOnChangeTabs={handleTabsChange} />

				<View style={styles.contentView}>
					{(tabsData?.tab == "tube" && tabsData.subTab == "tube-shorts") && (
						<TubeShorts />
					)}
					
					<View style={styles.view}>
						{(tabsData?.tab == "tube") && (
							<>
								{(tabsData.subTab == "tube-max") && <TubeMax />}
								{(tabsData.subTab == "tube-prime") && <TubePrime />}
							</>
						)}
						{tabsData?.tab == "audio" && (
							<>
								{(tabsData.subTab == "music") && <Music />}
								{(tabsData.subTab == "podcast") && <Podcast />}
								{(tabsData.subTab == "radio") && <Radio />}
							</>
						)}
						{tabsData?.tab == "image" && (
							<Text style={typography.paragraph}>{tabsData?.tab}</Text>
						)}
						{tabsData?.tab == "blog-and-article" && (
							<Text style={typography.paragraph}>{tabsData?.tab}</Text>
						)}
						{tabsData?.tab == "book" && (
							<Text style={typography.paragraph}>{tabsData?.tab}</Text>
						)}
					</View>

				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		backgroundColor: variables.colors.background,
	},
	contentView: {
		marginTop: 4,
		flex: 1
	},
	view: {
		paddingHorizontal: 16
	}
});
