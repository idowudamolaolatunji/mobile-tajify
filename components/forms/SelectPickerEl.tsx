import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import variables from "@/constants/variables";
import { StyleSheet } from "react-native";

export default function SelectPickerEl() {
	const [selectedLanguage, setSelectedLanguage] = useState("");

	return (
		<Picker style={styles.input} selectedValue={selectedLanguage} onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}>
			<Picker.Item label="Java" value="java" />
			<Picker.Item label="JavaScript" value="js" />
		</Picker>
	);
}

const styles = StyleSheet.create({
	input: {
		flex: 1,
		color: "#fff",
		fontSize: 18,
		backgroundColor: variables.colors.primaryTint2,
		borderRadius: 4,
		paddingHorizontal: 10,
	},
});
