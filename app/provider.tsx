import { Audio } from 'expo-av';
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Calendar,
  Camera,
  Check,
  ChevronRight,
  Lock,
  MapPin,
  Mic,
  Phone,
  User
} from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const sevaCategories = [
  { id: 'household', name: 'Household Help & Cleaning' },
  { id: 'repair', name: 'Repair & Maintenance' },
  { id: 'construction', name: 'Construction & Labour' },
  { id: 'gardening', name: 'Gardening & Outdoor' },
  { id: 'scrap', name: 'Scrap & Small-Scale Services' },
  { id: 'religious', name: 'Religious & Community' },
  { id: 'personal', name: 'Personal Care & Wellness' },
  { id: 'food', name: 'Food & Beverage Vendors' },
  { id: 'education', name: 'Education & Knowledge' },
  { id: 'clothing', name: 'Clothing & Tailoring' },
  { id: 'pet', name: 'Pet & Animal Services' },
  { id: 'medical', name: 'Medical & Healthcare' },
  { id: 'event', name: 'Event & Decoration' },
  { id: 'transport', name: 'Transport & Delivery' },
  { id: 'professional', name: 'Professional & Legal' },
  { id: 'architecture', name: 'Architecture & Interior' },
  { id: 'arts', name: 'Arts & Entertainment' },
  { id: 'agriculture', name: 'Agriculture & Allied' },
];

