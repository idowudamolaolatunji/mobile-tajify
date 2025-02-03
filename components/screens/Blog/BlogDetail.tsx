import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

const BlogDetail = () => {
  const { id } = useLocalSearchParams();
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  
  const blog = {
    id: id,
    title: 'How to Master Digital Marketing in 2024',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: 'https://s3-alpha-sig.figma.com/img/cba7/172b/a2be2b7493db8f528c161a9766656c27?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B4WYbTJM6wj7NOEWsdQEiU3etN5x9-b~QjqoDbKU9MWLIQlkJUXqsSh6cLXnWQVgM2v2IOqQCCiXKU6J0niFGZ4DOgeMo8-pnSxvL06zEfMNor4I6eVWbrNRn29Q5RKZoPwST5pehL-sdr2-DmcIZb4qhmAnmvqFuJbg-XjhiyJe9-poWMYri8CyRVpb9QvpquSIa8JadS~pmk4XBlVjRHLO0j~EttDDzQiQl1e6aGMdt1FvzwvG6HNit2Ne1HbmFb0IZVpFREiJ2kNERgD-4zzF2mzSwSLwQgDISK1mKL~Pwwkx8qk40NcT~bUe613gFXMsj46xU1Vh8xead53HOw__',
    author: {
      name: 'John Smith',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith',
      bio: 'Digital Marketing Expert | Content Creator',
    },
    publishDate: 'Mar 15, 2024',
    readTime: '5 min read',
    likes: 1234,
    comments: [
      {
        id: '1',
        user: {
          name: 'Sarah Johnson',
          avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson',
        },
        text: 'Great article! Very informative.',
        likes: 45,
        timestamp: '2h ago',
      },
    
    ],
  };

  return (
    <ScrollView style={styles.container}>
     
      <Image source={{ uri: blog.image }} style={styles.headerImage} />
      

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        {/* Author Info */}
        <View style={styles.authorContainer}>
          <Image source={{ uri: blog.author.avatar }} style={styles.authorAvatar} />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{blog.author.name}</Text>
            <Text style={styles.authorBio}>{blog.author.bio}</Text>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>

      
        <Text style={styles.title}>{blog.title}</Text>
        <View style={styles.metadata}>
          <Text style={styles.metaText}>{blog.publishDate}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>{blog.readTime}</Text>
        </View>

        {/* Article Content */}
        <Text style={styles.articleContent}>{blog.content}</Text>

        {/* Interaction Bar */}
        <View style={styles.interactionBar}>
          <View style={styles.leftInteractions}>
            <TouchableOpacity 
              style={styles.interactionButton}
              onPress={() => setIsLiked(!isLiked)}
            >
              <Ionicons 
                name={isLiked ? "heart" : "heart-outline"} 
                size={24} 
                color={isLiked ? "#FF375F" : "#FFF"} 
              />
              <Text style={styles.interactionText}>{blog.likes}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.interactionButton}>
              <Ionicons name="chatbubble-outline" size={24} color="#FFF" />
              <Text style={styles.interactionText}>{blog.comments.length}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rightInteractions}>
            <TouchableOpacity style={styles.interactionButton}>
              <Ionicons name="bookmark-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.interactionButton}>
              <Ionicons name="share-social-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comments</Text>
          
          {/* Comment Input */}
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              placeholderTextColor="#666"
              value={comment}
              onChangeText={setComment}
              multiline
            />
            <TouchableOpacity style={styles.postButton}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>

          {/* Comments List */}
          {blog.comments.map(comment => (
            <View key={comment.id} style={styles.commentContainer}>
              <Image source={{ uri: comment.user.avatar }} style={styles.commentAvatar} />
              <View style={styles.commentContent}>
                <Text style={styles.commentAuthor}>{comment.user.name}</Text>
                <Text style={styles.commentText}>{comment.text}</Text>
                <View style={styles.commentMeta}>
                  <Text style={styles.commentTime}>{comment.timestamp}</Text>
                  <TouchableOpacity style={styles.commentLike}>
                    <Ionicons name="heart-outline" size={16} color="#666" />
                    <Text style={styles.commentLikeCount}>{comment.likes}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerImage: {
    width,
    height: 300,
  },
  backButton: {
    position: 'absolute',
    top: 44,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  authorInfo: {
    flex: 1,
    marginLeft: 12,
  },
  authorName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Outfit_600SemiBold',
  },
  authorBio: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
  },
  followButton: {
    backgroundColor: '#2962FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Outfit_500md',
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Outfit_600SemiBold',
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metaText: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
  },
  metaDot: {
    color: '#666',
    marginHorizontal: 8,
  },
  articleContent: {
    color: '#CCC',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    fontFamily: 'Outfit_400Regular',
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#222',
  },
  leftInteractions: {
    flexDirection: 'row',
  },
  rightInteractions: {
    flexDirection: 'row',
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  interactionText: {
    color: '#FFF',
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
  },
  commentsSection: {
    marginTop: 24,
  },
  commentsTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  commentInput: {
    flex: 1,
    height: 100,
    padding: 12,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 8,
    color: '#FFF',
    backgroundColor: '#111',
  },
  postButton: {
    backgroundColor: '#2962FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 12,
  },
  postButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Outfit_500md',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Outfit_600SemiBold',
  },
  commentText: {
    color: '#CCC',
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
  },
  commentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  commentTime: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
  },
  commentLike: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  commentLikeCount: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
  },
});

export default BlogDetail; 