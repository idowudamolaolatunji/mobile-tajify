import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
import FollowButton from "@/components/elements/FollowButton";

export default function VideoItem() {
	const tube = tubeMax[0];
	const [video, setVideo] = useState<TubeMaxType | any>(tube);

	// const [comments, setComments] = useState<Comment[]>([]);
	const route = useRoute();
	// const videoId = route.params?.id;

	// useEffect(() => {
	//   DataStore.query(Video, videoId).then(setVideo);
	// }, [videoId]);

	return (
		<View style={styles.pageContainer}>
			<View style={{ paddingHorizontal: 12 }}>
				<BackButton showText />
			</View>

			<VideoPlayer videoUrl={video?.video?.url} />

			<ScrollView style={{ flex: 1, paddingHorizontal: 12 }}>
				<View style={styles.videoInfoContainer}>
					<Text style={styles.title}>{video.title}</Text>
					<Text style={styles.subtitle}>
						{tube.creatorProfile?.profileName ? tube.creatorProfile?.profileName : "Channel Unknown"} • {tube.views} views • {formatDateAgo(tube.createdAt)}
					</Text>
				</View>

				<View style={styles.actionListContainer}>
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
				</View>

				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						paddingVertical: 12,
						paddingHorizontal: 5,
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

					<FollowButton />
				</View>

				{/* Commnets */}
				<View style={{ padding: 10, marginVertical: 20 }}>
					<Text style={[typography.paragraphBg, { color: variables.colors.text }]}>Comments 333</Text>
					{/* {comments.length > 0 && <VideoComment comment={comments[0]} />} */}
				</View>

			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		paddingTop: 40,
		backgroundColor: variables.colors.background
	},
	videoInfoContainer: {
		marginVertical: 10,
	},
	title: {
		color: "white",
		fontSize: 22,
		fontWeight: "500",
		marginBottom: 5,
	},
	subtitle: {
		color: variables.colors.bgLight,
		fontSize: 15,
	},

	actionListContainer: {
		flexDirection: "row",
		gap: 30,
		padding: 10,
		paddingLeft: 4
	},
	actionListItem: {
		justifyContent: "space-around",
		alignItems: "center",
	},
	actionText: {
		color: variables.colors.text,
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
