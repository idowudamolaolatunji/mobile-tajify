// import React from "react";
// import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

// const posts = [
//     {
//       title: "Wages and benefits growth deals yet another...",
//       image: "https://s3-alpha-sig.figma.com/img/9465/862c/98b9e75f8c271dc18dfa07b75f399995?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MEmSrnbHND1BaQz~L6T2AvSqX~AZdwIb0yq0uSt9Ko9d4JxpJFjyzNsbDaAQsbvZPoZk01sgyNn0m0gQwf6-56m6budIPboJFg8gvQbzC-hXXyEr4Xs97hCZVfIBXvEK6M4pPHKPrNcFRB89QfyiU6e6YVxqXVXoYpo-mlGa3hGMMoyEfJX7ivU62vr6JLOJdnTXvRsY43237rSnB2EBHNOD4LuB9xtCP3rjh0VmudNMc1DPSz8iC781WXT7YbCGTBCNVKZZ00KXQ3a1qtc8SEHpvkFWcwVDsNQIpYd14Ww0EmzozHIvHiUUGBOEbk8xkDj2zNu3-7TAeHbI-y78nQ__",
//     },
//     {
//       title: "Meet Aliame Asfd from Turkey",
//       image: "/news2.jpg", // Local image
//     },
//     {
//       title: "Wages and benefits growth deals yet another...",
//       image: "https://s3-alpha-sig.figma.com/img/9465/862c/98b9e75f8c271dc18dfa07b75f399995?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MEmSrnbHND1BaQz~L6T2AvSqX~AZdwIb0yq0uSt9Ko9d4JxpJFjyzNsbDaAQsbvZPoZk01sgyNn0m0gQwf6-56m6budIPboJFg8gvQbzC-hXXyEr4Xs97hCZVfIBXvEK6M4pPHKPrNcFRB89QfyiU6e6YVxqXVXoYpo-mlGa3hGMMoyEfJX7ivU62vr6JLOJdnTXvRsY43237rSnB2EBHNOD4LuB9xtCP3rjh0VmudNMc1DPSz8iC781WXT7YbCGTBCNVKZZ00KXQ3a1qtc8SEHpvkFWcwVDsNQIpYd14Ww0EmzozHIvHiUUGBOEbk8xkDj2zNu3-7TAeHbI-y78nQ__",
//     },
//     {
//       title: "Wages and benefits growth deals yet another...",
//       image: "/news4.jpg",
//     },
//     {
//       title: "Logistics wages and benefits growth deals yet",
//       image: "/news5.jpg",
//     },
//     {
//       title: "Wages and benefits growth deals yet another...",
//       image: "/news6.jpg",
//     },
//   ];
  

// const Blog = () => {
//   return (
//     <ScrollView style={{ backgroundColor: "#1a1a1a", flex: 1, padding: 20 }}>
    //   <Text style={{ fontSize: 24, fontWeight: "bold", color: "white", textAlign: "center", marginBottom: 20 }}>
    //     Latest News
    //   </Text>
    //   <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
    //     <TouchableOpacity style={{ backgroundColor: "#007bff", padding: 10, marginHorizontal: 5 }}>
    //       <Text style={{ color: "white" }}>News</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={{ borderColor: "white", borderWidth: 1, padding: 10, marginHorizontal: 5 }}>
    //       <Text style={{ color: "white" }}>Article</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={{ borderColor: "white", borderWidth: 1, padding: 10, marginHorizontal: 5 }}>
    //       <Text style={{ color: "white" }}>My Diary</Text>
    //     </TouchableOpacity>
    //   </View>
//       {posts.map((post, index) => (
//         <View key={index} style={{ backgroundColor: "#333", borderRadius: 8, marginBottom: 20, padding: 10 }}>
//           <Image source={post.image} style={{ width: "100%", height: 200, borderRadius: 8 }} />
//           <Text style={{ fontSize: 18, fontWeight: "bold", color: "white", marginTop: 10 }}>{post.title}</Text>
//           <TouchableOpacity style={{ marginTop: 10, backgroundColor: "#007bff", padding: 10, alignItems: "center" }}>
//             <Text style={{ color: "white" }}>Read More</Text>
//           </TouchableOpacity>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// export default Blog;

import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; 

