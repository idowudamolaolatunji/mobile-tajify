import ChannelsMainTabs from "@/components/layouts/ChannelsMainTabs";
import Header from "@/components/layouts/Header";
import variables from "@/constants/variables";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import TubeShorts from "@/components/screens/Tube/TubeShorts";
import TubeMax from "@/components/screens/Tube/TubeMax";
import Podcast from "@/components/screens/Audio/Podcast";
import Books from "@/components/screens/Books/Book";
import BlogAndArticle from "@/components/screens/BlogAndArticle/Blog";
import Music from "@/components/screens/Audio/Music";
import FloatingPlayer from "@/components/layouts/FloatingPlayer";
import ImageAndArts from "@/components/screens/Images/ImageAndArts";


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
							(tabsData.subTab == "tube-max") && <TubeMax />
						)}
						{tabsData?.tab == "audio" && (
							<React.Fragment>
								{(tabsData.subTab == "music") && <Music />}
								{(tabsData.subTab == "podcast") && <Podcast />}
								<FloatingPlayer emptyText={`Select ${tabsData.subTab}!`} />
							</React.Fragment>
						)}
						{tabsData?.tab == "image" && (
							<ImageAndArts />
						)}
						{tabsData?.tab == "blog-and-article" && (
							<BlogAndArticle />
						)}
						{tabsData?.tab == "book" && (
							<Books />
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
		paddingHorizontal: 16,
		flex: 1,
	}
});