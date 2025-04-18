import BackButton from "@/components/elements/BackButton";
import variables from "@/constants/variables";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function ProfileEdit() {
	return (
		<ScrollView style={styles.pageContainer}>
			<BackButton showText />
		</ScrollView>
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
