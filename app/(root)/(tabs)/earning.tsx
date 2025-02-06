import Header from "@/components/layouts/Header";
import variables from "@/constants/variables";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function earning() {
	

	return (
		<React.Fragment>
			<Stack.Screen options={{ header: () => <Header />, headerShown: true }} />
			<ScrollView style={styles.container}>
				<Text>Earnings</Text>
			</ScrollView>
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		backgroundColor: variables.colors.background,
		flex: 1,
	},
});