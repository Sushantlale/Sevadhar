import { useRouter } from 'expo-router';
import {
    Bell,
    Camera,
    ChevronRight,
    Clock,
    Edit2,
    Mail,
    MapPin, Phone,
    Plus,
    User,
    Wallet
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

// Mock data preserved from your original code
const userData = {
  name: 'Ramesh Kumar',
  phone: '+91 98765 43210',
  email: 'ramesh@email.com',
  location: 'Vinaynagar, Khopoli',
  avatar: null,
  sevas: ['Plumber', 'AC Repair'],
  walletBalance: 450,
  workPhotos: [
    'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&h=200&fit=crop',
  ],
};

export default function ProfilePage() {
  const router = useRouter();
  const [userType] = useState<'customer' | 'provider'>('provider'); // Toggle this to test views
  const [isAvailable, setIsAvailable] = useState(true);
  const [dailyCheck, setDailyCheck] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header / Primary Background */}
        <View style={styles.headerBackground}>
          <TouchableOpacity style={styles.editBtn}>
            <Edit2 size={20} color="#FFF" />
          </TouchableOpacity>

          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarCircle}>
              {userData.avatar ? (
                <Image source={{ uri: userData.avatar }} style={styles.avatarImg} />
              ) : (
                <User size={50} color="#9CA3AF" />
              )}
              <TouchableOpacity style={styles.cameraBtn}>
                <Camera size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>{userData.name}</Text>
            <View style={styles.locationRow}>
              <MapPin size={14} color="rgba(255,255,255,0.8)" />
              <Text style={styles.locationText}>{userData.location}</Text>
            </View>
          </View>
        </View>

        {/* Main Content Card (Overlapping) */}
        <View style={styles.contentCard}>
          
          {/* Contact Info */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconBg}>
              <Phone size={20} color="#FF7A00" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{userData.phone}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIconBg}>
              <Mail size={20} color="#FF7A00" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{userData.email}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Provider Sections */}
          {userType === 'provider' && (
            <>
              {/* Availability Toggle */}
              <View style={styles.toggleRow}>
                <View>
                  <Text style={styles.sectionTitle}>Availability</Text>
                  <Text style={styles.sectionSub}>Show your status to customers</Text>
                </View>
                <TouchableOpacity 
                  style={[styles.statusBtn, { backgroundColor: isAvailable ? '#10B981' : '#EF4444' }]}
                  onPress={() => setIsAvailable(!isAvailable)}
                >
                  <Text style={styles.statusBtnText}>{isAvailable ? 'Available' : 'Busy'}</Text>
                </TouchableOpacity>
              </View>

              {/* Daily Check Switch */}
              <View style={styles.toggleRow}>
                <View style={styles.row}>
                  <Bell size={20} color="#FF7A00" />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={styles.itemTitle}>9 AM Daily Check</Text>
                    <Text style={styles.sectionSub}>Availability reminders</Text>
                  </View>
                </View>
                <Switch 
                  value={dailyCheck} 
                  onValueChange={setDailyCheck}
                  trackColor={{ false: '#D1D5DB', true: '#FF7A00' }}
                />
              </View>

              <View style={styles.divider} />

              {/* My Sevas */}
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>My Sevas</Text>
                  <Text style={styles.sectionSub}>Services you provide</Text>
                </View>
                <TouchableOpacity style={styles.addBtn}>
                  <Plus size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
              <View style={styles.tagContainer}>
                {userData.sevas.map((seva, i) => (
                  <View key={i} style={styles.tag}>
                    <Text style={styles.tagText}>{seva}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.divider} />

              {/* Wallet Section */}
              <View style={styles.walletCard}>
                <View style={styles.walletHeader}>
                  <View style={styles.row}>
                    <Wallet size={20} color="#FF7A00" />
                    <Text style={styles.walletTitle}>My Wallet</Text>
                  </View>
                  <TouchableOpacity onPress={() => router.push('/history')}>
                    <Clock size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.balanceContainer}>
                  <Text style={styles.balanceLabel}>Current Balance</Text>
                  <Text style={styles.balanceValue}>₹{userData.walletBalance}</Text>
                </View>

                <TouchableOpacity style={styles.addMoneyBtn}>
                  <Text style={styles.addMoneyText}>Add Money</Text>
                </TouchableOpacity>
                <Text style={styles.walletNote}>💰 Deduction applied per connected call</Text>
              </View>

              {/* Work Gallery */}
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Work Gallery</Text>
                  <Text style={styles.sectionSub}>Showcase your work</Text>
                </View>
                <TouchableOpacity style={styles.addBtn}>
                  <Camera size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
              <View style={styles.galleryGrid}>
                {userData.workPhotos.map((img, i) => (
                  <Image key={i} source={{ uri: img }} style={styles.galleryImg} />
                ))}
              </View>
            </>
          )}

          {/* Customer Sections */}
          {userType === 'customer' && (
            <>
              <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/history')}>
                <View style={styles.row}>
                  <Clock size={22} color="#FF7A00" />
                  <Text style={styles.menuItemText}>Service History</Text>
                </View>
                <ChevronRight size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.row}>
                  <Wallet size={22} color="#FF7A00" />
                  <Text style={styles.menuItemText}>Subscription Plan</Text>
                </View>
                <ChevronRight size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  headerBackground: { backgroundColor: '#FF7A00', paddingTop: 40, paddingBottom: 60, alignItems: 'center', height: 240 },
  editBtn: { position: 'absolute', top: 20, right: 20, padding: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12 },
  avatarSection: { alignItems: 'center', marginTop: 10 },
  avatarCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#FFF', elevation: 5 },
  avatarImg: { width: '100%', height: '100%', borderRadius: 50 },
  cameraBtn: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FF7A00', padding: 8, borderRadius: 20, borderWidth: 2, borderColor: '#FFF' },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginTop: 12 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 5 },
  locationText: { color: 'rgba(255,255,255,0.9)', fontSize: 14 },
  contentCard: { flex: 1, backgroundColor: '#FFF', marginHorizontal: 15, marginTop: -40, borderRadius: 24, padding: 20, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, gap: 15 },
  infoIconBg: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF7ED', alignItems: 'center', justifyContent: 'center' },
  infoLabel: { fontSize: 12, color: '#6B7280' },
  infoValue: { fontSize: 15, fontWeight: '600', color: '#111827' },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 15 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  sectionSub: { fontSize: 12, color: '#6B7280' },
  statusBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  statusBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
  row: { flexDirection: 'row', alignItems: 'center' },
  itemTitle: { fontSize: 15, fontWeight: '600', color: '#111827' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  addBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FF7A00', alignItems: 'center', justifyContent: 'center' },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: '#FFF7ED', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  tagText: { color: '#FF7A00', fontWeight: '600', fontSize: 13 },
  walletCard: { backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: '#F3F4F6', padding: 15, marginBottom: 20, elevation: 2 },
  walletHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  walletTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  balanceContainer: { backgroundColor: '#FF7A00', borderRadius: 12, padding: 15, marginBottom: 15 },
  balanceLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  balanceValue: { color: '#FFF', fontSize: 28, fontWeight: 'bold' },
  addMoneyBtn: { backgroundColor: '#FFF7ED', padding: 15, borderRadius: 12, alignItems: 'center' },
  addMoneyText: { color: '#FF7A00', fontWeight: 'bold' },
  walletNote: { textAlign: 'center', fontSize: 11, color: '#9CA3AF', marginTop: 10 },
  galleryGrid: { flexDirection: 'row', gap: 10 },
  galleryImg: { width: (width - 80) / 3, height: (width - 80) / 3, borderRadius: 12 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  menuItemText: { fontSize: 16, fontWeight: '500', marginLeft: 15, color: '#111827' }
});

