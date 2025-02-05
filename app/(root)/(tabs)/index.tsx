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
import Blog from "@/components/screens/Blog/Blog";
import BookLibraryScreen from "@/components/screens/Book/BookLibraryScreen";
import ImageScreen from "@/components/screens/Image/ImageScreen";


export default function HomeScreen() {
	const [tabsData, setTabsData] = useState({ tab: "", subTab: "" })
	
	// HERE HANDLES THE CURRENT TAB AND SUBTAB CHANGE AND STORES IT IN STATE
	const handleTabsChange = function(tabSlug: string, subTabSlug: string | null) {
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
							<ImageScreen />
						)}
						{tabsData?.tab == "blog-and-article" && (
							<Blog />
						)}
						{tabsData?.tab == "book" && (
							<BookLibraryScreen />
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