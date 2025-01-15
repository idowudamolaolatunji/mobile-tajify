import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function more() {
	return (
		<View style={styles.container}>
			<Text>More</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
	},
});
