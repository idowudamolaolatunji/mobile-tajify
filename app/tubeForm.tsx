import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BackButton from "@/components/elements/BackButton";
import ImageUploader from "@/components/forms/ImageUploader";
import variables from "@/constants/variables";
import { typography } from "@/constants/typography";
import TextInputEl from "@/components/forms/TextInputEl";
import { truncateString } from "@/utils/helper";
import VideoUploader from "@/components/forms/VideoUploader";
import { useDataContext } from "@/context/DataContext";
import TagInputEl from "@/components/forms/TagInputEl";

export default function TubeForm() {
	const { setPickedShortUrl, pickedShortUrl } = useDataContext()
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [coverImage, setCoverImage] = useState("");
	const [videoUrl, setVideoUrl] = useState("");
	const [hashtags, setHashtags] = useState<string[]>([]);
	
    const handleClear = function() {
		setTitle("");
        setDescription("");
        setCoverImage("");
        setVideoUrl("");
		setHashtags([])
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
					video={videoUrl}
					setVideo={setVideoUrl}
				/>
				<View style={{ marginBottom: 20 }} />
                <ImageUploader label="Thumbnail" imageTitle="Select Thumbnail Image" image={coverImage} setImage={setCoverImage} customHeight={225} aspect={[4, 3]} />
				

				<View style={styles.formItems}>
					<TextInputEl label="Title (Required)" placeholder="Title, E.g: 'Wonderful work of Art'" value={title} setValue={setTitle} />
					<TextInputEl label="Description (Required)" placeholder={"E.g: 'A comprehensive guide to master programming'"} value={description} setValue={setDescription} multiline={true} />
					<TagInputEl label="Video HashTags (Optional)" placeholder="Add HashTag" forHastTag tags={hashtags} setTags={setHashtags} />
                    
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
