// import variables from '@/constants/variables'
// import React from 'react'
// import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
// import { Ionicons } from '@expo/vector-icons'

// function Music() {
//   const renderMusicCards = () => (
//     <View style={styles.section}>
//       <Text style={[styles.sectionTitle, { fontFamily: 'Outfit_600SemiBold' }]}>
//         Music
//       </Text>
//       {[
//         { title: "Best Asake", image: "https://picsum.photos/200/200?random=1" },
//         { title: "Song Title 2", image: "https://picsum.photos/200/200?random=2" },
//         { title: "Song Title 3", image: "https://picsum.photos/200/200?random=3" },
//       ].map((item, index) => (
//         <TouchableOpacity key={index} style={styles.musicItem}>
//           <Image
//             source={{ uri: item.image }}
//             style={styles.musicImage}
//           />
//           <View style={styles.musicInfo}>
//             <Text style={[styles.musicTitle, { fontFamily: 'Outfit_500Medium' }]}>
//               {item.title}
//             </Text>
//           </View>
//           <TouchableOpacity style={styles.downloadButton}>
//             <Ionicons name="download" size={24} color={variables.colors.primary} />
//           </TouchableOpacity>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );

//   const renderTrendingPlaylist = () => (
//     <View style={styles.section}>
//       <Text style={[styles.sectionTitle, { fontFamily: 'Outfit_600SemiBold' }]}>
//         Trending Playlist
//       </Text>
//       <ScrollView 
//         horizontal 
//         showsHorizontalScrollIndicator={false}
//         style={styles.playlistContainer}
//       >
//         {[1, 2, 3].map((item) => (
//           <TouchableOpacity key={item} style={styles.playlistCard}>
//             <Image
//               source={{ uri: 'https://picsum.photos/400/400?random=' + item }}
//               style={styles.playlistImage}
//             />
//             <Text style={[styles.playlistTitle, { fontFamily: 'Outfit_500Medium' }]}>
//               Egeswan
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   );

//   return (
//     <ScrollView >
//       {renderMusicCards()} 
//       {renderTrendingPlaylist()}
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   section: {
//     marginTop: 16,
   
//   },
//   sectionTitle: {
//     fontSize: 20,
//     marginBottom: 8,
//      color: '#FFF'
//   },
//   musicItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // backgroundColor: variables.colors.border,
//     borderRadius: 8,
//     padding: 8,
//     marginBottom: 8,
//   },
//   musicImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 4,
//   },
//   musicInfo: {
//     flex: 1,
//     marginLeft: 8,
//   },
//   musicTitle: {
//     color: variables.colors.text,
//     fontSize: 16,
//   },
//   downloadButton: {
//     padding: 8,
//   },
//   playlistContainer: {
//     marginTop: 16,
//   },
//   playlistCard: {
//     marginRight: 16,
//   },
//   playlistImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 8,
//   },
//   playlistTitle: {
//     color: variables.colors.text,
//     fontSize: 16,
//     marginTop: 8,
//   },
// });

// export default Music


import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import TrackPlayer, { usePlaybackState, useProgress } from 'react-native-track-player';
import { Ionicons } from '@expo/vector-icons';
import { variables } from '@/constants/variables';

const musicData = [
  {
    url: "https://audio.jukehost.co.uk/vTRYaTEbpaYRCxiWGgL2S91mnOuMKfLw",
    title: "Guess I'll Never Know",
    artist: "TrackTribe",
    artwork: "https://f4.bcbits.com/img/a3736661212_65",
    playlist: ["Chill 🌱"],
  },
  {

    url: "https://audio.jukehost.co.uk/priWy2vYsWODmQiM6KevNYVLpPJGPZGd",
    title: "Memories",
    playlist: ["Instrumental 🎵"],
  },
];

function Music() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const playbackState = usePlaybackState();
  const { position, duration } = useProgress();

  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(musicData);
    };
    setupPlayer();

    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  const playTrack = async (track) => {
    setCurrentTrack(track);
    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: track.url,
      url: track.url,
      title: track.title,
      artist: track.artist || 'Unknown Artist',
      artwork: track.artwork || 'https://via.placeholder.com/150',
    });
    TrackPlayer.play();
  };

  const togglePlayback = async () => {
    if (playbackState === TrackPlayer.STATE_PLAYING) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const renderMusicCards = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { fontFamily: 'Outfit_600SemiBold' }]}>Music</Text>
      {musicData.map((track, index) => (
        <TouchableOpacity
          key={index}
          style={styles.musicItem}
          onPress={() => playTrack(track)}
        >
          <Image
            source={{ uri: track.artwork || 'https://via.placeholder.com/150' }}
            style={styles.musicImage}
          />
          <View style={styles.musicInfo}>
            <Text style={[styles.musicTitle, { fontFamily: 'Outfit_500Medium' }]}>
              {track.title}
            </Text>
            <Text style={[styles.musicArtist, { fontFamily: 'Outfit_400Regular' }]}>
              {track.artist || 'Unknown Artist'}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderPlayerControls = () => (
    <View style={styles.playerControls}>
      <TouchableOpacity onPress={() => TrackPlayer.seekTo(position - 10)}>
        <Ionicons name="play-back" size={32} color={variables.colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={togglePlayback}>
        <Ionicons
          name={playbackState === TrackPlayer.STATE_PLAYING ? "pause" : "play"}
          size={32}
          color={variables.colors.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => TrackPlayer.seekTo(position + 10)}>
        <Ionicons name="play-forward" size={32} color={variables.colors.primary} />
      </TouchableOpacity>
    </View>
  );

  const renderProgressBar = () => (
    <View style={styles.progressBar}>
      <Text style={styles.progressTime}>{formatTime(position)}</Text>
      <View style={styles.progressContainer}>
        <View
          style={[styles.progressFilled, { width: `${(position / duration) * 100}%` }]}
        />
      </View>
      <Text style={styles.progressTime}>{formatTime(duration)}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderMusicCards()}
      {currentTrack && (
        <View style={styles.player}>
          <Image
            source={{ uri: currentTrack.artwork || 'https://via.placeholder.com/150' }}
            style={styles.playerArtwork}
          />
          <Text style={[styles.playerTitle, { fontFamily: 'Outfit_600SemiBold' }]}>
            {currentTrack.title}
          </Text>
          <Text style={[styles.playerArtist, { fontFamily: 'Outfit_400Regular' }]}>
            {currentTrack.artist || 'Unknown Artist'}
          </Text>
          {renderProgressBar()}
          {renderPlayerControls()}
        </View>
      )}
    </ScrollView>
  );
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  section: { marginTop: 16 },
  sectionTitle: { fontSize: 20, color: '#FFF', marginBottom: 8 },
  musicItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  musicImage: { width: 50, height: 50, borderRadius: 4 },
  musicInfo: { marginLeft: 8, flex: 1 },
  musicTitle: { fontSize: 16, color: '#FFF' },
  musicArtist: { fontSize: 14, color: '#AAA' },
  player: { alignItems: 'center', marginTop: 24 },
  playerArtwork: { width: 200, height: 200, borderRadius: 8 },
  playerTitle: { fontSize: 20, color: '#FFF', marginTop: 16 },
  playerArtist: { fontSize: 16, color: '#AAA', marginBottom: 16 },
  playerControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%', marginTop: 16 },
  progressBar: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  progressContainer: { flex: 1, height: 4, backgroundColor: '#555', borderRadius: 2, marginHorizontal: 8 },
  progressFilled: { height: '100%', backgroundColor: variables.colors.primary },
  progressTime: { color: '#FFF', fontSize: 12 },
});

export default Music;
