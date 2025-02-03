import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  TextInput,
  Modal,
  Animated,
  PanResponder
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
// import { typography } from '../styles/typography';

const { width, height } = Dimensions.get('window');
const imageWidth = (width - 40) / 2;

const ImageScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [liked, setLiked] = useState({});

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          setModalVisible(false);
          pan.setValue({ x: 0, y: 0 });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const artworks = [
    {
      id: 1,
      title: 'Digital Dreams',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5',
      artist: 'Sarah Chen',
      category: 'Digital Art',
      likes: 2453,
      comments: 184,
      description: 'A mesmerizing digital artwork that explores the boundaries between reality and imagination.'
    },
    {
      id: 2,
      title: 'Abstract Flow',
      image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968',
      artist: 'Michael Torres',
      category: 'Abstract',
      likes: 1234,
      comments: 56,
      description: 'An abstract artwork that captures the essence of fluid motion.'
    },
    {
      id: 3,
      title: 'Nature\'s Canvas',
      image: 'https://images.unsplash.com/photo-1549490349-8643362247b5',
      artist: 'Emma Wilson',
      category: 'Nature',
      likes: 987,
      comments: 34,
      description: 'A breathtaking landscape that showcases the beauty of nature.'
    },
    {
      id: 4,
      title: 'Urban Perspective',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912',
      artist: 'James Lee',
      category: 'Photography',
      likes: 567,
      comments: 23,
      description: 'A captivating urban landscape that highlights the beauty of city life.'
    },
    {
      id: 5,
      title: 'Cosmic Wonder',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab',
      artist: 'Luna Park',
      category: 'Space',
      likes: 432,
      comments: 17,
      description: 'A stunning astronomical artwork that explores the mysteries of the universe.'
    },
    {
      id: 6,
      title: 'Ocean Dreams',
      image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04',
      artist: 'David Ocean',
      category: 'Nature',
      likes: 321,
      comments: 12,
      description: 'A serene ocean landscape that evokes feelings of calmness and tranquility.'
    }
  ];

  const handleUpload = () => {
    router.push('/screens/CreateArtworkScreen');
  };

  const filteredArtworks = artworks.filter(artwork =>
    artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artwork.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artwork.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openArtworkModal = (artwork) => {
    setSelectedArtwork(artwork);
    setModalVisible(true);
  };

  const toggleLike = (artworkId) => {
    setLiked(prev => ({
      ...prev,
      [artworkId]: !prev[artworkId]
    }));
  };

  const ArtworkModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Animated.View 
        style={[
          styles.modalContainer,
          {
            transform: [{ translateY: pan.y }]
          }
        ]}
        {...panResponder.panHandlers}
      >
        <BlurView intensity={100} style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View style={styles.dragIndicator} />
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {selectedArtwork && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Image 
                source={{ uri: selectedArtwork.image }} 
                style={styles.modalImage}
              />
              
              <View style={styles.artworkDetails}>
                <Text style={styles.modalTitle}>{selectedArtwork.title}</Text>
                <Text style={styles.modalArtist}>by {selectedArtwork.artist}</Text>
                <Text style={styles.modalDescription}>{selectedArtwork.description}</Text>

                <View style={styles.interactionBar}>
                  <TouchableOpacity 
                    style={styles.interactionButton}
                    onPress={() => toggleLike(selectedArtwork.id)}
                  >
                    <Icon 
                      name={liked[selectedArtwork.id] ? "heart" : "heart-outline"} 
                      size={24} 
                      color={liked[selectedArtwork.id] ? "#ff4b6e" : "#fff"} 
                    />
                    <Text style={styles.interactionText}>
                      {liked[selectedArtwork.id] ? selectedArtwork.likes + 1 : selectedArtwork.likes}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.interactionButton}>
                    <Icon name="chatbubble-outline" size={24} color="#fff" />
                    <Text style={styles.interactionText}>{selectedArtwork.comments}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.interactionButton}>
                    <Icon name="gift-outline" size={24} color="#fff" />
                    <Text style={styles.interactionText}>Gift</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.interactionButton}>
                    <Icon name="share-social-outline" size={24} color="#fff" />
                    <Text style={styles.interactionText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </BlurView>
      </Animated.View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1604871000636-074fa5117945' }} 
        style={styles.backgroundImage}
      />
      
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <BlurView intensity={20} style={styles.headerBlur}>
          <View style={styles.header}>
            <Text style={styles.title}>Discover Art</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
              <Icon name="add-circle-outline" size={24} color="#fff" />
              <Text style={styles.uploadText}>Create</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={18} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.categories}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['All', 'Digital Art', 'Abstract', 'Nature', 'Photography', 'Space'].map((category) => (
                <TouchableOpacity 
                  key={category} 
                  style={[
                    styles.categoryChip,
                    searchQuery.toLowerCase() === category.toLowerCase() && styles.categoryChipActive
                  ]}
                  onPress={() => setSearchQuery(category === 'All' ? '' : category)}
                >
                  <Text style={[
                    styles.categoryText,
                    searchQuery.toLowerCase() === category.toLowerCase() && styles.categoryTextActive
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </BlurView>

        <View style={styles.imageGrid}>
          {filteredArtworks.map((artwork) => (
            <TouchableOpacity 
              key={artwork.id} 
              style={styles.imageCard}
              onPress={() => openArtworkModal(artwork)}
            >
              <Image
                source={{ uri: artwork.image }}
                style={styles.artwork}
              />
              <View style={styles.artworkInfo}>
                <Text style={styles.artworkTitle}>{artwork.title}</Text>
                <Text style={styles.artistName}>{artwork.artist}</Text>
                <Text style={styles.category}>{artwork.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ArtworkModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  contentContainer: {
    flex: 1,
  },
  headerBlur: {
    paddingTop: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    // ...typography./h1,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(108, 99, 255, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  uploadText: {
    // ...typography.button,
    color: '#fff',
    marginLeft: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    // ...typography.body,
    flex: 1,
    paddingVertical: 8,
    color: '#fff',
  },
  categories: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  categoryChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
  },
  categoryChipActive: {
    backgroundColor: '#6C63FF',
  },
  categoryText: {
    // ...typography.caption,
    color: '#fff',
  },
  categoryTextActive: {
    color: '#fff',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  imageCard: {
    width: imageWidth,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  artwork: {
    width: '100%',
    height: imageWidth,
  },
  artworkInfo: {
    padding: 12,
  },
  artworkTitle: {
    // ...typography.h3,
    color: '#fff',
    marginBottom: 4,
  },
  artistName: {
    // ...typography.bodySmall,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  category: {
    // ...typography.caption,
    color: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(108, 99, 255, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'rgba(20, 20, 20, 0.98)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    minHeight: height * 0.7,
    paddingBottom: 40,
  },
  modalHeader: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#ffffff50',
    borderRadius: 2,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  modalImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  artworkDetails: {
    padding: 20,
  },
  modalTitle: {
    // ...typography.h1,
    color: '#fff',
    marginBottom: 8,
  },
  modalArtist: {
    // ...typography.h3,
    color: '#ffffff80',
    marginBottom: 16,
  },
  modalDescription: {
    // ...typography.body,
    color: '#ffffff90',
    lineHeight: 24,
    marginBottom: 20,
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ffffff20',
  },
  interactionButton: {
    alignItems: 'center',
  },
  interactionText: {
    // ...typography.caption,
    color: '#fff',
    marginTop: 8,
  },
});

export default ImageScreen;
