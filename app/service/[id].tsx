import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  BadgeCheck,
  ChevronDown,
  Heart,
  Mic,
  Phone,
  Play,
  Search,
  SlidersHorizontal,
  Star
} from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

// Mock workers data with added profile image support and availability
const mockWorkers = [
    { id: 1, name: 'John Doe', location: 'Downtown & SoMa', rating: 4.9, reviews: 85, jobsCompleted: 120, isVerified: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200', voiceTime: '0:15' },
    { id: 2, name: 'Sarah Jenkins', location: 'Sunset District', rating: 4.8, reviews: 142, jobsCompleted: 203, isVerified: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200', voiceTime: '0:12' },
    { id: 3, name: 'Michael Chen', location: 'North Beach', rating: 4.5, reviews: 28, jobsCompleted: 45, isVerified: false, isAvailable: false, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', voiceTime: '0:20' },
    { id: 4, name: 'Lakshmi Devi', location: 'Dadar, Mumbai', rating: 4.9, reviews: 45, jobsCompleted: 456, isVerified: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200', voiceTime: '0:18' },
];

export default function ServiceListingPage() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    
    // States for filtering
    const [searchQuery, setSearchQuery] = useState('');
    const [filterVerified, setFilterVerified] = useState(false);
    const [filterTopRated, setFilterTopRated] = useState(false);
    const [filterAvailable, setFilterAvailable] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);

    const serviceName = typeof id === 'string' 
        ? id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') 
        : 'Service';

    // Toggle Favorite
    const toggleFavorite = (id: number) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };

    // Filter Logic
    const filteredWorkers = useMemo(() => {
        return mockWorkers.filter(worker => {
            const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 worker.location.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesVerified = !filterVerified || worker.isVerified;
            const matchesTopRated = !filterTopRated || worker.rating >= 4.8;
            const matchesAvailable = !filterAvailable || worker.isAvailable;
            
            return matchesSearch && matchesVerified && matchesTopRated && matchesAvailable;
        });
    }, [searchQuery, filterVerified, filterTopRated, filterAvailable]);

    const renderWorker = ({ item }: { item: typeof mockWorkers[0] }) => (
        <View style={styles.workerCard}>
            <TouchableOpacity 
                activeOpacity={0.9}
                onPress={() => router.push({
                    pathname: "/service/serviceprofile", 
                    params: { name: item.name, location: item.location, rating: item.rating, jobs: item.jobsCompleted, profileImage: item.image }
                })}
            >
                {/* Header: Profile & Name */}
                <View style={styles.cardHeader}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item.image }} style={styles.profileImage} />
                        <View style={[styles.onlineDot, { backgroundColor: item.isAvailable ? '#22C55E' : '#D1D5DB' }]} />
                    </View>
                    
                    <View style={styles.nameContainer}>
                        <View style={styles.nameRow}>
                            <Text style={styles.workerName}>{item.name}</Text>
                            {item.isVerified && (
                                <View style={styles.verifiedBadge}>
                                    <BadgeCheck size={12} color="#2563EB" fill="#DBEAFE" />
                                    <Text style={styles.verifiedText}>VERIFIED</Text>
                                </View>
                            )}
                        </View>
                        <Text style={styles.locationText}>{item.location}</Text>
                        <View style={styles.statsRow}>
                            <Star size={14} color="#F59E0B" fill="#F59E0B" />
                            <Text style={styles.ratingValue}>{item.rating}</Text>
                            <Text style={styles.statSub}>({item.reviews})</Text>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.statSub}>{item.jobsCompleted} Jobs</Text>
                        </View>
                    </View>
                </View>

                {/* Voice Intro Waveform Box */}
                <View style={styles.voiceIntroBox}>
                    <View style={styles.playCircle}>
                        <Play size={14} color="#F27C0D" fill="#F27C0D" />
                    </View>
                    <View style={styles.waveformContainer}>
                        <Text style={styles.voiceLabel}>Voice Intro</Text>
                        <View style={styles.waveform}>
                            {[2, 4, 1, 3, 4, 1, 2, 1].map((h, i) => (
                                <View key={i} style={[styles.waveBar, { height: h * 3, backgroundColor: i < 4 ? '#F27C0D' : '#E5E7EB' }]} />
                            ))}
                        </View>
                    </View>
                    <Text style={styles.voiceTime}>{item.voiceTime}</Text>
                </View>
            </TouchableOpacity>

            {/* Action Buttons */}
            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.callNowBtn}>
                    <Phone size={18} color="#FFF" fill="#FFF" />
                    <Text style={styles.callNowText}>Call Now</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.favBtn, favorites.includes(item.id) && styles.favBtnActive]} 
                    onPress={() => toggleFavorite(item.id)}
                >
                    <Heart size={22} color={favorites.includes(item.id) ? "#EF4444" : "#9CA3AF"} fill={favorites.includes(item.id) ? "#EF4444" : "none"} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            
            {/* Nav Header */}
            <View style={styles.headerNav}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backCircle}>
                    <ArrowLeft size={20} color="#111" />
                </TouchableOpacity>
                <View style={styles.headerTitleCenter}>
                    <Text style={styles.headerTitleMain}>{serviceName}</Text>
                    <TouchableOpacity style={styles.locSelector}>
                        <Text style={styles.locSelectorText}>San Francisco</Text>
                        <ChevronDown size={14} color="#6B7280" />
                    </TouchableOpacity>
                </View>
                <View style={{ width: 40 }} />
            </View>

            {/* Search Bar */}
            <View style={styles.searchSection}>
                <View style={styles.searchBar}>
                    <Search size={20} color="#9CA3AF" />
                    <TextInput 
                        placeholder="Search for names or keywords..." 
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity><Mic size={20} color="#F27C0D" /></TouchableOpacity>
                </View>
            </View>

            {/* Filter Chips */}
            <View style={styles.filterScrollWrapper}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={[
                        { id: 'tune', icon: <SlidersHorizontal size={18} color="#4B5563" /> },
                        { id: 'verified', label: 'Verified Only', active: filterVerified, toggle: () => setFilterVerified(!filterVerified) },
                        { id: 'top', label: 'Top Rated', active: filterTopRated, toggle: () => setFilterTopRated(!filterTopRated) },
                        { id: 'avail', label: 'Available Now', active: filterAvailable, toggle: () => setFilterAvailable(!filterAvailable) },
                    ]}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={[
                                styles.filterChip, 
                                item.active && styles.filterChipActive,
                                item.id === 'tune' && styles.tuneChip
                            ]}
                            onPress={item.toggle}
                        >
                            {item.id === 'tune' ? item.icon : (
                                <>
                                    {item.active && <Star size={14} color="#FFF" fill="#FFF" style={{marginRight: 4}} />}
                                    <Text style={[styles.filterText, item.active && styles.filterTextActive]}>{item.label}</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                />
            </View>

            {/* Workers List */}
            <FlatList
                data={filteredWorkers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderWorker}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={() => (
                    <View style={styles.emptyState}>
                        <Search size={50} color="#E5E7EB" />
                        <Text style={styles.emptyText}>No matches found</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F7F5' },
    headerNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 10, height: 60 },
    backCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    headerTitleCenter: { alignItems: 'center' },
    headerTitleMain: { fontSize: 18, fontWeight: '800', color: '#111' },
    locSelector: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
    locSelectorText: { fontSize: 12, color: '#6B7280', marginRight: 4, fontWeight: '500' },
    
    searchSection: { padding: 16 },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 20, paddingHorizontal: 14, height: 52, borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10, elevation: 2 },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 15 },

    filterScrollWrapper: { height: 50 },
    filterChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 14, marginRight: 10, borderWidth: 1, borderColor: '#E5E7EB' },
    filterChipActive: { backgroundColor: '#F27C0D', borderColor: '#F27C0D' },
    tuneChip: { width: 50, justifyContent: 'center', paddingHorizontal: 0 },
    filterText: { fontSize: 13, fontWeight: '600', color: '#4B5563' },
    filterTextActive: { color: '#FFF' },

    listContainer: { padding: 16, paddingBottom: 40 },
    workerCard: { backgroundColor: '#FFF', borderRadius: 28, padding: 16, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 15, elevation: 4 },
    cardHeader: { flexDirection: 'row' },
    imageContainer: { position: 'relative' },
    profileImage: { width: 64, height: 64, borderRadius: 24, backgroundColor: '#F3F4F6' },
    onlineDot: { position: 'absolute', bottom: -2, right: -2, width: 14, height: 14, borderRadius: 7, borderWidth: 3, borderColor: '#FFF' },
    
    nameContainer: { flex: 1, marginLeft: 16 },
    nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    workerName: { fontSize: 17, fontWeight: '800', color: '#111' },
    verifiedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFF6FF', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6, gap: 3 },
    verifiedText: { fontSize: 9, fontWeight: '900', color: '#2563EB' },
    locationText: { fontSize: 13, color: '#6B7280', marginTop: 2 },
    
    statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
    ratingValue: { fontSize: 13, fontWeight: '800', color: '#111', marginLeft: 4 },
    statSub: { fontSize: 13, color: '#9CA3AF', marginLeft: 4 },
    bullet: { marginHorizontal: 6, color: '#E5E7EB' },

    voiceIntroBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 16, padding: 10, marginTop: 16 },
    playCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    waveformContainer: { flex: 1, marginLeft: 12 },
    voiceLabel: { fontSize: 11, fontWeight: '700', color: '#374151' },
    waveform: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
    waveBar: { width: 3, borderRadius: 2 },
    voiceTime: { fontSize: 11, color: '#9CA3AF', fontWeight: '600' },

    actionRow: { flexDirection: 'row', marginTop: 16, gap: 12 },
    callNowBtn: { flex: 1, backgroundColor: '#F27C0D', height: 50, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, shadowColor: '#F27C0D', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
    callNowText: { color: '#FFF', fontWeight: '800', fontSize: 15 },
    favBtn: { width: 50, height: 50, borderRadius: 16, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center' },
    favBtnActive: { borderColor: '#FEE2E2', backgroundColor: '#FFF' },

    emptyState: { alignItems: 'center', marginTop: 60 },
    emptyText: { marginTop: 10, color: '#9CA3AF', fontWeight: '600' }
});