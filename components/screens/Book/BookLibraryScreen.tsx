import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  Modal, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import variables from '@/constants/variables';
// import { colors } from '';

const { width, height } = Dimensions.get('window');

const BookLibraryScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const [bookStore, setBookStore] = useState([
    {
      id: '1',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      coverImage: 'https://m.media-amazon.com/images/I/41xShlnTZTL._SY445_SX342_.jpg',
      price: 39.99,
      isFree: false,
      description: 'A handbook of agile software craftsmanship from a master programmer.',
      pages: 464,
      rating: 4.7,
      genre: 'Programming'
    },
    {
      id: '2',
      title: 'Design Patterns',
      author: 'Erich Gamma',
      coverImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db',
      price: 49.99,
      isFree: false,
      description: 'Capturing software design expertise in a comprehensive, reusable format.',
      pages: 395,
      rating: 4.8,
      genre: 'Software Engineering'
    },
    {
      id: '3',
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      coverImage: 'https://m.media-amazon.com/images/I/41as+WaXJBL._SY445_SX342_.jpg',
      price: 0,
      isFree: true,
      description: 'Your journey to mastery in a practical, engaging guide.',
      pages: 321,
      rating: 4.6,
      genre: 'Professional Development'
    }
  ]);

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="white" style={styles.searchIcon} />
      <TextInput
        placeholder="Search books, authors, genres..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={"#fff"}
        style={styles.searchInput}
      />
    </View>
  );

  const renderBookCard = (book) => (
    <TouchableOpacity 
      style={styles.bookCard} 
      key={book.id}
      onPress={() => router.push(`/screens/BookReaderScreen?bookId=${book.id}`)}
    >
      <Image
        source={{ uri: book.coverImage }}
        style={styles.bookCover}
        resizeMode="cover"
      />
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle} numberOfLines={1}>{book.title}</Text>
        <Text style={styles.bookAuthor}>{book.author}</Text>
        <View style={styles.bookMetadata}>
          <Text style={styles.metadataText}>{book.genre}</Text>
          <Text style={styles.metadataText}>
            <Ionicons name="star" size={12} color="#FFD700" /> {book.rating}
          </Text>
        </View>
        <Text style={styles.bookDescription} numberOfLines={2}>
          {book.description}
        </Text>
        <View style={styles.bookPriceContainer}>
          <Text style={book.isFree ? styles.freeBookPrice : styles.paidBookPrice}>
            {book.isFree ? 'FREE' : `$${book.price.toFixed(2)}`}
          </Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>
              {book.isFree ? 'Read Now' : 'Buy'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCreateBookButton = () => (
    <TouchableOpacity 
      style={styles.createBookButton}
      onPress={() => router.push('/screens/CreateBookScreen')}
    >
      <Ionicons name="add" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderSearchBar()}
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Book Store</Text>
        {bookStore.length > 0 ? (
          bookStore.map(renderBookCard)
        ) : (
          <Text style={styles.noBooksText}>No books available</Text>
        )}
      </ScrollView>

      {renderCreateBookButton()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 15,
    paddingHorizontal: 15,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginVertical: 10,
    color: variables.colors.text,
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 5,
    padding: 15,
  },
  bookCover: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  bookDetails: {
    marginLeft: 15,
    flex: 1,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  bookAuthor: {
    color: '#555',
    marginTop: 5,
  },
  bookMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  metadataText: {
    fontSize: 12,
    color: '#666',
  },
  bookDescription: {
    color: '#666',
    marginTop: 5,
  },
  bookPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  freeBookPrice: {
    color: 'green',
    fontWeight: 'bold',
  },
  paidBookPrice: {
    color: 'black',
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  createBookButton: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#28a745',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  noBooksText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BookLibraryScreen;
