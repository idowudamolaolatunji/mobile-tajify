import variables from '@/constants/variables'
import React from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

function Music() {
  const renderMusicCards = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { fontFamily: 'Outfit_600SemiBold' }]}>
        Music
      </Text>
      {[
        { title: "Best Asake", image: "https://picsum.photos/200/200?random=1" },
        { title: "Song Title 2", image: "https://picsum.photos/200/200?random=2" },
        { title: "Song Title 3", image: "https://picsum.photos/200/200?random=3" },
      ].map((item, index) => (
        <TouchableOpacity key={index} style={styles.musicItem}>
          <Image
            source={{ uri: item.image }}
            style={styles.musicImage}
          />
          <View style={styles.musicInfo}>
            <Text style={[styles.musicTitle, { fontFamily: 'Outfit_500Medium' }]}>
              {item.title}
            </Text>
          </View>
          <TouchableOpacity style={styles.downloadButton}>
            <Ionicons name="download" size={24} color={variables.colors.primary} />
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

  return (
    <ScrollView >
      {renderMusicCards()} 
      {renderTrendingPlaylist()}
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
     color: '#FFF'
  },
  musicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: variables.colors.border,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  musicImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  musicInfo: {
    flex: 1,
    marginLeft: 8,
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
});

export default Music

