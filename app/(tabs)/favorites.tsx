import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// --- Mock Data ---
const CATEGORIES = ['All', 'Plumbers', 'Electricians', 'Cleaning', 'HVAC'];

const FAVORITES_DATA = [
  {
    id: '1',
    name: 'Ramesh Electrici...',
    role: 'Senior Technician',
    rating: '4.8',
    jobs: '124 Jobs',
    initial: 'R',
    color: '#FFEDD5',
    textColor: '#EA580C',
    online: true,
    category: 'Electricians'
  },
  {
    id: '2',
    name: 'Suresh Plumber',
    role: 'Pipe & Leak Expert',
    rating: '4.5',
    jobs: '89 Jobs',
    initial: 'S',
    color: '#DBEAFE',
    textColor: '#2563EB',
    online: false,
    category: 'Plumbers'
  },
  {
    id: '3',
    name: 'Priya Cleaning',
    role: 'Deep Clean Specialist',
    rating: '4.9',
    jobs: '205 Jobs',
    initial: 'P',
    color: '#F3E8FF',
    textColor: '#9333EA',
    online: true,
    category: 'Cleaning'
  },
  {
    id: '4',
    name: 'Amit AC Repair',
    role: 'HVAC Technician',
    rating: '4.7',
    jobs: '56 Jobs',
    initial: 'A',
    color: '#CCFBF1',
    textColor: '#0D9488',
    online: false,
    category: 'HVAC'
  },
];

export default function FavoritesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const filteredData = FAVORITES_DATA.filter(item => {
    const matchesTab = activeTab === 'All' || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const renderWorkerCard = ({ item }: { item: typeof FAVORITES_DATA[0] }) => (
    <TouchableOpacity 
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => router.push(`/service/serviceprofile`)}
    >
      <View style={styles.cardContent}>
        {/* Avatar Section */}
        <View style={[styles.avatarContainer, { backgroundColor: item.color }]}>
          <Text style={[styles.avatarText, { color: item.textColor }]}>{item.initial}</Text>
          {item.online && <View style={styles.onlineDot} />}
        </View>

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <View style={styles.nameHeader}>
            <Text style={styles.workerName} numberOfLines={1}>{item.name}</Text>
            <TouchableOpacity hitSlop={10}>
              <Ionicons name="heart" size={22} color="#EF4444" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.roleText}>{item.role}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.ratingBadge}>
              <MaterialIcons name="star" size={14} color="#FBBF24" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.jobsText}>{item.jobs}</Text>
          </View>
        </View>

        {/* Arrow Action */}
        <View style={styles.arrowContainer}>
           <MaterialIcons name="chevron-right" size={24} color="#D1D5DB" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Dynamic Background Gradients */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      <View style={styles.headerContainer}>
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.mainTitle}>Favorites</Text>
            <Text style={styles.subTitle}>Your trusted professionals</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="options-outline" size={22} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search saved..."
              style={styles.input}
              value={search}
              onChangeText={setSearch}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity style={styles.sortBtn}>
            <MaterialIcons name="sort" size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveTab(cat)}
              style={[
                styles.categoryChip,
                activeTab === cat && styles.activeChip
              ]}
            >
              <Text style={[
                styles.categoryText,
                activeTab === cat && styles.activeCategoryText
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderWorkerCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF7',
  },
  // Background decorative elements
  bgCircle1: {
    position: 'absolute',
    top: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 126, 54, 0.08)',
    zIndex: -1,
  },
  bgCircle2: {
    position: 'absolute',
    top: 100,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 126, 54, 0.05)',
    zIndex: -1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    fontFamily: 'Poppins-Bold',
  },
  subTitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  iconBtn: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  searchRow: {
    flexDirection: 'row',
    marginTop: 25,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 15,
    height: 52,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
  },
  sortBtn: {
    width: 52,
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  categoryScroll: {
    marginTop: 20,
    paddingBottom: 10,
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  activeChip: {
    backgroundColor: '#FF7E36',
    borderColor: '#FF7E36',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  listPadding: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#FF7E36',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '800',
  },
  onlineDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  nameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workerName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    maxWidth: '85%',
  },
  roleText: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#92400E',
    marginLeft: 3,
  },
  dot: {
    marginHorizontal: 8,
    color: '#D1D5DB',
  },
  jobsText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  arrowContainer: {
    marginLeft: 5,
  }
});