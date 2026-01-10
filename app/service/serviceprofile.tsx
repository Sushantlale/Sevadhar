
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const ProfileDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Destructure parameters. If profileImage is passed, it will be used here.
  const { 
    name = "Lakshmi Devi", 
    location = "Dadar, Mumbai", 
    rating = "4.9", 
    jobs = "456",
    // Default image used only if one isn't passed from the listing page
    profileImage = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400" 
  } = params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* 1. STICKY NAVBAR */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Details</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="share" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="bookmark-border" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 2. MAIN PROFILE CARD */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <View style={styles.imageContainer}>
              {/* The profileImage parameter is used here */}
              <Image source={{ uri: profileImage as string }} style={styles.profileImage} />
              <View style={styles.onlineDot} />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.userName}>{name}</Text>
              <View style={styles.locRow}>
                <MaterialIcons name="location-on" size={14} color="#666" />
                <Text style={styles.locText}>{location}</Text>
              </View>
              <View style={styles.statsRow}>
                <View style={styles.ratingBadge}>
                  <MaterialIcons name="star" size={12} color="#FF7A00" />
                  <Text style={styles.ratingText}>{rating}</Text>
                </View>
                <View style={styles.jobRow}>
                   <MaterialIcons name="work-outline" size={14} color="#666" />
                   <Text style={styles.jobText}>{jobs} jobs</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.playBtn}>
              <MaterialIcons name="play-arrow" size={24} color="#FF7A00" />
            </TouchableOpacity>
          </View>

          <View style={styles.badgeRow}>
            <View style={[styles.statusBadge, {backgroundColor: '#0D9488'}]}>
              <Text style={styles.statusBadgeText}>Verified</Text>
            </View>
            <View style={[styles.statusBadge, styles.outlineBadge]}>
              <Text style={styles.outlineBadgeText}>Aadhaar</Text>
              <MaterialIcons name="check" size={12} color="#666" />
            </View>
            <View style={[styles.statusBadge, {backgroundColor: '#22C55E'}]}>
              <Text style={styles.statusBadgeText}>Available</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.callBtn}>
              <MaterialIcons name="call" size={20} color="#FFF" />
              <Text style={styles.callText}>Call Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn}>
              <MaterialIcons name="favorite-border" size={20} color="#666" />
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. WORK PHOTOS SECTION */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Work Photos</Text>
            <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?w=400' }} style={styles.workPhoto} />
            <Image source={{ uri: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400' }} style={styles.workPhoto} />
            <Image source={{ uri: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400' }} style={styles.workPhoto} />
          </ScrollView>
        </View>

        {/* 4. ABOUT SECTION */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About {name}</Text>
          <Text style={styles.aboutText}>
            Experienced domestic helper with over 5 years of experience in household management, cooking (North & South Indian), and child care. Reliable, punctual, and dedicated to maintaining a clean environment.
          </Text>
          
          <Text style={styles.subTitle}>Specialties</Text>
          <View style={styles.tagRow}>
            {['Cooking', 'Cleaning', 'Babysitting', 'Elderly Care'].map(tag => (
              <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
            ))}
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={[styles.socialIcon, { backgroundColor: '#3b5998' }]}><FontAwesome5 name="facebook-f" size={16} color="white" /></TouchableOpacity>
            <TouchableOpacity style={[styles.socialIcon, { backgroundColor: '#CD201F' }]}><FontAwesome5 name="youtube" size={16} color="white" /></TouchableOpacity>
            <TouchableOpacity style={[styles.socialIcon, { backgroundColor: '#E1306C' }]}><FontAwesome5 name="instagram" size={16} color="white" /></TouchableOpacity>
            <TouchableOpacity style={[styles.socialIcon, { backgroundColor: '#0077b5' }]}><FontAwesome5 name="linkedin-in" size={16} color="white" /></TouchableOpacity>
            <TouchableOpacity style={[styles.socialIcon, { backgroundColor: '#000' }]}><FontAwesome5 name="times" size={16} color="white" /></TouchableOpacity>
          </View>
        </View>

        {/* 5. REPORT SECTION */}
        {/* <View style={styles.card}>
            <Text style={styles.cardTitle}>Report Sevadhar</Text>
            <Text style={styles.subInfoText}>Help us to make Justdial more updated and more relevant for you.</Text>
            <TouchableOpacity style={styles.reportBtn}>
                <Text style={styles.reportBtnText}>Report Now</Text>
            </TouchableOpacity>
        </View> */}

        {/* 6. REVIEWS & RATINGS SUMMARY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews & Ratings</Text>
          <View style={styles.reviewSummaryCard}>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingBigText}>3.8</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.ratingCount}>11 Ratings</Text>
              <Text style={styles.subInfoText}>Jd rating index based on 11 ratings across the web</Text>
            </View>
          </View>
        </View>

        {/* 7. START YOUR REVIEW */}
        <View style={styles.card}>
            <Text style={styles.subTitle}>Start your Review</Text>
            <View style={styles.starRowLarge}>
                {[1,2,3,4,5].map(i => <MaterialIcons key={i} name="star-outline" size={36} color="#D1D5DB" />)}
            </View>
        </View>

        {/* 8. RECENT TREND SECTION */}
        <View style={styles.card}>
            <Text style={styles.subTitle}>Recent rating trend</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendScroll}>
                {['3.0', '5.0', '1.0', '5.0', '5.0'].map((val, i) => (
                    <View key={i} style={styles.trendChip}>
                        <Text style={styles.trendText}>{val}</Text>
                        <MaterialIcons name="star" size={14} color="#FF7A00" />
                    </View>
                ))}
            </ScrollView>
        </View>

        {/* 9. USER REVIEWS SECTION */}
        <View style={styles.card}>
            <Text style={styles.subTitle}>User Reviews</Text>
            <View style={styles.filterRow}>
                <TouchableOpacity style={[styles.filterTag, styles.filterActive]}><Text style={styles.filterActiveText}>Relevant</Text></TouchableOpacity>
                <TouchableOpacity style={styles.filterTag}><Text style={styles.filterTagText}>Latest</Text></TouchableOpacity>
                <TouchableOpacity style={styles.filterTag}><Text style={styles.filterTagText}>High to Low</Text></TouchableOpacity>
            </View>

            {/* Review Card 1 */}
            <View style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                    <View style={styles.reviewAvatarPlaceholder} />
                    <View style={{flex: 1, marginLeft: 12}}>
                        <Text style={styles.reviewerName}>Kam Need Nahi Haiusko</Text>
                        <View style={styles.starRowSmall}>
                            <MaterialIcons name="star" size={14} color="#FF7A00" />
                            {[1,2,3,4].map(i => <MaterialIcons key={i} name="star-outline" size={14} color="#D1D5DB" />)}
                        </View>
                    </View>
                    <Text style={styles.reviewDate}>18 Jun 2025</Text>
                </View>
                <View style={styles.poorServiceBadge}>
                    <MaterialIcons name="thumb-down-off-alt" size={14} color="#EF4444" />
                    <Text style={styles.poorServiceText}>Poor service</Text>
                </View>
                <Text style={styles.reviewText}>
                    "My experience with Mansi Electrical Contractor was terrible. The service was slow, and the technicians seemed unprofessional..."
                </Text>
                <View style={styles.reviewActionRow}>
                    <TouchableOpacity style={styles.reviewAction}><MaterialIcons name="thumb-up-off-alt" size={18} color="#6B7280" /><Text style={styles.actionLabel}>Helpful</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.reviewAction}><MaterialIcons name="chat-bubble-outline" size={18} color="#6B7280" /><Text style={styles.actionLabel}>Comment</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.reviewAction}><MaterialIcons name="share" size={18} color="#6B7280" /><Text style={styles.actionLabel}>Share</Text></TouchableOpacity>
                </View>
            </View>

            {/* Review Card 2 */}
            <View style={[styles.reviewCard, {borderBottomWidth: 0}]}>
                <View style={styles.reviewHeader}>
                    <View style={[styles.reviewAvatarPlaceholder, {backgroundColor: '#E0E7FF', alignItems:'center', justifyContent:'center'}]}>
                        <Text style={{color: '#4F46E5', fontWeight: 'bold'}}>RK</Text>
                    </View>
                    <View style={{flex: 1, marginLeft: 12}}>
                        <Text style={styles.reviewerName}>Ramesh Kumar</Text>
                        <View style={styles.starRowSmall}>
                            {[1,2,3,4,5].map(i => <MaterialIcons key={i} name="star" size={14} color="#FF7A00" />)}
                        </View>
                    </View>
                    <Text style={styles.reviewDate}>2 days ago</Text>
                </View>
                <Text style={styles.reviewText}>
                    Lakshmi did acts great job. Very polite and thorough with her cleaning.
                </Text>
                <View style={styles.reviewActionRow}>
                    <TouchableOpacity style={styles.reviewAction}><MaterialIcons name="thumb-up-off-alt" size={18} color="#6B7280" /><Text style={styles.actionLabel}>Helpful</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.reviewAction}><MaterialIcons name="chat-bubble-outline" size={18} color="#6B7280" /><Text style={styles.actionLabel}>Comment</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.reviewAction}><MaterialIcons name="share" size={18} color="#6B7280" /><Text style={styles.actionLabel}>Share</Text></TouchableOpacity>
                </View>
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 10 : 10,
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#111' },
  headerRight: { flexDirection: 'row', gap: 5 },
  iconBtn: { padding: 4 },

  scrollContent: { padding: 16, paddingBottom: 60 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },
  
  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  imageContainer: { position: 'relative' },
  profileImage: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#EEE' },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  headerInfo: { flex: 1, marginLeft: 15 },
  userName: { fontSize: 19, fontWeight: 'bold', color: '#111' },
  locRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locText: { fontSize: 13, color: '#666', marginLeft: 4 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  ratingBadge: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 15,
    borderColor: '#000000',
  },
  ratingText: { color: '#000000', fontSize: 12, fontWeight: 'bold', marginLeft: 3 },
  jobRow: { flexDirection: 'row', alignItems: 'center' },
  jobText: { fontSize: 13, color: '#666', marginLeft: 5 },
  playBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  badgeRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8 },
  statusBadgeText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  outlineBadge: { borderWidth: 1, borderColor: '#DDD', flexDirection: 'row', alignItems: 'center', gap: 5 },
  outlineBadgeText: { fontSize: 11, color: '#444', fontWeight: '600' },

  actionRow: { flexDirection: 'row', gap: 12, borderTopWidth: 1, borderTopColor: '#F9FAFB', paddingTop: 16 },
  callBtn: {
    flex: 2,
    backgroundColor: '#FF7A00',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    borderRadius: 14,
    shadowColor: '#FF7A00',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  callText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
  saveBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  saveText: { color: '#444', fontWeight: '600', fontSize: 14, marginLeft: 6 },

  section: { marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#111' },
  viewAll: { color: '#FF7A00', fontSize: 14, fontWeight: '700' },
  photoScroll: { paddingBottom: 10 },
  workPhoto: { width: 150, height: 110, borderRadius: 12, marginRight: 12 },

  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 8 },
  aboutText: { fontSize: 14, color: '#4B5563', lineHeight: 22, marginBottom: 15 },
  subTitle: { fontSize: 15, fontWeight: '700', color: '#111', marginBottom: 12 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: '#F3F4F6', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 25 },
  tagText: { fontSize: 12, color: '#4B5563', fontWeight: '600' },

  socialRow: { 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    gap: 12, 
    marginTop: 20, 
    paddingTop: 15, 
    borderTopWidth: 1, 
    borderTopColor: '#F3F4F6' 
  },
  socialIcon: { width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center' },

  reportBtn: { width: '100%', borderWidth: 1, borderColor: '#3B82F6', borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 10 },
  reportBtnText: { color: '#3B82F6', fontWeight: '700', fontSize: 14 },

  reviewSummaryCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 16, 
    padding: 16, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 16, 
    borderWidth: 1, 
    borderColor: '#F0F0F0' 
  },
  ratingBox: { width: 58, height: 58, backgroundColor: '#1629a3', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  ratingBigText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  ratingCount: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  subInfoText: { fontSize: 12, color: '#6B7280', lineHeight: 18 },

  starRowLarge: { flexDirection: 'row', gap: 8, marginVertical: 5 },
  trendScroll: { marginTop: 5 },
  trendChip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 5, 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 20, 
    marginRight: 10 
  },
  trendText: { fontSize: 14, fontWeight: '700', color: '#333' },

  filterRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  filterTag: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB' },
  filterActive: { backgroundColor: '#EFF6FF', borderColor: '#DBEAFE' },
  filterActiveText: { color: '#2563EB', fontWeight: '700', fontSize: 12 },
  filterTagText: { color: '#6B7280', fontWeight: '600', fontSize: 12 },

  reviewCard: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingVertical: 18 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  reviewAvatarPlaceholder: { width: 42, height: 42, borderRadius: 10, backgroundColor: '#F3F4F6' },
  reviewerName: { fontSize: 14, fontWeight: 'bold', color: '#111' },
  starRowSmall: { flexDirection: 'row', marginTop: 2 },
  reviewDate: { fontSize: 11, color: '#9CA3AF' },
  poorServiceBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6, 
    borderWidth: 1, 
    borderColor: '#FEE2E2', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 20, 
    alignSelf: 'flex-start', 
    marginBottom: 12 
  },
  poorServiceText: { fontSize: 11, color: '#EF4444', fontWeight: '700' },
  reviewText: { fontSize: 14, color: '#4B5563', lineHeight: 22, marginBottom: 15 },
  reviewActionRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 },
  reviewAction: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionLabel: { fontSize: 13, color: '#6B7280', fontWeight: '600' }
});

export default ProfileDetails;