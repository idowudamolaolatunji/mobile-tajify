import { typography } from "@/constants/typography";
import variables from "@/constants/variables";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity } from "react-native";

function BackButton({ action, showText=false }: { action?: any; showText?: boolean }) {
	const router = useRouter();

	return (
		<TouchableOpacity style={styles.button} onPress={() => (action ? action() : router.back())}>
			<Ionicons name="chevron-back" color={variables.colors.text} size={28} />
			{showText && <Text style={[styles.text, typography.paragraph]}>Back</Text>}
		</TouchableOpacity>
	);
}

export default BackButton;

const styles = StyleSheet.create({
	button: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginLeft: -6,
        marginBottom: 20,
    },
	text: {},
});
