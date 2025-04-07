import React, { useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "@/components/elements/BackButton";
import ImageUploader from "@/components/forms/ImageUploader";
import variables from "@/constants/variables";
import { typography } from "@/constants/typography";
import TextInputEl from "@/components/forms/TextInputEl";
import DocumentUploader from "@/components/forms/DocumentUploader";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";


const API_URL = "https://api-tajify.koyeb.app/api/channels/music/upload";

export default function MusicForm() {
	const { formdataHeader } = useAuth();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [coverImage, setCoverImage] = useState({ preview: "", file: null });
	const [music, setMusic] = useState<any>(null);
	const [loading, setLoading] = useState(false);

    const handleClear = function() {
        setTitle("");
        setDescription("");
        setCoverImage({ preview: "", file: null });
		setMusic(null)
    }

	const onReloadProfile = function() {
		router.dismiss()
		router.replace("/acctProfile")
	}

	async function handleSubmit() {
		if(!title || !coverImage.file || !music) {
			return Alert.alert("Complete all required fields")
		}

		setLoading(true)

		try {
			const formData = new FormData();
			formData.append('title', title);
			formData.append('description', description);

			if (coverImage.file && music) {
				formData.append('coverImage', coverImage.file);
				formData.append('audio', music);
			}

			// console.log(formData?._parts)

			const res = await fetch(API_URL, {
				method: "POST",
				headers: formdataHeader,
				body: formData,
			});

			console.log(res);

			const data = await res.json();
			console.log(data);
			if (res?.status != 201 && data?.status !== 'success') {
				throw new Error(data?.message);
			}

			setTimeout(function() {
				onReloadProfile();
			}, 1000)

		} catch(err) {
			return Alert.alert("Error", (err as Error).message);
		} finally {
			setLoading(false)
		}
	}


	if(loading) {
		return (
			<View style={{ justifyContent: "center", alignItems: "center", flex: 1, marginTop: -50, backgroundColor: variables.colors.background }}>
				<ActivityIndicator size={"large"} color={variables.colors.text} />
			</View>
		)
	}

	return (
		<SafeAreaView style={styles.pageContainer}>
					
		<ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" nestedScrollEnabled={true}>
			<BackButton showText />

            <View style={{ paddingBottom: 30 }}>
				<Text style={[typography.h3, styles.heading]}>Upload Song</Text>

                <ImageUploader label="Music Artwork" imageTitle="Select Music Artwork" image={coverImage.preview} setImage={setCoverImage} customHeight={250} />

				<View style={styles.formItems}>
					<DocumentUploader label="Music file - audio (Required)" selectedFile={music} setSelectedFile={setMusic} docType="music" />
					<TextInputEl label="Title (Required)" placeholder="Title, E.g: 'Wonderful work of Art'" value={title} setValue={setTitle} />
					<TextInputEl label="Description (Optional)" placeholder={"E.g: 'A comprehensive guide to master programming'"} value={description} setValue={setDescription} multiline={true} />
                    

					<View style={styles.buttons}>
						<TouchableOpacity style={[styles.button, { backgroundColor: variables.colors.primary }]} onPress={handleSubmit}>
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
