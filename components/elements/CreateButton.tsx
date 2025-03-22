import variables from "@/constants/variables";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

export default function CreateButton({ tab }: { tab?: string }) {
	const handlePress = function () {
		const route = tab == "shorts" ? "/shortForm" : tab == "tube_max" ? "/tubeForm" : tab == "audio" ? "/musicForm" : tab == "images" ? "/imageForm" : tab == "blogs" ? "/blogForm" : tab == "books" ? "/bookForm" : "/podcastForm";

        console.log(route)
		router.navigate(route);
	};

	return (
		<Pressable style={styles.addBtn} onPress={handlePress}>
			<AntDesign name="pluscircleo" size={40} color={variables.colors.text} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	addBtn: {
		position: "absolute",
		right: 20,
		bottom: 80,
		backgroundColor: variables.colors.primary,
		padding: 6,
		borderRadius: 100,
	},
});
