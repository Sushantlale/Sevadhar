import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function LandingScreen() {
  const router = useRouter();
  const [language, setLanguage] = useState('en');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF9F6" />
      
      {/* Top Header - Overlap Fix */}
      <View style={styles.header}>
        <View style={styles.langContainer}>
          {[
            { code: 'en', label: 'EN' },
            { code: 'mr', label: 'मराठी' },
            { code: 'hi', label: 'हिंदी' }
          ].map(lang => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.langBtn,
                language === lang.code && styles.langBtnActive
              ]}
              onPress={() => setLanguage(lang.code)}
            >
              <Text
                style={[
                  styles.langText,
                  language === lang.code && styles.langTextActive
                ]}
              >
                {lang.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.main}>
        {/* Profile/Logo Section - Floating Icons & Background Fix */}
        <View style={styles.logoWrapper}>
          <View style={styles.outerCircle}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
          </View>
        </View>

        {/* Branding */}
        <View style={styles.textGroup}>
          <Text style={styles.brandTitle}>Sevadhar</Text>
          <Text style={styles.brandTagline}>YOUR SERVICE PARTNER</Text>
          
          <Text style={styles.description}>
            Connect with local providers.{"\n"}
            <Text style={styles.descriptionBold}>Serve your community.</Text>
          </Text>
        </View>

        {/* Action Buttons - Paths updated to prevent Unmatched Route error */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.push('/signup/provider' as any)}
            activeOpacity={0.9}
          >
            <Text style={styles.primaryBtnText}>Sign Up as Sevadhar</Text>
            <MaterialIcons name="chevron-right" size={22} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.outlineBtn}
            onPress={() => router.push('/signup/customer' as any)}
            activeOpacity={0.7}
          >
            <Text style={styles.outlineBtnText}>Sign Up as Customer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signInRow}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login' as any)}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.adminBtn}
          onPress={() => router.push('/admin/login' as any)}
        >
          <MaterialIcons name="account-balance-wallet" size={14} color="#666" style={{ marginRight: 6 }} />
          <Text style={styles.adminText}>Admin Login</Text>
        </TouchableOpacity>

        <View style={styles.homeIndicator} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'transparent', // Ensure it doesn't block logo
  },
  langContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  langBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  langBtnActive: {
    backgroundColor: '#FF7F00',
  },
  langText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#999',
  },
  langTextActive: {
    color: '#FFF',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: -40, // Pull main content up slightly
  },
  logoWrapper: {
    position: 'relative',
    marginBottom: 40,
    marginTop: 20, // Add space from top switcher
  },
  outerCircle: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    backgroundColor: '#FDF3E7', 
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: '75%',
    height: '75%',
  },
  textGroup: {
    alignItems: 'center',
    marginBottom: 40,
  },
  brandTitle: {
    fontSize: 54,
    fontWeight: '900',
    color: '#FF7F00',
    letterSpacing: -1,
  },
  brandTagline: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    letterSpacing: 1.2,
    marginTop: -5,
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    color: '#64748b',
    marginTop: 25,
    lineHeight: 26,
  },
  descriptionBold: {
    fontWeight: '600',
    color: '#334155',
  },
  buttonGroup: {
    width: '100%',
    gap: 18,
  },
  primaryBtn: {
    backgroundColor: '#FF7F00',
    height: 64,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#FF7F00',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    marginRight: 10,
  },
  outlineBtn: {
    backgroundColor: 'transparent',
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FF7F00',
  },
  outlineBtnText: {
    color: '#FF7F00',
    fontSize: 18,
    fontWeight: '800',
  },
  footer: {
    paddingBottom: 10,
    alignItems: 'center',
  },
  signInRow: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  footerText: {
    color: '#64748b',
    fontSize: 15,
  },
  signInText: {
    color: '#FF7F00',
    fontSize: 15,
    fontWeight: '800',
  },
  adminBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  adminText: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '700',
  },
  homeIndicator: {
    width: 120,
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    marginTop: 25,
  }
});