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
  Calendar, 
  Clock, 
  ChevronRight
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const initialHistory = [
  { 
    id: '1', 
    name: 'Ramesh Electrician', 
    service: 'General Electrical Work', 
    rating: 4.5, 
    date: '22 Dec', 
    time: '03:20 PM', 
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
    <View style={styles.outerContainer}>
      <StatusBar barStyle="dark-content" />
      
      {/* 1. Improved Background Header: Added background color and adjusted resizeMode */}
      <View style={styles.headerImageContainer}>
        <ImageBackground 
            source={require('../../assets/images/History.png')} 
            style={styles.backgroundImage}
            resizeMode="contain" // Zooms out to fit the full image
        >
            <SafeAreaView style={styles.headerSpacer} />
        </ImageBackground>
      </View>

      <View style={styles.contentArea}>
        <View style={styles.dragIndicator} />
        

        {/* Search container with improved padding */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#ffffff' },
  flex1: { flex: 1 },
  // Container to hold the cream-orange background color to match the image
  headerImageContainer: {
    height: 250,
    width: '100%',
    backgroundColor: '#FFF3E6', 
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  headerSpacer: { height: '100%' },
  contentArea: { 
    flex: 1, 
    marginTop: -45, // Reduced overlap so the zoomed-out image stays visible
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  dragIndicator: { width: 44, height: 5, backgroundColor: '#E2E8F0', borderRadius: 3, alignSelf: 'center', marginTop: 14 },
  
  textHeadingSection: {
    paddingHorizontal: 24, 
    paddingTop: 10,
  },
  headerTitleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3B1E14', 
    letterSpacing: -0.8,
  },
  headerSubtitleText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 2,
  },

  searchContainer: { 
    paddingHorizontal: 24, 
    paddingTop: 15, 
    paddingBottom: 10 
  },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    height: 56, 
    borderRadius: 18, 
    backgroundColor: '#F8FAFC', 
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9'
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#1E293B' },
  
  tabsWrapper: { marginTop: 10 },
  tabsScroll: { paddingHorizontal: 24 },
  rangeTab: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25, backgroundColor: '#F8FAFC', marginRight: 12 },
  activeRangeTab: { backgroundColor: '#F97316' },
  rangeText: { fontSize: 14, fontWeight: '700', color: '#64748B' },
  activeRangeText: { color: 'white' },
  
  listContainer: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 130 },
  monthHeader: { fontSize: 11, fontWeight: '800', color: '#94A3B8', marginBottom: 15, textTransform: 'uppercase', letterSpacing: 1.5 },
  card: { backgroundColor: 'white', borderRadius: 24, padding: 16, marginBottom: 16, elevation: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 15, borderWidth: 1, borderColor: '#F1F5F9' },
  cardMain: { flexDirection: 'row', gap: 16 },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#F1F5F9' }, 
  grayscale: { opacity: 0.6 },
  onlineDot: { position: 'absolute', bottom: 2, right: 2, width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: 'white' },
  cardDetails: { flex: 1, justifyContent: 'center' },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  workerName: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  serviceName: { fontSize: 14, color: '#F97316', fontWeight: '700', marginTop: 2 },
  textGray: { color: '#94A3B8' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FEF9C3', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingText: { fontSize: 12, fontWeight: 'bold', color: '#A16207' },
  metaRow: { flexDirection: 'row', gap: 12, marginTop: 10 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F8FAFC', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  metaText: { fontSize: 12, fontWeight: '600', color: '#64748B' },
  favBtn: { paddingTop: 4 },
  cardFooter: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cancelledBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#FEF2F2', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  cancelledDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#EF4444' },
  cancelledText: { fontSize: 11, fontWeight: '800', color: '#B91C1C' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionBtnText: { fontSize: 14, fontWeight: 'bold', color: '#F97316' },
});