import React, { useState } from 'react'
import { unknownAudioImageUri } from '@/constants/images';
import { typography } from '@/constants/typography';
import variables from '@/constants/variables';
import { formatDateAgo, truncateString } from '@/utils/helper';
import {  Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { PodcastType } from '@/types/type';
import { useRouter } from 'expo-router';
import { useAudioContext } from '@/context/AudioContext';


export default function PodcastItem({ data } : PodcastType | any) {
	const router = useRouter()
    const { currentEpsParent, currentAudioType } = useAudioContext();
    const isActive = currentAudioType == "podcast" && currentEpsParent?._id == data?._id

    return (
        <TouchableHighlight onPress={() => router.navigate("/podcastEpisodes")}>
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
                        <Text style={[styles.audioTitle, { color: isActive ? variables.colors.primary : variables.colors.text } ]}>{truncateString(data?.name, 30)}</Text>
                        <Text numberOfLines={2} style={styles.description}>
                            {truncateString(data.description, 80)}
                        </Text>
                        <Text style={[styles.episodes, { color: isActive ? variables.colors.primaryTint2 : variables.colors.primary }]}>
                            {data.episodes.length || 0} Episodes
                        </Text>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ color: variables.colors.bgLight, fontSize: 12, marginTop: 4 }}>
                                Last Updated {formatDateAgo(data.updatedAt ? data.updatedAt : data.createdAt)}
                            </Text>

                            {isActive && <Text style={{ color: variables.colors.primary, fontSize: 11, marginBottom: -5 }}>Current Podcast</Text>}
                        </View>
                    </View>

                </View>
            </View>
        </TouchableHighlight>
    );
}


const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        backgroundColor: variables.colors.card,
        alignItems: "flex-start",
        padding: 7,
        borderRadius: 8,
        marginBottom: 15,
        gap: 10,
    },
    audioImage: {
        width: 85,
        height: 90,
        borderRadius: 8
    },
    audioTitle: {
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

    episodes: {
        fontSize: 13
    }
})
