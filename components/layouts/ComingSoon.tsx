import { typography } from "@/constants/typography";
import variables from "@/constants/variables";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function ComingSoon({ feature }: { feature: string }) {
	return (
		<View style={styles.container}>
			<View style={styles.box}>
				<Text style={[typography.h1, { color: variables.colors.primary, marginBottom: 10 }]}>
                    Coming Soon..
                </Text>
				<Text style={[typography.paragraphBg, { textAlign: "center", lineHeight: 30 }]}>
                    We'll notify you when the "{feature}" feture is live
                </Text>
			</View>
		</View>
	);
}

export default ComingSoon;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	box: {
		width: "85%",
		borderRadius: 4,
		backgroundColor: variables.colors.bgDark,
		padding: 20,
		alignItems: "center",
	},
});
