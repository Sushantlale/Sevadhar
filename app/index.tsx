import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function LandingScreen() {
  const router = useRouter();
  const [language, setLanguage] = useState('en');

  const t = (key: string) => {
    const keys: any = {
      tagline: 'Your Service Partner',
      connectServe: 'Connect with local providers\nServe your community',
      signUpAsSevadhar: 'Sign Up as Sevadhar',
      signUpAsCustomer: 'Sign Up as Customer',
      haveAccount: 'Already have an account?',
      signIn: 'Sign In',
      adminLogin: 'Admin Login'
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
        ].map(lang => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.langBtn,
              language === lang.code && styles.langBtnActive
            ]}
            onPress={() => setLanguage(lang.code)}
            activeOpacity={0.8}
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

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoCircle}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="cover"
          />
        </View>

        {/* Brand */}
        <Text style={styles.brandTitle}>
          <Text style={{ color: '#FF7A00' }}>Sevadhar</Text>
        </Text>
        <Text style={styles.brandTagline}>{t('tagline')}</Text>

        {/* Description */}
        <Text style={styles.description}>{t('connectServe')}</Text>

        {/* Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.btn, styles.primaryBtn]}
            onPress={() => router.push('/signup/provider')}
          >
            <Text style={styles.primaryBtnText}>
              {t('signUpAsSevadhar')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.outlineBtn]}
            onPress={() => router.push('/signup/customer')}
          >
            <Text style={styles.outlineBtnText}>
              {t('signUpAsCustomer')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>{t('haveAccount')} </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.signInLink}>{t('signIn')}</Text>
            </TouchableOpacity>
          </View>

          {/* Admin Login */}
          <TouchableOpacity
            style={styles.adminLogin}
            onPress={() => router.push('/admin/login')}
          >
            <Text style={styles.adminLoginText}>{t('adminLogin')}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6'
  },

  /* Language */
  langRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginTop: 20,          // 👈 moved down for mobile usability
    marginBottom: 10,
    gap: 8
  },
  langBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,     // 👈 slightly bigger touch area
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EEE'
  },
  langBtnActive: {
    backgroundColor: '#FF7A00',
    borderColor: '#FF7A00'
  },
  langText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666'
  },
  langTextActive: {
    color: '#FFF'
  },

  /* Content */
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 30
  },

  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFEBDC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  logo: {
    width: 90,
    height: 90
  },

  brandTitle: {
    fontSize: 40,
    fontWeight: '700',
    color: '#333'
  },
  atSymbol: {
    color: '#FF7A00'
  },
  brandTagline: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 20
  },

  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 40
  },

  buttonGroup: {
    width: '100%',
    gap: 16
  },
  btn: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryBtn: {
    backgroundColor: '#FF7A00'
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700'
  },
  outlineBtn: {
    borderWidth: 2,
    borderColor: '#FF7A00'
  },
  outlineBtnText: {
    color: '#FF7A00',
    fontSize: 16,
    fontWeight: '700'
  },

  footer: {
    marginTop: 30,
    alignItems: 'center'
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerText: {
    fontSize: 14,
    color: '#666'
  },
  signInLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF7A00',
    textDecorationLine: 'underline'
  },

  adminLogin: {
    marginTop: 12
  },
  adminLoginText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textDecorationLine: 'underline'
  }
});
