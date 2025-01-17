import React from "react";
import { StyleSheet, Text, View } from "react-native";
import variables from "@/constants/variables";

export default function more() {
	return (
		<View style={styles.container}>
			<Text>More</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: variables.colors.background,
		flex: 1,
		display: "flex",
	},
});
