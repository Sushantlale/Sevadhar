import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const t = (key: string) => {
  const keys: any = {
    tagline: "Your Service Partner",
    connectServe: "Connect with local providers\nServe your community",
    signUpAsSevadhar: "Sign Up as Sevadhar",
    signUpAsCustomer: "Sign Up as Customer",
    haveAccount: "Already have an account?",
    signIn: "Sign In"
  };
  return keys[key] || key;
};

export default function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.langRow}>
        {['EN', 'मराठी', 'हिंदी'].map((lang) => (
          <TouchableOpacity key={lang} style={styles.langBtn}>
            <Text style={styles.langBtnText}>{lang}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        <View style={styles.logoCircle}>
           {/* Replace with your logo file in assets/images/my-logo.png */}
           <Image source={require('../assets/images/logo.png')} style={{width: 80, height: 80}} resizeMode="contain" />
        </View>

        <Text style={styles.title}>
          sev<Text style={{ color: '#FF6B00' }}>@</Text>dhar
        </Text>
        <Text style={styles.tagline}>{t('tagline')}</Text>
        <Text style={styles.description}>{t('connectServe')}</Text>

        <TouchableOpacity style={[styles.button, styles.primaryBtn]} onPress={() => router.push('/signup/provider')}>
          <Text style={styles.primaryBtnText}>{t('signUpAsSevadhar')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.outlineBtn]} onPress={() => router.push('/signup/customer')}>
          <Text style={styles.outlineBtnText}>{t('signUpAsCustomer')}</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t('haveAccount')} </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.linkText}>{t('signIn')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F0' },
  langRow: { flexDirection: 'row', justifyContent: 'flex-end', padding: 20, gap: 10 },
  langBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#FFF' },
  langBtnText: { fontSize: 12, fontWeight: '600' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  logoCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#FFEBDC', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#333' },
  tagline: { fontSize: 14, color: '#666', marginTop: 5 },
  description: { textAlign: 'center', fontSize: 16, color: '#444', marginVertical: 40 },
  button: { width: '100%', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  primaryBtn: { backgroundColor: '#FF6B00' },
  primaryBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  outlineBtn: { borderWidth: 2, borderColor: '#FF6B00' },
  outlineBtnText: { color: '#FF6B00', fontWeight: 'bold', fontSize: 16 },
  footer: { flexDirection: 'row', marginTop: 20 },
  footerText: { color: '#666' },
  linkText: { color: '#FF6B00', fontWeight: 'bold' }
});

