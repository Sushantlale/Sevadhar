import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  Copy,
  Droplets,
  Edit3,
  Facebook,
  FlameKindling,
  HelpCircle,
  IndianRupee,
  Instagram,
  Linkedin,
  LogOut,
  Mail,
  MapPin,
  Mic,
  Phone,
  Play,
  Plus,
  Save,
  Snowflake,
  Star,
  Trash2,
  Twitter,
  Wallet,
  Wrench,
  X,
  Youtube
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ProfilePage() {
  const router = useRouter();

  // --- Dynamic States ---
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [dailyCheck, setDailyCheck] = useState(true);
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400');
  
  // 1. Work Gallery State
  const [gallery, setGallery] = useState([
    'https://picsum.photos/200/200?sig=1',
    'https://picsum.photos/200/200?sig=2',
    'https://picsum.photos/200/200?sig=3'
  ]);

  // 2. My Seva State
  const [sevas, setSevas] = useState(['AC Repair', 'Installation', 'Gas Filling', 'Cleaning']);
  const [newSeva, setNewSeva] = useState('');
  const [isAddingSeva, setIsAddingSeva] = useState(false);

  // 3. Contact Info State
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@example.com',
    location: 'Mumbai, Maharashtra'
  });

  // 4. Social Media State
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    youtube: '',
    instagram: '',
    linkedin: '',
    twitter: ''
  });

  // --- Voice Recorder Requirements ---
  const [voiceUri, setVoiceUri] = useState<string | null>('dummy-uri'); // Initial existing recording
  const [isRecording, setIsRecording] = useState(false);

  const handleDeleteVoice = () => {
    Alert.alert("Delete Recording", "Are you sure you want to delete this voice recording?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => setVoiceUri(null) }
    ]);
  };

  const handleStartRecording = () => {
    // Exact behavior as Home Page recorder
    setIsRecording(true);
    // Simulate recording end after 3 seconds for UI demonstration
    setTimeout(() => {
        setIsRecording(false);
        setVoiceUri('new-recording-uri');
    }, 3000);
  };

  // --- Handlers ---
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) setAvatar(result.assets[0].uri);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => router.replace('/login') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Edit3 size={22} color="#ea580c" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
              <Plus size={16} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.nameRow}>
            <Text style={styles.userName}>Rajesh Kumar</Text>
            <CheckCircle2 size={20} color="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
          </View>
          <Text style={styles.userRole}>Certified AC Technician</Text>
          
          <View style={styles.ratingBadge}>
            <Star size={14} color="#f97316" fill="#f97316" />
            <Text style={styles.ratingText}>4.8</Text>
            <Text style={styles.reviewCount}>(120 Reviews)</Text>
          </View>
        </View>

        {/* Duty Switcher */}
        <View style={styles.dutyContainer}>
          <TouchableOpacity 
            style={[styles.dutyBtn, isOnDuty && styles.dutyBtnActive]} 
            onPress={() => setIsOnDuty(true)}
          >
            <Text style={[styles.dutyText, isOnDuty && styles.dutyTextActive]}>On Duty</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.dutyBtn, !isOnDuty && styles.dutyBtnActive]} 
            onPress={() => setIsOnDuty(false)}
          >
            <Text style={[styles.dutyText, !isOnDuty && styles.dutyTextActive]}>Off Duty</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Check Toggle */}
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

        {/* Wallet Card */}
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

        {/* Voice Record Section */}
        <View style={styles.sectionDivider} />
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Voice Record</Text>
        </View>

        {voiceUri ? (
          // UI when recording exists
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
               <Text style={styles.micText}>Voice message stored</Text>
            </View>
          </>
        ) : (
          // UI when recording is deleted
          <View style={styles.addVoiceContainer}>
             <TouchableOpacity style={styles.addVoiceBtn} onPress={handleStartRecording}>
                <Plus size={30} color="#ea580c" />
             </TouchableOpacity>
             <Text style={styles.addVoiceText}>{isRecording ? "Recording..." : "Add Voice Recording"}</Text>
          </View>
        )}

        {/* My Sevas Section */}
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
                    placeholder="Enter seva name..."
                    value={newSeva}
                    onChangeText={(text: string) => setNewSeva(text)}
                />
                <TouchableOpacity style={styles.saveSevaBtn} onPress={handleAddSeva}>
                    <Text style={styles.saveSevaText}>Save</Text>
                </TouchableOpacity>
            </View>
        )}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sevasScroll}>
          {sevas.map((item, index) => (
            <View key={index} style={styles.sevaItem}>
              <TouchableOpacity 
                style={styles.deleteSevaIcon} 
                onPress={() => deleteSeva(index)}
              >
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

        {/* Work Gallery Section */}
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

        {/* Contact Info Section */}
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

        {/* Social Media Links Section */}
        <View style={[styles.sectionHeader, { marginTop: 25 }]}>
            <Text style={styles.sectionTitle}>Social Media Links</Text>
            <TouchableOpacity onPress={() => setIsEditingSocial(!isEditingSocial)}>
                <View style={styles.row}>
                    {isEditingSocial ? <Save size={18} color="#ea580c" /> : <Edit3 size={18} color="#ea580c" />}
                    <Text style={[styles.editLink, {marginLeft: 5}]}>{isEditingSocial ? "Save" : "Edit"}</Text>
                </View>
            </TouchableOpacity>
        </View>

        {isEditingSocial ? (
            <View style={styles.socialEditContainer}>
                <SocialInput icon={<Facebook size={20} color="#1877F2" />} value={socialLinks.facebook} onChange={(t: string) => setSocialLinks({...socialLinks, facebook: t})} placeholder="Facebook Link" />
                <SocialInput icon={<Instagram size={20} color="#E4405F" />} value={socialLinks.instagram} onChange={(t: string) => setSocialLinks({...socialLinks, instagram: t})} placeholder="Instagram Link" />
                <SocialInput icon={<Twitter size={20} color="black" />} value={socialLinks.twitter} onChange={(t: string) => setSocialLinks({...socialLinks, twitter: t})} placeholder="Twitter Link" />
                <SocialInput icon={<Linkedin size={20} color="#0A66C2" />} value={socialLinks.linkedin} onChange={(t: string) => setSocialLinks({...socialLinks, linkedin: t})} placeholder="LinkedIn Link" />
                {/* YouTube Icon Fixed Here */}
                <SocialInput icon={<Youtube size={22} color="#FF0000" fill="#FF0000" />} value={socialLinks.youtube} onChange={(t: string) => setSocialLinks({...socialLinks, youtube: t})} placeholder="YouTube Link" />
            </View>
        ) : (
            <View style={styles.socialRow}>
              <SocialIcon color="#1877F2" icon={<Facebook size={20} color="white" fill="white" />} />
              {/* YouTube Icon Fixed Here */}
              <SocialIcon color="#FF0000" icon={<Youtube size={20} color="white" fill="white" />} />
              <SocialIcon color="#E4405F" icon={<Instagram size={20} color="white" />} />
              <SocialIcon color="#0A66C2" icon={<Linkedin size={20} color="white" fill="white" />} />
              <SocialIcon color="black" icon={<Twitter size={20} color="white" fill="white" />} />
            </View>
        )}

        {/* Settings */}
        <Text style={[styles.sectionTitle, { marginHorizontal: 20, marginTop: 30 }]}>Settings</Text>
        <View style={styles.settingsList}>
          <SettingsItem icon={<Bell size={20} color="#6b7280" />} label="Notifications" />
          <SettingsItem icon={<HelpCircle size={20} color="#6b7280" />} label="Help Center" />
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <LogOut size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- Internal Helper Components ---

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

const SettingsItem = ({ icon, label }: { icon: any, label: string }) => (
  <TouchableOpacity style={styles.settingsItem}>
    <View style={styles.row}>
      {icon}
      <Text style={styles.settingsLabel}>{label}</Text>
    </View>
    <ChevronRight size={18} color="#d1d5db" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffcf5' },
  scrollContent: { paddingBottom: 100 },
  flex1: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: 'rgba(255,255,255,0.8)' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1f2937' },
  iconButton: { padding: 8, borderRadius: 20, backgroundColor: '#fff7ed' },
  profileSection: { alignItems: 'center', paddingVertical: 20 },
  avatarContainer: { width: 120, height: 120, borderRadius: 60, padding: 4, backgroundColor: 'white', elevation: 10, shadowColor: '#ea580c', shadowOpacity: 0.2, shadowRadius: 20 },
  avatar: { width: '100%', height: '100%', borderRadius: 60 },
  cameraIcon: { position: 'absolute', bottom: 5, right: 5, backgroundColor: '#10b981', padding: 6, borderRadius: 15, borderWidth: 3, borderColor: 'white' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 15 },
  userName: { fontSize: 24, fontWeight: '800', color: '#111827' },
  userRole: { fontSize: 14, color: '#6b7280', fontWeight: '500', marginTop: 4 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.7)', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20, marginTop: 12, borderWidth: 1, borderColor: '#ffedd5' },
  ratingText: { fontWeight: '800', marginLeft: 5, color: '#1f2937' },
  reviewCount: { fontSize: 12, color: '#9ca3af', marginLeft: 4 },
  dutyContainer: { flexDirection: 'row', backgroundColor: '#f3f4f6', marginHorizontal: 20, borderRadius: 30, padding: 4, marginTop: 10 },
  dutyBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 25 },
  dutyBtnActive: { backgroundColor: 'white', elevation: 2 },
  dutyText: { fontWeight: '600', color: '#6b7280' },
  dutyTextActive: { color: '#ea580c', fontWeight: '800' },
  glassCard: { marginHorizontal: 20, marginTop: 20, padding: 15, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.6)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)' },
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
  micBtn: { alignSelf: 'center', marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 5 },
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
  galleryScroll: { paddingLeft: 20, marginTop: 15 },
  galleryItem: { marginRight: 12, position: 'relative' },
  galleryImg: { width: 110, height: 110, borderRadius: 15 },
  galleryDelete: { position: 'absolute', top: 5, right: 5, backgroundColor: 'rgba(0,0,0,0.6)', padding: 4, borderRadius: 10 },
  contactList: { marginHorizontal: 20, marginTop: 5, gap: 10 },
  contactItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.5)', padding: 12, borderRadius: 15, gap: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)' },
  contactIconBg: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#fff7ed', alignItems: 'center', justifyContent: 'center' },
  contactLabel: { fontSize: 9, fontWeight: '800', color: '#9ca3af' },
  contactValue: { fontSize: 13, fontWeight: '700', color: '#1f2937' },
  contactInput: { fontSize: 13, fontWeight: '700', color: '#1f2937', padding: 0, margin: 0, borderBottomWidth: 1, borderBottomColor: '#ea580c' },
  socialEditContainer: { marginHorizontal: 20, marginTop: 15, gap: 10 },
  socialInputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, padding: 10, borderWidth: 1, borderColor: '#e5e7eb' },
  socialInputIcon: { marginRight: 10, width: 30, alignItems: 'center' },
  socialTextInput: { flex: 1, fontSize: 14, color: '#1f2937' },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 15, marginTop: 20 },
  socialIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  settingsList: { marginHorizontal: 20, marginTop: 10, gap: 10, marginBottom: 40 },
  settingsItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 15, borderRadius: 15 },
  settingsLabel: { marginLeft: 12, fontWeight: '600', color: '#1f2937' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef2f2', padding: 15, borderRadius: 15, marginTop: 5 },
  logoutText: { marginLeft: 12, fontWeight: '700', color: '#ef4444' },
});