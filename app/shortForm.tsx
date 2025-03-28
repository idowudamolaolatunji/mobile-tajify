import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BackButton from "@/components/elements/BackButton";
import variables from "@/constants/variables";
import { typography } from "@/constants/typography";
import TextInputEl from "@/components/forms/TextInputEl";
import VideoUploader from "@/components/forms/VideoUploader";
import { useDataContext } from "@/context/DataContext";
import TagInputEl from "@/components/forms/TagInputEl";
import { useRouter } from "expo-router";

export default function ShortForm() {
	const router = useRouter()
	const { pickedShortUrl, setPickedShortUrl } = useDataContext()
	const [description, setDescription] = useState("");
	const [hashtags, setHashtags] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

    const handleClear = function() {
        setDescription("");
        setPickedShortUrl("");
		setHashtags([]);
    }

	const onReloadProfile = function() {
		router.dismiss()
		router.replace("/acctProfile")
	}

	const handleSubmit = async function() {
		setLoading(true);
		try {
			

			setTimeout(function() {
				onReloadProfile();
			}, 1000)
		} catch(err) {
			Alert.alert((err as Error).message)
		} finally {
			setTimeout(function() {
				setLoading(true);
			}, 1000)
		}
	}
	
	useEffect(function() {
		setPickedShortUrl("");
	}, []);


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
				<Text style={[typography.h3, styles.heading]}>Upload Tube Short</Text>

                <VideoUploader
					type="short"
					label="Short Video - 30 secs (Required)"
					video={pickedShortUrl}
					setVideo={setPickedShortUrl}
				/>

				<View style={styles.formItems}>
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
