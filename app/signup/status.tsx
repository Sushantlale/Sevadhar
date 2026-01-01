import { useRouter } from 'expo-router';
import { Clock, ShieldCheck } from 'lucide-react-native';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ReviewStatus() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconBg}><Clock size={60} color="#FF7A00" /></View>
        <Text style={styles.title}>Profile Under Review</Text>
        <Text style={styles.description}>
          Thank you for joining Sevadhar. An admin is manually verifying your Aadhar details and profile.
          You will be able to log in and accept jobs once approved.
        </Text>
        
        <View style={styles.timeBox}>
          <ShieldCheck size={20} color="#10B981" />
          <Text style={styles.timeText}>Estimated verification: 24-48 hours</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/login' as any)}>
          <Text style={styles.buttonText}>Return to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6', justifyContent: 'center' },
  content: { alignItems: 'center', padding: 30 },
  iconBg: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#FFEBDC', alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  description: { textAlign: 'center', color: '#666', lineHeight: 22, fontSize: 16, marginBottom: 30 },
  timeBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#E1FBF2', padding: 12, borderRadius: 12, marginBottom: 40 },
  timeText: { color: '#065F46', fontSize: 14, fontWeight: '600' },
  button: { backgroundColor: '#FF7A00', width: '100%', height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});