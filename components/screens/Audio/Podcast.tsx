import variables from '@/constants/variables'
import React from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

function Podcast() {
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
      {[
        { title: "Timini Egbuson Podcast", image: "https://picsum.photos/200/200?random=10" },
        { title: "Money Browser", image: "https://picsum.photos/200/200?random=11" },
        { title: "Acai Born Gosto Podcast", image: "https://picsum.photos/200/200?random=12" },
        { title: "The Honest Brunch", image: "https://picsum.photos/200/200?random=13" },
        { title: "Revolution now or Never?", image: "https://picsum.photos/200/200?random=14" }
      ].map((item, index) => (
        <TouchableOpacity key={index} style={styles.podcastItem}>
          <Image
            source={{ uri: item.image }}
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
            <Ionicons name="play" size={24} color={variables.colors.primary} />
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
