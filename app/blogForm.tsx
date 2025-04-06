import React, { useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "@/components/elements/BackButton";
import ImageUploader from "@/components/forms/ImageUploader";
import variables from "@/constants/variables";
import { typography } from "@/constants/typography";
import TextInputEl from "@/components/forms/TextInputEl";
import Editor from "@/components/dom-components/hello-dom";
import RichTextEditor from "@/components/forms/RichTextEditor";
import { router } from "expo-router";


export default function BlogForm() {
	const [plainText, setPlainText] = useState("");
	const [editorState, setEditorState] = useState<string | null>(null);
	////////////////////////////////////////////////////////////////////
	const [title, setTitle] = useState("");
	const [coverImage, setCoverImage] = useState({ preview: "", file: null });
	const bodyRef = useRef("");
	const editorRef = useRef([]);

    const handleClear = function() {
        setTitle("");
        setCoverImage({ preview: "", file: null });
		editorRef.current = [];
    }


	const onReloadProfile = function() {
		router.dismiss()
		router.replace("/acctProfile")
	}
	
	// async function handleSubmit() {
	// 	if(!title || !thumbnail || !video || !description) {
	// 		return Alert.alert("Complete all required fields")
	// 	}

	// 	setLoading(true)

	// 	try {
	// 		const formData = new FormData();
	// 		formData.append('title', title);
	// 		formData.append('description', description);
	// 		formData.append('type', "tube-max");
	// 		formData.append('hashTags', JSON.stringify(hashtags));

	// 		if (thumbnail.file && video.file) {
	// 			formData.append('thumbnail', thumbnail.file);
	// 			formData.append('tube', video.file);
	// 		}

	// 		const res = await fetch(API_URL, {
	// 			headers: formdataHeader,
	// 			method: "POST",
	// 			body: formData,
	// 		});

	// 		console.log(res);

	// 		const data = await res.json();
	// 		console.log(data);
	// 		if (res?.status != 201 && data?.status !== 'success') {
	// 			throw new Error(data?.message);
	// 		}

	// 		setTimeout(function() {
	// 			onReloadProfile();
	// 		}, 1000)

	// 	} catch(err) {
	// 		return Alert.alert("Error", (err as Error).message);
	// 	} finally {
	// 		setLoading(false)
	// 	}
	// }

	return (
		<SafeAreaView style={styles.pageContainer}>
			<ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" nestedScrollEnabled={true}>
				<BackButton showText />

				<View style={{ paddingBottom: 30 }}>
					<Text style={[typography.h3, styles.heading]}>Write Blog</Text>

					<View style={styles.formItems}>
						<TextInputEl label="Blog Title (Required)" placeholder="Title, E.g: 'Wonderful work of Art'" value={title} setValue={setTitle} />
						<ImageUploader label="Main Image (Required)" imageTitle="Select Blog Main Image" image={coverImage.preview} setImage={setCoverImage} customHeight={250} />
						<RichTextEditor label="Blog Body (Required)" editorRef={editorRef} onChange={(body) => bodyRef.current = body} />

						<View style={styles.buttons}>
							<TouchableOpacity style={[styles.button, { backgroundColor: variables.colors.primary }]} onPress={() => {}}>
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
