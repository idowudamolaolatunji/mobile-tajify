import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import VideoPlayer from "../components/layouts/VideoPlayer";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { TubeMaxType } from "@/types/type";
import { tubeMax } from "@/utils/data";
import { formatDateAgo } from "@/utils/helper";
import variables from "@/constants/variables";
import { typography } from "@/constants/typography";
import { unknownUserImageUri } from "@/constants/images";
import BackButton from "../components/elements/BackButton";

export default function VideoItem() {
	const tube = tubeMax[0];
	const [video, setVideo] = useState<TubeMaxType | any>(tube);

	// const [comments, setComments] = useState<Comment[]>([]);
	const route = useRoute();
	// const videoId = route.params?.id;

	// useEffect(() => {
	//   DataStore.query(Video, videoId).then(setVideo);
	// }, [videoId]);


	// const commentsSheetRef = useRef<BottomSheetModal>(null);

	// const openComments = () => {
	//   commentsSheetRef.current?.present();
	// };

	if (!video) {
		return <ActivityIndicator />;
	}

	return (
		<ScrollView style={styles.pageContainer}>
			<BackButton showText />

			<VideoPlayer videoUrl={video?.video?.url} thumbnail={video?.thumbnail?.url} />

			<View style={{ flex: 1 }}>
				<View style={styles.videoInfoContainer}>
					<Text style={styles.title}>{video.title}</Text>
					<Text style={styles.subtitle}>
						{tube.creatorProfile?.profileName ? tube.creatorProfile?.profileName : "Channel Unknown"} • {tube.views} views • {formatDateAgo(tube.createdAt)}
					</Text>
				</View>

				<View style={styles.actionListContainer}>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<View style={styles.actionListItem}>
							<AntDesign name="like1" size={24} color="lightgrey" />
							<Text style={styles.actionText}>{video.likes} likes</Text>
						</View>

						<View style={styles.actionListItem}>
							<FontAwesome name="comment" size={24} color="lightgrey" />
							<Text style={styles.actionText}>2 comments</Text>
						</View>

						<View style={styles.actionListItem}>
							<FontAwesome name="gift" size={24} color="lightgrey" />
							<Text style={styles.actionText}>0 gift</Text>
						</View>
					</ScrollView>
				</View>

				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						padding: 10,
						borderColor: "#3d3d3d",
						borderTopWidth: 1,
						borderBottomWidth: 1,
					}}
				>
					<Image style={styles.avatar} source={{ uri: video?.creatorProfile?.profileImage?.url ? video?.creatorProfile?.profileImage?.url : unknownUserImageUri }} />

					<View style={{ marginHorizontal: 10, flex: 1 }}>
						<Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>{tube.creatorProfile?.profileName ? tube.creatorProfile?.profileName : "Channel Unknown"}</Text>
						<Text style={{ color: "grey", fontSize: 18 }}>10 subscribers</Text>
					</View>

					<TouchableOpacity style={styles.followBtn}>
						<Text style={typography.paragraph}>Follow</Text>
					</TouchableOpacity>
				</View>

            {/* Commnets */}
            {/* <Pressable
                onPress={openComments}
                style={{ padding: 10, marginVertical: 10 }}
            >
                <Text style={{ color: "white" }}>Comments 333</Text>
                {comments.length > 0 && <VideoComment comment={comments[0]} />}
            </Pressable> */}

            {/* All comments */}
            {/* <BottomSheetModal
                ref={commentsSheetRef}
                snapPoints={["70%"]}
                index={0}
                backgroundComponent={({ style }) => (
                    <View style={[style, { backgroundColor: "#4d4d4d" }]} />
                )}
            >
                <VideoComments comments={comments} videoID={video.id} />
            </BottomSheetModal> */}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		paddingTop: 40,
		paddingHorizontal: 12,
		backgroundColor: variables.colors.background
	},
	videoInfoContainer: {
		marginHorizontal: 10,
		marginVertical: 6,
	},
	title: {
		color: "white",
		fontSize: 20,
		fontWeight: "500",
		marginBottom: 5,
	},
	tags: {
		color: "#0094e3",
		fontSize: 16,
		fontWeight: "500",
	},
	subtitle: {
		color: variables.colors.bgLight,
		fontSize: 15,
	},

	// action list
	actionListContainer: {
		marginVertical: 10,
	},
	actionListItem: {
		width: 70,
		height: 60,
		justifyContent: "space-around",
		alignItems: "center",
	},
	actionText: {
		color: "white",
	},
	followBtn: {
		backgroundColor: variables.colors.primary,
		marginLeft: "auto",
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderRadius: 4,
	},

	// user
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
});