export default function ProviderSignup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);

  const [formData, setFormData] = useState({
    aadharFront: null as string | null,
    aadharBack: null as string | null,
    fullName: '',
    dob: '',
    phone: '',
    email: '',
    homeAddress: '',
    password: '',
    confirmPassword: '',
    selectedSeva: '',
    agreeTerms: false,
  });

  // Camera/Gallery Logic for Mobile
  const pickImage = async (field: 'aadharFront' | 'aadharBack') => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "We need camera access to upload Aadhar");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setFormData({ ...formData, [field]: result.assets[0].uri });
    }
  };

  // Voice Recording Logic for Mobile
  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') return;
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      recordingRef.current = recording;
      setIsRecording(true);
    } catch (err) { Alert.alert('Failed to record audio'); }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    await recordingRef.current?.stopAndUnloadAsync();
    const uri = recordingRef.current?.getURI();
    setRecordingUri(uri || null);
  };

  const handleNext = () => {
    if (step === 1 && (!formData.aadharFront || !formData.aadharBack)) {
      Alert.alert("Required", "Please upload both sides of your Aadhar Card");
      return;
    }
    if (step === 2 && (!formData.fullName || !formData.phone || !formData.homeAddress)) {
      Alert.alert("Required", "Please fill all mandatory fields marked with *");
      return;
    }
    if (step === 3 && !formData.selectedSeva) {
      Alert.alert("Required", "Please select one service category");
      return;
    }
    setStep(step + 1);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Sticky Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : router.back()}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.headerTitle}>Sevadhar Sign Up</Text>
          <Text style={styles.headerSub}>Step {step} of 4 - Provider Registration</Text>
        </View>
      </View>

      {/* Mobile Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${(step / 4) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Step 1: Documents */}
        {step === 1 && (
          <View>
            <Text style={styles.stepTitle}>Upload Aadhar Card <Text style={{color:'red'}}>*</Text></Text>
            <View style={styles.uploadRow}>
              <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage('aadharFront')}>
                {formData.aadharFront ? (
                  <Image source={{ uri: formData.aadharFront }} style={styles.previewImg} />
                ) : (
                  <><Camera size={32} color="#FF7A00" /><Text style={styles.uploadLabel}>Front Side</Text></>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage('aadharBack')}>
                {formData.aadharBack ? (
                  <Image source={{ uri: formData.aadharBack }} style={styles.previewImg} />
                ) : (
                  <><Camera size={32} color="#FF7A00" /><Text style={styles.uploadLabel}>Back Side</Text></>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Step 2: Personal Info */}
        {step === 2 && (
          <View>
            <Text style={styles.stepTitle}>Personal Details</Text>
            <View style={styles.inputWrapper}>
              <User size={20} color="#9CA3AF" style={styles.icon} />
              <TextInput placeholder="Full Name (from Aadhar) *" style={styles.input} onChangeText={(v)=>setFormData({...formData, fullName: v})} />
            </View>
            <View style={styles.inputWrapper}>
              <Calendar size={20} color="#9CA3AF" style={styles.icon} />
              <TextInput placeholder="Date of Birth (DD/MM/YYYY) *" style={styles.input} />
            </View>
            <View style={[styles.inputWrapper, { height: 100, alignItems: 'flex-start', paddingTop: 15 }]}>
              <MapPin size={20} color="#9CA3AF" style={styles.icon} />
              <TextInput placeholder="Home Address *" style={styles.input} multiline onChangeText={(v)=>setFormData({...formData, homeAddress: v})} />
            </View>
            <View style={styles.inputWrapper}>
              <Phone size={20} color="#9CA3AF" style={styles.icon} />
              <TextInput placeholder="Phone Number *" style={styles.input} keyboardType="phone-pad" onChangeText={(v)=>setFormData({...formData, phone: v})} />
            </View>
            <View style={styles.inputWrapper}>
              <Lock size={20} color="#9CA3AF" style={styles.icon} />
              <TextInput placeholder="Password *" style={styles.input} secureTextEntry={!showPassword} />
            </View>
          </View>
        )}

        {/* Step 3: Categories */}
        {step === 3 && (
          <View>
            <Text style={styles.stepTitle}>Choose Seva Category <Text style={{color:'red'}}>*</Text></Text>
            <View style={styles.catGrid}>
              {sevaCategories.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={[styles.catBtn, formData.selectedSeva === item.id && styles.catBtnActive]}
                  onPress={() => setFormData({ ...formData, selectedSeva: item.id })}
                >
                  <Text style={[styles.catText, formData.selectedSeva === item.id && { color: '#FFF' }]}>{item.name}</Text>
                  {formData.selectedSeva === item.id && <Check size={18} color="#FFF" />}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 4: Voice Recording */}
        {step === 4 && (
          <View style={{ alignItems: 'center' }}>
            <View style={styles.micCircleBg}><Mic size={35} color="#FF7A00" /></View>
            <Text style={styles.stepTitle}>Record Voice Intro</Text>
            <Text style={styles.instruction}>Hold the button to record a 10-20 second introduction about your services.</Text>
            
            <TouchableOpacity 
              style={[styles.recordBtn, isRecording && { backgroundColor: '#EF4444' }]} 
              onPressIn={startRecording} 
              onPressOut={stopRecording}
            >
              <Mic size={45} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.recordStatus}>{isRecording ? "Recording..." : recordingUri ? "Introduction Saved!" : "Hold to record"}</Text>

            <View style={styles.termsRow}>
              <Checkbox value={formData.agreeTerms} onValueChange={(v)=>setFormData({...formData, agreeTerms: v})} color={formData.agreeTerms ? '#FF7A00' : undefined} />
              <Text style={styles.termsText}>I agree with the <Text style={{color:'#FF7A00', fontWeight:'bold'}}>Terms and Conditions *</Text></Text>
            </View>
          </View>
        )}

        <View style={styles.btnRow}>
          {step > 1 && <TouchableOpacity style={styles.backBtn} onPress={() => setStep(step - 1)}><Text style={{color: '#FF7A00', fontWeight:'bold'}}>Back</Text></TouchableOpacity>}
          <TouchableOpacity 
            style={[styles.nextBtn, step === 1 && { width: '100%' }]} 
            onPress={step < 4 ? handleNext : () => router.push('/(tabs)/home')}
          >
            <Text style={styles.nextText}>{step === 4 ? "Submit for Review" : "Continue"}</Text>
            {step < 4 && <ChevronRight size={20} color="#FFF" />}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  headerSub: { fontSize: 11, color: '#888' },
  progressContainer: { height: 6, backgroundColor: '#EEE' },
  progressBar: { height: 6, backgroundColor: '#FF7A00' },
  scroll: { padding: 25 },
  stepTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#111' },
  uploadRow: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  uploadBox: { flex: 1, height: 140, borderStyle: 'dashed', borderWidth: 2, borderColor: '#FF7A00', borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF' },
  uploadLabel: { fontSize: 12, color: '#FF7A00', fontWeight: 'bold', marginTop: 10 },
  previewImg: { width: '100%', height: '100%', borderRadius: 18 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 15, paddingHorizontal: 15, height: 56, marginBottom: 15, borderWidth: 1, borderColor: '#EEE' },
  icon: { marginRight: 12 },
  input: { flex: 1, fontSize: 15 },
  catGrid: { gap: 10 },
  catBtn: { flexDirection: 'row', justifyContent: 'space-between', padding: 18, backgroundColor: '#FFF', borderRadius: 15, borderWidth: 1, borderColor: '#EEE' },
  catBtnActive: { backgroundColor: '#FF7A00', borderColor: '#FF7A00' },
  catText: { fontSize: 14, fontWeight: '600', color: '#444' },
  micCircleBg: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#FFEBDC', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  recordBtn: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FF7A00', alignItems: 'center', justifyContent: 'center', marginTop: 20, elevation: 4 },
  instruction: { textAlign: 'center', color: '#666', fontSize: 14, paddingHorizontal: 20 },
  recordStatus: { marginTop: 15, color: '#666', fontWeight: 'bold' },
  termsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 40 },
  termsText: { fontSize: 12, marginLeft: 12, color: '#666' },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 40, paddingBottom: 50 },
  backBtn: { flex: 1, height: 56, borderRadius: 28, borderWidth: 2, borderColor: '#FF7A00', alignItems: 'center', justifyContent: 'center' },
  nextBtn: { flex: 2, backgroundColor: '#FFB87A', height: 56, borderRadius: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  nextText: { color: '#FFF', fontWeight: 'bold', fontSize: 17, marginRight: 5 }
});