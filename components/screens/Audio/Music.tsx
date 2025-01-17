import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const MusicScreen = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  
  const musicTracks = [
    {
      id: 1,
      title: 'Sunset Melody',
      artist: 'Emma Harmony',
      album: 'Twilight Sounds',
      duration: '3:45',
      image: 'https://example.com/music1.jpg',
      audioUrl: 'https://example.com/music1.mp3'
    },
    {
      id: 2,
      title: 'Urban Rhythm',
      artist: 'Mike Beats',
      album: 'City Vibes',
      duration: '4:12',
      image: 'https://example.com/music2.jpg',
      audioUrl: 'https://example.com/music2.mp3'
    },
    {
      id: 3,
      title: 'Ocean Waves',
      artist: 'Sarah Calm',
      album: 'Relaxation',
      duration: '5:30',
      image: 'https://example.com/music3.jpg',
      audioUrl: 'https://example.com/music3.mp3'
    }
  ];

  const handlePlayPause = function(track: any) {
    setCurrentTrack(currentTrack?.id === track.id ? null : track);
    // Implement audio playback logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Library</Text>
      <ScrollView>
        {musicTracks.map((track) => (
          <View key={track.id} style={styles.trackItem}>
            <Image source={{ uri: track.image }} style={styles.trackImage} />
            <View style={styles.trackDetails}>
              <Text style={styles.trackTitle}>{track.title}</Text>
              <Text style={styles.trackArtist}>{track.artist}</Text>
              <Text style={styles.trackAlbum}>{track.album}</Text>
              <View style={styles.trackActions}>
                <Text style={styles.trackDuration}>{track.duration}</Text>
                <TouchableOpacity 
                  style={styles.playButton} 
                  onPress={() => handlePlayPause(track)}
                >
                  <Ionicons 
                    name={currentTrack?.id === track.id ? 'pause' : 'play'} 
                    size={25} 
                    color="#ffffff" 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {currentTrack && (
        <View style={styles.nowPlayingBar}>
          <Image source={{ uri: currentTrack.image }} style={styles.nowPlayingImage} />
          <View style={styles.nowPlayingDetails}>
            <Text style={styles.nowPlayingTitle}>{currentTrack.title}</Text>
            <Text style={styles.nowPlayingArtist}>{currentTrack.artist}</Text>
          </View>
          <TouchableOpacity style={styles.nowPlayingControls}>
            <Ionicons name="play" size={30} color="#ffffff" />
            <Ionicons name="pause" size={30} color="#ffffff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15
  },
  trackItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginBottom: 15,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  trackImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15
  },
  trackDetails: {
    flex: 1,
    justifyContent: 'center'
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  trackArtist: {
    fontSize: 14,
    color: '#666'
  },
  trackAlbum: {
    fontSize: 12,
    color: '#999'
  },
  trackActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  trackDuration: {
    fontSize: 12,
    color: '#666'
  },
  playButton: {
    backgroundColor: '#007bff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nowPlayingBar: {
    flexDirection: 'row',
    backgroundColor: '#333',
    padding: 10,
    alignItems: 'center'
  },
  nowPlayingImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10
  },
  nowPlayingDetails: {
    flex: 1
  },
  nowPlayingTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  nowPlayingArtist: {
    color: '#cccccc',
    fontSize: 12
  },
  nowPlayingControls: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default MusicScreen;
