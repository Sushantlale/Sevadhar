import { useRouter } from 'expo-router';
import { ArrowLeft, Lock, Phone } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({ phone: '', password: '' });

  const handleLogin = () => {
    // Basic Input Validation
    if (formData.phone.length !== 10) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number.");
      return;
    }

    // Mock Database Check: If user is a provider, check if they are approved
    const mockIsApproved = false; // Change to true after Admin Approval

    if (!mockIsApproved) {
      // Redirect to status page if not yet approved by admin
      router.push('/signup/status' as any);
      return;
    }
    
    router.push('/(tabs)/home' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><ArrowLeft size={24} color="#333" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Sign In</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.logoText}>sev<Text style={{ color: '#FF7A00' }}>@</Text>dhar</Text>
        
        <View style={styles.inputWrapper}>
          <Phone size={20} color="#9CA3AF" />
          <TextInput 
            placeholder="Phone Number" 
            keyboardType="phone-pad" 
            maxLength={10}
            onChangeText={(t) => setFormData({...formData, phone: t.replace(/[^0-9]/g, '')})}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Lock size={20} color="#9CA3AF" />
          <TextInput placeholder="Password" secureTextEntry onChangeText={(t) => setFormData({...formData, password: t})} />
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleLogin}>
          <Text style={styles.submitText}>Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: '#FFF' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  scroll: { padding: 25, alignItems: 'center', justifyContent: 'center', flex: 1 },
  logoText: { fontSize: 42, fontWeight: 'bold', marginBottom: 40, color: '#333' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, paddingHorizontal: 15, height: 56, marginBottom: 20, width: '100%', borderWidth: 1, borderColor: '#EEE' },
  submitBtn: { backgroundColor: '#FF7A00', height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', width: '100%' },
  submitText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 }
});