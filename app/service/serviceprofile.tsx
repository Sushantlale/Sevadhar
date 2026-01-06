import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  MapPin,
  Star,
  Play,
  Check,
  Phone,
  Heart,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Youtube,
  Instagram,
  Facebook,
  Linkedin,
  MoreVertical,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ServiceProfilePage() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // FIX: Type-safe extraction to avoid split() error
  const getName = () => {
    const rawName = params.name;
    if (Array.isArray(rawName)) return rawName[0];
    return rawName || "Lakshmi Devi";
  };

  const displayName = getName();
  const firstName = displayName.split(' ')[0]; // Safe now

  const displayLocation = Array.isArray(params.location) ? params.location[0] : params.location || "Dadar, Mumbai";
  const displayRating = Array.isArray(params.rating) ? params.rating[0] : params.rating || "4.9";
  const displayJobs = Array.isArray(params.jobs) ? params.jobs[0] : params.jobs || "456";

  const workPhotos = [
    { id: '1', uri: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?w=500' },
    { id: '2', uri: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=500' },
    { id: '3', uri: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500' },
  ];

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/service/services' as any); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerBtn}>
          <ArrowLeft size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Details</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerBtn}><Share2 size={20} color="#333" /></TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn}><Bookmark size={20} color="#333" /></TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Main Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }} style={styles.avatar} />
              <View style={styles.onlineStatus} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{displayName}</Text>
              <View style={styles.locRow}>
                <MapPin size={14} color="#666" />
                <Text style={styles.locText}>{displayLocation}</Text>
              </View>
              <View style={styles.statsRow}>
                <View style={styles.ratingBox}>
                  <Star size={12} color="#FFF" fill="#FFF" />
                  <Text style={styles.ratingText}>{displayRating}</Text>
                </View>
                <Text style={styles.jobText}>{displayJobs} Jobs</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.playCircle}>
               <Play size={20} color="#ea580c" fill="#ea580c" />
            </TouchableOpacity>
          </View>

          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: '#0D9488' }]}><Text style={styles.badgeText}>Verified</Text></View>
            <View style={styles.outlineBadge}><Text style={styles.outlineBadgeText}>Aadhaar ✓</Text></View>
            <View style={[styles.badge, { backgroundColor: '#22C55E' }]}><Text style={styles.badgeText}>Available</Text></View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.callNowBtn}>
              <Phone size={20} color="white" />
              <Text style={styles.callNowText}>Call Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveActionBtn}>
              <Heart size={20} color="#666" />
              <Text style={styles.saveActionText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Work Photos */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Work Photos</Text>
            <TouchableOpacity><Text style={styles.orangeLink}>View All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
          {workPhotos.map((item) => (
            <Image key={item.id} source={{ uri: item.uri }} style={styles.workPhoto} />
          ))}
        </ScrollView>

        {/* About & Socials */}
        <View style={styles.aboutCard}>
            <Text style={styles.sectionTitle}>About {firstName}</Text>
            <Text style={styles.aboutText}>
                Experienced domestic helper with over 5 years of experience in household management, cooking (North & South Indian), and child care. Reliable, punctual, and dedicated.
            </Text>
            <Text style={styles.specialtiesTitle}>Specialties</Text>
            <View style={styles.tagRow}>
                {['Cooking', 'Cleaning', 'Babysitting', 'Elderly Care'].map(tag => (
                    <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
                ))}
            </View>
            
            <View style={styles.socialRow}>
                <View style={[styles.socialIcon, {backgroundColor: '#3b5998'}]}><Facebook size={20} color="white" /></View>
                <View style={[styles.socialIcon, {backgroundColor: '#CD201F'}]}><Youtube size={20} color="white" fill="white" /></View>
                <View style={[styles.socialIcon, {backgroundColor: '#E4405F'}]}><Instagram size={20} color="white" /></View>
                <View style={[styles.socialIcon, {backgroundColor: '#0077b5'}]}><Linkedin size={20} color="white" fill="white" /></View>
                <View style={[styles.socialIcon, {backgroundColor: '#000'}]}><Text style={{color:'white', fontWeight:'900'}}>X</Text></View>
            </View>
        </View>

        {/* REPORT SECTION - START OF IMAGE_FFA3A5 LAYOUT */}
        <View style={styles.reportCard}>
            <Text style={styles.sectionTitle}>Report Sevadhar</Text>
            <Text style={styles.reportSub}>Help us to make Justdial more updated and more relevant for you.</Text>
            <TouchableOpacity style={styles.reportNowBtn}>
                <Text style={styles.reportNowText}>Report Now</Text>
            </TouchableOpacity>
        </View>

        {/* REVIEWS & RATINGS SECTION */}
        <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>Reviews & Ratings</Text>
            <View style={styles.ratingSummaryCard}>
                <View style={styles.bigRatingBox}><Text style={styles.bigRatingText}>3.8</Text></View>
                <View style={{flex: 1}}>
                    <Text style={styles.ratingCountText}>11 Ratings</Text>
                    <Text style={styles.ratingSub}>Jd rating index based on 11 ratings across the web</Text>
                </View>
            </View>

            <Text style={styles.subTitle}>Start your Review</Text>
            <View style={styles.starInputRow}>
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={30} color="#DDD" />)}
            </View>

            <Text style={styles.subTitle}>Recent rating trend</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendScroll}>
                {[3.0, 5.0, 1.0, 5.0, 5.0].map((num, i) => (
                    <View key={i} style={styles.trendChip}>
                        <Text style={styles.trendText}>{num.toFixed(1)}</Text>
                        <Star size={12} color="#ea580c" fill="#ea580c" />
                    </View>
                ))}
            </ScrollView>

            <Text style={styles.subTitle}>User Reviews</Text>
            <View style={styles.filterRow}>
                <View style={[styles.filterChip, styles.activeFilter]}><Text style={styles.activeFilterText}>Relevant</Text></View>
                <View style={styles.filterChip}><Text style={styles.filterText}>Latest</Text></View>
                <View style={styles.filterChip}><Text style={styles.filterText}>High to Low</Text></View>
            </View>

            {/* Individual Review Item */}
            <View style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                    <View style={styles.reviewAvatar}><Text style={styles.avatarInitial}>KN</Text></View>
                    <View style={{flex: 1}}>
                        <Text style={styles.reviewerName}>Kam Need Nahi Haiusko</Text>
                        <View style={styles.row}>{[1,2,3,4,5].map(i => <Star key={i} size={12} color={i===1 ? "#ea580c" : "#DDD"} fill={i===1 ? "#ea580c" : "none"} />)}</View>
                    </View>
                    <Text style={styles.reviewDate}>18 Jun 2025</Text>
                    <MoreVertical size={16} color="#999" />
                </View>
                <View style={styles.poorServiceBadge}>
                    <ThumbsDown size={12} color="#ef4444" />
                    <Text style={styles.poorServiceText}>Poor service</Text>
                </View>
                <Text style={styles.reviewContent}>"My experience with Mansi Electrical Contractor was terrible. The service was slow, and the technicians seemed unprofessional..."</Text>
                <View style={styles.reviewActions}>
                    <TouchableOpacity style={styles.actionItem}><ThumbsUp size={16} color="#666" /><Text style={styles.actionText}>Helpful</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.actionItem}><MessageSquare size={16} color="#666" /><Text style={styles.actionText}>Comment</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.actionItem}><Share2 size={16} color="#666" /><Text style={styles.actionText}>Share</Text></TouchableOpacity>
                </View>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },
  flex1: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  headerRight: { flexDirection: 'row', gap: 10 },
  headerBtn: { padding: 5 },
  profileCard: { backgroundColor: 'white', padding: 16, borderRadius: 20, elevation: 3, marginTop: 15 },
  profileTop: { flexDirection: 'row', alignItems: 'center' },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 70, height: 70, borderRadius: 35 },
  onlineStatus: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#22C55E', position: 'absolute', bottom: 5, right: 2, borderWidth: 2, borderColor: 'white' },
  profileInfo: { flex: 1, marginLeft: 15 },
  userName: { fontSize: 20, fontWeight: '800' },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  locText: { fontSize: 14, color: '#666' },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5, gap: 10 },
  ratingBox: { flexDirection: 'row', backgroundColor: '#22C55E', paddingHorizontal: 8, borderRadius: 5, alignItems: 'center' },
  ratingText: { color: 'white', fontWeight: 'bold', marginLeft: 3 },
  jobText: { color: '#666', fontSize: 12 },
  playCircle: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: '#eee', justifyContent: 'center', alignItems: 'center' },
  badgeRow: { flexDirection: 'row', gap: 8, marginTop: 15 },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: 'white', fontSize: 11, fontWeight: '700' },
  outlineBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#eee' },
  outlineBadgeText: { fontSize: 11, color: '#666' },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  callNowBtn: { flex: 1, backgroundColor: '#ea580c', height: 48, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  callNowText: { color: 'white', fontSize: 16, fontWeight: '700' },
  saveActionBtn: { width: 100, borderWidth: 1, borderColor: '#eee', borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 },
  saveActionText: { color: '#666', fontWeight: '600' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  orangeLink: { color: '#ea580c', fontWeight: '700' },
  galleryScroll: { marginBottom: 10 },
  workPhoto: { width: 160, height: 110, borderRadius: 12, marginRight: 10 },
  aboutCard: { backgroundColor: 'white', padding: 16, borderRadius: 20, marginTop: 15 },
  aboutText: { color: '#666', marginTop: 8, lineHeight: 20, fontSize: 14 },
  specialtiesTitle: { fontWeight: '700', marginTop: 15, fontSize: 14 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  tag: { backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { color: '#666', fontSize: 12 },
  socialRow: { flexDirection: 'row', gap: 12, marginTop: 20, borderTopWidth: 1, borderTopColor: '#f3f4f6', paddingTop: 15 },
  socialIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  reportCard: { backgroundColor: 'white', padding: 16, borderRadius: 20, marginTop: 15 },
  reportSub: { fontSize: 13, color: '#888', marginVertical: 10 },
  reportNowBtn: { borderWidth: 1, borderColor: '#3b82f6', borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  reportNowText: { color: '#3b82f6', fontWeight: '700' },
  reviewsSection: { marginTop: 25 },
  ratingSummaryCard: { flexDirection: 'row', backgroundColor: 'white', padding: 16, borderRadius: 15, alignItems: 'center', gap: 15, marginTop: 10 },
  bigRatingBox: { backgroundColor: '#22C55E', width: 50, height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  bigRatingText: { color: 'white', fontSize: 22, fontWeight: '800' },
  ratingCountText: { fontSize: 18, fontWeight: '700' },
  ratingSub: { fontSize: 11, color: '#888' },
  subTitle: { fontSize: 15, fontWeight: '700', marginTop: 20 },
  starInputRow: { flexDirection: 'row', gap: 5, marginTop: 10 },
  trendScroll: { marginTop: 10 },
  // FIX: renamed from borderWeight to borderWidth
  trendChip: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#eee', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 4, marginRight: 10, backgroundColor: 'white' },
  trendText: { fontWeight: '700', fontSize: 12 },
  filterRow: { flexDirection: 'row', gap: 10, marginTop: 15 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, backgroundColor: 'white', borderWidth: 1, borderColor: '#eee' },
  activeFilter: { backgroundColor: '#eef2ff', borderColor: '#3b82f6' },
  activeFilterText: { color: '#3b82f6', fontWeight: '600', fontSize: 12 },
  filterText: { color: '#666', fontSize: 12 },
  reviewItem: { backgroundColor: 'white', padding: 16, marginTop: 15, borderRadius: 15 },
  reviewHeader: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  reviewAvatar: { backgroundColor: '#f3f4f6', width: 40, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  // FIX: Added missing avatarInitial style
  avatarInitial: { fontWeight: '700', color: '#666', fontSize: 14 },
  reviewerName: { fontWeight: '700', fontSize: 14 },
  reviewDate: { fontSize: 11, color: '#999' },
  poorServiceBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10, borderWidth: 1, borderColor: '#eee', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 15 },
  poorServiceText: { color: '#ef4444', fontSize: 11, fontWeight: '600' },
  // FIX: Added missing reviewContent style
  reviewContent: { color: '#555', fontSize: 13, marginTop: 10, lineHeight: 18 },
  reviewActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  actionItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  actionText: { fontSize: 12, color: '#666' },
  row: { flexDirection: 'row' }
});