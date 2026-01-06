import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  ArrowLeft, BookOpen, Briefcase, Calendar, Check, ChevronDown, ChevronLeft, ChevronRight,
  Clapperboard, Construction, Dog, Globe, Hammer, Heart, Home, Layers, Leaf, MapPin, Mic,
  Phone, Scissors, Search, Sprout, Star, Stethoscope, Store, Trash2, Truck, Users, Wrench, X
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const HomePage = () => {
  const router = useRouter();
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [voiceModalVisible, setVoiceModalVisible] = useState(false);
  const [voiceStep, setVoiceStep] = useState<'listening' | 'result'>('listening');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Khopoli');
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  const sevadharCategories = [
    { id: '1', name: 'Home Help', icon: Home, color: '#FF7A00' },
    { id: '2', name: 'Repairs', icon: Wrench, color: '#3B82F6' },
    { id: '3', name: 'Construction', icon: Construction, color: '#F59E0B' },
    { id: '4', name: 'Gardening', icon: Leaf, color: '#10B981' },
    { id: '5', name: 'Scrap & Pheri', icon: Trash2, color: '#6B7280' },
    { id: '6', name: 'Religious', icon: Users, color: '#8B5CF6' },
    { id: '7', name: 'Wellness', icon: Heart, color: '#EC4899' },
    { id: '8', name: 'Food Vendors', icon: Store, color: '#EF4444' },
    { id: '9', name: 'Education', icon: BookOpen, color: '#10B981' },
    { id: '10', name: 'Clothing', icon: Scissors, color: '#F97316' },
    { id: '11', name: 'Pets', icon: Dog, color: '#3B82F6' },
    { id: '12', name: 'Healthcare', icon: Stethoscope, color: '#EF4444' },
    { id: '13', name: 'Events', icon: Calendar, color: '#8B5CF6' },
    { id: '14', name: 'Hardware', icon: Hammer, color: '#4B5563' },
    { id: '15', name: 'Traditional', icon: Hammer, color: '#D97706' },
    { id: '16', name: 'Transport', icon: Truck, color: '#2563EB' },
    { id: '17', name: 'Professional', icon: Briefcase, color: '#1F2937' },
    { id: '18', name: 'Design', icon: Layers, color: '#059669' },
    { id: '19', name: 'Arts & Media', icon: Clapperboard, color: '#7C3AED' },
    { id: '20', name: 'Agriculture', icon: Sprout, color: '#15803D' },
  ];

  const handleVoiceTrigger = () => {
    setVoiceStep('listening');
    setVoiceModalVisible(true);
    setTimeout(() => { setVoiceStep('result'); }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={() => setLocationModalVisible(true)}>
          <View style={styles.locIconBg}><MapPin size={18} color="#FF7A00" /></View>
          <View>
            <Text style={styles.locLabel}>Current Location</Text>
            <View style={styles.locNameRow}><Text style={styles.locName}>{selectedLocation}</Text><ChevronDown size={14} color="#FF7A00" /></View>
          </View>
        </TouchableOpacity>
        <Text style={styles.brandTitle}>Sevadhar</Text>
        <TouchableOpacity style={styles.langBtn} onPress={() => setLanguageModalVisible(true)}>
          <Globe size={14} color="#333" /><Text style={styles.langText}>{selectedLanguage}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        <View style={styles.searchSection}>
          <TouchableOpacity activeOpacity={1} style={styles.searchBar} onPress={() => setSearchVisible(true)}>
            <Search size={20} color="#999" />
            <Text style={styles.searchPlaceholderText}>Search for services...</Text>
            <TouchableOpacity style={styles.micBtn} onPress={handleVoiceTrigger}><Mic size={20} color="#FFF" /></TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View style={styles.bannerContainer}>
          <LinearGradient colors={['#FFB87A', '#FF9F43']} style={styles.banner}>
            <View style={styles.bannerTextContent}>
              <Text style={styles.bannerDiscount}>20% OFF</Text>
              <Text style={styles.bannerSub}>on your first booking</Text>
              <View style={styles.codeBadge}><Text style={styles.codeText}>Use code: FIRST20</Text></View>
            </View>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6632/6632881.png' }} style={styles.bannerIcon} />
          </LinearGradient>
          <View style={styles.carouselIndicators}><View style={[styles.dot, styles.activeDot]} /><View style={styles.dot} /><View style={styles.dot} /></View>
        </View>

        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Recommended for You</Text></View>
        <View style={styles.horizontalWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll}>
            <TouchableOpacity style={styles.recCard} onPress={() => router.push('/service/home-cleaning')}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400' }} style={styles.recImage} />
              <View style={[styles.recBadge, { backgroundColor: '#FF7A00' }]}><Text style={styles.recBadgeText}>Try & Hire</Text></View>
              <Text style={styles.recTitle}>Home Cleaning</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recCard} onPress={() => router.push('/service/plumber')}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400' }} style={styles.recImage} />
              <View style={[styles.recBadge, { backgroundColor: '#10B981' }]}><Text style={styles.recBadgeText}>Warranty</Text></View>
              <Text style={styles.recTitle}>Plumber</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Most Used by You</Text></View>
        <View style={styles.mostUsedRow}>
          {[{ name: 'Plumber', slug: 'plumber', img: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=200', count: '5x booked' },
            { name: 'Electrician', slug: 'electrician', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200', count: '3x booked' },
            { name: 'Home Clean', slug: 'home-cleaning', img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=200', count: '2x booked' }
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.circularItem} onPress={() => router.push(`/service/${item.slug}`)}>
              <View style={styles.circleBorder}><Image source={{ uri: item.img }} style={styles.circleImg} /></View>
              <Text style={styles.circleName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.circleSub}>{item.count}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>All Services</Text></View>
        <View style={styles.grid}>
          {[{ name: 'Home Cleaning', slug: 'home-cleaning', tag: 'Try & Hire', color: '#FF7A00', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200' },
            { name: 'AC Repair', slug: 'ac-repair', tag: 'Warranty', color: '#10B981', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200' },
            { name: 'Geyser Repair', slug: 'geyser-repair', tag: null, color: null, img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200' },
            { name: 'Painter (POP)', slug: 'painter', tag: 'Try & Hire', color: '#FF7A00', img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=200' },
            { name: 'Scrap Dealer', slug: 'scrap-dealer', tag: null, color: null, img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=200' },
            { name: 'Pandit', slug: 'pandit', tag: null, color: null, img: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=200' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.gridItem} onPress={() => router.push(`/service/${item.slug}`)}>
              <Image source={{ uri: item.img }} style={styles.gridImg} />
              {item.tag && <View style={[styles.gridBadge, { backgroundColor: item.color }]}><Text style={styles.gridBadgeText}>{item.tag}</Text></View>}
              <View style={styles.gridOverlay}><Text style={styles.gridText}>{item.name}</Text></View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.row}><Phone size={18} color="#FF7A00" style={{ marginRight: 6 }} /><Text style={styles.sectionTitle}>Most Called This Week</Text></View>
        </View>
        <View style={styles.workerList}>
          {[{ name: 'Raju Plumber', service: 'Plumber', rating: '4.9', calls: '234', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { name: 'Suresh Electric', service: 'Electrician', rating: '4.8', calls: '198', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
            { name: 'Priya Cleaning', service: 'Home Cleaning', rating: '4.7', calls: '176', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
          ].map((worker, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.workerCard}
              onPress={() => router.push({
                pathname: '/service/serviceprofile',
                params: { 
                  name: worker.name, 
                  image: worker.img, 
                  rating: worker.rating, 
                  calls: worker.calls, 
                  location: 'Khopoli, Maharashtra',
                  specialties: 'Reliable, Quick Service'
                }
              })}
            >
              <View style={styles.workerAvatarContainer}><Image source={{ uri: worker.img }} style={styles.workerAvatar} /><View style={styles.onlineDot} /></View>
              <View style={styles.workerInfo}><Text style={styles.workerName}>{worker.name}</Text><Text style={styles.workerService}>{worker.service}</Text></View>
              <View style={styles.workerStats}><View style={styles.row}><Star size={14} color="#FF7A00" fill="#FF7A00" /><Text style={styles.ratingText}>{worker.rating}</Text></View><Text style={styles.callsText}>{worker.calls} calls</Text></View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Most Popular</Text></View>
        <View style={styles.horizontalWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll}>
            {[{ name: 'Home Cleaning', slug: 'home-cleaning', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', rating: '4.8', count: '3.8M' },
              { name: 'Plumber', slug: 'plumber', img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400', rating: '4.7', count: '2.8M' },
            ].map((item, index) => (
              <View key={index} style={styles.popCardContainer}>
                <TouchableOpacity style={styles.popCard} onPress={() => router.push(`/service/${item.slug}`)}><Image source={{ uri: item.img }} style={styles.popImage} /></TouchableOpacity>
                <View style={styles.popInfo}><Text style={styles.popTitle}>{item.name}</Text>
                  <View style={styles.row}><Star size={12} color="#FF7A00" fill="#FF7A00" /><Text style={styles.popRating}>{item.rating} <Text style={styles.popCount}>({item.count})</Text></Text></View>
                </View>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={[styles.popArrow, { left: 5 }]}><ChevronLeft size={20} color="#333" /></TouchableOpacity>
          <TouchableOpacity style={[styles.popArrow, { right: 5 }]}><ChevronRight size={20} color="#333" /></TouchableOpacity>
          <View style={styles.popIndicatorTrack}><View style={styles.popIndicatorThumb} /></View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.sosButton}><Phone size={28} color="#FFF" fill="#FFF" /></TouchableOpacity>

      <Modal visible={locationModalVisible} transparent animationType="fade">
        <View style={styles.dropdownOverlay}>
          <View style={styles.dropdownCard}>
            <View style={styles.dropdownHeader}><Text style={styles.dropdownTitle}>Select Location</Text><TouchableOpacity onPress={() => setLocationModalVisible(false)}><X size={20} color="#666" /></TouchableOpacity></View>
            {['Khopoli', 'Khalapur'].map((loc) => (
              <TouchableOpacity key={loc} style={styles.dropdownItem} onPress={() => { setSelectedLocation(loc); setLocationModalVisible(false); }}>
                <Text style={[styles.dropdownText, selectedLocation === loc && { color: '#FF7A00', fontWeight: 'bold' }]}>{loc}</Text>
                {selectedLocation === loc && <Check size={18} color="#FF7A00" />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Modal visible={languageModalVisible} transparent animationType="fade">
        <View style={styles.dropdownOverlay}>
          <View style={styles.dropdownCard}>
            <View style={styles.dropdownHeader}><Text style={styles.dropdownTitle}>Select Language</Text><TouchableOpacity onPress={() => setLanguageModalVisible(false)}><X size={20} color="#666" /></TouchableOpacity></View>
            {[{ label: 'English', value: 'EN' }, { label: 'मराठी', value: 'MR' }, { label: 'हिंदी', value: 'HI' }].map((lang) => (
              <TouchableOpacity key={lang.value} style={styles.dropdownItem} onPress={() => { setSelectedLanguage(lang.value); setLanguageModalVisible(false); }}>
                <Text style={[styles.dropdownText, selectedLanguage === lang.value && { color: '#FF7A00', fontWeight: 'bold' }]}>{lang.label}</Text>
                {selectedLanguage === lang.value && <Check size={18} color="#FF7A00" />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Modal visible={isSearchVisible} animationType="slide" onRequestClose={() => setSearchVisible(false)}>
        <SafeAreaView style={styles.searchOverlay}>
          <View style={styles.searchHeader}><TouchableOpacity onPress={() => setSearchVisible(false)}><ArrowLeft size={24} color="#333" /></TouchableOpacity><Text style={styles.searchTitle}>Search</Text></View>
          <View style={styles.searchInputContainer}><Search size={22} color="#666" style={{ marginRight: 10 }} /><TextInput placeholder="Find Electrician, Maid, or Pandit..." style={styles.fullSearchInput} autoFocus={true} value={searchQuery} onChangeText={setSearchQuery} /></View>
          <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
            <Text style={styles.searchSectionTitle}>Your history</Text>
            <View style={styles.pillsRow}>{['Maid', 'Cook', 'Plumber', 'Electrician'].map((text, i) => (<TouchableOpacity key={i} style={styles.pill} onPress={() => {setSearchQuery(text); setSearchVisible(false);}}><Text style={styles.pillText}>{text}</Text></TouchableOpacity>))}</View>
            <Text style={styles.searchSectionTitle}>Search by category</Text>
            <View style={styles.searchGrid}>
              {sevadharCategories.map((item) => (
                <TouchableOpacity key={item.id} style={styles.searchGridItem} onPress={() => { setSearchQuery(item.name); setSearchVisible(false); }}>
                  <item.icon size={22} color={item.color} style={{ marginRight: 12 }} /><Text style={styles.searchGridText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.searchSectionTitle}>Trending searches</Text>
            <View style={styles.pillsRow}>{['AC Repair', 'Deep Clean', 'Mali', 'Doctor', 'Tailor', 'Pandit'].map((text, i) => (<TouchableOpacity key={i} style={styles.pill} onPress={() => {setSearchQuery(text); setSearchVisible(false);}}><Text style={styles.pillText}>{text}</Text></TouchableOpacity>))}</View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal visible={voiceModalVisible} transparent={true} animationType="fade">
        <View style={styles.voiceOverlayBg}>
          <View style={styles.voiceContainer}>
            <TouchableOpacity style={styles.closeVoice} onPress={() => setVoiceModalVisible(false)}><X size={24} color="#666" /></TouchableOpacity>
            <Text style={styles.voiceTitle}>Voice Search</Text>
            {voiceStep === 'listening' ? (
              <><Text style={styles.voiceInstruction}>Tap the microphone to speak</Text><View style={styles.voiceMicCircle}><Mic size={40} color="#FFF" /></View></>
            ) : (
              <><Text style={styles.voiceInstruction}>Search result:</Text><View style={styles.voiceResultBox}><Text style={styles.voiceResultText}>"Plumber"</Text></View>
                <View style={styles.voiceActionRow}><TouchableOpacity style={styles.voiceTryAgain} onPress={() => setVoiceStep('listening')}><Text style={styles.tryAgainText}>Try Again</Text></TouchableOpacity><TouchableOpacity style={styles.voiceSearchBtn} onPress={() => { setVoiceModalVisible(false); setSearchVisible(true); setSearchQuery('Plumber'); }}><Text style={styles.searchBtnText}>Search</Text></TouchableOpacity></View></>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollPadding: { paddingBottom: 100 },
  row: { flexDirection: 'row', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFF' },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  locIconBg: { backgroundColor: '#FFF7ED', padding: 8, borderRadius: 12, marginRight: 8 },
  locLabel: { fontSize: 10, color: '#999' },
  locNameRow: { flexDirection: 'row', alignItems: 'center' },
  locName: { fontSize: 14, fontWeight: 'bold', color: '#FF7A00', marginRight: 2 },
  brandTitle: { fontSize: 22, fontWeight: 'bold', color: '#FF7A00' },
  langBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  langText: { fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
  searchSection: { paddingHorizontal: 16, paddingVertical: 8 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 16, paddingHorizontal: 12, height: 54, borderWidth: 1, borderColor: '#E5E7EB' },
  searchPlaceholderText: { flex: 1, marginLeft: 10, fontSize: 16, color: '#999' },
  micBtn: { backgroundColor: '#FF7A00', padding: 8, borderRadius: 12 },
  bannerContainer: { padding: 16, position: 'relative' },
  banner: { borderRadius: 24, padding: 20, flexDirection: 'row', justifyContent: 'space-between', height: 140 },
  bannerTextContent: { flex: 1 },
  bannerDiscount: { fontSize: 28, fontWeight: '900', color: '#FFF' },
  bannerSub: { fontSize: 14, color: '#FFF', marginBottom: 12 },
  codeBadge: { backgroundColor: 'rgba(255,255,255,0.3)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, alignSelf: 'flex-start' },
  codeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  bannerIcon: { width: 80, height: 80, opacity: 0.6 },
  carouselIndicators: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  dot: { width: 25, height: 4, borderRadius: 2, backgroundColor: '#E5E7EB', marginHorizontal: 2 },
  activeDot: { backgroundColor: '#FF7A00' },
  sectionHeader: { paddingHorizontal: 16, marginTop: 24, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  horizontalWrapper: { position: 'relative' }, 
  hScroll: { paddingLeft: 16 },
  recCard: { width: width * 0.44, backgroundColor: '#FFF', borderRadius: 20, marginRight: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#EEE' },
  recImage: { width: '100%', height: 110 },
  recBadge: { position: 'absolute', top: 8, left: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  recBadgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  recTitle: { padding: 12, fontSize: 14, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  mostUsedRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 },
  circularItem: { width: (width - 64) / 3, alignItems: 'center' },
  circleBorder: { width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: '#E5E7EB', padding: 2, marginBottom: 8 },
  circleImg: { width: '100%', height: '100%', borderRadius: 35 },
  circleName: { fontSize: 13, fontWeight: 'bold', color: '#333' },
  circleSub: { fontSize: 10, color: '#999' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, justifyContent: 'space-between' },
  gridItem: { width: '31%', height: 100, borderRadius: 16, marginBottom: 12, overflow: 'hidden' },
  gridImg: { width: '100%', height: '100%' },
  gridBadge: { position: 'absolute', top: 6, left: 6, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  gridBadgeText: { color: '#FFF', fontSize: 8, fontWeight: 'bold' },
  gridOverlay: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', paddingVertical: 4 },
  gridText: { color: '#FFF', fontSize: 10, fontWeight: 'bold', textAlign: 'center' },
  workerList: { paddingHorizontal: 16 },
  workerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 12, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: '#F3F4F6', elevation: 1 },
  workerAvatarContainer: { position: 'relative' },
  workerAvatar: { width: 50, height: 50, borderRadius: 25 },
  onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderRadius: 7, backgroundColor: '#10B981', borderWidth: 2, borderColor: '#FFF' },
  workerInfo: { flex: 1, marginLeft: 12 },
  workerName: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  workerService: { fontSize: 12, color: '#666' },
  workerStats: { alignItems: 'flex-end' },
  ratingText: { fontSize: 14, fontWeight: 'bold', marginLeft: 4 },
  callsText: { fontSize: 11, color: '#999', marginTop: 2 },
  popCardContainer: { width: width * 0.45, marginRight: 15 },
  popCard: { borderRadius: 15, overflow: 'hidden', height: 120 },
  popImage: { width: '100%', height: '100%' },
  popInfo: { marginTop: 8 },
  popTitle: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  popRating: { fontSize: 13, color: '#333', fontWeight: 'bold', marginLeft: 4 },
  popCount: { color: '#999', fontWeight: 'normal' },
  popArrow: { position: 'absolute', top: '30%', backgroundColor: '#FFF', width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  popIndicatorTrack: { height: 4, backgroundColor: '#EEE', width: 100, alignSelf: 'center', marginTop: 20, borderRadius: 2 },
  popIndicatorThumb: { height: 4, backgroundColor: '#FF7A00', width: 35, borderRadius: 2 },
  sosButton: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#EF4444', width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', elevation: 6 },
  dropdownOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  dropdownCard: { width: width * 0.8, backgroundColor: '#FFF', borderRadius: 20, padding: 20, elevation: 5 },
  dropdownHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#EEE', paddingBottom: 10 },
  dropdownTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  dropdownItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  dropdownText: { fontSize: 16, color: '#444' },
  searchOverlay: { flex: 1, backgroundColor: '#FFF' },
  searchHeader: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  searchTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 16 },
  searchInputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', marginHorizontal: 16, borderRadius: 30, paddingHorizontal: 16, height: 50, marginBottom: 20, borderWidth: 1, borderColor: '#EEE' },
  fullSearchInput: { flex: 1, fontSize: 16 },
  searchSectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 15 },
  pillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  pill: { backgroundColor: '#F3F4F6', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB' },
  pillText: { fontSize: 14, color: '#444' },
  searchGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  searchGridItem: { width: '48%', flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 15, borderWidth: 1, borderColor: '#EEE', marginBottom: 12 },
  searchGridText: { fontSize: 13, fontWeight: '600', color: '#333' },
  voiceOverlayBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  voiceContainer: { width: width * 0.85, backgroundColor: '#FFF', borderRadius: 25, padding: 24, alignItems: 'center' },
  closeVoice: { alignSelf: 'flex-end' },
  voiceTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  voiceInstruction: { fontSize: 16, color: '#666', marginBottom: 30 },
  voiceMicCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FF7A00', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  voiceResultBox: { backgroundColor: '#FFF7ED', padding: 20, borderRadius: 12, width: '100%', marginBottom: 30 },
  voiceResultText: { fontSize: 22, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  voiceActionRow: { flexDirection: 'row', gap: 15, width: '100%' },
  voiceTryAgain: { flex: 1, height: 50, borderRadius: 12, borderWidth: 1, borderColor: '#FF7A00', justifyContent: 'center', alignItems: 'center' },
  tryAgainText: { color: '#FF7A00', fontWeight: 'bold' },
  voiceSearchBtn: { flex: 1, height: 50, borderRadius: 12, backgroundColor: '#FF7A00', justifyContent: 'center', alignItems: 'center' },
  searchBtnText: { color: '#FFF', fontWeight: 'bold' }
});

export default HomePage;