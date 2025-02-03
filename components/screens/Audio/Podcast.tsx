import variables from '@/constants/variables'
import React from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import musicData from '@/assets/data/library.json'
import { Audio } from 'expo-av'

function Podcast({ onNavigateToMusic }: { onNavigateToMusic?: () => void }) {
  const [sound, setSound] = React.useState<Audio.Sound | null>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentTrack, setCurrentTrack] = React.useState<string | null>(null)

  const playSound = async (url: string) => {
    if (sound) {
      await sound.unloadAsync()
    }
    const { sound: newSound } = await Audio.Sound.createAsync({ uri: url })
    setSound(newSound)
    setCurrentTrack(url)
    await newSound.playAsync()
    setIsPlaying(true)
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
      playSound(url)
    }
  }

  const handleNavigateToMusic = () => {
    pauseSound();
    onNavigateToMusic();
  }

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

  const renderTopPodcasts = () => (
    <View style={styles.section}>    
      <Text style={{ color: variables.colors.text }}>Top Podcast </Text>
      <Text style={[styles.sectionTitle, { fontFamily: 'Outfit_600SemiBold' }]}>
        Top Podcasts
      </Text>
      {musicData.map((item, index) => (
        <TouchableOpacity key={index} style={styles.podcastItem} onPress={() => togglePlayPause(item.url)}>
          <Image
            source={{ uri: item.artwork }}
            style={styles.podcastImage}
          />
          <View style={styles.podcastInfo}>
            <Text style={[styles.podcastTitle, { fontFamily: 'Outfit_500Medium' }]}>
              {item.title}
            </Text>
            <Text style={[styles.podcastDate, { fontFamily: 'Outfit_400Regular' }]}>
              Last Updated Nov 27, 2024
            </Text>
          </View>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name={isPlaying && currentTrack === item.url ? "pause" : "play"} size={24} color={variables.colors.primary} />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView >
    <View>
      <Text style={{ color: variables.colors.text }}>Trending Playlist</Text>
      {renderTrendingPlaylist()}
      {renderTopPodcasts()}
      
      
    </View>
    <TouchableOpacity onPress={handleNavigateToMusic}>
      <Text style={{ color: variables.colors.primary }}>Go to Music</Text>
    </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  podcastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: variables.colors.border,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  podcastImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  podcastInfo: {
    flex: 1,
    marginLeft: 8,
  },
  podcastTitle: {
    color: variables.colors.text,
    fontSize: 16,
  },
  podcastDate: {
    color: variables.colors.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  playButton: {
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
});

export default Podcast
