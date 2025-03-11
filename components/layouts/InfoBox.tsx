import { typography } from "@/constants/typography";
import variables from "@/constants/variables";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function InfoBox({ text }: { text: string }) {
	return (
		<View style={styles.container}>
			<View style={styles.box}>
				<Text style={[typography.paragraphBg, { textAlign: "center", lineHeight: 30 }]}>{text}</Text>
			</View>
		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: -40
	},
	box: {
		width: "85%",
		borderRadius: 4,
		backgroundColor: variables.colors.bgDark,
		padding: 20,
		alignItems: "center",
	},
});
