import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  StatusBar,
  ImageBackground,
  Modal,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Search, 
  Star, 
  Heart, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Mic, 
  X, 
  MessageCircle, 
  Trash2,
  CheckCircle2
} from 'lucide-react-native';

const { width } = Dimensions.get('window');
const headerImage = require('../../assets/images/History.png');

const initialHistory = [
  { id: '1', name: 'Ramesh Electrician', service: 'General Electrical Work', rating: 4.5, reviews: 12, date: '22 Dec', time: '03:20 PM', image: 'https://randomuser.me/api/portraits/men/21.jpg', status: 'completed', isFavorite: false, month: 'DECEMBER 2024' },
  { id: '2', name: 'Suresh Plumber', service: 'Leakage Fix & Piping', rating: 5.0, reviews: 45, date: '20 Dec', time: '07:15 PM', image: 'https://randomuser.me/api/portraits/men/22.jpg', status: 'completed', isFavorite: true, month: 'DECEMBER 2024' },
  { id: '3', name: 'Kumar AC Repair', service: 'AC Maintenance', rating: 4.0, reviews: 8, date: '18 Dec', time: '04:50 PM', image: 'https://randomuser.me/api/portraits/men/23.jpg', status: 'completed', isFavorite: false, month: 'DECEMBER 2024' },
  { id: '4', name: 'John Painter', service: 'Interior Painting', rating: 3.8, reviews: 15, date: '12 Nov', time: '10:00 AM', image: 'https://randomuser.me/api/portraits/men/24.jpg', status: 'cancelled', isFavorite: false, month: 'NOVEMBER 2024' },
  { id: '5', name: 'Amit Carpenter', service: 'Furniture Repair', rating: 4.2, reviews: 20, date: '05 Nov', time: '11:00 AM', image: 'https://randomuser.me/api/portraits/men/25.jpg', status: 'completed', isFavorite: true, month: 'NOVEMBER 2024' },
  { id: '6', name: 'Sita Cleaning', service: 'Full House Deep Clean', rating: 4.9, reviews: 110, date: '28 Oct', time: '09:00 AM', image: 'https://randomuser.me/api/portraits/women/26.jpg', status: 'completed', isFavorite: false, month: 'OCTOBER 2024' },
];

