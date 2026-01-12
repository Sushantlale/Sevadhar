import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  Modal,
  KeyboardAvoidingView, // Added
  Platform, // Added
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Star, Heart, Mic, X } from 'lucide-react-native';

const headerImage = require('../../assets/images/favorite_bg.png');

const initialFavorites = [
  { id: '1', name: 'Marcus Johnson', service: 'Plumber', rating: 4.9, reviews: 124, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Sarah Davis', service: 'Electrician', rating: 5.0, reviews: 89, image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '3', name: 'David Chen', service: 'AC Repair', rating: 4.8, reviews: 210, image: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '4', name: 'Emily Wilson', service: 'Cleaning', rating: 4.7, reviews: 56, image: 'https://randomuser.me/api/portraits/women/4.jpg' },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [searchQuery, setSearchQuery] = useState('');

  /** MOCK VOICE STATES */
  const [voiceModal, setVoiceModal] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceResult, setVoiceResult] = useState<string | null>(null);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  /** 🔍 FILTER WORKERS DIRECTLY */
  const filteredFavorites = favorites.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /** MOCK VOICE */
  const startMockListening = () => {
    setListening(true);
    setVoiceResult(null);

    setTimeout(() => {
      setListening(false);
      setVoiceResult('Plumber');
    }, 1500);
  };

  const applyVoiceSearch = () => {
    if (voiceResult) {
      setSearchQuery(voiceResult);
    }
    setVoiceModal(false);
  };

  return (
    // KeyboardAvoidingView helps manage the layout when the keyboard appears
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <ScrollView 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // Allows clicking buttons while keyboard is open
        >
          {/* HEADER */}
          <View style={styles.headerWrapper}>
            <ImageBackground source={headerImage} style={styles.headerImage}>
              <LinearGradient
                colors={['rgba(255,255,255,0)', 'rgba(234,88,12,0.45)']}
                style={StyleSheet.absoluteFillObject}
              />
            </ImageBackground>

            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Favorites</Text>
              <Text style={styles.headerSubtitle}>Your trusted professionals</Text>
            </View>
          </View>

          {/* CONTENT */}
          <View style={styles.contentArea}>
            <View style={styles.dragIndicator} />

            {/* SEARCH BAR */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Search size={18} color="#94a3b8" />
                <TextInput
                  placeholder="Search workers or services..."
                  style={styles.searchInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <TouchableOpacity onPress={() => setVoiceModal(true)}>
                  <Mic size={20} color="#f97316" />
                </TouchableOpacity>
              </View>
            </View>

            {/* FAVORITES LIST */}
            <View style={styles.listWrapper}>
              {filteredFavorites.length === 0 ? (
                <Text style={styles.emptyText}>No matching workers found</Text>
              ) : (
                filteredFavorites.map(item => (
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
                    <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                      <Heart size={22} color="#ef4444" fill="#ef4444" />
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>
          </View>
        </ScrollView>

        {/* VOICE MODAL */}
        <Modal transparent visible={voiceModal} animationType="fade">
          <View style={styles.voiceOverlay}>
            <View style={styles.voiceModal}>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setVoiceModal(false)}
              >
                <X size={20} />
              </TouchableOpacity>

              <Text style={styles.voiceTitle}>Voice Search</Text>

              {!voiceResult ? (
                <>
                  <Text style={styles.voiceSubtitle}>Tap the microphone to speak</Text>
                  <TouchableOpacity style={styles.micButton} onPress={startMockListening}>
                    <Mic size={32} color="#fff" />
                  </TouchableOpacity>
                  {listening && <Text>Listening...</Text>}
                </>
              ) : (
                <>
                  <Text style={styles.voiceSubtitle}>Search result:</Text>
                  <View style={styles.voiceResultBox}>
                    <Text style={styles.voiceResultText}>"{voiceResult}"</Text>
                  </View>

                  <View style={styles.voiceActions}>
                    <TouchableOpacity style={styles.tryAgainBtn} onPress={startMockListening}>
                      <Text>Try Again</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.searchBtn} onPress={applyVoiceSearch}>
                      <Text style={{ color: '#fff' }}>Search</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

/* STYLES (NO CHANGES MADE HERE) */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerWrapper: { height: 300 },
  headerImage: { flex: 1 },
  headerContent: { position: 'absolute', top: 40, left: 16 },
  headerTitle: { fontSize: 34, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 15 },

  contentArea: {
    marginTop: -40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingBottom: 100, // Added some bottom padding for better scroll feel
  },
  dragIndicator: {
    width: 44,
    height: 5,
    backgroundColor: '#e2e8f0',
    alignSelf: 'center',
    marginVertical: 12,
  },

  searchContainer: { padding: 24 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 56,
    gap: 10,
  },
  searchInput: { flex: 1, fontSize: 16 },

  listWrapper: { paddingHorizontal: 24 },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 22,
    backgroundColor: '#fff',
    marginBottom: 16,
    elevation: 4,
  },
  avatar: { width: 68, height: 68, borderRadius: 18 },
  details: { flex: 1, marginLeft: 16 },
  name: { fontSize: 18, fontWeight: '600' },
  serviceName: { color: '#f97316' },
  ratingRow: { flexDirection: 'row', gap: 4, alignItems: 'center' },
  ratingText: { fontSize: 13, fontWeight: 'bold' },
  reviewText: { fontSize: 12, color: '#94a3b8' },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#94a3b8',
  },

  voiceOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceModal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  closeBtn: { position: 'absolute', right: 16, top: 16 },
  voiceTitle: { fontSize: 20, fontWeight: 'bold' },
  voiceSubtitle: { marginVertical: 12 },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f97316',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceResultBox: {
    backgroundColor: '#fff7ed',
    padding: 12,
    borderRadius: 10,
    marginVertical: 12,
  },
  voiceResultText: { fontSize: 18 },

  voiceActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  tryAgainBtn: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
  },
  searchBtn: {
    padding: 12,
    backgroundColor: '#f97316',
    borderRadius: 10,
  },
});