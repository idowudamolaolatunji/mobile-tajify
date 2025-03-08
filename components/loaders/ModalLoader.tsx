import { typography } from "@/constants/typography";
import variables from "@/constants/variables";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function ModalLoader() {
	return (
		<View style={styles.container}>
            <ActivityIndicator size={30} color="#FFF" />
            <Text style={[typography.h4, { color: variables.colors.text }]}>Loading!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
        gap: 10,
        backgroundColor: variables.colors.tintedWhite,
        position: "absolute",

        width: "80%",
        height: 100,
        borderRadius: 4,
        top: 50,
        left: 42.5
	},
});
