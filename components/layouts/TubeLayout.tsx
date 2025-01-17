import variables from "@/constants/variables";
import React from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function TubeLayout({ video }: { video: any }) {
	return (
		<Pressable style={styles.videoCard}>
			<Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
			<View style={styles.videoInfo}>
				<Image source={{ uri: video.channel.avatar }} style={styles.channelAvatar} />
				<View style={styles.textContainer}>
					<Text style={styles.videoTitle} numberOfLines={2}>
						{video.title}
					</Text>
					<Text style={styles.channelName}>
						{video.channel.name} • {video.views} views
					</Text>
				</View>
			</View>
		</Pressable>
	);
}

export default TubeLayout;

const styles = StyleSheet.create({
	videoCard: {
		marginBottom: 12,
		backgroundColor: variables.colors.card,
        borderRadius: 8,
        overflow: "hidden"
	},
	thumbnail: {
		width: "100%",
		aspectRatio: 16 / 8,
	},
	videoInfo: {
		flexDirection: "row",
		padding: 6,
		alignItems: "center",
	},
	channelAvatar: {
		width: 28,
		height: 28,
		borderRadius: 14,
		marginRight: 6,
	},
	textContainer: {
		flex: 1,
		marginRight: 4,
	},
	videoTitle: {
		fontSize: 12,
		fontWeight: "500",
		color: variables.colors.text,
		marginBottom: 1,
		lineHeight: 16,
	},
	channelName: {
		fontSize: 11,
		color: variables.colors.textSecondary,
	},
});
