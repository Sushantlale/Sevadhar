import { Audio } from 'expo-av';
/*import { BlurView } from 'expo-blur';*/
import * as Linking from 'expo-linking';
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
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const mockWorkers = [
    // --- GROUP: household (Home Help) ---
    { 
        id: 1, name: 'Sanjay Pawar', category: 'aquarium-cleaner', categoryGroup: 'cleaning', location: 'Khopoli Market', 
        rating: 4.9, reviews: 42, jobsCompleted: 156, isVerified: true, isAvailable: true, 
        image: 'https://images.unsplash.com/photo-1540569014015-19a7ee504e3a?w=400', voiceTime: '0:15' 
    },
    { 
        id: 2, name: 'Sunita Deshmukh', category: 'home-cleaning', categoryGroup: 'cleaning', location: 'Khalapur Road', 
        rating: 4.8, reviews: 120, jobsCompleted: 430, isVerified: true, isAvailable: true, 
        image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400', voiceTime: '0:12' 
    },
    { 
        id: 14, name: 'Pooja Shinde', category: 'maid', categoryGroup: 'cleaning', location: 'Shastri Nagar', 
        rating: 4.7, reviews: 95, jobsCompleted: 310, isVerified: true, isAvailable: true, 
        image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=400', voiceTime: '0:10' 
    },
    { 
        id: 15, name: 'Anita Vaze', category: 'home-cleaning', categoryGroup: 'cleaning', location: 'Lowjee Area', 
        rating: 4.6, reviews: 50, jobsCompleted: 112, isVerified: false, isAvailable: true, 
        image: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=400', voiceTime: '0:14' 
    },

    // --- GROUP: repair (Repairs) ---
    { 
        id: 4, name: 'Arjun Sharma', category: 'ac-repair', categoryGroup: 'repair', location: 'Khopoli Station', 
        rating: 4.9, reviews: 85, jobsCompleted: 210, isVerified: true, isAvailable: true, 
        image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400', voiceTime: '0:20' 
    },
    { 
        id: 6, name: 'Amit Kadam', category: 'plumber', categoryGroup: 'repair', location: 'Shastri Nagar', 
        rating: 4.5, reviews: 22, jobsCompleted: 65, isVerified: false, isAvailable: true, 
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', voiceTime: '0:14' 
    },
    { 
        id: 16, name: 'Rahul More', category: 'electrician', categoryGroup: 'repair', location: 'Pen Road', 
        rating: 4.8, reviews: 67, jobsCompleted: 180, isVerified: true, isAvailable: true, 
        image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400', voiceTime: '0:18' 
    },
    { 
        id: 17, name: 'Vikash Gupta', category: 'ac-repair', categoryGroup: 'repair', location: 'Market Yard', 
        rating: 4.7, reviews: 45, jobsCompleted: 98, isVerified: true, isAvailable: true, 
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400', voiceTime: '0:15' 
    },

    // --- GROUP: construction (Construction) ---
    { 
        id: 7, name: 'Dinesh Bhoir', category: 'labor', categoryGroup: 'construction', location: 'Khalapur Naka', 
        rating: 4.4, reviews: 15, jobsCompleted: 120, isVerified: true, isAvailable: true, 
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', voiceTime: '0:08' 
    },
    { 
        id: 18, name: 'Balu Gaware', category: 'welder', categoryGroup: 'construction', location: 'Industrial Area', 
        rating: 4.9, reviews: 30, jobsCompleted: 85, isVerified: true, isAvailable: true, 
        image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400', voiceTime: '0:11' 
    },
    { 
        id: 19, name: 'Sandeep Patil', category: 'tiles-worker', categoryGroup: 'construction', location: 'Tata Colony', 
        rating: 4.6, reviews: 12, jobsCompleted: 40, isVerified: false, isAvailable: true, 
        image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400', voiceTime: '0:09' 
    },

    // --- GROUP: restaurants (Food) ---
    { 
        id: 20, name: 'Hotel Visawa', category: 'restaurant', categoryGroup: 'restaurants', location: 'Highway Junction', 
        rating: 4.5, reviews: 850, jobsCompleted: 0, isVerified: true, isAvailable: true, 
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', voiceTime: '0:00' 
    },
    { 
        id: 21, name: 'Annapurna Tiffin', category: 'tiffin', categoryGroup: 'restaurants', location: 'Khopoli Market', 
        rating: 4.9, reviews: 120, jobsCompleted: 500, isVerified: true, isAvailable: true, 
        image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?w=400', voiceTime: '0:10' 
    },
    { 
        id: 22, name: 'Sagar Fast Food', category: 'fast-food', categoryGroup: 'restaurants', location: 'Station Road', 
        rating: 4.2, reviews: 400, jobsCompleted: 0, isVerified: true, isAvailable: true, 
        image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400', voiceTime: '0:00' 
    },

    // --- GROUP: professional (Professional Services) ---
    { 
        id: 9, name: 'Dr. Anjali Mehta', category: 'doctor', categoryGroup: 'professional', location: 'Municipal Hospital', 
        rating: 4.9, reviews: 350, jobsCompleted: 1200, isVerified: true, isAvailable: true, 
        image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?w=400', voiceTime: '0:30' 
    },
    { 
        id: 23, name: 'Adv. K. R. Deshmukh', category: 'lawyer', categoryGroup: 'professional', location: 'Tehsil Court', 
        rating: 4.8, reviews: 78, jobsCompleted: 150, isVerified: true, isAvailable: true, 
        image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400', voiceTime: '0:22' 
    },
    { 
        id: 24, name: 'Amit Saxena', category: 'accountant', categoryGroup: 'professional', location: 'MG Road', 
        rating: 4.7, reviews: 32, jobsCompleted: 60, isVerified: true, isAvailable: true, 
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', voiceTime: '0:12' 
    }
];

