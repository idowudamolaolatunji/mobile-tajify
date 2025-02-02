import ConnectMainTabs from "@/components/layouts/ConnectMainTabs";
import Header from "@/components/layouts/Header";
import Chat from "@/components/screens/connect/Chat";
import Community from "@/components/screens/connect/Community";
import Profile from "@/components/screens/connect/Profile";
import variables from "@/constants/variables";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function connect() {
	const [tabsData, setTabsData] = useState("")
		
	const handleTabsChange = function(tabSlug: string) {
		setTabsData(tabSlug)
	}

	return (
		<>
			<Stack.Screen options={{ header: () => <Header />, headerShown: true }} />
			<View style={styles.container}>
				<ConnectMainTabs handleOnChangeTabs={handleTabsChange} />
				
				<View style={styles.contentView}>
					{(tabsData == "profiles") && (
						<Profile />
					)}
					{tabsData == "chat" && (
						<Chat />
					)}
					{tabsData == "community" && (
						<Community />
					)}
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: variables.colors.background,
		flex: 1,
		display: "flex",
	},
	contentView: {
		marginTop: 4,
		flex: 1,
	}
});
