import { unknownUserImageUri } from "@/constants/images";
import variables from "@/constants/variables";
import { useDataContext } from "@/context/DataContext";
import { TubeType } from "@/types/type";
import { formatDateAgo, durationTimeFormat, truncateString, countNum } from "@/utils/helper";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";


function TubeLayout({ tube }: { tube: TubeType }) {
	const router = useRouter();
	const { setSelectedData, setSelectedProfile, setSelectedProfileId } = useDataContext()

	const handlePress = function() {
		setSelectedData(tube)
		router.navigate('/videoViewer')
	}

	const handleGoToProfile = function() {
		setSelectedProfile(null);
		setSelectedProfileId(tube?.creatorProfile);
		router.navigate("/creatorProfile")
	}

	return (
		<Pressable style={styles.videoCard} onPress={handlePress}>
			{/* @ts-ignore */}
			<Image source={{ uri: tube.thumbnail.url }} style={styles.thumbnail} />
            <View style={styles.videoTiming}>
                <Text style={styles.videoTimingText}>{durationTimeFormat(tube.video.duration_in_sec || 0)}</Text>
            </View>
			
			<View style={styles.videoInfo}>
				<Pressable onPress={handleGoToProfile}>
					<Image source={{ uri: tube.creatorProfile?.profileImage?.url ? tube.creatorProfile?.profileImage?.url : unknownUserImageUri }} style={styles.channelAvatar} />
				</Pressable>
				<View style={styles.textContainer}>
					<Text style={styles.videoTitle} numberOfLines={2}>
						{truncateString(tube.title, 50)}
					</Text>

					<View style={{ flexDirection: "row" }}>
						<Pressable onPress={handleGoToProfile}>
							<Text style={[styles.channelName, { textTransform: "capitalize", textDecorationLine: "underline" }]}>
								{tube.creatorProfile?.profileName}
							</Text>
						</Pressable>
						<Text style={styles.channelName}>
							{"  "}•{"  "}{countNum(tube.views ?? 0)} views{"  "}•{"  "}{formatDateAgo(tube.createdAt)}
						</Text>
					</View>
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
		aspectRatio: 16 / 10
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
        paddingTop: 8,
        paddingBottom: 14,
        paddingHorizontal: 8,
		alignItems: "center",
		backgroundColor: variables.colors.card
	},
	channelAvatar: {
        width: 36,
        height: 36,
		borderRadius: 50,
		marginRight: 10,
		backgroundColor: variables.colors.tabInactive
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
