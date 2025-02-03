import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

interface SingleMusicScreenProps {
  track: {
    url: string;
    title: string;
    artwork: string;
  };
  isPlaying: boolean;
  onPlayPause: () => void;
}

const SingleMusicScreen: React.FC<SingleMusicScreenProps> = ({ track, isPlaying, onPlayPause }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: track.artwork }} style={styles.artwork} />
      <Text style={styles.title}>{track.title}</Text>
      <TouchableOpacity onPress={onPlayPause}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={48} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  artwork: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    marginBottom: 20,
  },
});

export default SingleMusicScreen; 