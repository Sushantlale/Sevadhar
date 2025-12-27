import { useRouter } from 'expo-router';
import { Mic, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');
// Adjusting card width for a 3-column grid with exact spacing like your images
const cardWidth = (width - 48) / 3; 

const categories = [
  {
    id: '1',
    name: 'Household Help & Cleaning',
    services: [
      { name: 'Maid', slug: 'maid', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=200&h=200&fit=crop' },
      { name: 'Cook', slug: 'cook', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=200&h=200&fit=crop' },
      { name: 'Babysitter', slug: 'babysitter', image: 'https://images.unsplash.com/photo-1587616211892-f743fcca64f9?w=200&h=200&fit=crop' },
      { name: 'Elderly Care', slug: 'elderly-care', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=200&fit=crop' },
      { name: 'Deep Cleaning', slug: 'deep-cleaning', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop' },
      { name: 'Toilet Cleaner', slug: 'toilet-cleaner', image: 'https://images.unsplash.com/photo-1584622781564-1d9876a1e65d?w=200&h=200&fit=crop' },
    ],
  },
  {
    id: '2',
    name: 'Repair & Technical Services',
    services: [
      { name: 'AC Repair', slug: 'ac-repair', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&h=200&fit=crop' },
      { name: 'Plumber', slug: 'plumber', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=200&h=200&fit=crop' },
      { name: 'Electrician', slug: 'electrician', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&h=200&fit=crop' },
      { name: 'Mobile Repair', slug: 'mobile-repair', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200&h=200&fit=crop' },
      { name: 'Carpenter', slug: 'carpenter', image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=200&h=200&fit=crop' },
      { name: 'Painter', slug: 'painter', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=200&h=200&fit=crop' },
    ],
  },
  {
    id: '3',
    name: 'Construction & Labor',
    services: [
      { name: 'Mason (Beldar)', slug: 'mason', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&h=200&fit=crop' },
      { name: 'POP Worker', slug: 'pop-worker', image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=200&h=200&fit=crop' },
      { name: 'Welder', slug: 'welder', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&h=200&fit=crop' },
    ],
  },
  {
    id: '5',
    name: 'Scrap & Utility',
    services: [
      { name: 'Scrap Dealer', slug: 'scrap-dealer', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=200&h=200&fit=crop' },
      { name: 'Knife Sharpener', slug: 'sharpener', image: 'https://images.unsplash.com/photo-1613110904083-2d1f0535775d?w=200&h=200&fit=crop' },
      { name: 'Old Clothes', slug: 'old-clothes', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200&h=200&fit=crop' },
    ],
  },
  {
    id: '6',
    name: 'Religious & Community',
    services: [
      { name: 'Pandit', slug: 'pandit', image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=200&h=200&fit=crop' },
      { name: 'Astrologer', slug: 'astrologer', image: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=200&h=200&fit=crop' },
    ],
  },
  {
    id: '7',
    name: 'Personal Care & Wellness',
    services: [
      { name: 'Barber', slug: 'barber', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop' },
      { name: 'Makeup Artist', slug: 'makeup', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=200&fit=crop' },
      { name: 'Mehndi Artist', slug: 'mehndi', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop' },
    ],
  },
  {
    id: '16',
    name: 'Driving & Transport',
    services: [
      { name: 'Taxi Driver', slug: 'taxi', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=200&h=200&fit=crop' },
      { name: 'Rickshaw', slug: 'rickshaw', image: 'https://images.unsplash.com/photo-1553901753-215db32a6f47?w=200&h=200&fit=crop' },
      { name: 'Delivery Rider', slug: 'delivery', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&h=200&fit=crop' },
    ],
  },
  // Add other categories (8-20) here following the same pattern
];

export default function ServicesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.services.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header exactly like image_b1ac88.png */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Services</Text>
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Search size={20} color="#999" />
            <TextInput 
              placeholder="Search for services..." 
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.micBtn}>
            <Mic size={22} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredCategories.map((category) => (
          <View key={category.id} style={styles.section}>
            {/* Category Title exactly like image_b1ac88.png */}
            <Text style={styles.categoryTitle}>{category.name}</Text>
            
            {/* Grid Layout exactly like image_b1ac88.png */}
            <View style={styles.grid}>
              {category.services.map((service, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.serviceCard}
                  onPress={() => router.push({ 
                    pathname: '/service/[id]', 
                    params: { id: service.slug } 
                  } as any)}
                >
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: service.image }} style={styles.image} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.serviceName} numberOfLines={1}>{service.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {filteredCategories.length === 0 && (
          <View style={styles.emptyState}>
            <Search size={40} color="#CCC" />
            <Text style={styles.emptyText}>No services found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { 
    backgroundColor: '#FFF', 
    paddingHorizontal: 16, 
    paddingTop: 40, 
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 16 },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  searchBar: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F5F5F5', 
    borderRadius: 16, 
    paddingHorizontal: 16, 
    height: 54,
    borderWidth: 1,
    borderColor: '#EAEAEA'
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#333' },
  micBtn: { 
    width: 54, 
    height: 54, 
    backgroundColor: '#FF7A00', 
    borderRadius: 16, 
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  scrollContent: { padding: 16, paddingBottom: 100 },
  section: { marginBottom: 32 },
  categoryTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#FF7A00', 
    marginBottom: 16,
    letterSpacing: 0.5
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  serviceCard: { 
    width: cardWidth, 
    backgroundColor: '#FFF', 
    borderRadius: 12, 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 8
  },
  imageContainer: { width: '100%', aspectRatio: 1 },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  textContainer: { 
    paddingVertical: 8, 
    paddingHorizontal: 4, 
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0'
  },
  serviceName: { 
    fontSize: 12, 
    fontWeight: '600', 
    color: '#333', 
    textAlign: 'center' 
  },
  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#999', marginTop: 12, fontSize: 16 }
});