import { Audio } from 'expo-av';
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import {
  ArrowLeft, Camera,
  Check,
  ChevronRight,
  Mic
} from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  Alert, Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
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
    selectedSeva: '',
    agreeTerms: false,
  });

  const pickImage = async (field: 'aadharFront' | 'aadharBack') => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setFormData({ ...formData, [field]: result.assets[0].uri });
    }
  };

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

  // Validates inputs for Name, DOB, and Phone
  const handleNext = () => {
    if (step === 1 && (!formData.aadharFront || !formData.aadharBack)) {
      Alert.alert("Required", "Please upload both sides of Aadhar");
      return;
    }
    if (step === 2) {
      if (formData.fullName.length < 3) {
        Alert.alert("Invalid Name", "Please enter your full name as shown on Aadhar.");
        return;
      }
      if (formData.phone.length !== 10) {
        Alert.alert("Invalid Phone", "Please enter a valid 10-digit mobile number.");
        return;
      }
      if (!formData.dob.includes('/') || formData.dob.length < 10) {
        Alert.alert("Invalid DOB", "Please enter DOB in DD/MM/YYYY format.");
        return;
      }
      if (!formData.homeAddress) {
        Alert.alert("Required", "Home address is mandatory.");
        return;
      }
    }
    if (step === 3 && !formData.selectedSeva) {
      Alert.alert("Required", "Please select a category");
      return;
    }
    setStep(step + 1);
  };

  // Fixed the "handleSubmitReview" missing error
  const handleSubmitReview = () => {
    if (!formData.agreeTerms) {
      Alert.alert("Required", "Please agree to the Terms and Conditions.");
      return;
    }
    // Redirect to the status page instead of home
    router.push('/signup/status' as any);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : router.back()}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.headerTitle}>Sevadhar Sign Up</Text>
          <Text style={styles.headerSub}>Step {step} of 4</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${(step / 4) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {step === 1 && (
          <View>
            <Text style={styles.stepTitle}>Upload Aadhar Card <Text style={styles.red}>*</Text></Text>
            <View style={styles.uploadRow}>
              <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage('aadharFront')}>
                {formData.aadharFront ? <Image source={{ uri: formData.aadharFront }} style={styles.previewImg} /> : 
                <><Camera size={30} color="#FF7A00" /><Text style={styles.uploadLabel}>Aadhar Front *</Text></>}
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage('aadharBack')}>
                {formData.aadharBack ? <Image source={{ uri: formData.aadharBack }} style={styles.previewImg} /> : 
                <><Camera size={30} color="#FF7A00" /><Text style={styles.uploadLabel}>Aadhar Back *</Text></>}
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.stepTitle}>Personal Details</Text>
            <TextInput 
              placeholder="Full Name (from Aadhar) *" 
              style={styles.input} 
              onChangeText={(v)=>setFormData({...formData, fullName: v.replace(/[^a-zA-Z ]/g, '')})} 
            />
            <TextInput 
              placeholder="Date of Birth (DD/MM/YYYY) *" 
              style={styles.input} 
              maxLength={10}
              keyboardType="numeric"
              onChangeText={(v)=>setFormData({...formData, dob: v})}
            />
            <TextInput 
              placeholder="Home Address *" 
              style={[styles.input, { height: 80 }]} 
              multiline 
              onChangeText={(v)=>setFormData({...formData, homeAddress: v})} 
            />
            <TextInput 
              placeholder="Phone Number *" 
              style={styles.input} 
              keyboardType="phone-pad" 
              maxLength={10}
              onChangeText={(v)=>setFormData({...formData, phone: v.replace(/[^0-9]/g, '')})} 
            />
            <TextInput 
              placeholder="Password *" 
              style={styles.input} 
              secureTextEntry={!showPassword} 
              onChangeText={(v)=>setFormData({...formData, password: v})} 
            />
          </View>
        )}

        {step === 3 && (
          <View>
            <Text style={styles.stepTitle}>Choose Seva Category <Text style={styles.red}>*</Text></Text>
            {sevaCategories.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.catBtn, formData.selectedSeva === item.id && styles.catBtnActive]}
                onPress={() => setFormData({ ...formData, selectedSeva: item.id })}
              >
                <Text style={[styles.catText, formData.selectedSeva === item.id && { color: '#FFF' }]}>{item.name}</Text>
                {formData.selectedSeva === item.id && <Check size={20} color="#FFF" />}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {step === 4 && (
          <View style={{ alignItems: 'center' }}>
            <View style={styles.micIconBg}><Mic size={30} color="#FF7A00" /></View>
            <Text style={styles.stepTitle}>Record Voice Intro <Text style={styles.red}>*</Text></Text>
            <Text style={styles.instruction}>Record a 10-20 second introduction about your skills.</Text>
            <TouchableOpacity 
              style={[styles.micCircle, isRecording && { backgroundColor: '#EF4444' }]} 
              onPressIn={startRecording} onPressOut={stopRecording}
            >
              <Mic size={40} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.recordStatus}>{isRecording ? "Recording..." : recordingUri ? "Recording Saved!" : "Hold to record"}</Text>
            <View style={styles.termsContainer}>
              <Checkbox 
                value={formData.agreeTerms} 
                onValueChange={(v)=>setFormData({...formData, agreeTerms: v})} 
                color={formData.agreeTerms ? '#FF7A00' : undefined} 
              />
              <Text style={styles.termsText}>I agree with the <Text style={{color: '#FF7A00'}}>Terms and Conditions *</Text></Text>
            </View>
          </View>
        )}

        <View style={styles.btnRow}>
          {step > 1 && <TouchableOpacity style={styles.backBtn} onPress={() => setStep(step - 1)}><Text style={{color: '#FF7A00'}}>Back</Text></TouchableOpacity>}
          <TouchableOpacity 
            style={[styles.nextBtn, step === 1 && { width: '100%' }]} 
            onPress={step < 4 ? handleNext : handleSubmitReview}
          >
            <Text style={styles.nextText}>{step === 4 ? "Submit For Review" : "Continue"}</Text>
            {step < 4 && <ChevronRight size={20} color="#FFF" />}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// FULL STYLES BLOCK ADDED TO FIX ALL 42 "CANNOT FIND NAME STYLES" ERRORS
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: '#FFF' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  headerSub: { fontSize: 11, color: '#666' },
  progressContainer: { height: 6, backgroundColor: '#EEE' },
  progressBar: { height: 6, backgroundColor: '#FF7A00' },
  scroll: { padding: 25 },
  stepTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  red: { color: 'red' },
  uploadRow: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  uploadBox: { flex: 1, height: 130, borderStyle: 'dashed', borderWidth: 1, borderColor: '#FF7A00', borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF', overflow: 'hidden' },
  uploadLabel: { fontSize: 12, color: '#FF7A00', fontWeight: 'bold', marginTop: 8 },
  previewImg: { width: '100%', height: '100%' },
  input: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 15, borderWidth: 1, borderColor: '#EEE', fontSize: 15 },
  catBtn: { flexDirection: 'row', justifyContent: 'space-between', padding: 18, backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#EEE', marginBottom: 10 },
  catBtnActive: { backgroundColor: '#FF7A00', borderColor: '#FF7A00' },
  catText: { fontSize: 14, fontWeight: '500' },
  micIconBg: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFEBDC', alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  micCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#FF7A00', alignItems: 'center', justifyContent: 'center', marginTop: 20, elevation: 4 },
  instruction: { textAlign: 'center', color: '#666', fontSize: 13, paddingHorizontal: 20 },
  recordStatus: { marginTop: 15, color: '#666', fontWeight: '600' },
  termsContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 30 },
  termsText: { fontSize: 12, marginLeft: 10, color: '#666' },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 40, paddingBottom: 40 },
  backBtn: { flex: 1, height: 55, borderRadius: 27, borderWidth: 1, borderColor: '#FF7A00', alignItems: 'center', justifyContent: 'center' },
  nextBtn: { flex: 2, backgroundColor: '#FF7A00', height: 55, borderRadius: 27, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  nextText: { color: '#FFF', fontWeight: 'bold', fontSize: 17, marginRight: 5 }
});