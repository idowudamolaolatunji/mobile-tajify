import variables from '@/constants/variables'
import React from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

function Radio() {
  const renderRadioStations = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { fontFamily: 'Outfit_600SemiBold' }]}>
        Radio Stations
      </Text>
      {[
        { title: "Station 1", image: "https://picsum.photos/200/200?random=1" },
        { title: "Station 2", image: "https://picsum.photos/200/200?random=2" },
        { title: "Station 3", image: "https://picsum.photos/200/200?random=3" },
      ].map((item, index) => (
        <TouchableOpacity key={index} style={styles.radioItem}>
          <Image
            source={{ uri: item.image }}
            style={styles.radioImage}
          />
          <View style={styles.radioInfo}>
            <Text style={[styles.radioTitle, { fontFamily: 'Outfit_500Medium' }]}>
              {item.title}
            </Text>
          </View>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={24} color={variables.colors.primary} />
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
      {renderRadioStations()} 
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
    color: 'white'
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: variables.colors.border,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  radioImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  radioInfo: {
    flex: 1,
    marginLeft: 8,
  },
  radioTitle: {
    color: variables.colors.text,
    fontSize: 16,
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

export default Radio
