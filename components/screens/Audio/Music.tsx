import variables from '@/constants/variables'
import React, { useState, useEffect, useRef } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator, TextInput, Animated } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import musicData from '@/assets/data/library.json'
import { Audio } from 'expo-av'
import Icon from 'react-native-vector-icons/Ionicons'; 

function Music({ onNavigateToPodcast }: { onNavigateToPodcast: () => void }) {
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentStation, setCurrentStation] = useState<{ name: string; genre: string; image: string } | null>(null)
  const [currentPlaybackPosition, setCurrentPlaybackPosition] = useState('0:00')
  const [trackDuration, setTrackDuration] = useState('0:00')

  const animation = useRef(new Animated.Value(0)).current

  const filteredMusicData = musicData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  
  useEffect(() => {
    if (currentStation) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [currentStation]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const playSound = async (url: string, stationDetails: { name: string; genre: string; image: string }) => {
    if (sound) {
      await sound.unloadAsync()
    }
    setLoading(true)
    const { sound: newSound } = await Audio.Sound.createAsync({ uri: url })
    setSound(newSound)
    setCurrentTrack(url)
    setCurrentStation(stationDetails)
    await newSound.playAsync()
    setIsPlaying(true)
    setLoading(false)

    newSound.setOnPlaybackStatusUpdate(status => {
      if (status.isLoaded) {
        const position = status.positionMillis;
        const duration = status.durationMillis;
        setCurrentPlaybackPosition(formatTime(position));
        setTrackDuration(formatTime(duration));
      }
    });

    newSound.setOnPlaybackStatusUpdate(status => {
      if (status.didJustFinish) {
        const currentIndex = filteredMusicData.findIndex(item => item.url === currentTrack);
        if (currentIndex < filteredMusicData.length - 1) {
          playSound(filteredMusicData[currentIndex + 1].url, { name: filteredMusicData[currentIndex + 1].title, genre: filteredMusicData[currentIndex + 1].genre, image: filteredMusicData[currentIndex + 1].artwork });
        }
      }
    });
  }

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync()
      setIsPlaying(false)
    }
  }

  const togglePlayPause = (url: string) => {
    if (currentTrack === url && isPlaying) {
      pauseSound()
    } else {
      playSound(url, { name: '', genre: '', image: '' })
    }
  }

  const handleNavigateToPodcast = () => {
    pauseSound()
    onNavigateToPodcast()
  }

  const renderMusicCards = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { fontFamily: 'Outfit_600SemiBold' }]}>
        Music
      </Text>
      {filteredMusicData.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={[
            styles.musicItem, 
            currentTrack === item.url && isPlaying ? styles.currentlyPlaying : null
          ]} 
          onPress={() => togglePlayPause(item.url)}
        >
          <Image
            source={{ uri: item.artwork }}
            style={styles.musicImage}
          />
          <View style={styles.musicInfo}>
            <Text style={[styles.musicTitle, { fontFamily: 'Outfit_500Medium' }]}>
              {item.title}
            </Text>
            {currentTrack === item.url && loading && (
              <ActivityIndicator size="small" color={variables.colors.primary} />
            )}
          </View>
          <TouchableOpacity style={styles.downloadButton}>
            <Ionicons name={isPlaying && currentTrack === item.url ? "pause" : "play"} size={24} color={variables.colors.primary} />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTrendingPlaylist = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { fontFamily: 'Outfit_600SemiBold' }]}>
        Trending Playlist
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.playlistContainer}
      >
        {[1, 2, 3].map((item) => (
          <TouchableOpacity key={item} style={styles.playlistCard}>
            <Image
              source={{ uri: 'https://picsum.photos/400/400?random=' + item }}
              style={styles.playlistImage}
            />
            <Text style={[styles.playlistTitle, { fontFamily: 'Outfit_500Medium' }]}>
              Egeswan
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  
  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <ScrollView>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for music..."
        placeholderTextColor="#AAA"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {renderMusicCards()} 
      {renderTrendingPlaylist()}
      {currentStation && currentStation.image && (
        <Animated.View style={[styles.nowPlayingBar, { transform: [{ translateX }] }]}>
          <Image source={{ uri: currentStation.image }} style={styles.nowPlayingImage} />
          <View style={styles.nowPlayingDetails}>
            <Text style={styles.nowPlayingName}>{currentStation.name}</Text>
            <Text style={styles.nowPlayingGenre}>{currentStation.genre}</Text>
            <Text style={styles.nowPlayingDuration}>
              {currentPlaybackPosition} / {trackDuration}
            </Text>
          </View>
          <TouchableOpacity style={styles.nowPlayingControls} onPress={pauseSound}>
            <Icon name="stop" size={30} color="#ffffff" />
          </TouchableOpacity>
        </Animated.View>
      )}
      <TouchableOpacity onPress={handleNavigateToPodcast}>
        {/* <Text style={{ color: variables.colors.primary }}>Go to Podcast</Text> */}
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#FFF',
    color: '#000',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  musicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  currentlyPlaying: {
    backgroundColor: '#444',
    transform: [{ translateY: 5 }],
  },
  musicImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  musicInfo: {
    flex: 1,
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicTitle: {
    color: variables.colors.text,
    fontSize: 16,
  },
  downloadButton: {
    padding: 8,
  },
  playlistContainer: {
    marginTop: 16,
  },
  playlistCard: {
    marginRight: 16,
  },
  playlistImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  playlistTitle: {
    color: variables.colors.text,
    fontSize: 16,
    marginTop: 8,
  },
  nowPlayingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 5,
    margin: 10,
  },
  nowPlayingImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  nowPlayingDetails: {
    flex: 1,
    marginLeft: 10,
  },
  nowPlayingName: {
    color: '#ffffff',
    fontSize: 16,
  },
  nowPlayingGenre: {
    color: '#cccccc',
    fontSize: 12,
  },
  nowPlayingControls: {
    padding: 10,
  },
  nowPlayingDuration: {
    color: '#cccccc',
    fontSize: 12,
  },
});

export default Music


