import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle, MapPin, Phone, User, XCircle } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const mockPendingProfiles = [
  { 
    id: '1', 
    name: 'Sushant Patil', 
    category: 'Electrician', 
    phone: '07276744140', 
    address: 'Mogalwadi, Khopoli',
    aadharUrl: 'https://via.placeholder.com/300x150?text=Aadhar+Front'
  },
  { 
    id: '2', 
    name: 'Rajesh Kumar', 
    category: 'Maid / Cleaning', 
    phone: '9876543210', 
    address: 'Dadar, Mumbai',
    aadharUrl: 'https://via.placeholder.com/300x150?text=Aadhar+Back'
  }
];

export default function AdminDashboard() {
  const router = useRouter();
  const [profiles, setProfiles] = useState(mockPendingProfiles);

  const handleReview = (id: string, name: string, action: 'Confirmed' | 'Denied') => {
    Alert.alert(
      "Confirm Decision", 
      `Are you sure you want to mark ${name}'s profile as ${action}?`, 
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => {
            setProfiles(profiles.filter(p => p.id !== id));
            Alert.alert("Success", `Profile for ${name} has been ${action}.`);
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><ArrowLeft size={24} color="#333" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Review Requests ({profiles.length})</Text>
      </View>

      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No new profile requests to review.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.topRow}>
              <View style={styles.avatar}><User size={24} color="#FF7A00" /></View>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.categoryBadge}>{item.category}</Text>
              </View>
            </View>

            <View style={styles.infoBox}>
              <View style={styles.detailRow}><Phone size={14} color="#666" /><Text style={styles.detailText}>{item.phone}</Text></View>
              <View style={styles.detailRow}><MapPin size={14} color="#666" /><Text style={styles.detailText}>{item.address}</Text></View>
            </View>

            <Text style={styles.label}>Aadhar Documentation:</Text>
            <Image source={{ uri: item.aadharUrl }} style={styles.aadharImage} />

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.denyBtn} onPress={() => handleReview(item.id, item.name, 'Denied')}>
                <XCircle size={18} color="#EF4444" />
                <Text style={styles.denyText}>Deny</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={() => handleReview(item.id, item.name, 'Confirmed')}>
                <CheckCircle size={18} color="#FFF" />
                <Text style={styles.confirmText}>Confirm Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
  list: { padding: 15 },
  card: { backgroundColor: '#FFF', borderRadius: 16, padding: 15, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 15 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFEBDC', alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 18, fontWeight: 'bold' },
  categoryBadge: { fontSize: 12, color: '#FF7A00', fontWeight: 'bold', marginTop: 2 },
  infoBox: { borderTopWidth: 1, borderTopColor: '#F5F5F5', paddingTop: 10, gap: 5 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailText: { fontSize: 14, color: '#444' },
  label: { marginTop: 15, fontSize: 12, fontWeight: 'bold', color: '#999', marginBottom: 8 },
  aadharImage: { width: '100%', height: 150, borderRadius: 10, backgroundColor: '#EEE' },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  denyBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 45, borderRadius: 12, borderWidth: 1, borderColor: '#EF4444' },
  confirmBtn: { flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 45, borderRadius: 12, backgroundColor: '#22C55E' },
  denyText: { color: '#EF4444', fontWeight: 'bold', marginLeft: 5 },
  confirmText: { color: '#FFF', fontWeight: 'bold', marginLeft: 5 },
  empty: { marginTop: 100, alignItems: 'center' },
  emptyText: { color: '#999', fontSize: 16 }
});