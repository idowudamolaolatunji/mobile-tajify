import React, { useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "@/components/elements/BackButton";
import ImageUploader from "@/components/forms/ImageUploader";
import variables from "@/constants/variables";
import { typography } from "@/constants/typography";
import TextInputEl from "@/components/forms/TextInputEl";
import TagInputEl from "@/components/forms/TagInputEl";
import DocumentUploader from "@/components/forms/DocumentUploader";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";


const API_URL = "https://api-tajify.koyeb.app/api/channels/books/upload";

export default function BookForm() {
	const { formdataHeader } = useAuth()
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [publishedYear, setPublishedYear] = useState("");
	const [coverImage, setCoverImage] = useState({ preview: "", file: null });
	const [authors, setAuthors] = useState<string[]>([]);
	const [genre, setGenre] = useState<string[]>([]);
	const [bookFile, setBookFile] = useState<any>(null);
	const [loading, setLoading] = useState(false);

    const handleClear = function() {
        setTitle("");
        setDescription("");
        setPublishedYear("");
		setGenre([]);
		setAuthors([]);
        setCoverImage({ preview: "", file: null });
		setBookFile(null)
    }

	const onReloadProfile = function() {
		router.dismiss()
		router.replace("/acctProfile")
	}
	
	async function handleSubmit() {
		if(!title || authors.length < 1 || !bookFile || !publishedYear || !coverImage.file) {
			return Alert.alert("Complete all required fields")
		}

		setLoading(true)

		try {
			const formData = new FormData();
			formData.append('title', title);
			formData.append('description', description);
			formData.append('author', JSON.stringify(authors));
			formData.append('genre', JSON.stringify(genre));

			if (bookFile && coverImage.file) {
				formData.append('coverImage', coverImage.file);
				formData.append('book', bookFile);
			}

			const res = await fetch(API_URL, {
				headers: formdataHeader,
				method: "POST",
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
				<Text style={[typography.h3, styles.heading]}>Upload Book</Text>

                <ImageUploader label="Cover Image (Required)" imageTitle="Select Book Image" image={coverImage.preview} setImage={setCoverImage} customHeight={350} />

				<View style={styles.formItems}>
					<DocumentUploader label="Book file - PDF (Required)" selectedFile={bookFile} setSelectedFile={setBookFile} docType="pdf" />
					<TextInputEl label="Book Title (Required)" placeholder="Title, E.g: 'Wonderful work of Art'" value={title} setValue={setTitle} />
					<TextInputEl label="Description (Optional)" placeholder={"E.g: 'A comprehensive guide to master programming'"} value={description} setValue={setDescription} multiline={true} />
					<TagInputEl placeholder="Add Author(s)" label="Book author (Required)" tags={authors} setTags={setAuthors} />
                    <TextInputEl label="Book Published Year (Required)" placeholder="Book Published Year" value={publishedYear} setValue={setPublishedYear} />
					<TagInputEl placeholder="Add Genre(s)" label="Book genre (Required)" tags={genre} setTags={setGenre} />

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
