import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Star, Heart } from 'lucide-react-native';

const headerImage = require('../../assets/images/sushant.png');

const initialFavorites = [
  { id: '1', name: 'Marcus Johnson', service: 'Master Plumber', rating: 4.9, reviews: 124, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Sarah Davis', service: 'Certified Electrician', rating: 5.0, reviews: 89, image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '3', name: 'David Chen', service: 'HVAC Specialist', rating: 4.8, reviews: 210, image: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '4', name: 'Emily Wilson', service: 'Home Cleaning', rating: 4.7, reviews: 56, image: 'https://randomuser.me/api/portraits/women/4.jpg' },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const filteredFavorites = favorites.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.headerWrapper}>
        <Image
          source={headerImage}
          style={styles.headerImage}
          resizeMode="cover"
        />

        <LinearGradient
          colors={['transparent', 'rgba(255,243,230,0.1)', 'rgba(234,88,12,0.9)']}
          locations={[0, 0.6, 1]}
          style={styles.headerGradient}
        />

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Favorites</Text>
          <Text style={styles.headerSubtitle}>Your trusted professionals</Text>
        </View>
      </View>

      {/* CONTENT */}
      <View style={styles.contentArea}>
        <View style={styles.dragIndicator} />

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={18} color="#94a3b8" />
            <TextInput
              placeholder="Search providers..."
              placeholderTextColor="#94a3b8"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* LIST */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        >
          {filteredFavorites.map(item => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.avatar} />

              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.serviceName}>{item.service}</Text>

                <View style={styles.ratingRow}>
                  <Star size={14} color="#facc15" fill="#facc15" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                  <Text style={styles.reviewText}>({item.reviews})</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => toggleFavorite(item.id)}
                style={styles.heartBtn}
              >
                <Heart size={22} color="#ef4444" fill="#ef4444" />
              </TouchableOpacity>
            </View>
          ))}

          {filteredFavorites.length === 0 && (
            <View style={styles.emptyState}>
              <Heart size={64} color="#e2e8f0" />
              <Text style={styles.emptyText}>No favorites found</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  /* ✅ FIXED BG IMAGE HEIGHT */
  headerWrapper: {
    height: 280,
    backgroundColor: '#FFF3E6',
  },
  headerImage: {
    ...StyleSheet.absoluteFillObject,
  },
  headerGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  headerContent: {
    paddingHorizontal: 16,
    marginTop: 60,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#4B5563',
    marginTop: 4,
    fontWeight: '600',
  },

  contentArea: {
    flex: 1,
    marginTop: -50,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  dragIndicator: {
    width: 44,
    height: 5,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 14,
  },

  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#1e293b',
  },

  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 22,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },

  avatar: {
    width: 68,
    height: 68,
    borderRadius: 18,
  },
  name: {
    fontSize: 19,
    fontWeight: '700',
    color: '#0f172a',
  },
  serviceName: {
    fontSize: 14,
    color: '#f97316',
    marginVertical: 3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  reviewText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  heartBtn: {
    padding: 10,
  },

  emptyState: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 17,
    fontWeight: '600',
    color: '#64748b',
  },
});
