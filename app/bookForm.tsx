import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BackButton from "@/components/elements/BackButton";
import ImageUploader from "@/components/forms/ImageUploader";
import variables from "@/constants/variables";
import { typography } from "@/constants/typography";
import TextInputEl from "@/components/forms/TextInputEl";

export default function BookForm() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [coverImage, setCoverImage] = useState({ file: null, preview: "" });

    const handleClear = function() {
        setTitle("");
        setDescription("");
        setCoverImage({ file: null, preview: "" });
    }

	return (
		<ScrollView style={styles.pageContainer} >
			<BackButton showText />

            <View style={{}}>
				<Text style={[typography.h3, styles.heading]}>Upload Book</Text>

                <ImageUploader label="Book Cover Image (Required)" image={coverImage} setImage={setCoverImage} customHeight={250} />

				<View style={styles.formItems}>
					<TextInputEl label="Book Title (Required)" placeholder="Title, E.g: 'Wonderful work of Art'" value={title} setValue={setTitle} />
					<TextInputEl label="Description (optional)" placeholder="Description, E.g: 'A comprehensive guide to master programming'" value={description} setValue={setDescription} />
                    <TextInputEl label="Book author (Required)" placeholder="Book Author" value={title} setValue={setTitle} />
                    <TextInputEl label="Book Published Year (Required)" placeholder="Book Published Year" value={title} setValue={setTitle} />
                    

					<View style={styles.buttons}>
						<TouchableOpacity style={[styles.button, { backgroundColor: variables.colors.primary }]}>
							<Text style={[{ color: variables.colors.text }, typography.paragraphBg]}>Upload</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.button, { backgroundColor: variables.colors.tintedWhite }]} onPress={handleClear}>
							<Text style={[{ color: variables.colors.text }, typography.paragraphBg]}>Clear Fields</Text>
						</TouchableOpacity>
            		</View>
				</View>
            </View>
		</ScrollView>
	);
}


const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		paddingTop: 40,
		backgroundColor: variables.colors.background,
		paddingHorizontal: 16,
	},
	heading: {
		color: variables.colors.text,
		textAlign: "center",
		marginBottom: 20,
	},
	formItems: {
		gap: 18,
		marginTop: 24
	},
	buttons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        marginTop: 24
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderRadius: 2
    },
});
