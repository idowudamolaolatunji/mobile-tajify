import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function earning() {
	return (
		<View style={styles.container}>
			<Text>Earnings</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
	},
});
