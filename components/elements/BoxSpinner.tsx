import variables from "@/constants/variables";
import React from "react";
import { ActivityIndicator } from "react-native";
import { StyleSheet, View } from "react-native";

function BoxSpinner() {
	return (
		<View style={styles.container}>
			<View style={styles.box}>
                <ActivityIndicator color="#fff" size={40} />
			</View>
		</View>
	);
}

export default BoxSpinner;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 40
	},
	box: {
		width: "85%",
		borderRadius: 4,
		backgroundColor: variables.colors.bgDark,
		padding: 60,
		alignItems: "center",
	},
})