export default function HistoryPage() {
  const [history, setHistory] = useState(initialHistory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  
  /** VOICE SEARCH STATES */
  const [voiceModal, setVoiceModal] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceResult, setVoiceResult] = useState<string | null>(null);

  const toggleFavorite = (id: string) => {
    setHistory(history.map(item => 
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
  };

  const toggleSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const deleteSelected = () => {
    setHistory(history.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setIsDeleteMode(false);
  };

  const filteredHistory = history.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startMockListening = () => {
    setListening(true);
    setVoiceResult(null);
    setTimeout(() => {
      setListening(false);
      setVoiceResult('Electrician');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.outerContainer}>
        <StatusBar barStyle="dark-content" />
        
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
          {/* BACKGROUND HEADER - Image now scrolls with content */}
          <View style={styles.headerWrapper}>
            <ImageBackground source={headerImage} style={styles.backgroundImage} resizeMode="cover">
              <LinearGradient colors={['rgba(255,255,255,0)', 'rgba(255,243,230,0.8)']} style={StyleSheet.absoluteFillObject} />
            </ImageBackground>
          </View>

          <View style={styles.contentArea}>
            <View style={styles.dragIndicator} />

            {/* SEARCH BAR */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Search size={18} color="#94a3b8" />
                <TextInput
                  placeholder="Search past services..."
                  style={styles.searchInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <TouchableOpacity onPress={() => setVoiceModal(true)}>
                  <Mic size={20} color="#f97316" />
                </TouchableOpacity>
              </View>
            </View>

            {/* DELETE ACTION BAR */}
            <View style={styles.actionHeader}>
                <TouchableOpacity onPress={() => setIsDeleteMode(!isDeleteMode)}>
                    <Text style={styles.actionHeaderText}>{isDeleteMode ? "Cancel" : "Select to Delete"}</Text>
                </TouchableOpacity>
                {isDeleteMode && selectedItems.length > 0 && (
                    <TouchableOpacity onPress={deleteSelected} style={styles.deleteBtn}>
                        <Trash2 size={18} color="#EF4444" />
                        <Text style={styles.deleteBtnText}>Delete ({selectedItems.length})</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.listContainer}>
              {filteredHistory.map((item, index) => {
                const showMonth = index === 0 || item.month !== filteredHistory[index - 1].month;
                const isSelected = selectedItems.includes(item.id);

                return (
                  <View key={item.id}>
                    {showMonth && <Text style={styles.monthHeader}>{item.month}</Text>}
                    
                    <TouchableOpacity 
                        activeOpacity={0.9}
                        onPress={() => isDeleteMode ? toggleSelection(item.id) : null}
                        style={[styles.card, isSelected && styles.selectedCard]}
                    >
                      <View style={styles.cardMain}>
                        {/* SELECT CIRCLE FOR DELETE MODE */}
                        {isDeleteMode && (
                            <View style={styles.selectionCircle}>
                                {isSelected ? <CheckCircle2 size={24} color="#f97316" fill="#fff"/> : <View style={styles.unselectedCircle} />}
                            </View>
                        )}

                        <Image source={{ uri: item.image }} style={styles.avatar} />
                        
                        <View style={styles.cardDetails}>
                          <View style={styles.nameRow}>
                            <View style={{ flex: 1 }}>
                              <Text style={styles.workerName}>{item.name}</Text>
                              <Text style={styles.serviceName}>{item.service}</Text>
                            </View>
                            {/* HEART ICON RESTORED */}
                            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                              <Heart size={20} color={item.isFavorite ? "#EF4444" : "#D1D5DB"} fill={item.isFavorite ? "#EF4444" : "none"} />
                            </TouchableOpacity>
                          </View>

                          <View style={styles.metaRow}>
                            {/* RATING RESTORED */}
                            <View style={styles.ratingBox}>
                                <Star size={14} color="#facc15" fill="#facc15" />
                                <Text style={styles.ratingText}>{item.rating} ({item.reviews})</Text>
                            </View>
                            <View style={styles.metaItem}><Calendar size={12} color="#6B7280" /><Text style={styles.metaText}>{item.date}</Text></View>
                            <View style={styles.metaItem}><Clock size={12} color="#6B7280" /><Text style={styles.metaText}>{item.time}</Text></View>
                          </View>
                        </View>
                      </View>
                      
                      <View style={styles.cardFooter}>
                        <TouchableOpacity style={styles.rebookBtn}>
                          <Text style={styles.rebookBtnText}>Rebook Service</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.reviewBtn}>
                          <MessageCircle size={16} color="#f97316" />
                          <Text style={styles.reviewBtnText}>Review</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* VOICE MODAL */}
        <Modal transparent visible={voiceModal} animationType="fade">
          <View style={styles.voiceOverlay}>
            <View style={styles.voiceModal}>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setVoiceModal(false)}><X size={20} /></TouchableOpacity>
              <Text style={styles.voiceTitle}>Voice Search</Text>
              <TouchableOpacity style={styles.micButtonModal} onPress={startMockListening}><Mic size={32} color="#fff" /></TouchableOpacity>
              {listening && <Text style={{marginTop: 10}}>Listening...</Text>}
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#FAF9F6' },
  headerWrapper: { height: 280, width: '100%' },
  backgroundImage: { flex: 1, width: '100%', justifyContent: 'flex-end' },
  headerContent: { paddingBottom: 60, paddingHorizontal: 24 },
  headerTitleText: { fontSize: 34, fontWeight: 'bold', color: '#1E293B' },
  headerSubtitleText: { fontSize: 16, color: '#64748B' },
  
  contentArea: { 
    flex: 1, 
    marginTop: -40, 
    backgroundColor: '#FAF9F6',
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40,
    minHeight: 600
  },
  dragIndicator: { width: 44, height: 5, backgroundColor: '#E2E8F0', borderRadius: 3, alignSelf: 'center', marginTop: 14 },
  
  searchContainer: { paddingHorizontal: 24, marginTop: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', height: 56, borderRadius: 18, backgroundColor: '#fff', paddingHorizontal: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, gap: 10 },
  searchInput: { flex: 1, fontSize: 16 },

  actionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginTop: 20 },
  actionHeaderText: { color: '#f97316', fontWeight: 'bold', fontSize: 14 },
  deleteBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  deleteBtnText: { color: '#EF4444', fontWeight: 'bold', fontSize: 14 },

  listContainer: { paddingHorizontal: 24, paddingTop: 10, paddingBottom: 40 },
  monthHeader: { fontSize: 11, fontWeight: '800', color: '#94A3B8', marginVertical: 15, textTransform: 'uppercase', letterSpacing: 1.5 },
  
  card: { backgroundColor: 'white', borderRadius: 24, padding: 16, marginBottom: 16, elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, borderWidth: 1, borderColor: '#F1F5F9' },
  selectedCard: { borderColor: '#f97316', backgroundColor: '#FFF7ED' },
  cardMain: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  
  selectionCircle: { marginRight: 8 },
  unselectedCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#CBD5E1' },

  avatar: { width: 68, height: 68, borderRadius: 18, backgroundColor: '#F1F5F9' }, 
  cardDetails: { flex: 1 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between' },
  workerName: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  serviceName: { fontSize: 13, color: '#f97316', fontWeight: '700' },
  
  ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 4, marginRight: 10 },
  ratingText: { fontSize: 12, fontWeight: 'bold', color: '#475569' },

  metaRow: { flexDirection: 'row', gap: 10, marginTop: 8, flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: '#64748B' },
  
  cardFooter: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9', flexDirection: 'row', justifyContent: 'space-between' },
  rebookBtn: { backgroundColor: '#FFF7ED', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  rebookBtnText: { fontSize: 13, fontWeight: 'bold', color: '#f97316' },
  reviewBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  reviewBtnText: { fontSize: 13, fontWeight: 'bold', color: '#f97316' },

  voiceOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  voiceModal: { width: '85%', backgroundColor: '#fff', borderRadius: 20, padding: 24, alignItems: 'center' },
  closeBtn: { position: 'absolute', right: 16, top: 16 },
  voiceTitle: { fontSize: 20, fontWeight: 'bold' },
  micButtonModal: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#f97316', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
});