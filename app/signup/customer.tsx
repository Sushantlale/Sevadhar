import Checkbox from 'expo-checkbox';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  CheckCircle,
  Eye, EyeOff,
  Lock,
  Mail,
  MapPin,
  Navigation,
  Phone,
  User
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';

// Mock localities from your contexts/AreaContext
const localities = [
  { id: '1', name: 'Vinaynagar', city: 'Khopoli' },
  { id: '2', name: 'Mogalwadi', city: 'Solapur' },
  { id: '3', name: 'Bazaar Peth', city: 'Khopoli' },
  { id: '4', name: 'Shilphata', city: 'Khopoli' },
  { id: '5', name: 'Siddheshwar Peth', city: 'Solapur' },
];

export default function CustomerSignup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  
  // Custom Toast State for top error messages
  const [toast, setToast] = useState<{ msg: string; title: string } | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    area: '',
    phone: '',
    email: '',
    otp: '',
    confirmOtp: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const showErrorMessage = (title: string, msg: string) => {
    setToast({ title, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSendOTP = () => {
    if (!formData.phone || formData.phone.length < 10) {
      showErrorMessage("Invalid Phone Number", "Please enter a valid 10-digit phone number");
      return;
    }
    setOtpSent(true);
    Alert.alert("OTP Sent!", `OTP sent to ${formData.phone}`);
  };

  const handleVerifyOTP = () => {
    if (formData.otp && formData.otp === formData.confirmOtp) {
      setOtpVerified(true);
      Alert.alert("Success", "Phone number verified!");
    } else {
      showErrorMessage("OTP Mismatch", "OTP and Confirm OTP do not match");
    }
  };

  const requestLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Allow location access in settings");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setFormData({ ...formData, area: "Current Location (Fetching...)" });
    setModalVisible(false);
    // Simulation of reverse geocoding
    setTimeout(() => setFormData(prev => ({...prev, area: "Solapur Area (GPS)"})), 1500);
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.area || !formData.phone || !formData.password) {
      showErrorMessage("Field Required", "Please fill all mandatory fields marked with *");
      return;
    }
    if (!otpVerified) {
      showErrorMessage("Verify OTP First", "Please verify your phone number to continue");
      return;
    }
    if (!formData.agreeTerms) {
      showErrorMessage("Terms Required", "Please agree to the Terms and Conditions");
      return;
    }
    router.push('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Red Alert Toast (Matches your Image) */}
      {toast && (
        <View style={styles.errorToast}>
          <Text style={styles.errorToastTitle}>{toast.title}</Text>
          <Text style={styles.errorToastMsg}>{toast.msg}</Text>
        </View>
      )}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Customer Sign Up</Text>
          <Text style={styles.headerSub}>Create your customer account</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Full Name */}
        <Text style={styles.label}>Full Name <Text style={styles.red}>*</Text></Text>
        <View style={styles.inputContainer}>
          <User size={20} color="#999" style={styles.icon} />
          <TextInput 
            placeholder="Full Name" 
            style={styles.input} 
            onChangeText={(v) => setFormData({...formData, fullName: v})}
          />
        </View>

        {/* Area Selection */}
        <Text style={styles.label}>Area/Locality <Text style={styles.red}>*</Text></Text>
        <TouchableOpacity style={styles.inputContainer} onPress={() => setModalVisible(true)}>
          <MapPin size={20} color="#999" style={styles.icon} />
          <Text style={{ color: formData.area ? '#000' : '#999', flex: 1 }}>
            {formData.area || "Select your area"}
          </Text>
        </TouchableOpacity>

        {/* Address */}
        <Text style={styles.label}>Home Address <Text style={styles.red}>*</Text></Text>
        <View style={[styles.inputContainer, { height: 80, alignItems: 'flex-start', paddingTop: 12 }]}>
          <MapPin size={20} color="#999" style={styles.icon} />
          <TextInput 
            placeholder="Home Address" 
            style={styles.input} 
            multiline 
            onChangeText={(v) => setFormData({...formData, address: v})}
          />
        </View>

        {/* Phone */}
        <Text style={styles.label}>Phone Number <Text style={styles.red}>*</Text></Text>
        <View style={styles.inputContainer}>
          <Phone size={20} color="#999" style={styles.icon} />
          <TextInput 
            placeholder="Phone Number" 
            style={styles.input} 
            keyboardType="phone-pad"
            onChangeText={(v) => setFormData({...formData, phone: v})}
          />
        </View>

        {/* Email */}
        <Text style={styles.label}>Email Address (Optional)</Text>
        <View style={styles.inputContainer}>
          <Mail size={20} color="#999" style={styles.icon} />
          <TextInput placeholder="Email Address" style={styles.input} />
        </View>

        {/* OTP Logic */}
        <View style={styles.otpRow}>
          <TouchableOpacity style={styles.sendOtpBtn} onPress={handleSendOTP}>
            <Text style={styles.sendOtpText}>Send OTP</Text>
          </TouchableOpacity>
          <TextInput 
            placeholder="Enter OTP" 
            style={[styles.inputContainer, { flex: 1, marginBottom: 0 }]} 
            keyboardType="number-pad" 
            onChangeText={(v) => setFormData({...formData, otp: v})}
          />
        </View>

        {otpSent && (
          <View style={styles.otpRow}>
            <TextInput 
              placeholder="Confirm OTP" 
              style={[styles.inputContainer, { flex: 1, marginBottom: 0 }]} 
              onChangeText={(v) => setFormData({...formData, confirmOtp: v})}
            />
            <TouchableOpacity style={styles.verifyBtn} onPress={handleVerifyOTP}>
              {otpVerified ? <CheckCircle size={20} color="#FFF" /> : <Text style={styles.verifyText}>Verify</Text>}
            </TouchableOpacity>
          </View>
        )}

        {/* Password */}
        <Text style={styles.label}>Password <Text style={styles.red}>*</Text></Text>
        <View style={styles.inputContainer}>
          <Lock size={20} color="#999" style={styles.icon} />
          <TextInput 
            placeholder="Password" 
            style={styles.input} 
            secureTextEntry={!showPassword}
            onChangeText={(v) => setFormData({...formData, password: v})}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} color="#999" /> : <Eye size={20} color="#999" />}
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <View style={styles.termsContainer}>
          <Checkbox
            value={formData.agreeTerms}
            onValueChange={(val) => setFormData({...formData, agreeTerms: val})}
            color={formData.agreeTerms ? '#FF7A00' : undefined}
          />
          <Text style={styles.termsText}>
            I agree with the <Text style={styles.orange}>Terms and Conditions</Text> and <Text style={styles.orange}>Privacy Policy *</Text>
          </Text>
        </View>

        {/* Submit */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Create Account</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Location Selector Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Area</Text>
            
            <TouchableOpacity style={styles.gpsOption} onPress={requestLocation}>
              <Navigation size={22} color="#FF7A00" />
              <Text style={styles.gpsText}>Use Current Location</Text>
            </TouchableOpacity>

            <FlatList 
              data={localities}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.areaItem} 
                  onPress={() => { setFormData({...formData, area: `${item.name} - ${item.city}`}); setModalVisible(false); }}
                >
                  <Text style={styles.areaItemText}>{item.name} - {item.city}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModal}>
              <Text style={styles.closeModalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF9F6' },
  errorToast: { position: 'absolute', top: 50, left: 20, right: 20, backgroundColor: '#EF4444', padding: 15, borderRadius: 12, zIndex: 999, elevation: 10 },
  errorToastTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  errorToastMsg: { color: '#FFF', fontSize: 13, marginTop: 2 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40, paddingBottom: 20, backgroundColor: '#FFF' },
  backBtn: { marginRight: 15 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  headerSub: { fontSize: 12, color: '#888' },
  scroll: { padding: 25 },
  label: { fontSize: 14, fontWeight: '700', color: '#444', marginBottom: 8 },
  red: { color: 'red' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EEE', borderRadius: 12, paddingHorizontal: 15, height: 56, marginBottom: 22 },
  icon: { marginRight: 12 },
  input: { flex: 1, fontSize: 15 },
  otpRow: { flexDirection: 'row', gap: 12, marginBottom: 22 },
  sendOtpBtn: { backgroundColor: '#FF7A00', paddingHorizontal: 18, borderRadius: 12, justifyContent: 'center' },
  sendOtpText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  verifyBtn: { backgroundColor: '#FF7A00', paddingHorizontal: 20, borderRadius: 12, justifyContent: 'center' },
  verifyText: { color: '#FFF', fontWeight: 'bold' },
  termsContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, paddingRight: 20 },
  termsText: { fontSize: 12, color: '#666', marginLeft: 10 },
  orange: { color: '#FF7A00', fontWeight: '600' },
  submitBtn: { backgroundColor: '#FF7A00', height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center', elevation: 3 },
  submitBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 25, height: '70%' },
  modalHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  gpsOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  gpsText: { fontSize: 16, color: '#FF7A00', fontWeight: 'bold', marginLeft: 12 },
  areaItem: { paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  areaItemText: { fontSize: 15, color: '#333' },
  closeModal: { marginTop: 10, padding: 15, alignItems: 'center' },
  closeModalText: { color: '#999', fontSize: 16 }
});