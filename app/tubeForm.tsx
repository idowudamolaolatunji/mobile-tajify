import React, { useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "@/components/elements/BackButton";
import ImageUploader from "@/components/forms/ImageUploader";
import variables from "@/constants/variables";
import { typography } from "@/constants/typography";
import TextInputEl from "@/components/forms/TextInputEl";
import VideoUploader from "@/components/forms/VideoUploader";
import TagInputEl from "@/components/forms/TagInputEl";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";


const API_URL = "https://api-tajify.koyeb.app/api/channels/tubes/upload";
// const API_URL = "http://localhost:3001/api/channels/tubes/upload";


export function TubeForm() {
	const router = useRouter()
	const { formdataHeader } = useAuth()
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [thumbnail, setThumbnail] = useState({ preview: "", file: null });
	const [video, setVideo] = useState({ url: "", file: null });
	const [hashtags, setHashtags] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	
    const handleClear = function() {
		setTitle("");
        setDescription("");
        setThumbnail({ preview: "", file: null });
        setVideo({ url: "", file: null });
		setHashtags([])
    }

	const onReloadProfile = function() {
		router.dismiss()
		router.replace("/acctProfile")
	}

	async function handleSubmit() {
		if(!title || !thumbnail.file || !video.file || !description) {
			return Alert.alert("Complete all required fields")
		}

		setLoading(true)

		try {
			const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('type', "tube-max");
            formData.append('hashTags', JSON.stringify(hashtags));

            if (thumbnail.file && video.file) {
				formData.append('thumbnail', thumbnail.file);
				formData.append('tube', video.file);
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
				<Text style={[typography.h3, styles.heading]}>Upload Tube max</Text>

				<VideoUploader
					type="max"
					label="Video (Required)"
					video={video.url}
					setVideo={setVideo}
				/>

				<View style={{ marginBottom: 20 }} />
                <ImageUploader label="Thumbnail" imageTitle="Select Thumbnail Image" image={thumbnail.preview} setImage={setThumbnail} customHeight={225} aspect={[4, 3]} />

				<View style={styles.formItems}>
					<TextInputEl label="Title (Required)" placeholder="Title, E.g: 'Wonderful work of Art'" value={title} setValue={setTitle} />
					<TextInputEl label="Description (Required)" placeholder={"E.g: 'A comprehensive guide to master programming'"} value={description} setValue={setDescription} multiline={true} />
					<TagInputEl label="Video HashTags (Optional)" placeholder="Add HashTag" forHastTag tags={hashtags} setTags={setHashtags} />
                    
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
