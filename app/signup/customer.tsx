import Checkbox from 'expo-checkbox';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Eye,
  EyeOff,
  Home,
  Lock,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Smartphone,
  Ticket,
  User,
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
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const localities = [
  { id: '1', city: 'Khopoli' },
  { id: '2', city: 'Khalapur' },
];

export default function CustomerSignup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    area: '',
    phone: '',
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    agreeTerms: false,
  });

  const passwordsMatch =
  formData.password &&
  formData.confirmPassword &&
  formData.password === formData.confirmPassword;

  const handleSendOTP = () => {
    if (!formData.phone || formData.phone.length !== 10) {
      Alert.alert("Invalid Phone", "Please enter a valid 10-digit phone number");
      return;
    }
  
    setOtpSent(true);
    setOtpVerified(false);
    setFormData({ ...formData, otp: '' });
  
    Alert.alert("OTP Sent!", `A 6-digit code has been sent to ${formData.phone}`);
  };


  const handleVerifyOTP = () => {
    if (formData.otp.length === 6) {
      setOtpVerified(true);
      Alert.alert("Success", "Phone number verified!");
    } else {
      Alert.alert("Invalid OTP", "Please enter the correct 6-digit code");
    }
  };

  const requestLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Allow location access in settings");
      return;
    }
    setFormData({ ...formData, area: "Fetching location..." });
    setModalVisible(false);
    setTimeout(() => setFormData(prev => ({ ...prev, area: "Khopoli, Maharashtra" })), 1500);
  };

  // Helper for email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  

  const handleSubmit = () => {
    // 1. Mandatory Fields Check
    if (!formData.fullName || !formData.area || !formData.phone || !formData.password || !formData.address) {
      Alert.alert("Missing Fields", "Please fill all mandatory fields (*)");
      return;
    }

    // 2. Password Length Validation (Min 8 Digits/Characters)
    if (formData.password.length < 8) {
      Alert.alert("Invalid Password", "Password must be at least 8 characters long.");
      return;
    }

    // 3. Confirm Password Validation
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    // 4. Email Validation (If provided)
    if (formData.email && !isValidEmail(formData.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // 5. OTP Verification Check
    if (!otpVerified) {
      Alert.alert("Verify OTP", "Please verify your phone number first");
      return;
    }

    // 6. Terms Agreement Check
    if (!formData.agreeTerms) {
      Alert.alert("Terms", "You must agree to the Terms and Conditions");
      return;
    }

    // 7. Logic for successful registration
    Alert.alert("Success", "Account created successfully!");
    router.push('/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={28} color="#334155" />
          </TouchableOpacity>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us to find the best local services.</Text>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name <Text style={styles.asterisk}>*</Text></Text>
            <View style={styles.inputWrapper}>
              <User size={20} color="#94a3b8" style={styles.inputIcon} />
              <TextInput
                placeholder="Enter your full name"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                onChangeText={(v) => setFormData({ ...formData, fullName: v })}
              />
            </View>
          </View>

          {/* Area/Locality */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Area/Locality <Text style={styles.asterisk}>*</Text></Text>
            <TouchableOpacity style={styles.inputWrapper} onPress={() => setModalVisible(true)}>
              <MapPin size={20} color="#94a3b8" style={styles.inputIcon} />
              <Text style={[styles.inputText, !formData.area && { color: '#94a3b8' }]}>
                {formData.area || "Select your area"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Home Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Home Address <Text style={styles.asterisk}>*</Text></Text>
            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
              <Home size={20} color="#94a3b8" style={[styles.inputIcon, { marginTop: 14 }]} />
              <TextInput
                placeholder="Flat, Building, Street name"
                placeholderTextColor="#94a3b8"
                style={[styles.input, styles.textArea]}
                multiline
                numberOfLines={3}
                onChangeText={(v) => setFormData({ ...formData, address: v })}
              />
            </View>
          </View>

          {/* Phone Number & OTP */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number <Text style={styles.asterisk}>*</Text></Text>
            <View style={styles.phoneRow}>
              <View style={[styles.inputWrapper, { flex: 1, marginBottom: 0 }]}>
                <Phone size={20} color="#94a3b8" style={styles.inputIcon} />
                <TextInput
                  placeholder="10-digit number"
                  placeholderTextColor="#94a3b8"
                  keyboardType="phone-pad"
                  maxLength={10}
                  style={styles.phoneInput}
                  onChangeText={(v) => setFormData({ ...formData, phone: v.replace(/[^0-9]/g, '') })}
                />
              </View>
              <TouchableOpacity style={styles.otpButton} onPress={handleSendOTP}>
                <Text style={styles.otpButtonText}>Send OTP</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* OTP Field */}
          {/* <View style={[styles.inputWrapper, { marginTop: 12 }]}>
            <Smartphone size={20} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              placeholder="Enter 6-digit OTP"
              placeholderTextColor="#94a3b8"
              keyboardType="number-pad"
              maxLength={6}
              style={styles.input}
              onChangeText={(v) => setFormData({ ...formData, otp: v })}
              onBlur={handleVerifyOTP}
            />
          </View> */}

          {/* OTP Input & Verify Button (Visible only after Send OTP) */}
          {otpSent && (
            <View style={[styles.inputGroup, { marginTop: 12 }]}>
              <Text style={styles.label}>
                Verify OTP <Text style={styles.asterisk}>*</Text>
              </Text>
          
              <View style={styles.phoneRow}>
                <View style={[styles.inputWrapper, { flex: 1, marginBottom: 0 }]}>
                  <Smartphone size={20} color="#94a3b8" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Enter 6-digit OTP"
                    placeholderTextColor="#94a3b8"
                    keyboardType="number-pad"
                    maxLength={6}
                    style={styles.phoneInput}
                    value={formData.otp}
                    editable={!otpVerified}
                    onChangeText={(v) =>
                      setFormData({
                        ...formData,
                        otp: v.replace(/[^0-9]/g, ''),
                      })
                    }
                  />
                </View>
          
                {!otpVerified ? (
                  <TouchableOpacity style={styles.otpButton} onPress={handleVerifyOTP}>
                    <Text style={styles.otpButtonText}>Verify OTP</Text>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={[
                      styles.otpButton,
                      { backgroundColor: '#16a34a' },
                    ]}
                  >
                    <Text style={styles.otpButtonText}>Verified ✓</Text>
                  </View>
                )}
              </View>
          
              {/* 👇 THIS is the only new part */}
              {otpVerified && (
                <Text style={styles.verifiedText}>
                  ✓ Phone number verified successfully
                </Text>
              )}
            </View>
          )}
          


          {/* Email */}
          <View style={[styles.inputGroup, { marginTop: 15 }]}>
            <Text style={styles.label}>Email Address <Text style={styles.optional}>(Optional)</Text></Text>
            <View style={styles.inputWrapper}>
              <Mail size={20} color="#94a3b8" style={styles.inputIcon} />
              <TextInput
                placeholder="email@example.com"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                onChangeText={(v) => setFormData({ ...formData, email: v })}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password <Text style={styles.asterisk}>*</Text></Text>
            <View style={styles.inputWrapper}>
              <Lock size={20} color="#94a3b8" style={styles.inputIcon} />
              <TextInput
                placeholder="Min 8 digits Password"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showPassword}
                style={styles.input}
                onChangeText={(v) => setFormData({ ...formData, password: v })}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} color="#94a3b8" /> : <Eye size={20} color="#94a3b8" />}
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Confirm Password <Text style={styles.asterisk}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <Lock size={20} color="#94a3b8" style={styles.inputIcon} />
              <TextInput
                placeholder="Re-enter your password"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showConfirmPassword}
                style={styles.input}
                onChangeText={(v) =>
                  setFormData({ ...formData, confirmPassword: v })
                }
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={20} color="#94a3b8" /> : <Eye size={20} color="#94a3b8" />}
              </TouchableOpacity>
            </View>
          </View>


          {/* Referral */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Referral Code <Text style={styles.optional}>(Optional)</Text></Text>
            <View style={styles.inputWrapper}>
              <Ticket size={20} color="#94a3b8" style={styles.inputIcon} />
              <TextInput
                placeholder="Enter referral code"
                placeholderTextColor="#94a3b8"
                autoCapitalize="characters"
                style={styles.input}
                onChangeText={(v) => setFormData({ ...formData, referralCode: v })}
              />
            </View>
          </View>

          {/* Terms */}
          <View style={styles.termsRow}>
            <Checkbox
              value={formData.agreeTerms}
              onValueChange={(val) => setFormData({ ...formData, agreeTerms: val })}
              color={formData.agreeTerms ? '#FF7A00' : '#e2e8f0'}
              style={styles.checkbox}
            />
            <Text style={styles.termsText}>
              I agree with the <Text style={styles.link}>Terms and Conditions</Text> and <Text style={styles.link}>Privacy Policy</Text> <Text style={styles.asterisk}>*</Text>
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginLink}>Log In</Text>
            </Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Area Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Area</Text>
            <TouchableOpacity style={styles.gpsButton} onPress={requestLocation}>
              <Navigation size={20} color="#FF7A00" />
              <Text style={styles.gpsButtonText}>Use Current Location</Text>
            </TouchableOpacity>
            <FlatList
              data={localities}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.areaOption}
                  onPress={() => { setFormData({ ...formData, area: item.city }); setModalVisible(false); }}
                >
                  <Text style={styles.areaOptionText}>{item.city}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  scrollContent: { paddingHorizontal: 24, paddingTop: 20 },
  backButton: { width: 40, height: 100, justifyContent: 'center', marginLeft: -10, marginBottom: 5 },
  title: { fontSize: 32, fontWeight: '700', color: '#0f172a', letterSpacing: -0.5, paddingTop: -20 },
  subtitle: { fontSize: 16, color: '#64748b', marginTop: 4, marginBottom: 32 },
  
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 8 },
  asterisk: { color: '#FF7A00' },
  optional: { color: '#94a3b8', fontWeight: '400' },
  
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 55,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: '#1e293b',alignContent:"center" },
  inputText: { fontSize: 16, color: '#1e293b',alignContent:"center" },
  
  textAreaWrapper: { height: 110, alignItems: 'flex-start' },
  textArea: { height: '100%', paddingTop: 16, textAlignVertical: 'top' },
  
  phoneInput: {
  flex: 1,
  fontSize: 16,
  textAlign: 'left',
  height: 55,
  },

  phoneRow: { flexDirection: 'row', gap: 12 },
  otpButton: { 
    backgroundColor: '#FF7A00', 
    borderRadius: 16, 
    justifyContent: 'center', 
    paddingHorizontal: 18,
    height: 55 
  },
  otpButtonText: { color: '#FFF', fontWeight: '700', fontSize: 14 },

  termsRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 20, paddingRight: 10 },
  checkbox: { width: 20, height: 20, borderRadius: 6, marginTop: 2 },
  termsText: { flex: 1, marginLeft: 12, fontSize: 14, color: '#64748b', lineHeight: 20 },
  link: { color: '#FF7A00', fontWeight: '700' },

  submitBtn: { 
    backgroundColor: '#FF7A00', 
    height: 60, 
    borderRadius: 18, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 32,
    shadowColor: "#FF7A00",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  submitBtnText: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  
  loginContainer: { marginTop: 24, alignItems: 'center' },
  loginText: { fontSize: 15, color: '#64748b' },
  loginLink: { color: '#FF7A00', fontWeight: '700' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, minHeight: '50%' },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 20, color: '#0f172a' },
  gpsButton: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff7ed', borderRadius: 12, marginBottom: 12 },
  gpsButtonText: { marginLeft: 10, color: '#FF7A00', fontWeight: '700', fontSize: 16 },
  areaOption: { paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  areaOptionText: { fontSize: 16, color: '#334155' },
  modalClose: { marginTop: 20, alignItems: 'center', padding: 10 },
  modalCloseText: { color: '#94a3b8', fontSize: 16, fontWeight: '600' },
  verifiedText: {
  marginTop: 8,
  marginLeft: 8,
  color: '#16a34a',
  fontSize: 14,
  fontWeight: '600',
},

});