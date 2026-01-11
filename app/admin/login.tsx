import { useRouter } from 'expo-router';
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function AdminLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  // State for the custom popup (type can be 'error' or 'success')
  const [toast, setToast] = useState<{ msg: string; title: string; type: 'error' | 'success' } | null>(null);

  const showPopup = (title: string, msg: string, type: 'error' | 'success' = 'error') => {
    setToast({ title, msg, type });
    setTimeout(() => setToast(null), 4000); 
  };

  const handleAdminLogin = () => {
    // 1. Mandatory Field Validation
    if (!formData.email || !formData.password) {
      showPopup("Field Required", "Please fill all mandatory fields marked with *", "error");
      return;
    }

    // 2. Password Length Validation
    if (formData.password.length < 8) {
      showPopup(
        "Invalid Password",
        "Password must be at least 8 characters long",
        "error"
      );
      return;
    }

    // 3. Credential Verification
    if (formData.email === "sevadhar@gmail.com" && formData.password === "sevadhar2025-26") {
      showPopup("Access Granted", "Welcome to Sevadhar Admin Panel", "success");
      
      // Delay navigation slightly so user can see the success message
      setTimeout(() => {
        router.push('/admin' as any); 
      }, 1000);
    } else {
      // 4. Invalid Credentials Popup
      showPopup("Invalid Credentials", "The email or password you entered is incorrect.", "error");
    }

    if (formData.password.includes(' ')) {
     showPopup("Invalid Password", "Password cannot contain spaces", "error");
     return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
    showPopup("Invalid Email", "Please enter a valid email address", "error");
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        
        {/* Custom Pop-up UI */}
        {toast && (
          <View style={[
            styles.toast, 
            toast.type === 'error' ? styles.errorBg : styles.successBg
          ]}>
            <Text style={styles.toastTitle}>{toast.title}</Text>
            <Text style={styles.toastMsg}>{toast.msg}</Text>
          </View>
        )}

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Admin Secure Login</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.logoArea}>
            <Text style={styles.logoText}><Text style={{ color: '#FF7A00' }}>Sevadhar</Text></Text>
            <Text style={styles.adminTag}>ADMIN CONTROL PANEL</Text>
          </View>

          {/* Email Field */}
          <Text style={styles.label}>Admin Email <Text style={styles.red}>*</Text></Text>
          <View style={styles.inputWrapper}>
            <Mail size={20} color="#9CA3AF" style={styles.icon} />
            <TextInput 
              placeholder="Admin Email" 
              style={styles.input} 
              value={formData.email}
              onChangeText={(t) => setFormData({...formData, email: t})}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Password Field */}
          <Text style={styles.label}>Password <Text style={styles.red}>*</Text></Text>
          <View style={styles.inputWrapper}>
            <Lock size={20} color="#9CA3AF" style={styles.icon} />
            <TextInput 
              placeholder="Password" 
              style={styles.input} 
              secureTextEntry={!showPassword} 
              value={formData.password}
              onChangeText={(t) => setFormData({...formData, password: t})}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} color="#9CA3AF" /> : <Eye size={20} color="#9CA3AF" />}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleAdminLogin}>
            <Text style={styles.loginText}>Enter Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Admin Password?</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  
  // Dynamic Toast Styles
  toast: { 
    position: 'absolute', 
    top: 50, 
    left: 20, 
    right: 20, 
    padding: 15, 
    borderRadius: 12, 
    zIndex: 999, 
    elevation: 10 
  },
  errorBg: { backgroundColor: '#EF4444' },
  successBg: { backgroundColor: '#10B981' },
  toastTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  toastMsg: { color: '#FFF', fontSize: 13, marginTop: 2 },
  
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  content: { padding: 25, paddingTop: 40 },
  logoArea: { alignItems: 'center', marginBottom: 40 },
  logoText: { fontSize: 42, fontWeight: 'bold', color: '#333' },
  adminTag: { fontSize: 10, fontWeight: 'bold', color: '#000000', letterSpacing: 2, marginTop: -3 },
  
  label: { fontSize: 14, fontWeight: '700', color: '#444', marginBottom: 8 },
  red: { color: 'red' },
  
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, paddingHorizontal: 15, height: 52, marginBottom: 20, borderWidth: 1, borderColor: '#EEE' },
  icon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16 },
  loginBtn: { backgroundColor: '#FF7A00', height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginTop: 10, elevation: 2 },
  loginText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  forgotBtn: { marginTop: 25, alignSelf: 'center' },
  forgotText: { color: '#FF7A00', fontSize: 14, fontWeight: '600' }
});