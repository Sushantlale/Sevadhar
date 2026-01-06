import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
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

  const { 
    name = "Lakshmi Devi", 
    location = "Dadar, Mumbai", 
    rating = "4.9", 
    jobs = "456" 
  } = params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Details</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <MaterialIcons name="share" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="bookmark-border" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Card */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <View>
              <View style={[styles.avatar, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFEBDC' }]}>
                 <Text style={{fontSize: 24, fontWeight: 'bold', color: '#FF7A00'}}>{(name as string).charAt(0)}</Text>
              </View>
              <View style={styles.onlineIndicator} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{name}</Text>
              <View style={styles.locationRow}>
                <MaterialIcons name="location-on" size={14} color="#666" />
                <Text style={styles.locationText}>{location}</Text>
              </View>
              <View style={styles.statsRow}>
                <View style={styles.ratingBadge}>
                  <MaterialIcons name="star" size={12} color="#fff" />
                  <Text style={styles.ratingText}>{rating}</Text>
                </View>
                <View style={styles.jobCount}>
                  <MaterialIcons name="work-outline" size={14} color="#666" />
                  <Text style={styles.jobText}>{jobs} jobs</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <MaterialIcons name="play-arrow" size={24} color="#FF7A00" />
            </TouchableOpacity>
          </View>

          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: '#0D9488' }]}>
              <Text style={styles.badgeText}>Verified</Text>
            </View>
            <View style={[styles.badge, styles.outlineBadge]}>
              <Text style={styles.outlineBadgeText}>Aadhaar</Text>
              <MaterialIcons name="check" size={12} color="#666" />
            </View>
            <View style={[styles.badge, { backgroundColor: '#22C55E' }]}>
              <Text style={styles.badgeText}>Available</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.callButton}>
              <MaterialIcons name="call" size={20} color="#fff" />
              <Text style={styles.callButtonText}>Call Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}>
              <MaterialIcons name="favorite-border" size={20} color="#666" />
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Work Photos Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Work Photos</Text>
          <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoList}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1581578731522-9b7d6e49f6d4?auto=format&fit=crop&w=300' }} style={styles.workPhoto} />
          <Image source={{ uri: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=300' }} style={styles.workPhoto} />
          <Image source={{ uri: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300' }} style={styles.workPhoto} />
        </ScrollView>

        {/* About Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About {name}</Text>
          <Text style={styles.aboutText}>
            Experienced domestic helper with over 5 years of experience in household management, 
            cooking (North & South Indian), and child care. Reliable, punctual, and dedicated to maintaining a clean environment.
          </Text>
          
          <Text style={styles.subTitle}>Specialties</Text>
          <View style={styles.tagRow}>
            {['Cooking', 'Cleaning', 'Babysitting', 'Elderly Care'].map(tag => (
              <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
            ))}
          </View>

          <View style={styles.socialRow}>
             <TouchableOpacity style={[styles.socialIcon, { backgroundColor: '#3b5998' }]}>
               <FontAwesome5 name="facebook-f" size={16} color="white" />
             </TouchableOpacity>
             <TouchableOpacity style={[styles.socialIcon, { backgroundColor: '#CD201F' }]}>
               <FontAwesome5 name="youtube" size={16} color="white" />
             </TouchableOpacity>
             <TouchableOpacity style={[styles.socialIcon, { backgroundColor: '#E1306C' }]}>
               <FontAwesome5 name="instagram" size={16} color="white" />
             </TouchableOpacity>
             <TouchableOpacity style={[styles.socialIcon, { backgroundColor: '#0077b5' }]}>
               <FontAwesome5 name="linkedin-in" size={16} color="white" />
             </TouchableOpacity>
             <TouchableOpacity style={[styles.socialIcon, { backgroundColor: '#000' }]}>
               <FontAwesome5 name="times" size={16} color="white" />
             </TouchableOpacity>
          </View>
        </View>

        {/* Report Section (Missing from previous code) */}
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Report Sevadhar</Text>
            <Text style={styles.ratingSubText}>Help us to make Justdial more updated and more relevant for you.</Text>
            <TouchableOpacity style={styles.reportBtn}>
                <Text style={styles.reportBtnText}>Report Now</Text>
            </TouchableOpacity>
        </View>

        {/* Reviews Section */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Reviews & Ratings</Text>
        </View>

        <View style={styles.reviewSummaryCard}>
          <View style={styles.ratingBox}>
            <Text style={styles.ratingBigText}>3.8</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.ratingCount}>11 Ratings</Text>
            <Text style={styles.ratingSubText}>Jd rating index based on 11 ratings across the web</Text>
          </View>
        </View>

        {/* Start Review (Missing from previous code) */}
        <View style={styles.card}>
            <Text style={styles.subTitle}>Start your Review</Text>
            <View style={styles.starRow}>
                {[1,2,3,4,5].map(i => <MaterialIcons key={i} name="star-outline" size={32} color="#D1D5DB" />)}
            </View>
        </View>

        {/* Recent Rating Trend (Missing from previous code) */}
        <View style={styles.card}>
            <Text style={styles.subTitle}>Recent rating trend</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagRow}>
                {['3.0', '5.0', '1.0', '5.0', '5.0'].map((val, i) => (
                    <View key={i} style={styles.trendTag}>
                        <Text style={styles.trendText}>{val}</Text>
                        <MaterialIcons name="star" size={14} color="#FF7A00" />
                    </View>
                ))}
            </ScrollView>
        </View>

        {/* Detailed User Reviews (Missing from previous code) */}
        <View style={styles.card}>
            <Text style={styles.subTitle}>User Reviews</Text>
            <View style={styles.tagRow}>
                <View style={[styles.tag, {backgroundColor: '#EFF6FF'}]}><Text style={[styles.tagText, {color: '#2563EB'}]}>Relevant</Text></View>
                <View style={styles.tag}><Text style={styles.tagText}>Latest</Text></View>
                <View style={styles.tag}><Text style={styles.tagText}>High to Low</Text></View>
            </View>

            {/* Review Item 1 */}
            <View style={styles.reviewItem}>
                <View style={styles.profileRow}>
                    <View style={styles.reviewAvatar} />
                    <View style={{flex: 1, marginLeft: 10}}>
                        <Text style={styles.reviewerName}>Kam Need Nahi Haiusko</Text>
                        <View style={styles.starRowSmall}>
                            <MaterialIcons name="star" size={14} color="#FF7A00" />
                            {[1,2,3,4].map(i => <MaterialIcons key={i} name="star-outline" size={14} color="#D1D5DB" />)}
                        </View>
                    </View>
                    <Text style={styles.dateText}>18 Jun 2025</Text>
                </View>
                <View style={styles.poorServiceBadge}>
                    <MaterialIcons name="thumb-down-off-alt" size={14} color="#EF4444" />
                    <Text style={styles.poorServiceText}>Poor service</Text>
                </View>
                <Text style={styles.reviewComment}>
                    "My experience with Mansi Electrical Contractor was terrible. The service was slow, and the technicians seemed unprofessional..."
                </Text>
                <View style={styles.actionRowReview}>
                    <View style={styles.actionItem}><MaterialIcons name="thumb-up-off-alt" size={18} color="#6B7280" /><Text style={styles.actionText}>Helpful</Text></View>
                    <View style={styles.actionItem}><MaterialIcons name="chat-bubble-outline" size={18} color="#6B7280" /><Text style={styles.actionText}>Comment</Text></View>
                    <View style={styles.actionItem}><MaterialIcons name="share" size={18} color="#6B7280" /><Text style={styles.actionText}>Share</Text></View>
                </View>
            </View>

            {/* Review Item 2 */}
            <View style={[styles.reviewItem, {borderBottomWidth: 0}]}>
                <View style={styles.profileRow}>
                    <View style={[styles.reviewAvatar, {backgroundColor: '#E0E7FF', justifyContent: 'center', alignItems: 'center'}]}>
                        <Text style={{color: '#4F46E5', fontWeight: 'bold'}}>RK</Text>
                    </View>
                    <View style={{flex: 1, marginLeft: 10}}>
                        <Text style={styles.reviewerName}>Ramesh Kumar</Text>
                        <View style={styles.starRowSmall}>
                            {[1,2,3,4,5].map(i => <MaterialIcons key={i} name="star" size={14} color="#FF7A00" />)}
                        </View>
                    </View>
                    <Text style={styles.dateText}>2 days ago</Text>
                </View>
                <Text style={styles.reviewComment}>
                    Lakshmi did acts great job. Very polite and thorough with her cleaning.
                </Text>
                <View style={styles.actionRowReview}>
                    <View style={styles.actionItem}><MaterialIcons name="thumb-up-off-alt" size={18} color="#6B7280" /><Text style={styles.actionText}>Helpful</Text></View>
                    <View style={styles.actionItem}><MaterialIcons name="chat-bubble-outline" size={18} color="#6B7280" /><Text style={styles.actionText}>Comment</Text></View>
                    <View style={styles.actionItem}><MaterialIcons name="share" size={18} color="#6B7280" /><Text style={styles.actionText}>Share</Text></View>
                </View>
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#DDD' },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: { flex: 1, marginLeft: 12 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locationText: { fontSize: 13, color: '#666', marginLeft: 4 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  ratingBadge: {
    backgroundColor: '#16A34A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 12,
  },
  ratingText: { color: '#fff', fontSize: 12, fontWeight: 'bold', marginLeft: 2 },
  jobCount: { flexDirection: 'row', alignItems: 'center' },
  jobText: { fontSize: 12, color: '#666', marginLeft: 4 },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  outlineBadge: { borderWidth: 1, borderColor: '#DDD', flexDirection: 'row', alignItems: 'center', gap: 4 },
  outlineBadgeText: { fontSize: 11, color: '#444' },
  actionRow: { flexDirection: 'row', gap: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 16 },
  callButton: {
    flex: 2,
    backgroundColor: '#FF7A00',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  callButtonText: { color: '#fff', fontWeight: '700', marginLeft: 8 },
  saveButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  saveButtonText: { color: '#444', fontWeight: '600', marginLeft: 6 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  viewAll: { color: '#FF7A00', fontSize: 14, fontWeight: '600' },
  photoList: { marginBottom: 20 },
  workPhoto: { width: 140, height: 100, borderRadius: 12, marginRight: 12 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  aboutText: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
  subTitle: { fontSize: 15, fontWeight: '700', marginTop: 12, marginBottom: 10 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, color: '#4B5563', fontWeight: '500' },
  socialRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 20, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  socialIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  reportBtn: { width: '100%', borderWidth: 1, borderColor: '#3B82F6', borderRadius: 8, padding: 12, alignItems: 'center', marginTop: 15 },
  reportBtnText: { color: '#3B82F6', fontWeight: 'bold' },
  reviewSummaryCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16, borderWidth: 1, borderColor: '#F3F4F6' },
  ratingBox: { width: 54, height: 54, backgroundColor: '#16A34A', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  ratingBigText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  ratingCount: { fontSize: 18, fontWeight: 'bold' },
  ratingSubText: { fontSize: 12, color: '#6B7280', lineHeight: 18 },
  starRow: { flexDirection: 'row', gap: 5, marginBottom: 5 },
  trendTag: { flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, marginRight: 8 },
  trendText: { fontSize: 14, fontWeight: '600' },
  reviewItem: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingVertical: 15 },
  reviewAvatar: { width: 40, height: 40, borderRadius: 8, backgroundColor: '#F3F4F6' },
  reviewerName: { fontSize: 14, fontWeight: 'bold', color: '#111' },
  starRowSmall: { flexDirection: 'row', marginTop: 2 },
  dateText: { fontSize: 12, color: '#9CA3AF' },
  poorServiceBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 1, borderColor: '#FEE2E2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, alignSelf: 'flex-start', marginVertical: 10 },
  poorServiceText: { fontSize: 11, color: '#EF4444', fontWeight: '600' },
  reviewComment: { fontSize: 14, color: '#4B5563', lineHeight: 20, marginBottom: 15 },
  actionRowReview: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 },
  actionItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionText: { fontSize: 13, color: '#6B7280', fontWeight: '500' }
});

export default ProfileDetails;