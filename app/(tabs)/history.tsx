import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
  StatusBar,
  ImageBackground,
} from 'react-native';

import { 
  Search, 
  Star, 
  Heart, 
  Bell, 
  Calendar, 
  Clock, 
  ChevronRight
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Mock Data
const initialHistory = [
  { 
    id: '1', 
    name: 'Ramesh Electrician', 
    service: 'General Electrical Work', 
    rating: 4.5, 
    date: '22 Dec', 
    time: '03:20 PM', 
    // FIX: Replaced absolute Windows path with a URL or local require
    image: 'https://randomuser.me/api/portraits/men/21.jpg',
    status: 'completed',
    isFavorite: false,
    month: 'DECEMBER 2024'
  },
  { 
    id: '2', 
    name: 'Suresh Plumber', 
    service: 'Leakage Fix & Piping', 
    rating: 5.0, 
    date: '20 Dec', 
    time: '07:15 PM', 
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    status: 'completed',
    isFavorite: true,
    month: 'DECEMBER 2024'
  },
  { 
    id: '3', 
    name: 'Kumar AC Repair', 
    service: 'AC Maintenance', 
    rating: 4.0, 
    date: '18 Dec', 
    time: '04:50 PM', 
    image: 'https://randomuser.me/api/portraits/men/23.jpg',
    status: 'completed',
    isFavorite: false,
    month: 'DECEMBER 2024'
  },
  { 
    id: '4', 
    name: 'John Painter', 
    service: 'Interior Painting', 
    rating: null, 
    date: '12 Nov', 
    time: '10:00 AM', 
    image: 'https://randomuser.me/api/portraits/men/24.jpg',
    status: 'cancelled',
    isFavorite: false,
    month: 'NOVEMBER 2024'
  },
];

export default function HistoryPage() {
  const [history, setHistory] = useState(initialHistory);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRange, setActiveRange] = useState('1M');

  const ranges = ['1D', '1W', '1M', '3M', '6M'];

  const toggleFavorite = (id: string) => {
    setHistory(history.map(item => 
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
  };

  const filteredHistory = history.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ImageBackground 
      // FIX: Standard assets path based on your image_591227.png structure
      source={require('../../assets/images/history_bg.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.headerWrapper}>
        <SafeAreaView style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>History</Text>
              <Text style={styles.headerSubtitle}>Your past interactions</Text>
            </View>
            <TouchableOpacity style={styles.notificationBtn}>
              <Bell size={20} color="#111827" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <View style={styles.contentArea}>
        <View style={styles.dragIndicator} />
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Search past services..."
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.tabsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
            {ranges.map(range => (
              <TouchableOpacity 
                key={range} 
                onPress={() => setActiveRange(range)}
                style={[styles.rangeTab, activeRange === range && styles.activeRangeTab]}
              >
                <Text style={[styles.rangeText, activeRange === range && styles.activeRangeText]}>{range}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
          {filteredHistory.map((item, index) => {
             // Corrected logic to ensure multiple names are displayed
             const showMonth = index === 0 || item.month !== filteredHistory[index - 1].month;
             return (
               <View key={item.id}>
                 {showMonth && <Text style={styles.monthHeader}>{item.month}</Text>}
                 <View style={styles.card}>
                   <View style={styles.cardMain}>
                    <View style={styles.avatarWrapper}>
                      <Image 
                        source={{ uri: item.image }} 
                        style={[styles.avatar, item.status === 'cancelled' && styles.grayscale]} 
                      />
                      <View style={[styles.onlineDot, { backgroundColor: item.status === 'cancelled' ? '#EF4444' : '#22C55E' }]} />
                    </View>
                    <View style={styles.cardDetails}>
                      <View style={styles.nameRow}>
                        <View style={styles.flex1}>
                          <Text style={styles.workerName} numberOfLines={1}>{item.name}</Text>
                          <Text style={[styles.serviceName, item.status === 'cancelled' && styles.textGray]}>{item.service}</Text>
                        </View>
                        {item.rating && (
                          <View style={styles.ratingBadge}>
                            <Star size={12} color="#D97706" fill="#D97706" />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                          </View>
                        )}
                      </View>
                      <View style={styles.metaRow}>
                        <View style={styles.metaItem}><Calendar size={12} color="#6B7280" /><Text style={styles.metaText}>{item.date}</Text></View>
                        <View style={styles.metaItem}><Clock size={12} color="#6B7280" /><Text style={styles.metaText}>{item.time}</Text></View>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favBtn}>
                      <Heart size={18} color={item.isFavorite ? "#EF4444" : "#D1D5DB"} fill={item.isFavorite ? "#EF4444" : "none"} />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.cardFooter}>
                    {item.status === 'cancelled' ? (
                      <View style={styles.cancelledBadge}>
                        <View style={styles.cancelledDot} />
                        <Text style={styles.cancelledText}>Cancelled</Text>
                      </View>
                    ) : (
                      <View style={styles.flex1} />
                    )}
                    <TouchableOpacity style={styles.actionBtn}>
                      <Text style={[styles.actionBtnText, item.status === 'cancelled' && styles.textGray]}>
                        {item.status === 'cancelled' ? 'View Details' : 'Rebook Service'}
                      </Text>
                      <ChevronRight size={16} color={item.status === 'cancelled' ? "#6B7280" : "#F97316"} />
                    </TouchableOpacity>
                  </View>
                 </View>
               </View>
             );
          })}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex1: { flex: 1 },
  headerWrapper: { height: 160, width: '100%' },
  headerContent: { flex: 1, paddingHorizontal: 24 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 20 },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#111827', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 14, color: '#4B5563', fontWeight: '500', marginTop: 4 },
  notificationBtn: { backgroundColor: 'rgba(0,0,0,0.05)', padding: 10, borderRadius: 20 },
  contentArea: { 
    flex: 1, 
    marginTop: -20, 
    backgroundColor: 'rgba(249, 250, 251, 0.95)',
    borderTopLeftRadius: 32, 
    borderTopRightRadius: 32,
  },
  dragIndicator: { width: 48, height: 6, backgroundColor: '#D1D5DB', borderRadius: 3, alignSelf: 'center', marginTop: 12 },
  searchContainer: { paddingHorizontal: 20, paddingTop: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', height: 56, borderRadius: 16, backgroundColor: 'white', paddingHorizontal: 16, elevation: 4 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: '#111827' },
  tabsWrapper: { marginTop: 20 },
  tabsScroll: { paddingHorizontal: 20 },
  rangeTab: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25, backgroundColor: 'white', elevation: 2, marginRight: 12 },
  activeRangeTab: { backgroundColor: '#F97316' },
  rangeText: { fontSize: 14, fontWeight: '700', color: '#4B5563' },
  activeRangeText: { color: 'white' },
  listContainer: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 120 },
  monthHeader: { fontSize: 12, fontWeight: 'bold', color: '#6B7280', marginBottom: 15, textTransform: 'uppercase', letterSpacing: 1 },
  card: { backgroundColor: 'white', borderRadius: 24, padding: 16, marginBottom: 16, elevation: 3 },
  cardMain: { flexDirection: 'row', gap: 16 },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 72, height: 72, borderRadius: 16, backgroundColor: '#F3F4F6' },
  grayscale: { opacity: 0.6 },
  onlineDot: { position: 'absolute', bottom: -2, right: -2, width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: 'white' },
  cardDetails: { flex: 1, justifyContent: 'center' },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  workerName: { fontSize: 17, fontWeight: 'bold', color: '#111827' },
  serviceName: { fontSize: 14, color: '#F97316', fontWeight: '600' },
  textGray: { color: '#6B7280' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingText: { fontSize: 12, fontWeight: 'bold', color: '#92400E' },
  metaRow: { flexDirection: 'row', gap: 12, marginTop: 10 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F9FAFB', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  metaText: { fontSize: 12, fontWeight: '600', color: '#6B7280' },
  favBtn: { paddingTop: 4 },
  cardFooter: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F3F4F6', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cancelledBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#FEF2F2', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  cancelledDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#EF4444' },
  cancelledText: { fontSize: 12, fontWeight: 'bold', color: '#B91C1C' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionBtnText: { fontSize: 14, fontWeight: 'bold', color: '#F97316' },
});