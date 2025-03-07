import React, { useState } from 'react'
import { unknownAudioImageUri } from '@/constants/images';
import { typography } from '@/constants/typography';
import variables from '@/constants/variables';
import { durationTimeFormat, formatDateAgo, truncateString } from '@/utils/helper';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { EpisodeType, PodcastType } from '@/types/type';
import { useAudioContext } from '@/context/AudioContext';


interface Props {
    data: EpisodeType | any;
    playSound: any;
    isPlaying: boolean;
    currentAudioId: string;
    handlePlayPause: Function;
    parentPodcast?: PodcastType;
}


export default function EpisodeItem({ data, playSound, isPlaying, currentAudioId, handlePlayPause, parentPodcast } : Props) {
    const { setCurrentAudioType, setParent } = useAudioContext();
    const [loader, setLoader] = useState(false);
    const isActive = currentAudioId === data._id;

    const handleToggleMusic = function() {
        setCurrentAudioType("podcast");
        setParent(parentPodcast);

        if(isActive) {
            handlePlayPause()
        } else {
            setLoader(true)
            playSound(data)
            setTimeout(() => {
                setLoader(false)
            }, 1000);
        }
    }


  return (
    <TouchableHighlight onPress={handleToggleMusic} key={data._id}>
        <View style={styles.itemContainer}>
            <View style={styles.itemTop}>
                <View>
                    <Image
                        source={{ uri: parentPodcast?.coverImage.url ? parentPodcast?.coverImage.url : unknownAudioImageUri }}
                        style={{...styles.image, opacity: isActive ? 0.6 : 1 }}
                    />
                </View>

                <View style={{ width: "100%" }}>
                    <Text style={[styles.title, { color: isActive ? variables.colors.primary : variables.colors.text } ]}>{truncateString(data?.title, 40)}</Text>
                </View>
            </View>

            <Text numberOfLines={2} style={styles.description}>{data.description}</Text>

            <View style={styles.itemBottom}>
                <View>
                    <Text style={{ color: variables.colors.text }}>{formatDateAgo(data?.addedDate)}{"  "}•{"  "}{durationTimeFormat(data?.duration_in_sec)}</Text>
                </View>

                <View>
                    {loader && <ActivityIndicator />}
                    {!loader && (
                        <Ionicons
                            style={styles.audioPausedIndicator}
                            name={isActive && isPlaying ? "pause" : "play"}
                            size={28}
                            color="#fff"
                        />
                    )}
                </View>
            </View>
        </View>
    </TouchableHighlight>
  )
}



const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: variables.colors.card,
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    itemTop: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 8
    },
    title: {
        ...typography.paragraphBg,
        color: variables.colors.text,
        maxWidth: "90%"
    },
    description: {
        marginTop: 4,
        color: variables.colors.bgLight,
        lineHeight: 17,
        marginBottom: 10
    },
    audioArtistText: {
        marginTop: 4,
        color: variables.colors.bgLight
    },
    itemBottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    //////////////////////////////
    audioPlayingIconIndicator: {
        width: 16,
		height: 16,
    },
    audioPausedIndicator: {},
})
