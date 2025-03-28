import React, { useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BackButton from "@/components/elements/BackButton";
import ImageUploader from "@/components/forms/ImageUploader";
import variables from "@/constants/variables";
import { typography } from "@/constants/typography";
import TextInputEl from "@/components/forms/TextInputEl";
import Editor from "@/components/dom-components/hello-dom";
import RichTextEditor from "@/components/forms/RichTextEditor";


export default function BlogForm() {
	const [plainText, setPlainText] = useState("");
	const [editorState, setEditorState] = useState<string | null>(null);
	///////////////////////////////////////////////////////////////////
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [coverImage, setCoverImage] = useState("");
	const bodyRef = useRef("");
	const editorRef = useRef(null);

    const handleClear = function() {
        setTitle("");
        setDescription("");
        setCoverImage("");
    }

	return (
		<SafeAreaView style={styles.pageContainer}>
					
		<ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" nestedScrollEnabled={true}>
			<BackButton showText />

            <View style={{ paddingBottom: 30 }}>
				<Text style={[typography.h3, styles.heading]}>Write Blog</Text>

				<View style={styles.formItems}>
					<TextInputEl label="Blog Title (Required)" placeholder="Title, E.g: 'Wonderful work of Art'" value={title} setValue={setTitle} />
					<ImageUploader label="Main Image (Required)" imageTitle="Select Blog Main Image" image={coverImage} setImage={setCoverImage} customHeight={250} />
					<RichTextEditor label="Blog Body (Required)" editorRef={editorRef} onChange={(body) => bodyRef.current = body} />

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
		</SafeAreaView>
	);
}


const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		backgroundColor: variables.colors.background,
		paddingTop: 40,
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
