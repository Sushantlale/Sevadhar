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
  Ticket, // Added Ticket icon for Referral
  User
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';

const localities = [
  { id: '1', city: 'Khopoli' },
  { id: '2', city: 'Khalapur' },
];

export default function CustomerSignup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  
  const [toast, setToast] = useState<{ msg: string; title: string } | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    area: '',
    phone: '',
    email: '',
    otp: '',
    password: '',
    referralCode: '', // Added referralCode state
    agreeTerms: false,
  });

  const showErrorMessage = (title: string, msg: string) => {
    setToast({ title, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSendOTP = () => {
    if (!formData.phone || formData.phone.length !== 10) {
      showErrorMessage("Invalid Phone Number", "Please enter a valid 10-digit phone number");
      return;
    }
    setOtpSent(true);
    Alert.alert("OTP Sent!", `A 6-digit code has been sent to ${formData.phone}`);
  };

  const handleVerifyOTP = () => {
    if (formData.otp.length === 6) {
      setOtpVerified(true);
      Alert.alert("Success", "Phone number verified successfully!");
    } else {
      showErrorMessage("Invalid OTP", "Please enter the correct 6-digit verification code");
    }
  };

  const requestLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Allow location access in settings");
      return;
    }
    setFormData({ ...formData, area: "Current Location (Fetching...)" });
    setModalVisible(false);
    setTimeout(() => setFormData(prev => ({...prev, area: "Khopoli Area (GPS)"})), 1500);
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.area || !formData.phone || !formData.password || !formData.address) {
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
    // Handle form submission logic here
    router.push('/(tabs)/home' as any);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {toast && (
          <View style={styles.errorToast}>
            <Text style={styles.errorToastTitle}>{toast.title}</Text>
            <Text style={styles.errorToastMsg}>{toast.msg}</Text>
          </View>
        )}

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
          
          <Text style={styles.label}>Full Name <Text style={styles.red}>*</Text></Text>
          <View style={styles.inputContainer}>
            <User size={20} color="#999" style={styles.icon} />
            <TextInput 
              placeholder="Full Name" 
              style={styles.input} 
              onChangeText={(v) => setFormData({...formData, fullName: v})}
            />
          </View>

          <Text style={styles.label}>Area/Locality <Text style={styles.red}>*</Text></Text>
          <TouchableOpacity style={styles.inputContainer} onPress={() => setModalVisible(true)}>
            <MapPin size={20} color="#999" style={styles.icon} />
            <Text style={{ color: formData.area ? '#000' : '#999', flex: 1 }}>
              {formData.area || "Select your area"}
            </Text>
          </TouchableOpacity>

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

          <Text style={styles.label}>Phone Number <Text style={styles.red}>*</Text></Text>
          <View style={styles.inputContainer}>
            <Phone size={20} color="#999" style={styles.icon} />
            <TextInput 
              placeholder="10-digit Mobile Number" 
              style={styles.input} 
              keyboardType="phone-pad"
              maxLength={10}
              onChangeText={(v) => setFormData({...formData, phone: v.replace(/[^0-9]/g, '')})}
            />
          </View>

          <View style={styles.otpRow}>
            <TouchableOpacity 
              style={[styles.sendOtpBtn, otpSent && { backgroundColor: '#CCC' }]} 
              onPress={handleSendOTP}
              disabled={otpSent}
            >
              <Text style={styles.sendOtpText}>{otpSent ? "Sent" : "Send OTP"}</Text>
            </TouchableOpacity>
            
            <View style={[styles.inputContainer, { flex: 1, marginBottom: 0 }]}>
              <TextInput 
                placeholder="Enter 6-digit OTP" 
                style={styles.input} 
                keyboardType="number-pad" 
                maxLength={6}
                onChangeText={(v) => setFormData({...formData, otp: v})}
              />
              {otpSent && !otpVerified && (
                <TouchableOpacity onPress={handleVerifyOTP}>
                  <Text style={styles.verifyTextLink}>Verify</Text>
                </TouchableOpacity>
              )}
              {otpVerified && <CheckCircle size={20} color="#10B981" />}
            </View>
          </View>

          <Text style={styles.label}>Email Address (Optional)</Text>
          <View style={styles.inputContainer}>
            <Mail size={20} color="#999" style={styles.icon} />
            <TextInput 
              placeholder="Email Address" 
              style={styles.input} 
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(v) => setFormData({...formData, email: v})}
            />
          </View>

          <Text style={styles.label}>Password <Text style={styles.red}>*</Text></Text>
          <View style={styles.inputContainer}>
            <Lock size={20} color="#999" style={styles.icon} />
            <TextInput 
              placeholder="Create Password" 
              style={styles.input} 
              secureTextEntry={!showPassword}
              onChangeText={(v) => setFormData({...formData, password: v})}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} color="#999" /> : <Eye size={20} color="#999" />}
            </TouchableOpacity>
          </View>

          {/* Referral Code Section (Added) */}
          <Text style={styles.label}>Referral Code (Optional)</Text>
          <View style={styles.inputContainer}>
            <Ticket size={20} color="#999" style={styles.icon} />
            <TextInput 
              placeholder="Enter Referral Code" 
              style={styles.input} 
              autoCapitalize="characters"
              onChangeText={(v) => setFormData({...formData, referralCode: v})}
            />
          </View>

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

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Create Account</Text>
          </TouchableOpacity>
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>

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
                  onPress={() => { setFormData({...formData, area: item.city}); setModalVisible(false); }}
                >
                  <Text style={styles.areaItemText}>{item.city}</Text>
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
  otpRow: { flexDirection: 'row', gap: 12, marginBottom: 22, height: 56, alignItems: 'center' },
  sendOtpBtn: { backgroundColor: '#FF7A00', height: '100%', paddingHorizontal: 20, borderRadius: 12, justifyContent: 'center' },
  sendOtpText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  verifyTextLink: { color: '#FF7A00', fontWeight: 'bold', fontSize: 14, marginLeft: 10 },
  termsContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, paddingRight: 20 },
  termsText: { fontSize: 12, color: '#666', marginLeft: 10 },
  orange: { color: '#FF7A00', fontWeight: '600' },
  submitBtn: { backgroundColor: '#FF7A00', height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center', elevation: 3 },
  submitBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 25, height: '60%' },
  modalHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  gpsOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  gpsText: { fontSize: 16, color: '#FF7A00', fontWeight: 'bold', marginLeft: 12 },
  areaItem: { paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  areaItemText: { fontSize: 15, color: '#333' },
  closeModal: { marginTop: 10, padding: 15, alignItems: 'center' },
  closeModalText: { color: '#999', fontSize: 16 }
});