import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { autoGenerateBlogPosts, BlogPost } from '../services/contentGenerationService';

export default function BlogScreen() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const generated = autoGenerateBlogPosts();
    setPosts(generated);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadPosts();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const categories = ['All', 'General Surgery', 'Dermatology', 'Orthopedics', 'Cardiology'];
  const filtered = filter === 'All' ? posts : posts.filter(p => p.category === filter);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Medical Blog</Text>
        <Text style={styles.subtitle}>Auto-generated content • Updated daily</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterBtn, filter === cat && styles.filterActive]}
            onPress={() => setFilter(cat)}
          >
            <Text style={[styles.filterText, filter === cat && styles.filterTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {filtered.map(post => (
          <TouchableOpacity key={post.id} style={styles.card} onPress={() => router.push(`/blog/${post.id}`)}>
            <View style={styles.badge}><Text style={styles.badgeText}>{post.category}</Text></View>
            <Text style={styles.cardTitle}>{post.title}</Text>
            <Text style={styles.excerpt}>{post.content.substring(0, 150)}...</Text>
            <View style={styles.meta}>
              <Text style={styles.metaText}>By {post.author}</Text>
              <Text style={styles.metaText}>{post.readTime} min read</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { backgroundColor: '#2563eb', padding: 20, paddingTop: 60 },
  backBtn: { marginBottom: 10 },
  backText: { color: '#fff', fontSize: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  subtitle: { color: '#93c5fd', marginTop: 5 },
  filterScroll: { padding: 15, maxHeight: 60 },
  filterBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', marginRight: 10 },
  filterActive: { backgroundColor: '#2563eb' },
  filterText: { color: '#666' },
  filterTextActive: { color: '#fff', fontWeight: '600' },
  card: { backgroundColor: '#fff', margin: 15, padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  badge: { backgroundColor: '#dbeafe', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 10 },
  badgeText: { color: '#2563eb', fontSize: 12, fontWeight: '600' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 10 },
  excerpt: { color: '#6b7280', lineHeight: 20, marginBottom: 15 },
  meta: { flexDirection: 'row', justifyContent: 'space-between' },
  metaText: { color: '#9ca3af', fontSize: 12 },
});
