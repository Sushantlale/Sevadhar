import { useRouter } from 'expo-router';
import { Clock, ShieldCheck } from 'lucide-react-native';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';

export default function ReviewStatus() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.iconBg}>
          <Clock size={60} color="#FF7A00" />
        </View>
        
        <Text style={styles.title}>Profile Under Review</Text>
        
        <Text style={styles.description}>
          Thank you for joining Sevadhar. An admin is manually verifying your Aadhaar details and profile.
          {"\n\n"}
          You will be able to log in and accept jobs once approved.
        </Text>
        
        <View style={styles.timeBox}>
          <ShieldCheck size={20} color="#10B981" />
          <Text style={styles.timeText}>Estimated verification: 24-48 hours</Text>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.replace('/login')} // Using replace to clear the signup stack
        >
          <Text style={styles.buttonText}>Return to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6', justifyContent: 'center' },
  content: { alignItems: 'center', padding: 30 },
  iconBg: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    backgroundColor: '#FFEBDC', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 30,
    // Soft shadow for a modern look
    elevation: 4,
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 15, color: '#1E293B', textAlign: 'center' },
  description: { textAlign: 'center', color: '#64748B', lineHeight: 24, fontSize: 16, marginBottom: 30 },
  timeBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    backgroundColor: '#E1FBF2', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderRadius: 16, 
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#A7F3D0'
  },
  timeText: { color: '#065F46', fontSize: 14, fontWeight: '700' },
  button: { 
    backgroundColor: '#FF7A00', 
    width: '100%', 
    height: 60, 
    borderRadius: 16, 
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: { color: '#FFF', fontWeight: '800', fontSize: 18 }
});