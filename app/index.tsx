import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

export default function LandingScreen() {
  const router = useRouter();
  const [language, setLanguage] = useState('en');

  // Basic translation mock (replace with LanguageContext later)
  const t = (key: string) => {
    const keys: any = {
      tagline: "Your Service Partner",
      connectServe: "Connect with local providers\nServe your community",
      signUpAsSevadhar: "Sign Up as Sevadhar",
      signUpAsCustomer: "Sign Up as Customer",
      haveAccount: "Already have an account? ",
      signIn: "Sign In"
    };
    return keys[key] || key;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Language Selector */}
      <View style={styles.langRow}>
        {[
          { code: 'en', label: 'EN' },
          { code: 'mr', label: 'मराठी' },
          { code: 'hi', label: 'हिंदी' }
        ].map((lang) => (
          <TouchableOpacity 
            key={lang.code} 
            style={[styles.langBtn, language === lang.code && styles.langBtnActive]}
            onPress={() => setLanguage(lang.code)}
          >
            <Text style={[styles.langText, language === lang.code && styles.langTextActive]}>
              {lang.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoWrapper}>
          <View style={styles.logoCircle}>
            <Svg viewBox="0 0 100 100" width={110} height={110}>
              <Path
                d="M25 70 Q25 30 50 25 Q75 20 75 50"
                fill="none"
                stroke="#333"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <Circle cx="68" cy="38" r="10" fill="none" stroke="#FF7A00" strokeWidth="2.5" />
              <Path
                d="M68 38 Q74 38 74 44 L78 44"
                fill="none"
                stroke="#FF7A00"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </Svg>
          </View>
          <Text style={styles.brandTitle}>
            Sev<Text style={{ color: '#FF7A00' }}>@</Text>dhar
          </Text>
          <Text style={styles.brandTagline}>{t('tagline')}</Text>
        </View>

        <Text style={styles.description}>{t('connectServe')}</Text>

        {/* Action Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={[styles.btn, styles.primaryBtn]} 
            onPress={() => router.push('/signup/provider')}
          >
            <Text style={styles.primaryBtnText}>{t('signUpAsSevadhar')}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.btn, styles.outlineBtn]} 
            onPress={() => router.push('/signup/customer')}
          >
            <Text style={styles.outlineBtnText}>{t('signUpAsCustomer')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t('haveAccount')}</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.signInLink}>{t('signIn')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  langRow: { flexDirection: 'row', justifyContent: 'flex-end', padding: 20, gap: 8 },
  langBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EEE' },
  langBtnActive: { backgroundColor: '#FF7A00', borderColor: '#FF7A00' },
  langText: { fontSize: 12, fontWeight: '600', color: '#666' },
  langTextActive: { color: '#FFF' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  logoWrapper: { alignItems: 'center', marginBottom: 40 },
  logoCircle: { width: 130, height: 130, borderRadius: 65, backgroundColor: '#FFEBDC', alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  brandTitle: { fontSize: 38, fontWeight: 'bold', color: '#333' },
  brandTagline: { fontSize: 14, color: '#666', marginTop: 2 },
  description: { textAlign: 'center', fontSize: 16, color: '#444', marginBottom: 50, lineHeight: 24 },
  buttonGroup: { width: '100%', gap: 15 },
  btn: { width: '100%', height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  primaryBtn: { backgroundColor: '#FF7A00', elevation: 3 },
  primaryBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  outlineBtn: { borderWidth: 2, borderColor: '#FF7A00' },
  outlineBtnText: { color: '#FF7A00', fontSize: 16, fontWeight: 'bold' },
  footer: { flexDirection: 'row', marginTop: 30 },
  footerText: { color: '#666', fontSize: 14 },
  signInLink: { color: '#FF7A00', fontSize: 14, fontWeight: 'bold', textDecorationLine: 'underline' }
});