import React, { useState } from 'react'
import { unknownAudioImageUri } from '@/constants/images';
import { typography } from '@/constants/typography';
import variables from '@/constants/variables';
import { truncateString } from '@/utils/helper';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { MusicType } from '@/types/type';
import { useAudioContext } from '@/context/AudioContext';



interface Props {
    data: MusicType | any;
    playSound: any;
    isPlaying: boolean;
    currentSongId: string;
    handlePlayPause: Function;
}

export default function AudioItem({ data, playSound, isPlaying, currentSongId, handlePlayPause } : Props) {
    const { setCurrentAudioType } = useAudioContext()
    const [loader, setLoader] = useState(false);
    const isActive = currentSongId === data._id;

    const handleToggleMusic = function() {
        setCurrentAudioType("music")

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
            <View>
                <Image
                    source={{ uri: data?.coverImage.url ? data?.coverImage.url : unknownAudioImageUri }}
                    style={{...styles.audioImage, opacity: isActive ? 0.6 : 1 }}
                />
            </View>

            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <View style={{ width: "100%" }}>
                    <Text style={[styles.audioTitle, { color: isActive ? variables.colors.primary : variables.colors.text } ]}>{truncateString(data?.title, 30)}</Text>
                    <Text numberOfLines={1} style={styles.audioArtistText}>
                        {data?.creator?.profileName || "Unkwown Creator"}
                    </Text>
                </View>
            </View>


            <View>
                {loader && <ActivityIndicator />}
                {!loader && (
                    <Ionicons
                        style={styles.audioPausedIndicator}
                        name={isActive && isPlaying ? "pause" : "play"}
                        size={24}
                        color="#fff"
                    />
                )}
            </View>
        </View>
    </TouchableHighlight>
  )
}



const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        backgroundColor: variables.colors.card,
        alignItems: "center",
        padding: 7,
        borderRadius: 8,
        marginBottom: 10,
        gap: 10,
    },
    audioImage: {
        width: 50,
        height: 50,
        borderRadius: 8
    },
    audioTitle: {
        ...typography.paragraphBg,
        color: variables.colors.text,
        maxWidth: "90%"
    },
    audioArtistText: {
        marginTop: 4,
        color: variables.colors.bgLight
    },

    //////////////////////////////
    audioPlayingIconIndicator: {
        width: 16,
		height: 16,
    },
    audioPausedIndicator: {},
})
