import Header from "@/components/layouts/Header";
import variables from "@/constants/variables";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function connect() {
	return (
		<>
			<Stack.Screen options={{ header: () => <Header />, headerShown: true }} />
		<View style={styles.container}>
			<Text>Connect</Text>
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
});
