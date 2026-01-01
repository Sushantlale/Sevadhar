import { useRouter } from 'expo-router';
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
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

  const handleAdminLogin = () => {
    // UPDATED CREDENTIALS AS PER YOUR REQUEST
    if (formData.email === "sevadhar@gmail.com" && formData.password === "sevadhar2025-26") {
      Alert.alert("Access Granted", "Welcome to Sevadhar Admin Panel");
      // Navigates to the index.tsx in your admin folder
      router.push('/admin' as any); 
    } else {
      Alert.alert("Error", "Invalid Admin Credentials. Please check your email and password.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}><ArrowLeft size={24} color="#333" /></TouchableOpacity>
          <Text style={styles.headerTitle}>Admin Secure Login</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.logoArea}>
             <Text style={styles.logoText}>sev<Text style={{ color: '#FF7A00' }}>@</Text>dhar</Text>
             <Text style={styles.adminTag}>ADMIN CONTROL PANEL</Text>
          </View>

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
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  content: { padding: 25, paddingTop: 40 },
  logoArea: { alignItems: 'center', marginBottom: 40 },
  logoText: { fontSize: 42, fontWeight: 'bold', color: '#333' },
  adminTag: { fontSize: 12, fontWeight: 'bold', color: '#FF7A00', letterSpacing: 2, marginTop: -5 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, paddingHorizontal: 15, height: 56, marginBottom: 20, borderWidth: 1, borderColor: '#EEE' },
  icon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16 },
  loginBtn: { backgroundColor: '#FF7A00', height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginTop: 10, elevation: 2 },
  loginText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  forgotBtn: { marginTop: 25, alignSelf: 'center' },
  forgotText: { color: '#FF7A00', fontSize: 14, fontWeight: '600' }
});