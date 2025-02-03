import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player';
import { Ionicons } from '@expo/vector-icons';
import { variables } from '@/constants/variables';
import { setupPlayer, playTrack, pauseTrack } from '@/services/trackPlayerService';

function SingleMusic() {
  const params = useLocalSearchParams();
  const track = params.track ? JSON.parse(params.track as string) : null;
  const playbackState = usePlaybackState();
  const { position, duration } = useProgress();
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();
      setIsPlayerReady(isSetup);
    }

    setup();

    return () => {
      TrackPlayer.reset();
    };
  }, []);

  const togglePlayback = async () => {
    if (!isPlayerReady) return;

    try {
      if (playbackState === State.Playing) {
        await pauseTrack();
      } else {
        await playTrack();
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  if (!track) return null;

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: track.artwork || 'https://via.placeholder.com/300' }} 
        style={styles.artwork} 
      />
      <Text style={styles.title}>{track.title}</Text>
      <Text style={styles.artist}>{track.artist || 'Unknown Artist'}</Text>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => TrackPlayer.seekTo(position - 15)}>
          <Ionicons name="play-back" size={40} color={variables.colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={togglePlayback}>
          <Ionicons 
            name={playbackState === State.Playing ? "pause-circle" : "play-circle"} 
            size={60} 
            color={variables.colors.primary} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => TrackPlayer.seekTo(position + 15)}>
          <Ionicons name="play-forward" size={40} color={variables.colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  artwork: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  artist: {
    fontSize: 18,
    color: '#AAA',
    marginBottom: 30,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default SingleMusic;
