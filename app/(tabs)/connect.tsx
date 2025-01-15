import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function connect() {
	return (
		<View style={styles.container}>
			<Text>Connect</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
	},
});
