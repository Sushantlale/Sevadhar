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
  Switch,
  Alert,
  TextInput,
  Modal,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import {
  Settings2,
  Star,
  CheckCircle2,
  Bell,
  Wallet,
  IndianRupee,
  Play,
  Trash2,
  Mic,
  Plus,
  Share2,
  Copy,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  Twitter,
  Save,
  X,
  Snowflake,
  Wrench,
  FlameKindling,
  Droplets,
  Camera,
  LogOut, // Import name remains LogOut to match library export
  ChevronRight
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function ProfilePage() {
  const router = useRouter();

  // --- Dynamic States ---
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [dailyCheck, setDailyCheck] = useState(true);
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400');
  const [userName, setUserName] = useState('Rajesh Kumar');
  const [userBio, setUserBio] = useState('Expert AC technician with 5+ years of experience in repair and maintenance. Providing top-quality service at your doorstep.');
  
  // --- Settings Modal State ---
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  // --- Edit Profile States ---
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [tempBio, setTempBio] = useState(userBio);

  const [gallery, setGallery] = useState([
    'https://picsum.photos/200/200?sig=1',
    'https://picsum.photos/200/200?sig=2',
    'https://picsum.photos/200/200?sig=3'
  ]);

  const [sevas, setSevas] = useState(['AC Repair', 'Installation', 'Gas Filling', 'Cleaning']);
  const [newSeva, setNewSeva] = useState('');
  const [isAddingSeva, setIsAddingSeva] = useState(false);

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@example.com',
    location: 'Mumbai, Maharashtra'
  });

  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    youtube: '',
    instagram: '',
    linkedin: '',
    twitter: ''
  });

  const [voiceUri, setVoiceUri] = useState<string | null>('dummy-uri'); 
  const [isRecording, setIsRecording] = useState(false);

  // --- Handlers ---
  const handleSettingsPress = () => {
    setIsSettingsModalVisible(true);
  };

  const handleLogout = () => {
    setIsSettingsModalVisible(false);
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => router.replace('/login') }
    ]);
  };

  const pickProfileImage = async (mode: 'camera' | 'library') => {
    let result;
    if (mode === 'camera') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) return Alert.alert("Permission needed", "Camera access is required.");
        result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 1 });
    } else {
        result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 1 });
    }
    if (!result.canceled) setAvatar(result.assets[0].uri);
  };

  const handleEditPhotoPress = () => {
    Alert.alert("Update Profile Photo", "Select Source", [
        { text: "Take Selfie", onPress: () => pickProfileImage('camera') },
        { text: "Choose from Gallery", onPress: () => pickProfileImage('library') },
        { text: "Cancel", style: "cancel" }
    ]);
  };

  const saveProfileDetails = () => {
    setUserName(tempName);
    setUserBio(tempBio);
    setIsEditModalVisible(false);
  };

  const handleDeleteVoice = () => {
    Alert.alert("Delete Recording", "Are you sure you want to delete this voice recording?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => setVoiceUri(null) }
    ]);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
        setIsRecording(false);
        setVoiceUri('new-recording-uri');
    }, 3000);
  };

  const addGalleryImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setGallery([...gallery, result.assets[0].uri]);
    }
  };

  const deleteGalleryImage = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  const handleAddSeva = () => {
    if (newSeva.trim()) {
      setSevas([...sevas, newSeva.trim()]);
      setNewSeva('');
      setIsAddingSeva(false);
    }
  };

  const deleteSeva = (index: number) => {
    setSevas(sevas.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.iconButton} onPress={handleSettingsPress}>
              <Text style={styles.settingsEmoji}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={[styles.avatarContainer, { borderColor: isOnDuty ? '#10b981' : '#ef4444' }]}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraIcon} onPress={handleEditPhotoPress}>
              <Plus size={16} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{userName}</Text>
            <CheckCircle2 size={20} color="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
          </View>
          <Text style={styles.userRole}>Certified AC Technician</Text>
          
          <View style={styles.ratingBadge}>
            <Star size={14} color="#f97316" fill="#f97316" />
            <Text style={styles.ratingText}>4.8</Text>
            <Text style={styles.reviewCount}>(120 Reviews)</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <View style={styles.descriptionHeader}>
              <Text style={styles.descriptionHeading}>Description</Text>
            </View>
            <Text style={styles.descriptionText}>{userBio}</Text>
          </View>

          <TouchableOpacity 
            style={styles.editProfileBtn} 
            onPress={() => {
                setTempName(userName);
                setTempBio(userBio);
                setIsEditModalVisible(true);
            }}
          >
            <Text style={styles.editProfileBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dutyContainer}>
          <TouchableOpacity 
            style={[styles.dutyBtn, isOnDuty && styles.dutyBtnActiveOn]} 
            onPress={() => setIsOnDuty(true)}
          >
            <Text style={[styles.dutyText, isOnDuty && styles.dutyTextActive]}>On Duty</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.dutyBtn, !isOnDuty && styles.dutyBtnActiveOff]} 
            onPress={() => setIsOnDuty(false)}
          >
            <Text style={[styles.dutyText, !isOnDuty && styles.dutyTextActive]}>Off Duty</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.glassCard}>
          <View style={styles.row}>
            <View style={styles.notificationIconBg}>
              <Bell size={20} color="#f97316" />
            </View>
            <View style={styles.flex1}>
              <Text style={styles.cardTitle}>9 AM Daily Check</Text>
              <Text style={styles.cardSub}>Availability reminders</Text>
            </View>
            <Switch 
              value={dailyCheck} 
              onValueChange={setDailyCheck}
              trackColor={{ false: "#e5e7eb", true: "#ea580c" }}
            />
          </View>
        </View>

        <LinearGradient colors={['#f97316', '#ea580c']} style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <View>
              <Text style={styles.walletLabel}>TOTAL EARNINGS</Text>
              <Text style={styles.walletBalance}>2,450 <Text style={styles.walletCurrency}>SevaCoins</Text></Text>
            </View>
            <View style={styles.walletIconBg}>
              <Wallet size={24} color="white" />
            </View>
          </View>
          <TouchableOpacity style={styles.sendBtn}>
            <IndianRupee size={16} color="#ea580c" />
            <Text style={styles.sendBtnText}>Send Coins</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.sectionDivider} />
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Voice Record</Text>
        </View>

        {voiceUri ? (
          <>
            <View style={styles.audioContainer}>
              <TouchableOpacity style={styles.audioPlayBtn}>
                <Play size={20} color="white" fill="white" />
              </TouchableOpacity>
              <View style={styles.waveform}>
                {[8, 15, 10, 22, 12, 25, 14, 20, 10, 18].map((h, i) => (
                  <View key={i} style={[styles.waveBar, { height: h }]} />
                ))}
              </View>
              <View style={styles.audioActions}>
                  <View style={styles.speedBadge}><Text style={styles.speedText}>1.5x</Text></View>
                  <TouchableOpacity onPress={handleDeleteVoice}>
                    <Trash2 size={18} color="#f87171" />
                  </TouchableOpacity>
              </View>
            </View>
            <View style={styles.voiceFooter}>
               <Mic size={14} color="#10b981" />
               <Text style={styles.micText}>Hold to record</Text>
            </View>
          </>
        ) : (
          <View style={styles.addVoiceContainer}>
             <TouchableOpacity style={styles.addVoiceBtn} onPress={handleStartRecording}>
                <Plus size={30} color="#ea580c" />
             </TouchableOpacity>
             <Text style={styles.addVoiceText}>{isRecording ? "Recording..." : "Add Voice Recording"}</Text>
          </View>
        )}

        <View style={[styles.sectionHeader, { marginTop: 25 }]}>
          <Text style={styles.sectionTitle}>My Sevas</Text>
          <TouchableOpacity onPress={() => setIsAddingSeva(!isAddingSeva)}>
            <Text style={styles.editLink}>{isAddingSeva ? "Cancel" : "Add"}</Text>
          </TouchableOpacity>
        </View>

        {isAddingSeva && (
            <View style={styles.addSevaInputRow}>
                <TextInput 
                    style={styles.sevaTextInput}
                    placeholder="Enter seva detail..."
                    value={newSeva}
                    onChangeText={(text) => setNewSeva(text)}
                />
                <TouchableOpacity style={styles.saveSevaBtn} onPress={handleAddSeva}>
                    <Text style={styles.saveSevaText}>Save</Text>
                </TouchableOpacity>
            </View>
        )}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sevasScroll}>
          {sevas.map((item, index) => (
            <View key={index} style={styles.sevaItem}>
              <TouchableOpacity style={styles.deleteSevaIcon} onPress={() => deleteSeva(index)}>
                <X size={12} color="white" />
              </TouchableOpacity>
              <View style={[styles.sevaIcon, index === 0 && styles.sevaIconActive]}>
                {index === 0 ? <Snowflake size={24} color="#ea580c" /> : 
                 index === 1 ? <Wrench size={24} color="#f97316" /> :
                 index === 2 ? <FlameKindling size={24} color="#9ca3af" /> :
                 <Droplets size={24} color="#9ca3af" />}
              </View>
              <Text style={styles.sevaText}>{item}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.referralCard}>
          <View>
            <Text style={styles.cardLabel}>Referral Code</Text>
            <Text style={styles.referralCode}>SEVA450</Text>
            <Text style={styles.cardSub}>Share and earn SevaCoins</Text>
          </View>
          <TouchableOpacity style={styles.shareButton}>
            <Share2 size={18} color="#ea580c" />
          </TouchableOpacity>
        </View>

        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>Work Gallery</Text>
          <TouchableOpacity onPress={addGalleryImage}>
            <Plus size={24} color="#ea580c" />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
          {gallery.map((uri, index) => (
            <View key={index} style={styles.galleryItem}>
              <Image source={{ uri }} style={styles.galleryImg} />
              <TouchableOpacity 
                style={styles.galleryDelete} 
                onPress={() => deleteGalleryImage(index)}
              >
                <Trash2 size={12} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={[styles.sectionHeader, { marginTop: 20, marginBottom: 10 }]}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <TouchableOpacity onPress={() => setIsEditingContact(!isEditingContact)}>
                <Text style={styles.editLink}>{isEditingContact ? "Save" : "Edit"}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.contactList}>
          <ContactItem 
            icon={<Phone size={18} color="#ea580c" />} 
            label="PHONE" 
            value={contactInfo.phone} 
            isEditing={isEditingContact}
            onChange={(val: string) => setContactInfo({...contactInfo, phone: val})}
          />
          <ContactItem 
            icon={<Mail size={18} color="#ea580c" />} 
            label="EMAIL" 
            value={contactInfo.email} 
            isEditing={isEditingContact}
            onChange={(val: string) => setContactInfo({...contactInfo, email: val})}
          />
          <ContactItem 
            icon={<MapPin size={18} color="#ea580c" />} 
            label="LOCATION" 
            value={contactInfo.location} 
            isEditing={isEditingContact}
            onChange={(val: string) => setContactInfo({...contactInfo, location: val})}
          />
        </View>

        <View style={[styles.sectionHeader, { marginTop: 25 }]}>
            <Text style={styles.sectionTitle}>Social Media Links</Text>
            <TouchableOpacity onPress={() => setIsEditingSocial(!isEditingSocial)}>
                <View style={styles.row}>
                    {isEditingSocial ? <Save size={18} color="#ea580c" /> : <Settings2 size={18} color="#ea580c" />}
                    <Text style={[styles.editLink, {marginLeft: 5}]}>{isEditingSocial ? "Save" : "Edit"}</Text>
                </View>
            </TouchableOpacity>
        </View>

        {isEditingSocial ? (
            <View style={styles.socialEditContainer}>
                <SocialInput icon={<Facebook size={20} color="#1877F2" />} value={socialLinks.facebook} onChange={(t) => setSocialLinks({...socialLinks, facebook: t})} placeholder="Facebook Link" />
                <SocialInput icon={<Instagram size={20} color="#E4405F" />} value={socialLinks.instagram} onChange={(t) => setSocialLinks({...socialLinks, instagram: t})} placeholder="Instagram Link" />
                <SocialInput icon={<Twitter size={20} color="black" />} value={socialLinks.twitter} onChange={(t) => setSocialLinks({...socialLinks, twitter: t})} placeholder="Twitter Link" />
                <SocialInput icon={<Linkedin size={20} color="#0A66C2" />} value={socialLinks.linkedin} onChange={(t) => setSocialLinks({...socialLinks, linkedin: t})} placeholder="LinkedIn Link" />
                <SocialInput icon={<Youtube size={22} color="#FF0000" fill="#FF0000" />} value={socialLinks.youtube} onChange={(t) => setSocialLinks({...socialLinks, youtube: t})} placeholder="YouTube Link" />
            </View>
        ) : (
            <View style={styles.socialRow}>
              <SocialIcon color="#1877F2" icon={<Facebook size={20} color="white" fill="white" />} />
              <SocialIcon color="#FF0000" icon={<Youtube size={20} color="white" fill="white" />} />
              <SocialIcon color="#E4405F" icon={<Instagram size={20} color="white" />} />
              <SocialIcon color="#0A66C2" icon={<Linkedin size={20} color="white" fill="white" />} />
              <SocialIcon color="black" icon={<Twitter size={20} color="white" fill="white" />} />
            </View>
        )}

      </ScrollView>

      {/* --- SETTINGS MODAL --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSettingsModalVisible}
        onRequestClose={() => setIsSettingsModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setIsSettingsModalVisible(false)}
        >
          <View style={styles.settingsModalContainer}>
            <Text style={styles.settingsModalTitle}>Settings</Text>
            
            {/* <TouchableOpacity style={styles.settingsOption} onPress={() => { setIsSettingsModalVisible(false); router.push('/settings/help'); }}>
              <Text style={styles.settingsOptionText}>Help Center</Text>
              <ChevronRight size={18} color="#9ca3af" />
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.settingsOption} onPress={() => { setIsSettingsModalVisible(false); router.push('/settings/contact'); }}>
              <Text style={styles.settingsOptionText}>Contact Us</Text>
              <ChevronRight size={18} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsOption} onPress={() => { setIsSettingsModalVisible(false); router.push('/settings/about'); }}>
              <Text style={styles.settingsOptionText}>About Us</Text>
              <ChevronRight size={18} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsOption} onPress={() => { setIsSettingsModalVisible(false); router.push('/settings/privacy'); }}>
              <Text style={styles.settingsOptionText}>Privacy Policy</Text>
              <ChevronRight size={18} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsOption} onPress={handleLogout}>
              <Text style={[styles.settingsOptionText, { color: '#ef4444' }]}>Logout</Text>
              <LogOut size={18} color="#ef4444" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsCloseBtn} onPress={() => setIsSettingsModalVisible(false)}>
              <Text style={styles.settingsCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* --- EDIT PROFILE MODAL --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
                <X size={24} color="#1f2937" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={saveProfileDetails}>
                <Text style={styles.saveActionText}>Save</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              <View style={styles.modalPhotoContainer}>
                <Image source={{ uri: avatar }} style={styles.modalAvatar} />
                <TouchableOpacity style={styles.photoActionBtn} onPress={handleEditPhotoPress}>
                  <Camera size={18} color="#ea580c" />
                  <Text style={styles.photoActionLabel}>Change Photo</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Display Name</Text>
                <TextInput 
                  style={styles.modalInput}
                  value={tempName}
                  onChangeText={setTempName}
                  placeholder="Enter your name"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Description / Bio</Text>
                <TextInput 
                  style={[styles.modalInput, styles.textArea]}
                  value={tempBio}
                  onChangeText={setTempBio}
                  multiline
                  numberOfLines={4}
                  placeholder="Describe your services..."
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

// --- Helper Components ---
const ContactItem = ({ icon, label, value, isEditing, onChange }: { icon: any, label: string, value: string, isEditing: boolean, onChange: (t: string) => void }) => (
  <View style={styles.contactItem}>
    <View style={styles.contactIconBg}>{icon}</View>
    <View style={styles.flex1}>
      <Text style={styles.contactLabel}>{label}</Text>
      {isEditing ? (
          <TextInput 
            style={styles.contactInput}
            value={value}
            onChangeText={onChange}
          />
      ) : (
          <Text style={styles.contactValue}>{value}</Text>
      )}
    </View>
    {!isEditing && <Copy size={16} color="#9ca3af" />}
  </View>
);

const SocialInput = ({ icon, value, onChange, placeholder }: { icon: any, value: string, onChange: (t: string) => void, placeholder: string }) => (
    <View style={styles.socialInputRow}>
        <View style={styles.socialInputIcon}>{icon}</View>
        <TextInput 
            style={styles.socialTextInput}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
        />
    </View>
);

const SocialIcon = ({ color, icon }: { color: string, icon: any }) => (
  <TouchableOpacity style={[styles.socialIcon, { backgroundColor: color }]}>
    {icon}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffcf5' },
  scrollContent: { paddingBottom: 100 },
  flex1: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, alignItems: 'center', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 10 : 15 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#1f2937' },
  iconButton: { padding: 8, borderRadius: 12, backgroundColor: '#f3f4f6' },
  profileSection: { alignItems: 'center', paddingVertical: 10 },
  avatarContainer: { width: 120, height: 120, borderRadius: 60, padding: 4, backgroundColor: 'white', elevation: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, borderWidth: 4 },
  avatar: { width: '100%', height: '100%', borderRadius: 60 },
  cameraIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#10b981', padding: 6, borderRadius: 15, borderWidth: 3, borderColor: 'white' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 15 },
  userName: { fontSize: 24, fontWeight: '800', color: '#111827' },
  userRole: { fontSize: 14, color: '#6b7280', fontWeight: '600', marginTop: 2 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff7ed', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginTop: 10 },
  ratingText: { fontWeight: '800', marginLeft: 5, color: '#1f2937' },
  reviewCount: { fontSize: 12, color: '#9ca3af', marginLeft: 4 },
  descriptionContainer: { paddingHorizontal: 40, marginTop: 15, alignItems: 'center' },
  descriptionText: { fontSize: 13, color: '#4b5563', textAlign: 'center', lineHeight: 18, fontWeight: '500' },
  editProfileBtn: { marginTop: 20, width: width * 0.8, backgroundColor: 'white', borderWidth: 1, borderColor: '#d1d5db', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  editProfileBtnText: { fontWeight: '700', color: '#1f2937' },
  dutyContainer: { flexDirection: 'row', backgroundColor: '#f3f4f6', marginHorizontal: 20, borderRadius: 12, padding: 4, marginTop: 20 },
  dutyBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 10 },
  dutyBtnActiveOn: { backgroundColor: '#10b981', elevation: 2 },
  dutyBtnActiveOff: { backgroundColor: '#ef4444', elevation: 2 },
  dutyText: { fontWeight: '700', color: '#6b7280' },
  dutyTextActive: { color: 'white' },
  glassCard: { marginHorizontal: 20, marginTop: 20, padding: 15, borderRadius: 20, backgroundColor: 'white', borderWidth: 1, borderColor: '#f3f4f6' },
  notificationIconBg: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff7ed', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  cardTitle: { fontWeight: '800', color: '#111827' },
  cardSub: { fontSize: 12, color: '#9ca3af' },
  walletCard: { marginHorizontal: 20, marginTop: 20, borderRadius: 25, padding: 20 },
  walletHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  walletLabel: { color: '#ffedd5', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  walletBalance: { color: 'white', fontSize: 32, fontWeight: '800' },
  walletCurrency: { fontSize: 16, fontWeight: '500', opacity: 0.9 },
  walletIconBg: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 12 },
  sendBtn: { backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 15, gap: 8 },
  sendBtnText: { color: '#ea580c', fontWeight: '800' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
  sectionDivider: { height: 1, backgroundColor: '#e5e7eb', marginHorizontal: 20, marginTop: 25 },
  audioContainer: { marginHorizontal: 20, marginTop: 15, backgroundColor: '#ecfdf5', borderRadius: 20, padding: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#d1fae5' },
  audioPlayBtn: { backgroundColor: '#10b981', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  waveform: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3 },
  waveBar: { width: 3, backgroundColor: '#10b981', borderRadius: 2 },
  audioActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  speedBadge: { backgroundColor: 'rgba(255,255,255,0.5)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  speedText: { fontSize: 10, fontWeight: '800', color: '#047857' },
  voiceFooter: { alignSelf: 'center', marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 5 },
  addVoiceContainer: { alignItems: 'center', marginTop: 20, gap: 10 },
  addVoiceBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'white', borderStyle: 'dashed', borderWidth: 1, borderColor: '#ea580c', justifyContent: 'center', alignItems: 'center' },
  addVoiceText: { fontSize: 14, color: '#ea580c', fontWeight: '700' },
  micText: { color: '#059669', fontSize: 12, fontWeight: '600' },
  sevasScroll: { paddingLeft: 20, marginTop: 15 },
  sevaItem: { alignItems: 'center', marginRight: 20, width: 80, position: 'relative' },
  sevaIcon: { width: 65, height: 65, borderRadius: 18, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', elevation: 2, borderWidth: 1, borderColor: '#f3f4f6' },
  sevaIconActive: { borderColor: '#fed7aa', shadowColor: '#ea580c', shadowOpacity: 0.1 },
  sevaText: { marginTop: 8, fontSize: 11, fontWeight: '600', color: '#4b5563', textAlign: 'center' },
  deleteSevaIcon: { position: 'absolute', top: -5, right: -5, backgroundColor: '#ef4444', borderRadius: 10, padding: 2, zIndex: 10 },
  editLink: { color: '#ea580c', fontWeight: '600', fontSize: 14 },
  addSevaInputRow: { flexDirection: 'row', marginHorizontal: 20, marginTop: 10, alignItems: 'center' },
  sevaTextInput: { flex: 1, backgroundColor: 'white', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#e5e7eb' },
  saveSevaBtn: { marginLeft: 10, backgroundColor: '#ea580c', padding: 10, borderRadius: 10 },
  saveSevaText: { color: 'white', fontWeight: '700' },
  referralCard: { marginHorizontal: 20, marginTop: 25, backgroundColor: '#fff7ed', padding: 15, borderRadius: 15, borderStyle: 'dashed', borderWidth: 1, borderColor: '#fed7aa', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardLabel: { fontSize: 12, fontWeight: '800', color: '#1f2937' },
  referralCode: { fontSize: 18, fontWeight: '800', color: '#ea580c', marginVertical: 2 },
  shareButton: { backgroundColor: 'white', padding: 10, borderRadius: 25, elevation: 2 },
  galleryScroll: { paddingLeft: 20, marginTop: 15 },
  galleryItem: { marginRight: 12, position: 'relative' },
  galleryImg: { width: 110, height: 110, borderRadius: 15 },
  galleryDelete: { position: 'absolute', top: 5, right: 5, backgroundColor: 'rgba(0,0,0,0.6)', padding: 4, borderRadius: 10 },
  contactList: { marginHorizontal: 20, marginTop: 5, gap: 10 },
  contactItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 12, borderRadius: 15, gap: 12, borderWidth: 1, borderColor: '#f3f4f6' },
  contactIconBg: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#fff7ed', alignItems: 'center', justifyContent: 'center' },
  contactLabel: { fontSize: 9, fontWeight: '800', color: '#9ca3af' },
  contactValue: { fontSize: 13, fontWeight: '700', color: '#1f2937' },
  contactInput: { fontSize: 13, fontWeight: '700', color: '#111827', padding: 0, margin: 0, borderBottomWidth: 1, borderBottomColor: '#ea580c' },
  socialEditContainer: { marginHorizontal: 20, marginTop: 15, gap: 10 },
  socialInputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, padding: 10, borderWidth: 1, borderColor: '#e5e7eb' },
  socialInputIcon: { marginRight: 10, width: 30, alignItems: 'center' },
  socialTextInput: { flex: 1, fontSize: 14, color: '#1f2937' },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 15, marginTop: 20 },
  socialIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  
  settingsModalContainer: { width: '85%', backgroundColor: 'white', borderRadius: 25, padding: 20, alignItems: 'center', elevation: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 15 },
  settingsModalTitle: { fontSize: 22, fontWeight: '900', color: '#111827', marginBottom: 20, letterSpacing: 0.5 },
  settingsOption: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', alignItems: 'center' },
  settingsOptionText: { fontSize: 16, fontWeight: '700', color: '#4b5563' },
  settingsCloseBtn: { marginTop: 15, padding: 10 },
  settingsCloseText: { color: '#ea580c', fontWeight: '800', fontSize: 16 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: 'white', height: height * 0.8, width: '100%', position: 'absolute', bottom: 0, borderTopLeftRadius: 35, borderTopRightRadius: 35 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 25, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  modalTitle: { fontSize: 20, fontWeight: '900', color: '#111827' },
  saveActionText: { color: '#ea580c', fontWeight: '900', fontSize: 17 },
  modalBody: { padding: 25 },
  modalPhotoContainer: { alignItems: 'center', marginVertical: 20 },
  modalAvatar: { width: 110, height: 110, borderRadius: 55, marginBottom: 15 },
  photoActionBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fff7ed', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 25 },
  photoActionLabel: { color: '#ea580c', fontWeight: '800' },
  inputGroup: { marginBottom: 25 },
  inputLabel: { fontSize: 15, fontWeight: '800', color: '#374151', marginBottom: 10 },
  modalInput: { backgroundColor: '#f9fafb', borderRadius: 15, padding: 18, fontSize: 16, color: '#111827', borderWidth: 1, borderColor: '#e5e7eb' },
  textArea: { height: 120, textAlignVertical: 'top' },
  descriptionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  descriptionHeading: { fontSize: 14, fontWeight: '800', color: '#111827' },
  settingsEmoji: { fontSize: 22 },
});