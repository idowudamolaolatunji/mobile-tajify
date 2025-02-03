import ComingSoon from "@/components/layouts/ComingSoon";
import Header from "@/components/layouts/Header";
import variables from "@/constants/variables";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function contest() {
	return (
		<>
			<Stack.Screen options={{ header: () => <Header />, headerShown: true }} />
			<View style={styles.container}>
				<ComingSoon feature="Contest" />
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		backgroundColor: variables.colors.background,
		flex: 1,
	},
});
