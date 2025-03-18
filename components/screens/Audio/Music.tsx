import React, { useEffect, useState } from 'react'
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import variables from '@/constants/variables';
import { typography } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';
import AudioItem from '@/components/layouts/AudioItem';
import { AVPlaybackStatus } from 'expo-av';
import NoItem from '@/components/layouts/NoItem';
// import { musics } from "@/utils/data"
import { MusicType } from '@/types/type';
import { useAudioContext } from '@/context/AudioContext';
import Spinner from '@/components/elements/Spinner';
import { useAuth } from '@/context/AuthContext';
import { useFetchedContext } from '@/context/FetchedContext';


const API_URL = `https://api-tajify.koyeb.app/api`;

export default function Music() {
    const { handleFetchMusics, loader, musics } = useFetchedContext();
    const { sound, isPlaying, currentAudioId, playSound, handlePlayPause } = useAudioContext()
    const [position, setPosition] = useState<number>(0);
    const [duration, setDuration] = useState<number>(1);

    // const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const handleRefreshing = function() {
        setRefreshing(true);
        handleFetchMusics();
        setRefreshing(false);
    }
    
    const searchedResult = musics?.filter((item: MusicType) => {
        return item.title.toLowerCase().includes(searchQuery.toLowerCase())
    });

    const data = searchQuery ? searchedResult : musics;
    
    useEffect(function() {
        if(musics.length < 1) {
            handleFetchMusics();
        }
    }, [])
    
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

  
    // 
    const handleSeek = async function (value: number) {
        if (sound) {
            await sound.setPositionAsync(value);
            setPosition(value);
        }
    };

    if (loader) return <Spinner />;


  return (
    <ScrollView style={{ marginBottom: 50 }} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" nestedScrollEnabled={true} refreshControl={
        <RefreshControl onRefresh={handleRefreshing} refreshing={refreshing} />
    }>
        <Text style={[ typography.h4, { color: variables.colors.text, marginBottom: 10 } ]}>Music</Text>

        <View style={styles.topBar}>
            <View style={styles.inpupBox}>
                <Ionicons name="search" size={20} color="#ccc" />
                <TextInput style={{ color: "#fff", fontSize: 16, fontWeight: "500", width: searchQuery.length > 0 ? "75%" : "100%" }} placeholder="Search For Song!" keyboardType="default" value={searchQuery} onChangeText={setSearchQuery} placeholderTextColor={variables.colors.bgLight} />
            </View>

            {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery("")}>
                <Text style={{ fontSize: 18, color: "#b70f0f", fontWeight: 600 }}>Cancel</Text>
            </Pressable>
            )}
        </View>

        {(data.length > 0) ?
            data.map((music: MusicType) => (
                <AudioItem
                    key={music._id}
                    data={music}
                    playSound={playSound}
                    isPlaying={isPlaying}
                    currentSongId={currentAudioId}
                    handlePlayPause={handlePlayPause}
                />
            )) : (
                <NoItem title={searchQuery ? `music for with the title "${searchQuery}" was` : "music"} />
            )
        }
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    topBar: {
        marginBottom: 15, 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    inpupBox: {
        backgroundColor: "rgba(40, 40, 40, 0.5)",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 6
    },
})