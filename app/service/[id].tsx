import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  Filter,
  MapPin,
  Mic,
  Phone,
  Search,
  Star
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

// Service translations for Hindi display
const serviceTranslations: Record<string, string> = {
  'home-cleaning': 'घर की सफाई',
  'plumber': 'प्लंबर',
  'electrician': 'इलेक्ट्रीशियन',
  'ac-repair': 'एसी मरम्मत',
  'painter': 'पेंटर',
  'carpenter': 'बढ़ई',
  'maid': 'नौकरानी',
  'cook': 'रसोइया',
  'driver': 'ड्राइवर',
  'teacher': 'शिक्षक',
  'pandit': 'पंडित',
  'scrap-dealer': 'कबाड़ीवाला',
};

// Mock workers data
const mockWorkers = [
  { id: 1, name: 'Lakshmi Devi', location: 'Dadar', city: 'Mumbai', rating: 4.9, jobsCompleted: 456, isVerified: true, isAvailable: true },
  { id: 2, name: 'Kavita Sharma', location: 'Koregaon Park', city: 'Pune', rating: 4.7, jobsCompleted: 312, isVerified: true, isAvailable: true },
  { id: 3, name: 'Ramesh Kumar', location: 'Mogalwadi', city: 'Khopoli', rating: 4.8, jobsCompleted: 289, isVerified: true, isAvailable: false },
  { id: 4, name: 'Sunita Patil', location: 'Vinaynagar', city: 'Khopoli', rating: 4.6, jobsCompleted: 178, isVerified: true, isAvailable: true },
  { id: 5, name: 'Anil Thakur', location: 'Bazaar Peth', city: 'Khopoli', rating: 4.5, jobsCompleted: 234, isVerified: true, isAvailable: true },
  { id: 6, name: 'Priya Deshmukh', location: 'Shilphata', city: 'Khopoli', rating: 4.9, jobsCompleted: 567, isVerified: true, isAvailable: true },
];

export default function ServiceListingPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [selectedLocation, setSelectedLocation] = useState('Khopoli');
  const [searchQuery, setSearchQuery] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);

  // Format ID for display
  const serviceName = typeof id === 'string' 
    ? id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') 
    : 'Service';

  const hindiName = serviceTranslations[id as string] || '';

  // Filtering Logic
  const filteredWorkers = mockWorkers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         worker.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAvailability = !availableOnly || worker.isAvailable;
    return matchesSearch && matchesAvailability;
  });

  const renderWorker = ({ item }: { item: typeof mockWorkers[0] }) => (
    <TouchableOpacity 
      style={styles.workerCard} 
      onPress={() => router.push({
        // REMOVED .tsx and added the correct folder path
        pathname: "/service/serviceprofile", 
        params: { 
          name: item.name,
          location: `${item.location}, ${item.city}`,
          rating: item.rating,
          jobs: item.jobsCompleted,
        }
      })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
          {item.isAvailable && <View style={styles.onlineDot} />}
        </View>
        
        <View style={styles.workerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.workerName}>{item.name}</Text>
            {item.isVerified && <CheckCircle size={14} color="#10B981" fill="#FFF" />}
          </View>
          <Text style={styles.locationText}>{item.location}, {item.city}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.ratingBadge}>
              <Star size={12} color="#FF7A00" fill="#FF7A00" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Text style={styles.jobsText}>{item.jobsCompleted} Jobs</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.callBtn} onPress={(e) => {
          e.stopPropagation(); 
          console.log('Calling:', item.id);
        }}>
          <Phone size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View style={styles.topLeft}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <ArrowLeft size={22} color="#333" />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>{serviceName}</Text>
              {hindiName ? <Text style={styles.hindiSub}>{hindiName}</Text> : null}
            </View>
          </View>

          <View style={styles.topRight}>
            <TouchableOpacity style={styles.locationChip}>
              <MapPin size={14} color="#FF7A00" />
              <Text style={styles.chipText}>{selectedLocation}</Text>
              <ChevronDown size={14} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={18} color="#999" />
            <TextInput 
              placeholder="Search workers or area..." 
              style={styles.input}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.micBtn}>
              <Mic size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={[styles.filterBtn, availableOnly && styles.filterBtnActive]}
            onPress={() => setAvailableOnly(!availableOnly)}
          >
            <Filter size={20} color={availableOnly ? "#FFF" : "#666"} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredWorkers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderWorker}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
          <Text style={styles.resultsCount}>{filteredWorkers.length} Workers Found</Text>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Search size={50} color="#E5E7EB" />
            <Text style={styles.emptyText}>No workers found</Text>
            <Text style={styles.emptySub}>Try adjusting your search or filters</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE', paddingBottom: 15 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingTop: 10 },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  topRight: { flexDirection: 'row', gap: 8 },
  backBtn: { backgroundColor: '#F3F4F6', padding: 8, borderRadius: 20 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  hindiSub: { fontSize: 12, color: '#6B7280' },
  locationChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, gap: 4 },
  chipText: { fontSize: 12, fontWeight: '600', color: '#333' },
  searchContainer: { flexDirection: 'row', paddingHorizontal: 15, gap: 10 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 12, height: 48 },
  input: { flex: 1, marginLeft: 8, fontSize: 14 },
  micBtn: { backgroundColor: '#FF7A00', padding: 6, borderRadius: 8 },
  filterBtn: { width: 48, height: 48, backgroundColor: '#F3F4F6', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  filterBtnActive: { backgroundColor: '#FF7A00' },
  listContent: { padding: 15, paddingBottom: 100 },
  resultsCount: { fontSize: 15, fontWeight: 'bold', marginBottom: 15, color: '#444' },
  workerCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 15, marginBottom: 12, borderWidth: 1, borderColor: '#F3F4F6', elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#FFEBDC', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 22, fontWeight: 'bold', color: '#FF7A00' },
  onlineDot: { position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: '#10B981', borderWidth: 2, borderColor: '#FFF' },
  workerInfo: { flex: 1, marginLeft: 15 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  workerName: { fontSize: 16, fontWeight: 'bold', color: '#111' },
  locationText: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF7ED', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, gap: 4 },
  ratingText: { fontSize: 12, fontWeight: 'bold', color: '#111' },
  jobsText: { fontSize: 12, color: '#9CA3AF' },
  callBtn: { backgroundColor: '#FF7A00', padding: 12, borderRadius: 12, elevation: 2 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 60 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 15 },
  emptySub: { fontSize: 14, color: '#9CA3AF', marginTop: 5 }
});