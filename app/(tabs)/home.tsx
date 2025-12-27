import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  MapPin, 
  ChevronDown, 
  Search, 
  Mic, 
  Phone, 
  Globe,
  ChevronLeft,
  ChevronRight,
  Star
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const HomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 1. STICKY HEADER (Matches image_b1a943.png) */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.locIconBg}>
            <MapPin size={18} color="#FF7A00" />
          </View>
          <View>
            <Text style={styles.locLabel}>Current Location</Text>
            <View style={styles.locNameRow}>
              <Text style={styles.locName}>Khopoli</Text>
              <ChevronDown size={14} color="#FF7A00" />
            </View>
          </View>
        </View>
        <Text style={styles.brandTitle}>Sevadhar</Text>
        <TouchableOpacity style={styles.langBtn}>
          <Globe size={14} color="#333" />
          <Text style={styles.langText}>EN</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        
        {/* 2. SEARCH BAR (Matches image_b1a943.png) */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Search size={20} color="#999" />
            <TextInput placeholder="Search for services..." style={styles.searchInput} />
            <TouchableOpacity style={styles.micBtn}>
              <Mic size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. PROMO BANNER CAROUSEL (Matches image_b1a943.png & image_bc956b.png) */}
        <View style={styles.bannerContainer}>
          <LinearGradient
            colors={['#FFB87A', '#FF9F43']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
          >
            <View style={styles.bannerTextContent}>
              <Text style={styles.bannerDiscount}>20% OFF</Text>
              <Text style={styles.bannerSub}>on your first booking</Text>
              <View style={styles.codeBadge}>
                <Text style={styles.codeText}>Use code: FIRST20</Text>
              </View>
            </View>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6632/6632881.png' }} 
              style={styles.bannerIcon} 
            />
          </LinearGradient>
          
          <View style={styles.carouselIndicators}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <TouchableOpacity style={[styles.arrowBtn, styles.arrowLeft]}>
            <ChevronLeft size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.arrowBtn, styles.arrowRight]}>
            <ChevronRight size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* 4. RECOMMENDED SECTION (Matches image_b1a943.png) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
        </View>
        <View style={styles.horizontalWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll}>
            <TouchableOpacity style={styles.recCard}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400' }} style={styles.recImage} />
              <View style={[styles.recBadge, { backgroundColor: '#FF7A00' }]}><Text style={styles.recBadgeText}>Try & Hire</Text></View>
              <Text style={styles.recTitle}>Home Cleaning</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.recCard}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400' }} style={styles.recImage} />
              <View style={[styles.recBadge, { backgroundColor: '#10B981' }]}><Text style={styles.recBadgeText}>Warranty</Text></View>
              <Text style={styles.recTitle}>Plumber</Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={styles.scrollIndicatorTrack}>
            <View style={styles.scrollIndicatorThumb} />
          </View>
        </View>

        {/* 5. MOST USED BY YOU (Matches image_b1a943.png circular icons) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Most Used by You</Text>
          <Text style={styles.sectionLabel}>Based on your booking history</Text>
        </View>
        <View style={styles.mostUsedRow}>
          {[
            { name: 'Plumber', img: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=200', count: '5x booked' },
            { name: 'Electrician', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200', count: '3x booked' },
            { name: 'Home Clean', img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=200', count: '2x booked' }
          ].map((item, index) => (
            <View key={index} style={styles.circularItem}>
              <View style={styles.circleBorder}>
                <Image source={{ uri: item.img }} style={styles.circleImg} />
              </View>
              <Text style={styles.circleName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.circleSub}>{item.count}</Text>
            </View>
          ))}
        </View>

        {/* 6. ALL SERVICES GRID (Matches image_b1ac24.png) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Services</Text>
          <Text style={styles.sectionLabel}>Browse all available services</Text>
        </View>
        <View style={styles.grid}>
          {[
            { name: 'Home Cleaning', tag: 'Try & Hire', color: '#FF7A00', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200' },
            { name: 'AC Repair', tag: 'Warranty', color: '#10B981', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200' },
            { name: 'Geyser Repair', tag: null, color: null, img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200' },
            { name: 'Painter (POP)', tag: 'Try & Hire', color: '#FF7A00', img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=200' },
            { name: 'Scrap Dealer', tag: null, color: null, img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=200' },
            { name: 'Pandit', tag: null, color: null, img: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=200' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.gridItem}>
              <Image source={{ uri: item.img }} style={styles.gridImg} />
              {item.tag && (
                <View style={[styles.gridBadge, { backgroundColor: item.color }]}>
                  <Text style={styles.gridBadgeText}>{item.tag}</Text>
                </View>
              )}
              <View style={styles.gridOverlay}>
                <Text style={styles.gridText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 7. MOST CALLED THIS WEEK (Matches image_b1ac45.png / image_bc95c5.png) */}
        <View style={styles.sectionHeader}>
          <View style={styles.row}>
            <Phone size={18} color="#FF7A00" style={{ marginRight: 6 }} />
            <Text style={styles.sectionTitle}>Most Called This Week</Text>
          </View>
          <Text style={styles.sectionLabel}>Top rated & most responsive workers</Text>
        </View>
        <View style={styles.workerList}>
          {[
            { name: 'Raju Plumber', service: 'Plumber', rating: '4.9', calls: '234', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { name: 'Suresh Electric', service: 'Electrician', rating: '4.8', calls: '198', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
            { name: 'Priya Cleaning', service: 'Home Cleaning', rating: '4.7', calls: '176', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
          ].map((worker, index) => (
            <TouchableOpacity key={index} style={styles.workerCard}>
              <View style={styles.workerAvatarContainer}>
                <Image source={{ uri: worker.img }} style={styles.workerAvatar} />
                <View style={styles.onlineDot} />
              </View>
              <View style={styles.workerInfo}>
                <Text style={styles.workerName}>{worker.name}</Text>
                <Text style={styles.workerService}>{worker.service}</Text>
              </View>
              <View style={styles.workerStats}>
                <View style={styles.row}>
                  <Star size={14} color="#FF7A00" fill="#FF7A00" />
                  <Text style={styles.ratingText}>{worker.rating}</Text>
                </View>
                <Text style={styles.callsText}>{worker.calls} calls</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* FLOATING SOS BUTTON (Matches image_b1a943.png) */}
      <TouchableOpacity style={styles.sosButton}>
        <Phone size={28} color="#FFF" fill="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollPadding: { paddingBottom: 100 },
  row: { flexDirection: 'row', alignItems: 'center' },
  
  // Header
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingVertical: 12,
    backgroundColor: '#FFF'
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  locIconBg: { backgroundColor: '#FFF7ED', padding: 8, borderRadius: 12, marginRight: 8 },
  locLabel: { fontSize: 10, color: '#999' },
  locNameRow: { flexDirection: 'row', alignItems: 'center' },
  locName: { fontSize: 14, fontWeight: 'bold', color: '#FF7A00', marginRight: 2 },
  brandTitle: { fontSize: 22, fontWeight: 'bold', color: '#FF7A00' },
  langBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  langText: { fontSize: 12, fontWeight: 'bold', marginLeft: 4 },

  // Search
  searchSection: { paddingHorizontal: 16, paddingVertical: 8 },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F3F4F6', 
    borderRadius: 16, 
    paddingHorizontal: 12, 
    height: 54,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  micBtn: { backgroundColor: '#FF7A00', padding: 8, borderRadius: 12 },

  // Banner
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
  arrowBtn: { position: 'absolute', top: '40%', width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 3 },
  arrowLeft: { left: 4 },
  arrowRight: { right: 4 },

  // Sections
  sectionHeader: { paddingHorizontal: 16, marginTop: 24, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  sectionLabel: { fontSize: 12, color: '#666', marginTop: 2 },
  
  // Horizontal Scroll
  horizontalWrapper: { position: 'relative' },
  hScroll: { paddingLeft: 16 },
  recCard: { width: width * 0.44, backgroundColor: '#FFF', borderRadius: 20, marginRight: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#EEE' },
  recImage: { width: '100%', height: 110 },
  recBadge: { position: 'absolute', top: 8, left: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  recBadgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  recTitle: { padding: 12, fontSize: 14, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  scrollIndicatorTrack: { height: 4, backgroundColor: '#EEE', width: 100, alignSelf: 'center', marginTop: 12, borderRadius: 2 },
  scrollIndicatorThumb: { height: 4, backgroundColor: '#FF7A00', width: 40, borderRadius: 2 },

  // Most Used (Circular)
  mostUsedRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 },
  circularItem: { width: (width - 64) / 3, alignItems: 'center' },
  circleBorder: { width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: '#E5E7EB', padding: 2, marginBottom: 8 },
  circleImg: { width: '100%', height: '100%', borderRadius: 35 },
  circleName: { fontSize: 13, fontWeight: 'bold', color: '#333' },
  circleSub: { fontSize: 10, color: '#999' },

  // Grid
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, justifyContent: 'space-between' },
  gridItem: { width: '31%', height: 100, borderRadius: 16, marginBottom: 12, overflow: 'hidden' },
  gridImg: { width: '100%', height: '100%' },
  gridBadge: { position: 'absolute', top: 6, left: 6, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  gridBadgeText: { color: '#FFF', fontSize: 8, fontWeight: 'bold' },
  gridOverlay: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', paddingVertical: 4 },
  gridText: { color: '#FFF', fontSize: 10, fontWeight: 'bold', textAlign: 'center' },

  // Most Called List
  workerList: { paddingHorizontal: 16 },
  workerCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    padding: 12, 
    borderRadius: 20, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    elevation: 1
  },
  workerAvatarContainer: { position: 'relative' },
  workerAvatar: { width: 50, height: 50, borderRadius: 25 },
  onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderRadius: 7, backgroundColor: '#10B981', borderWidth: 2, borderColor: '#FFF' },
  workerInfo: { flex: 1, marginLeft: 12 },
  workerName: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  workerService: { fontSize: 12, color: '#666' },
  workerStats: { alignItems: 'flex-end' },
  ratingText: { fontSize: 14, fontWeight: 'bold', marginLeft: 4 },
  callsText: { fontSize: 11, color: '#999', marginTop: 2 },

  // SOS
  sosButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#EF4444',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5
  }
});

export default HomePage;