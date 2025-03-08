import React from "react";
import { StyleSheet, View } from "react-native";
import variables from "@/constants/variables";
import BackButton from "@/components/elements/BackButton";

export default function BookViewer() {
	return (
		<View style={styles.pageContainer}>
			<BackButton showText />
		</View>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		paddingTop: 40,
		backgroundColor: variables.colors.background,
		paddingHorizontal: 16,
	},
});
