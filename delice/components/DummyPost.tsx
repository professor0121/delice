import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const dummyPosts = Array.from({ length: 5 }).map((_, i) => ({
  id: i.toString(),
  userName: `User${i + 1}`,
  userImage: 'https://placekitten.com/50/50',
  postImage: `https://placekitten.com/${300 + i}/${300 + i}`,
  caption: `This is a sample caption for post ${i + 1}`,
  likes: Math.floor(Math.random() * 1000),
}));

const PostItem = ({ post }: any) => (
  <View style={styles.postContainer}>
    {/* Header */}
    <View style={styles.postHeader}>
      <Image source={{ uri: post.userImage }} style={styles.avatar} />
      <Text style={styles.userName}>{post.userName}</Text>
      <TouchableOpacity style={{ marginLeft: 'auto' }}>
        <Text style={{ fontSize: 18 }}>⋮</Text>
      </TouchableOpacity>
    </View>

    {/* Post Image */}
    <Image source={{ uri: post.postImage }} style={styles.postImage} />

    {/* Actions */}
    <View style={styles.postActions}>
      <TouchableOpacity style={styles.actionBtn}><Text>❤️</Text></TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn}><Text>💬</Text></TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn}><Text>📤</Text></TouchableOpacity>
      <TouchableOpacity style={{ marginLeft: 'auto' }}><Text>🔖</Text></TouchableOpacity>
    </View>

    {/* Likes & Caption */}
    <Text style={styles.likesText}>{post.likes} likes</Text>
    <Text style={styles.caption}>
      <Text style={{ fontWeight: 'bold' }}>{post.userName} </Text>
      {post.caption}
    </Text>
  </View>
);

export default function Feed() {
  return (
    <FlatList
      data={dummyPosts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PostItem post={item} />}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  postImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  actionBtn: {
    marginRight: 10,
  },
  likesText: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  caption: {
    marginLeft: 10,
    marginTop: 4,
  },
});
