import React, { useState } from 'react';
// This is the line you are likely missing or where 'View' is missing
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import {
    Calendar,
    ChevronRight,
    Clock,
    Heart,
    Phone,
    Star
} from 'lucide-react-native';

// Types from your original code
type UserType = 'customer' | 'provider';
type TabType = 'calledBy' | 'youCalled';

interface HistoryItem {
  id: string;
  name: string;
  service: string;
  date: string;
  status?: 'pending' | 'completed' | 'rejected';
  rating?: number;
  duration?: string;
  isFavorite?: boolean;
}

const mockHistory: Record<TabType, HistoryItem[]> = {
  calledBy: [
    { id: '1', name: 'Rajesh Kumar', service: 'Plumber', date: '22 Dec 2024', status: 'completed', duration: '5:32' },
    { id: '2', name: 'Priya Sharma', service: 'Electrician', date: '21 Dec 2024', status: 'pending', duration: '2:15' },
    { id: '3', name: 'Amit Patel', service: 'AC Repair', date: '20 Dec 2024', status: 'completed', duration: '8:45' },
    { id: '4', name: 'Sunita Devi', service: 'Plumber', date: '19 Dec 2024', status: 'rejected', duration: '0:30' },
  ],
  youCalled: [
    { id: '5', name: 'Ramesh Electrician', service: 'Electrician', date: '22 Dec 2024', rating: 4.5, duration: '3:20', isFavorite: false },
    { id: '6', name: 'Suresh Plumber', service: 'Plumber', date: '20 Dec 2024', rating: 5, duration: '7:15', isFavorite: true },
    { id: '7', name: 'Kumar AC Repair', service: 'AC Repair', date: '18 Dec 2024', rating: 4, duration: '4:50', isFavorite: false },
  ],
};

export default function HistoryPage() {
  const [userType] = useState<UserType>('customer'); // Set to 'provider' to see tabs
  const [activeTab, setActiveTab] = useState<TabType>('youCalled');
  const [favorites, setFavorites] = useState<string[]>(['6']); // Mock favorite IDs

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed': return { bg: '#DCFCE7', text: '#15803D' };
      case 'pending': return { bg: '#FEF9C3', text: '#A16207' };
      case 'rejected': return { bg: '#FEE2E2', text: '#B91C1C' };
      default: return { bg: '#F3F4F6', text: '#4B5563' };
    }
  };

  const renderHistoryItem = (item: HistoryItem, showRating = false, showSaveToFavorites = false) => {
    const statusColors = item.status ? getStatusStyle(item.status) : null;
    const isItemFavorite = favorites.includes(item.id);

    return (
      <View key={item.id} style={styles.card}>
        {/* Avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>

        {/* Details */}
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.service}>{item.service}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Calendar size={12} color="#6B7280" />
              <Text style={styles.metaText}>{item.date}</Text>
            </View>
            {item.duration && (
              <View style={styles.metaItem}>
                <Clock size={12} color="#6B7280" />
                <Text style={styles.metaText}>{item.duration}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Status / Rating Action */}
        <View style={styles.actionArea}>
          {showRating && item.rating ? (
            <View style={styles.ratingBadge}>
              <Star size={14} color="#FF7A00" fill="#FF7A00" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          ) : item.status && statusColors ? (
            <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
              <Text style={[styles.statusText, { color: statusColors.text }]}>{item.status}</Text>
            </View>
          ) : null}

          {showSaveToFavorites && (
            <TouchableOpacity 
              style={[styles.favBtn, isItemFavorite && styles.favBtnActive]}
              onPress={() => {
                setFavorites(prev => isItemFavorite ? prev.filter(id => id !== item.id) : [...prev, item.id]);
              }}
            >
              <Heart size={16} color={isItemFavorite ? "#EF4444" : "#6B7280"} fill={isItemFavorite ? "#EF4444" : "none"} />
            </TouchableOpacity>
          )}
          <ChevronRight size={18} color="#9CA3AF" />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>

        {/* Tabs for Provider View */}
        {userType === 'provider' && (
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'calledBy' && styles.activeTab]} 
              onPress={() => setActiveTab('calledBy')}
            >
              <Phone size={16} color={activeTab === 'calledBy' ? "#FFF" : "#6B7280"} />
              <Text style={[styles.tabText, activeTab === 'calledBy' && styles.activeTabText]}>Called By</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tab, activeTab === 'youCalled' && styles.activeTab]} 
              onPress={() => setActiveTab('youCalled')}
            >
              <Phone size={16} color={activeTab === 'youCalled' ? "#FFF" : "#6B7280"} style={{ transform: [{ rotate: '135deg' }] }} />
              <Text style={[styles.tabText, activeTab === 'youCalled' && styles.activeTabText]}>You Called</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {userType === 'customer' ? (
          mockHistory.youCalled.map(item => renderHistoryItem(item, true, true))
        ) : (
          (activeTab === 'calledBy' ? mockHistory.calledBy : mockHistory.youCalled).map(item => 
            renderHistoryItem(item, activeTab === 'youCalled', activeTab === 'youCalled')
          )
        )}

        {/* Empty State */}
        {((userType === 'customer' && mockHistory.youCalled.length === 0) ||
          (userType === 'provider' && mockHistory[activeTab].length === 0)) && (
          <View style={styles.emptyContainer}>
            <Phone size={48} color="#E5E7EB" />
            <Text style={styles.emptyText}>No history yet</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { padding: 20, paddingTop: 40, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  tabContainer: { flexDirection: 'row', marginTop: 15, gap: 10 },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 12, backgroundColor: '#F3F4F6', gap: 6 },
  activeTab: { backgroundColor: '#FF7A00' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  activeTabText: { color: '#FFF' },
  list: { padding: 15 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#F3F4F6', elevation: 2 },
  avatar: { width: 45, height: 45, borderRadius: 23, backgroundColor: '#FFEBDC', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FF7A00', fontSize: 18, fontWeight: 'bold' },
  details: { flex: 1, marginLeft: 12 },
  name: { fontSize: 15, fontWeight: '700', color: '#111827' },
  service: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  metaRow: { flexDirection: 'row', marginTop: 6, gap: 10 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11, color: '#6B7280' },
  actionArea: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF7ED', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, gap: 4 },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#111827' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontSize: 10, fontWeight: '700', textTransform: 'capitalize' },
  favBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F9FAFB', alignItems: 'center', justifyContent: 'center' },
  favBtnActive: { backgroundColor: '#FEE2E2' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  emptyText: { marginTop: 10, color: '#9CA3AF', fontSize: 16 }
});