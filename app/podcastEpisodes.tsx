import React, { useEffect, useState } from 'react'
import { FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import BackButton from '../components/elements/BackButton'
import { unknownUserImageUri } from '@/constants/images'
import { EpisodeType, PodcastType } from '@/types/type'
import { podcasts } from "@/utils/data";
import variables from '@/constants/variables'
import { typography } from '@/constants/typography'
import NoItem from '../components/layouts/NoItem'
import EpisodeItem from '../components/layouts/EpisodeItem'
import FloatingPlayer from '@/components/layouts/FloatingPlayer'
import FollowButton from '@/components/elements/FollowButton'
import { formatDateAgo } from '@/utils/helper'
import { useAudioContext } from '@/context/AudioContext'
import { AVPlaybackStatus } from 'expo-av'
import { useDataContext } from '@/context/DataContext'


export default function PodcastEpisodes() {
    const { selectedData: data } : { selectedData: PodcastType } = useDataContext()
    const { sound, isPlaying, currentAudioId, playSound, handlePlayPause } = useAudioContext();
    
    const [loader, setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [position, setPosition] = useState<number>(0);
    const [duration, setDuration] = useState<number>(1);


    useEffect(function() {
        return sound
            ? () => {
                sound.unloadAsync();
            }
        : undefined;
    }, [sound]);

    
    useEffect(function() {
        let interval: NodeJS.Timeout | null = null;
    
        if (sound && isPlaying) {
            interval = setInterval(async () => {
            const status = (await sound.getStatusAsync()) as AVPlaybackStatus;
            if (status.isLoaded && !status.didJustFinish) {
                setPosition(status.positionMillis);
                setDuration(status.durationMillis || 1);
            }
            }, 500);
        }
    
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [sound, isPlaying]);


    const handleRefreshing = function() {}


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" nestedScrollEnabled={true} refreshControl={
                <RefreshControl onRefresh={handleRefreshing} refreshing={refreshing} />
            }>
                <BackButton showText />

                <View style={styles.topContainer}>
                    <Image
                        source={{ uri: data?.coverImage.url ? data?.coverImage.url : unknownUserImageUri }}
                        style={{...styles.image }}
                    />

                    <Text style={[typography.h3, { color: variables.colors.text }]}>{data.name}</Text>
                    <Text style={[typography.h4, { color: variables.colors.bgLight }]}>{data.creatorProfile?.profileName ?? "Unknown Creator"}</Text>

                    <FollowButton name={data.creatorProfile?.profileName} customStyle={{ marginVertical: 5, marginHorizontal: "auto" }} id={data.creatorProfile._id} />

                    <Text numberOfLines={2} style={styles.description}>{data.description}</Text>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <Text style={{ color: variables.colors.primary, fontSize: 12 }}>
                            Eps: {data.episodes.length || 0} Episode{data.episodes.length > 1 ? "s" : ""}{"  "}•{"  "}Last Updated: {formatDateAgo(data.createdAt)}
                        </Text>
                    </View>
                </View>

                {(data.episodes.length > 0) ? 
                    data.episodes.map((episode: EpisodeType, index: number) => (
                        <EpisodeItem
                            key={index}
                            data={episode}
                            playSound={playSound}
                            isPlaying={isPlaying}
                            currentAudioId={currentAudioId}
                            handlePlayPause={handlePlayPause}
                            parentPodcast={data}
                        />
                    )) : (
                        <NoItem title={`episodes in this podcast`} />
                    )
                }
            </ScrollView>

            <FloatingPlayer emptyText={`Select episode!`} />
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        position: "relative",
        backgroundColor: variables.colors.background,
        paddingHorizontal: 14,
        paddingTop: 40,
        flex: 1
    },
    topContainer: {
        flexDirection: "column",
        gap: 3,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 40,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginBottom: 10
    },
    description: {
        textAlign: "center",
        marginTop: 4,
        color: variables.colors.bgLight,
        lineHeight: 17,
        marginBottom: 4
    },
})