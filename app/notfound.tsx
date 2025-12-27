import { Link, Stack, usePathname } from 'expo-router';
import { Home } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NotFoundScreen() {
  const pathname = usePathname();

  useEffect(() => {
    // Replaces your web console.error logic
    console.error("404 Error: Mobile route not found ->", pathname);
  }, [pathname]);

  return (
    <SafeAreaView style={styles.container}>
      {/* This sets the header title for the navigation bar */}
      <Stack.Screen options={{ title: 'Oops!', headerShown: true }} />
      
      <View style={styles.content}>
        <Text style={styles.errorCode}>404</Text>
        <Text style={styles.errorText}>Page not found</Text>
        
        {/* Native Link component for navigation */}
        <Link href="/" asChild>
          <TouchableOpacity style={styles.button}>
            <Home size={20} color="#FFF" style={styles.icon} />
            <Text style={styles.buttonText}>Go Home</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6', // Matches your gradient-warm base color
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorCode: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#FF7A00', // Matches your brand primary color
    marginBottom: 8,
  },
  errorText: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF7A00',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 28,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});