const Blog = () => {
  const blogs = [
    {
      id: '1',
      title: 'How to Master Digital Marketing in 2024',
      excerpt: 'Learn the latest trends and strategies in digital marketing that will help your business grow...',
      image: 'https://s3-alpha-sig.figma.com/img/9465/862c/98b9e75f8c271dc18dfa07b75f399995?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MEmSrnbHND1BaQz~L6T2AvSqX~AZdwIb0yq0uSt9Ko9d4JxpJFjyzNsbDaAQsbvZPoZk01sgyNn0m0gQwf6-56m6budIPboJFg8gvQbzC-hXXyEr4Xs97hCZVfIBXvEK6M4pPHKPrNcFRB89QfyiU6e6YVxqXVXoYpo-mlGa3hGMMoyEfJX7ivU62vr6JLOJdnTXvRsY43237rSnB2EBHNOD4LuB9xtCP3rjh0VmudNMc1DPSz8iC781WXT7YbCGTBCNVKZZ00KXQ3a1qtc8SEHpvkFWcwVDsNQIpYd14Ww0EmzozHIvHiUUGBOEbk8xkDj2zNu3-7TAeHbI-y78nQ__',
      author: {
        name: 'John Smith',
        avatar: 'https://ui-avatars.com/api/?name=John+Smith',
      },
      readTime: '5 min read',
      likes: 1234,
      comments: 89,
      category: 'Marketing'
    },

  ];

  const renderBlogCard = (blog: any) => (
    <TouchableOpacity 
      key={blog.id}
      style={styles.cardContainer}
      onPress={() => router.push({
        pathname: "/components/screens/Blog/BlogDetail",
        params: { id: blog.id }
      })}
    >
      <Image
        source={{ uri: blog.image }}
        style={styles.blogImage}
        resizeMode="cover"
      />
      
      <View style={styles.categoryTag}>
        <Text style={styles.categoryText}>{blog.category}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {blog.title}
        </Text>
        
        <Text style={styles.excerpt} numberOfLines={2}>
          {blog.excerpt}
        </Text>

        <View style={styles.authorRow}>
          <View style={styles.authorInfo}>
            <Image 
              source={{ uri: blog.author.avatar }} 
              style={styles.authorAvatar}
            />
            <Text style={styles.authorName}>{blog.author.name}</Text>
          </View>
          
          <Text style={styles.readTime}>{blog.readTime}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Ionicons name="heart-outline" size={20} color="#666" />
            <Text style={styles.statText}>{blog.likes}</Text>
          </View>
          
          <View style={styles.stat}>
            <Ionicons name="chatbubble-outline" size={20} color="#666" />
            <Text style={styles.statText}>{blog.comments}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Latest News</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => router.push('/Blog/CreateBlog')}
        >
          <Ionicons name="create-outline" size={24} color="#FFF" />
          <Text style={styles.createButtonText}>Write</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
        <TouchableOpacity style={{ backgroundColor: "#007bff", padding: 10, marginHorizontal: 5 }}>
          <Text style={{ color: "white" }}>News</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ borderColor: "white", borderWidth: 1, padding: 10, marginHorizontal: 5  }}>
          <Text style={{ color: "white" }}>Article</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ borderColor: "white", borderWidth: 1, padding: 10, marginHorizontal: 10 ,   borderRadius: 16,}}>
          <Text style={{ color: "white" }}>My Diary</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.blogList} >
        {blogs.map(blog => renderBlogCard(blog))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Outfit_600SemiBold',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2962FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
    color: '#FFF',
    marginLeft: 8,
    fontFamily: 'Outfit_500md',
  },
  blogList: {
    padding: 16,
  },
  cardContainer: {
    width: CARD_WIDTH,
    backgroundColor: '#111',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  blogImage: {
    width: '100%',
    height: 200,
  },
  categoryTag: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(41, 98, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Outfit_500md',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Outfit_600SemiBold',
  },
  excerpt: {
    color: '#AAA',
    fontSize: 14,
    marginBottom: 16,
    fontFamily: 'Outfit_400Regular',
  },
  authorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorName: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Outfit_500md',
  },
  readTime: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
  },
  statsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#222',
    paddingTop: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  statText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 4,
    fontFamily: 'Outfit_400Regular',
  },
});

export default Blog; 