export default function ServiceListingPage() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    // State for location selection
    const [selectedLocation, setSelectedLocation] = useState('Khopoli');
    const [locationModalVisible, setLocationModalVisible] = useState(false);

    // Voice Search states
    const [voiceModalVisible, setVoiceModalVisible] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingResult, setRecordingResult] = useState<string | null>(null);

    // Audio playback state
    const [playingId, setPlayingId] = useState<number | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);


    const stopRecording = async () => {
  setIsRecording(false);

  // ⛔ Placeholder for speech-to-text result
  // Replace later with real STT (Google / Whisper / Azure)
  const fakeText = 'Plumber';

  setRecordingResult(fakeText);
  setSearchQuery(fakeText);
};

    const startVoiceSearch = async () => {
  const permission = await Audio.requestPermissionsAsync();
  if (!permission.granted) {
    alert('Microphone permission is required');
    return;
  }

  setVoiceModalVisible(true);
  setRecordingResult(null);
};

const startRecording = async () => {
  try {
    setIsRecording(true);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
  } catch (err) {
    console.log('Recording error', err);
  }
};
    
    const toggleVoiceIntro = async (worker: any) => {
  try {
    // Stop if same audio is playing
    if (playingId === worker.id && sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setPlayingId(null);
      return;
    }

    // Stop previous audio
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }

    // Load & play new audio (mock URL for now)
    const { sound: newSound } = await Audio.Sound.createAsync(
      {
        uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      },
      { shouldPlay: true }
    );

    setSound(newSound);
    setPlayingId(worker.id);

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) {
        console.log('Playback error:', status.error);
        return;
      }
    
      if (status.didJustFinish) {
        setPlayingId(null);
        newSound.unloadAsync();
      }
    });


  } catch (err) {
    console.log('Audio error:', err);
  }
};

    const [callModalVisible, setCallModalVisible] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState<any>(null);
   

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
    // Inside your ServiceListingPage function in [id].tsx
