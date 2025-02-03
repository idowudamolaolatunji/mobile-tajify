import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

interface AudioPlayerProps {
  currentTrack: string | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  artwork: string | null;
  title: string | null;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ currentTrack, isPlaying, onPlayPause, artwork, title }) => {
  return (
    <View style={styles.container}>
      {currentTrack && (
        <>
          <Image source={{ uri: artwork }} style={styles.artwork} />
          <View style={styles.info}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onPlayPause}>
              <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333',
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 10,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default AudioPlayer; 