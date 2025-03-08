import BackButton from "@/components/elements/BackButton";
import variables from "@/constants/variables";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function ArticleViewer() {
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
