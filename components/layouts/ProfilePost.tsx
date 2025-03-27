import { BlogType, BookType, MusicType, PicsImageType, PodcastType, TubeType } from "@/types/type";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from 'expo-image';
import { MasonryFlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import variables from "@/constants/variables";
import { countNum, durationTimeFormat, formatDateAgo, truncateString } from "@/utils/helper";
import { Entypo } from "@expo/vector-icons";
import PodcastItem from "./PodcastItem";
import ImageItem from "./ImageItem";
import BookItem from "./BookItem";
import BlogItem from "./BlogItem";
import AudioItem from "./AudioItem";
import { router } from "expo-router";
import { useDataContext } from "@/context/DataContext";
import { useAudioContext } from "@/context/AudioContext";
import { picsImages, podcasts } from "@/utils/data";

interface Props {
    posts: TubeType[] | MusicType[] | PodcastType[] | PicsImageType[] | BlogType[] | BookType[] | Array<unknown> | any;
    tab: string;
    defaultProfile?: boolean;
}


export default function ProfilePost({ posts, tab, defaultProfile }: Props) {
    const { setSelectedData } = useDataContext();
    const { sound, isPlaying, currentAudioId, playSound, handlePlayPause } = useAudioContext()
    console.log("Post", posts)

    const handlePressShort = function(data: TubeType) {
        if(!defaultProfile) {
            setSelectedData(data);
            router.navigate('/viewShort')
        }
	}

    const handlePressTubeMax = function(data: TubeType) {
        if(!defaultProfile) {
		    setSelectedData(data);
		    router.navigate('/videoViewer')
        }
	}


    useEffect(function() {
        return sound
            ? () => {
                sound.unloadAsync();
            }
        : undefined;
    }, [sound]);

	return (
		<View style={{ paddingVertical: 20 }}>
			{tab == "shorts" && (
                <MasonryFlashList
                    data={posts}
                    numColumns={3}
                    renderItem={({ item } : { item: TubeType }) => (
                        <Pressable style={styles.shortItem} onPress={() => handlePressShort(item)}>
                            <LinearGradient
                                colors={["transparent", "rgba(0, 0, 0, .7)" ]}
                                style={[StyleSheet.absoluteFillObject, { top: "-50%", zIndex: 10 }]}
                            >
                                <View style={styles.shortDetails}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                        <Entypo name="eye" size={24}color={variables.colors.background} />
                                        <Text style={{ fontSize: 16, fontWeight: 600 }}>{countNum(item.views ?? 0)}</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                        <Entypo name="heart" size={24} color={variables.colors.background} />
                                        <Text style={{ fontSize: 16, fontWeight: 600 }}>{countNum(item.views ?? 0)}</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                            <Image
                                style={styles.shortThumbnail}
                                source={item.video.url}
                                contentFit="cover"
                            />
                        </Pressable>
                    )}
                    estimatedItemSize={500}
                />
			)}

			{tab == "tube_max" && (
				<View style={styles.container}>
                    {posts?.map((tube: TubeType) => (
                        <Pressable style={styles.tubeCard} onPress={() => handlePressTubeMax(tube)} key={tube._id}>
                            {/* @ts-ignore */}
                            <Image source={{ uri: tube.thumbnail.url }} style={styles.thumbnail} />
                            
                            <View style={styles.videoInfo}>
                                <Text style={styles.tubeTitle}>
                                    {truncateString(tube.title, 35)}
                                </Text>

                                <Text style={styles.tubeDetails}>
                                    {countNum(tube.views ?? 0)} views{"  "}•{"  "}{countNum(tube.likes ?? 0)} likes{"  "}•{"  "}{formatDateAgo(tube.createdAt)}
                                </Text>

                                <Text style={styles.tubeTimingText}>{durationTimeFormat(tube.video.duration_in_sec || 0)}</Text>
                            </View>
                        </Pressable>
                    ))}
                </View>
			)}

			{tab == "music" && (
				<View style={styles.container}>
                    {posts?.map((music: MusicType) => (
                        <AudioItem
                            key={music._id}
                            data={music}
                            playSound={playSound}
                            isPlaying={isPlaying}
                            currentSongId={currentAudioId}
                            handlePlayPause={handlePlayPause}
                            forProfile={true}
                        />
                    ))}
                </View>
			)}

			{tab == "podcasts" && (
				<View style={styles.container}>
                    {posts?.map((podcast: PodcastType) => (
                        <PodcastItem data={podcast} key={podcast._id} />
                    ))}
                </View>
			)}

			{tab == "images" && (
				<View style={styles.container}>
                    <MasonryFlashList
                        data={posts}
                        numColumns={3}
                        renderItem={({ item } : { item: PicsImageType }) => <ImageItem data={item} view="profile" />}
                        estimatedItemSize={500}
                    />
                </View>
			)}

			{tab == "blogs" && (
				<View style={styles.container}>
                    {posts?.map((post: BlogType) => (
                        <BlogItem data={post} key={post._id} />
                    ))}
                </View>
			)}

			{tab == "books" && (
				<View style={styles.container}>
                    {posts?.map((book: BookType) => (
                        <BookItem data={book} key={book._id} />
                    ))}
                </View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
    },
    shortItem: {
        position: "relative",
        height: 160,
        marginRight: 10,
    },
    shortDetails: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "auto",
        padding: 10
    },
    shortThumbnail: {
        width: "100%",
        height: "100%",
        borderRadius: 4,
    },
    tubeCard: {
		backgroundColor: variables.colors.card,
        flexDirection: "row",
	},
	thumbnail: {
		width: 120,
        height: 120,
        resizeMode: "cover",
        borderRadius: 4
	},
    tubeTimingText: {
        color: variables.colors.text
    },
	videoInfo: {
        paddingTop: 8,
        paddingBottom: 14,
        paddingHorizontal: 10,
        gap: 10
	},
	tubeTitle: {
		fontSize: 14,
		color: variables.colors.text,
		marginBottom: 1,
		lineHeight: 16,
	},
	tubeDetails: {
		fontSize: 12,
		color: variables.colors.textSecondary,
	},
})