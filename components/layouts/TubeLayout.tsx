import variables from "@/constants/variables";
import React from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function TubeLayout({ video }: { video: any }) {
	return (
		<Pressable style={styles.videoCard}>
			<Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
            <View style={styles.videoTiming}>
                <Text style={styles.videoTimingText}>10:00</Text>
            </View>
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
        overflow: "hidden",
        position: "relative"
	},
	thumbnail: {
		width: "100%",
		aspectRatio: 16 / 10,
	},
    videoTiming: {
        backgroundColor: variables.colors.card,
        position: "absolute",
        maxWidth: 50,
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 4,
        bottom: "30%",
        right: 5
    },
    videoTimingText: {
        color: variables.colors.text
    },
	videoInfo: {
        marginTop: -35,
		flexDirection: "row",
		// paddingVertical: 15,
        paddingTop: 8,
        paddingBottom: 14,
        paddingHorizontal: 8,
		alignItems: "center",
	},
	channelAvatar: {
        width: 36,
        height: 36,
		borderRadius: 50,
		marginRight: 6,
	},
	textContainer: {
		flex: 1,
		marginRight: 4,
	},
	videoTitle: {
		fontSize: 14,
		color: variables.colors.text,
		marginBottom: 1,
		lineHeight: 16,
	},
	channelName: {
		fontSize: 12,
		color: variables.colors.textSecondary,
	},
});