const filteredWorkers = useMemo(() => {
    return mockWorkers.filter(worker => {
        // 1. Only show workers that belong to the current category (id)
        const matchesCategory = worker.category === id; 
        
        // 2. Rest of your existing search logic
        const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesVerified = !filterVerified || worker.isVerified;
        const matchesTopRated = !filterTopRated || worker.rating >= 4.8;
        const matchesAvailable = !filterAvailable || worker.isAvailable;
        
        return matchesCategory && matchesSearch && matchesVerified && matchesTopRated && matchesAvailable;
    });
}, [id, searchQuery, filterVerified, filterTopRated, filterAvailable]);

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
                    <TouchableOpacity
                      style={styles.playCircle}
                      onPress={() => toggleVoiceIntro(item)}
                    >
                      {playingId === item.id ? (
                        <View style={{ width: 10, height: 10, backgroundColor: '#F27C0D' }} />
                      ) : (
                        <Play size={14} color="#F27C0D" fill="#F27C0D" />
                      )}
                    </TouchableOpacity>

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
                <TouchableOpacity
                  style={styles.callNowBtn}
                  onPress={() => {
                  setSelectedWorker(item);
                  setCallModalVisible(true);
                 }}
                >
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
                    <TouchableOpacity
                      style={styles.locSelector}
                      onPress={() => setLocationModalVisible(true)}
                    >                    
                     <Text style={styles.locSelectorText}>{selectedLocation}</Text>
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
                    <TouchableOpacity onPress={startVoiceSearch}>
                      <Mic size={20} color="#F27C0D" />
                    </TouchableOpacity>

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

            {/* Location Selector Modal */}
            {locationModalVisible && (
              <View style={styles.modalOverlay}>
                <View style={styles.locationModal}>
                  <View style={styles.dragHandle} />
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Select Location</Text>
                    <TouchableOpacity onPress={() => setLocationModalVisible(false)}>
                      <Text style={styles.modalClose}>✕</Text>
                    </TouchableOpacity>
                  </View>
            
                  {['Khopoli', 'Khalapur'].map((loc) => (
                    <TouchableOpacity
                      key={loc}
                      style={styles.locationOption}
                      onPress={() => {
                        setSelectedLocation(loc);
                        setLocationModalVisible(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.locationText1,
                          selectedLocation === loc && styles.locationActive,
                        ]}
                      >
                        {loc}
                      </Text>
                      {selectedLocation === loc && <Text style={styles.checkMark}>✓</Text>}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {voiceModalVisible && (
            <View style={styles.modalOverlay}>
              <View style={styles.voiceModal}>
          
                {/* Close */}
                <TouchableOpacity
                  style={styles.voiceClose}
                  onPress={() => {
                    setVoiceModalVisible(false);
                    setIsRecording(false);
                  }}
                >
                  <Text style={{ fontSize: 18 }}>✕</Text>
                </TouchableOpacity>
          
                {/* TITLE */}
                <Text style={styles.voiceTitle}>Voice Search</Text>
          
                {/* STATE 1: BEFORE RECORD */}
                {!isRecording && !recordingResult && (
                  <>
                    <Text style={styles.voiceHint}>Tap the microphone to speak</Text>
          
                    <TouchableOpacity
                      style={styles.voiceMicBtn}
            onPress={startRecording}
                    >
                      <Mic size={28} color="#FFF" />
                    </TouchableOpacity>
                  </>
                )}
          
                {/* STATE 2: RECORDING */}
                {isRecording && (
                  <>
                    <Text style={styles.voiceHint}>Listening...</Text>
          
                    <TouchableOpacity
                      style={[styles.voiceMicBtn, { backgroundColor: '#EF4444' }]}
                      onPress={stopRecording}
                    >
                      <Mic size={28} color="#FFF" />
                    </TouchableOpacity>
          
                    <Text style={styles.voiceSubText}>
                      "Finding the best plumbers near you..."
                    </Text>
                  </>
                )}
          
                {/* STATE 3: RESULT */}
                {recordingResult && (
                  <>
                    <Text style={styles.voiceHint}>Search result</Text>
          
                    <View style={styles.voiceResultBox}>
                      <Text style={styles.voiceResultText}>
                        "{recordingResult}"
                      </Text>
                    </View>
          
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                      <TouchableOpacity
                        style={styles.tryAgainBtn}
                        onPress={() => {
                          setRecordingResult(null);
                          setIsRecording(false);
                        }}
                      >
                        <Text style={styles.tryAgainText}>Try Again</Text>
                      </TouchableOpacity>
          
                      <TouchableOpacity
                        style={styles.searchBtn}
                        onPress={() => setVoiceModalVisible(false)}
                      >
                        <Text style={styles.searchBtnText}>Search</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
            )}

            {callModalVisible && selectedWorker && (
  <View style={styles.modalOverlay}>
    
    {/* Blur Background */}
    {/*<BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />*/}

    {/* Modal Card */}
    <View style={styles.callModal}>
      <Image
        source={{ uri: selectedWorker.image }}
        style={styles.callProfileImg}
      />

      <Text style={styles.callTitle}>Call Confirmation</Text>

      <Text style={styles.callText}>
        Would you like to place a call to{"\n"}
        <Text style={{ fontWeight: '800' }}>
          {selectedWorker.name}
        </Text>
        ?
      </Text>

      <TouchableOpacity
        style={styles.callConfirmBtn}
        onPress={() => {
          setCallModalVisible(false);

          // Random mock number
          const randomNumber = `tel:+91${Math.floor(9000000000 + Math.random() * 1000000000)}`;
          Linking.openURL(randomNumber);
        }}
      >
        <Phone size={18} color="#FFF" />
        <Text style={styles.callConfirmText}>Call Now</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setCallModalVisible(false)}
      >
        <Text style={styles.callCancel}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
)}


        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F7F5' },
    headerNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 10 : 10, height: 80 },
    backCircle: { width: 40, height: 80, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    headerTitleCenter: { alignItems: 'center', paddingTop: 6 },
    headerTitleMain: { fontSize: 18, fontWeight: '800', color: '#111' },
    locSelector: { flexDirection: 'row', alignItems: 'center', marginTop: 0, paddingTop: 0 },
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
    locationText1: { fontSize: 13, color: '#6B7280', marginTop: 2 },
    
    statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
    ratingValue: { fontSize: 13, fontWeight: '800', color: '#111', marginLeft: 4 },
    statSub: { fontSize: 13, color: '#9CA3AF', marginLeft: 4 },
    bullet: { marginHorizontal: 6, color: '#E5E7EB' },

    voiceIntroBox: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 16, padding: 10, marginTop: 16 },
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
    emptyText: { marginTop: 10, color: '#9CA3AF', fontWeight: '600' },

    modalOverlay: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.3)',
  justifyContent: 'center',   // ✅ CENTER vertically
  alignItems: 'center',       // ✅ CENTER horizontally
},

dragHandle: {
  width: 40,
  height: 4,
  borderRadius: 2,
  backgroundColor: '#E5E7EB',
  alignSelf: 'center',
  marginBottom: 12,
},


locationModal: {
  backgroundColor: '#FFF',
  width: '70%',                 // ✅ full width
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
  paddingHorizontal: 20,
  paddingTop: 16,
  paddingBottom: 24,
},


modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 4,
},

modalTitle: {
  fontSize: 16,
  fontWeight: '700',
  color: '#111',
},

modalClose: {
  fontSize: 18,
  color: '#6B7280',
},

locationOption: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 16,
},

locationText: {
  fontSize: 15,
  color: '#111',
},

locationActive: {
  color: '#F27C0D',
  fontWeight: '700',
},

checkMark: {
  color: '#F27C0D',
  fontSize: 16,
  fontWeight: '700',
},

voiceModal: {
  backgroundColor: '#FFF',
  marginHorizontal: 30,
  borderRadius: 24,
  padding: 24,
  alignItems: 'center',
},

voiceClose: {
  position: 'absolute',
  right: 16,
  top: 16,
},

voiceTitle: {
  fontSize: 18,
  fontWeight: '800',
  color: '#111',
},

voiceHint: {
  marginTop: 10,
  color: '#6B7280',
  fontWeight: '600',
},

voiceMicBtn: {
  marginTop: 24,
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: '#F27C0D',
  justifyContent: 'center',
  alignItems: 'center',
},

voiceSubText: {
  marginTop: 12,
  fontSize: 12,
  color: '#9CA3AF',
  fontStyle: 'italic',
},

voiceResultBox: {
  marginVertical: 16,
  backgroundColor: '#FFF7ED',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 12,
},

voiceResultText: {
  fontSize: 16,
  fontWeight: '700',
  color: '#111',
},

tryAgainBtn: {
  borderWidth: 1,
  borderColor: '#F27C0D',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 12,
},

tryAgainText: {
  color: '#F27C0D',
  fontWeight: '700',
},

searchBtn: {
  backgroundColor: '#F27C0D',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 12,
},

searchBtnText: {
  color: '#FFF',
  fontWeight: '700',
},

callModal: {
  backgroundColor: '#FFF',
  width: '80%',
  borderRadius: 28,
  padding: 24,
  alignItems: 'center',
},

callProfileImg: {
  width: 70,
  height: 70,
  borderRadius: 35,
  marginBottom: 12,
},

callTitle: {
  fontSize: 16,
  fontWeight: '800',
  color: '#111',
  marginBottom: 6,
},

callText: {
  fontSize: 14,
  color: '#6B7280',
  textAlign: 'center',
  marginBottom: 20,
},

callConfirmBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  backgroundColor: '#F27C0D',
  paddingVertical: 14,
  borderRadius: 18,
  width: '100%',
  justifyContent: 'center',
},

callConfirmText: {
  color: '#FFF',
  fontWeight: '800',
  fontSize: 15,
},

callCancel: {
  marginTop: 14,
  color: '#6B7280',
  fontWeight: '600',
},

});