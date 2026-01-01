import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function LandingPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoSymbol}>sev<Text style={{color: '#FF7A00'}}>@</Text>dhar</Text>
        </View>
        <Text style={styles.brandName}>sev<Text style={{ color: '#FF7A00' }}>@</Text>dhar</Text>
        <Text style={styles.tagline}>Your Service Partner</Text>
        
        <Text style={styles.description}>Connect with local providers{"\n"}Serve your community</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/signup/provider' as any)}>
            <Text style={styles.primaryBtnText}>Sign Up as Sevadhar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.outlineBtn} onPress={() => router.push('/signup/customer' as any)}>
            <Text style={styles.outlineBtnText}>Sign Up as Customer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login' as any)}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Small Admin Access Link as requested */}
        <TouchableOpacity style={styles.adminLink} onPress={() => router.push('/admin/login' as any)}>
          <Text style={styles.adminLinkText}>Admin Access</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  logoCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#FFEBDC', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  logoSymbol: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  brandName: { fontSize: 42, fontWeight: 'bold', color: '#333' },
  tagline: { fontSize: 16, color: '#666', marginBottom: 30 },
  description: { textAlign: 'center', fontSize: 16, color: '#444', marginBottom: 50, lineHeight: 24 },
  buttonGroup: { width: '100%', gap: 15 },
  primaryBtn: { backgroundColor: '#FF7A00', height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', elevation: 2 },
  primaryBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  outlineBtn: { backgroundColor: 'transparent', height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#FF7A00' },
  outlineBtnText: { color: '#FF7A00', fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', marginTop: 30 },
  footerText: { color: '#666' },
  signInLink: { color: '#FF7A00', fontWeight: 'bold' },
  adminLink: { marginTop: 40, opacity: 0.4 },
  adminLinkText: { fontSize: 11, color: '#666', textDecorationLine: 'underline' }
});

