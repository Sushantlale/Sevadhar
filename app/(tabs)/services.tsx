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
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 3;

/* ===========================
   ALL SERVICES DATA
=========================== */

const categories = [
  {
    id: '1',
    name: 'Household Help & Cleaning',
    services: [
      { name: 'Maid / Domestic Help', slug: 'maid', image: '' },
      { name: 'Cook / Private Chef', slug: 'cook', image: '' },
      { name: 'Babysitter / Nanny', slug: 'babysitter', image: '' },
      { name: 'Elderly Caretaker / Home Nurse', slug: 'elderly-care', image: '' },
      { name: 'Full Home Deep Cleaning', slug: 'deep-cleaning', image: '' },
      { name: 'Toilet & Bathroom Cleaner', slug: 'toilet-cleaner', image: '' },
      { name: 'Laundry & Dry Cleaning', slug: 'laundry', image: '' },
      { name: 'Iron / Press Wala', slug: 'ironing', image: '' },
      { name: 'Car Washer / Detailer', slug: 'car-wash', image: '' },
      { name: 'Chimney & Kitchen Cleaner', slug: 'chimney-cleaner', image: '' },
      { name: 'Water Tank Cleaner', slug: 'water-tank-cleaner', image: '' },
    ],
  },

  {
    id: '2',
    name: 'Repair, Maintenance & Technical',
    services: [
      { name: 'AC Repair & Servicing', slug: 'ac-repair', image: '' },
      { name: 'Plumber', slug: 'plumber', image: '' },
      { name: 'Electrician', slug: 'electrician', image: '' },
      { name: 'Mobile & Tablet Repair', slug: 'mobile-repair', image: '' },
      { name: 'Appliance Repair', slug: 'appliance-repair', image: '' },
      { name: 'Carpenter', slug: 'carpenter', image: '' },
      { name: 'Painter', slug: 'painter', image: '' },
      { name: 'Mechanic (Bike / Car)', slug: 'mechanic', image: '' },
      { name: 'Key Maker / Locksmith', slug: 'locksmith', image: '' },
      { name: 'Computer / Laptop Technician', slug: 'computer-repair', image: '' },
      { name: 'RO / Water Purifier Service', slug: 'ro-service', image: '' },
      { name: 'Inverter & Battery Technician', slug: 'inverter-repair', image: '' },
    ],
  },

  {
    id: '3',
    name: 'Construction & Labor',
    services: [
      { name: 'Construction Labor (Mason)', slug: 'mason', image: '' },
      { name: 'Coolie (Loader / Unloader)', slug: 'coolie', image: '' },
      { name: 'POP Worker', slug: 'pop-worker', image: '' },
      { name: 'Welder / Fabrication Worker', slug: 'welder', image: '' },
      { name: 'Tile & Marble Layer', slug: 'tile-layer', image: '' },
      { name: 'Driller (Wall / Concrete)', slug: 'driller', image: '' },
      { name: 'Demolition Worker', slug: 'demolition', image: '' },
    ],
  },

  {
    id: '4',
    name: 'Gardening & Outdoor',
    services: [
      { name: 'Mali / Gardener', slug: 'gardener', image: '' },
      { name: 'Nursery Supplier', slug: 'nursery', image: '' },
      { name: 'Pest Control Service', slug: 'pest-control', image: '' },
      { name: 'Grass Cutter / Bush Trimmer', slug: 'grass-cutter', image: '' },
    ],
  },

  {
    id: '5',
    name: 'Scrap & Pheri Services',
    services: [
      { name: 'Scrap Dealer (Kabadiwala)', slug: 'scrap-dealer', image: '' },
      { name: 'Raddi Dealer', slug: 'raddi-dealer', image: '' },
      { name: 'Knife & Scissor Sharpener', slug: 'knife-sharpener', image: '' },
      { name: 'Old Clothes Exchange', slug: 'old-clothes', image: '' },
      { name: 'Glass & Bottle Buyer', slug: 'glass-buyer', image: '' },
    ],
  },

  {
    id: '6',
    name: 'Religious & Community',
    services: [
      { name: 'Pandit / Pujari', slug: 'pandit', image: '' },
      { name: 'Astrologer / Palm Reader', slug: 'astrologer', image: '' },
      { name: 'Gravedigger / Crematorium Helper', slug: 'gravedigger', image: '' },
      { name: 'Religious Musician', slug: 'religious-musician', image: '' },
    ],
  },

  {
    id: '7',
    name: 'Personal Care & Wellness',
    services: [
      { name: 'Hair Salon / Barber', slug: 'barber', image: '' },
      { name: 'Makeup Artist / Beautician', slug: 'makeup-artist', image: '' },
      { name: 'Massage Services', slug: 'massage', image: '' },
      { name: 'Mehendi Artist', slug: 'mehendi', image: '' },
      { name: 'Tattoo Artist', slug: 'tattoo', image: '' },
    ],
  },

  {
    id: '8',
    name: 'Food & Beverage Vendors',
    services: [
      { name: 'Grocery / Kirana Store', slug: 'grocery', image: '' },
      { name: 'Atta Chakki', slug: 'atta-chakki', image: '' },
      { name: 'Fruit Seller', slug: 'fruit-seller', image: '' },
      { name: 'Vegetable Seller', slug: 'vegetable-seller', image: '' },
      { name: 'Meat / Fish Seller', slug: 'meat-seller', image: '' },
      { name: 'Milk / Dairy Provider', slug: 'milk-provider', image: '' },
      { name: 'Sweet Seller (Halwai)', slug: 'sweet-seller', image: '' },
      { name: 'Ice Cream / Kulfi Vendor', slug: 'ice-cream', image: '' },
      { name: 'Juice / Coconut Water Seller', slug: 'juice-seller', image: '' },
      { name: 'Street Food Vendor', slug: 'street-food', image: '' },
      { name: 'Hotel / Dhaba', slug: 'hotel', image: '' },
      { name: 'Catering / Tiffin Service', slug: 'tiffin', image: '' },
      { name: 'Egg Seller', slug: 'egg-seller', image: '' },
    ],
  },

  {
    id: '9',
    name: 'Education & Knowledge',
    services: [
      { name: 'Home Tutor', slug: 'home-tutor', image: '' },
      { name: 'Music / Dance Teacher', slug: 'music-teacher', image: '' },
      { name: 'Book Seller', slug: 'book-seller', image: '' },
      { name: 'Newspaper Distributor', slug: 'newspaper', image: '' },
      { name: 'Stationery & Xerox Shop', slug: 'stationery', image: '' },
    ],
  },

  {
    id: '10',
    name: 'Clothing & Tailoring',
    services: [
      { name: 'Clothes Seller / Boutique', slug: 'clothes', image: '' },
      { name: 'Tailor / Master', slug: 'tailor', image: '' },
      { name: 'Embroidery / Zari Worker', slug: 'embroidery', image: '' },
      { name: 'Button & Needle Seller', slug: 'notions', image: '' },
      { name: 'Spectacles Seller', slug: 'spectacles', image: '' },
      { name: 'Jewelry Repair / Goldsmith', slug: 'goldsmith', image: '' },
      { name: 'Watch Repairer', slug: 'watch-repair', image: '' },
    ],
  },

  {
    id: '11',
    name: 'Pet & Animal Services',
    services: [
      { name: 'Pet Groomer', slug: 'pet-groomer', image: '' },
      { name: 'Dog Walker', slug: 'dog-walker', image: '' },
      { name: 'Pet Food Supplier', slug: 'pet-food', image: '' },
      { name: 'Aquarium Cleaner', slug: 'aquarium', image: '' },
      { name: 'Veterinary Assistant', slug: 'vet', image: '' },
    ],
  },

  {
    id: '12',
    name: 'Medical & Healthcare',
    services: [
      { name: 'Medical Store / Pharmacy', slug: 'pharmacy', image: '' },
      { name: 'Doctor', slug: 'doctor', image: '' },
      { name: 'Dentist', slug: 'dentist', image: '' },
      { name: 'Home Nurse / Physiotherapist', slug: 'home-nurse', image: '' },
      { name: 'Pathology Sample Collector', slug: 'pathology', image: '' },
    ],
  },

  {
    id: '13',
    name: 'Event & Creative',
    services: [
      { name: 'Event Decorator', slug: 'event-decorator', image: '' },
      { name: 'Gift Wrapper', slug: 'gift-wrapper', image: '' },
      { name: 'Photographer / Videographer', slug: 'photographer', image: '' },
      { name: 'DJ / Sound System', slug: 'dj', image: '' },
      { name: 'Tent & Chair Supplier', slug: 'tent', image: '' },
    ],
  },

  {
    id: '14',
    name: 'Hardware & Tools',
    services: [
      { name: 'Hardware & Paint Store', slug: 'hardware', image: '' },
      { name: 'Plumbing Store', slug: 'plumbing-store', image: '' },
      { name: 'Plywood & Carpentry Tools', slug: 'plywood', image: '' },
      { name: 'Auto Parts Seller', slug: 'auto-parts', image: '' },
      { name: 'Cycle Repair Mechanic', slug: 'cycle-repair', image: '' },
      { name: 'Gas Stove Repair', slug: 'stove-repair', image: '' },
    ],
  },

  {
    id: '15',
    name: 'Traditional Micro-Services',
    services: [
      { name: 'Cobbler (Shoe Repair)', slug: 'cobbler', image: '' },
      { name: 'Flower Seller', slug: 'flower-seller', image: '' },
      { name: 'Bangle Seller', slug: 'bangle-seller', image: '' },
      { name: 'Basket Weaver', slug: 'basket-weaver', image: '' },
      { name: 'Potter', slug: 'potter', image: '' },
      { name: 'Utensil Seller / Polisher', slug: 'utensil', image: '' },
    ],
  },

  {
    id: '16',
    name: 'Driving & Transport',
    services: [
      { name: 'Taxi / Cab Driver', slug: 'taxi', image: '' },
      { name: 'Auto Rickshaw Driver', slug: 'auto', image: '' },
      { name: 'Truck Driver', slug: 'truck', image: '' },
      { name: 'Tempo / Mini Van Driver', slug: 'tempo', image: '' },
      { name: 'JCB / Crane Operator', slug: 'crane', image: '' },
      { name: 'Tractor Driver', slug: 'tractor', image: '' },
      { name: 'Delivery Rider', slug: 'delivery', image: '' },
      { name: 'Ambulance Driver', slug: 'ambulance', image: '' },
      { name: 'Private Chauffeur', slug: 'chauffeur', image: '' },
    ],
  },

  {
    id: '17',
    name: 'Professional & Legal',
    services: [
      { name: 'Accountant / CA', slug: 'accountant', image: '' },
      { name: 'Lawyer / Notary', slug: 'lawyer', image: '' },
      { name: 'Real Estate Agent', slug: 'real-estate', image: '' },
      { name: 'Journalist', slug: 'journalist', image: '' },
      { name: 'Insurance Agent', slug: 'insurance', image: '' },
      { name: 'Typist / Document Writer', slug: 'typist', image: '' },
    ],
  },

  {
    id: '18',
    name: 'Architecture & Interior',
    services: [
      { name: 'Architect', slug: 'architect', image: '' },
      { name: 'Interior Designer', slug: 'interior-designer', image: '' },
      { name: 'Civil Contractor', slug: 'contractor', image: '' },
      { name: 'Vastu Consultant', slug: 'vastu', image: '' },
      { name: 'UI/UX Designer', slug: 'uiux', image: '' },
    ],
  },

  {
    id: '19',
    name: 'Arts & Entertainment',
    services: [
      { name: 'Actor / Actress', slug: 'actor', image: '' },
      { name: 'Painter / Sketch Artist', slug: 'artist', image: '' },
      { name: 'Singer / Musician', slug: 'singer', image: '' },
      { name: 'Dancer / Choreographer', slug: 'dancer', image: '' },
      { name: 'Voiceover Artist', slug: 'voiceover', image: '' },
    ],
  },

  {
    id: '20',
    name: 'Agriculture & Allied',
    services: [
      { name: 'Farmer', slug: 'farmer', image: '' },
      { name: 'Farm Laborer', slug: 'farm-labor', image: '' },
      { name: 'Dairy Farmer', slug: 'dairy', image: '' },
      { name: 'Poultry Worker', slug: 'poultry', image: '' },
      { name: 'Beekeeper', slug: 'beekeeper', image: '' },
    ],
  },
];

/* ===========================
   COMPONENT (UNCHANGED)
=========================== */

export default function ServicesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.services.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <SafeAreaView style={styles.container}>
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredCategories.map(category => (
          <View key={category.id} style={styles.section}>
            <Text style={styles.categoryTitle}>{category.name}</Text>

            <View style={styles.grid}>
              {category.services.map((service, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.serviceCard}
                  onPress={() =>
                    router.push({
                      pathname: '/service/[id]',
                      params: { id: service.slug },
                    } as any)
                  }
                >
                  <View style={styles.imageContainer}>
                    {service.image ? (
                      <Image source={{ uri: service.image }} style={styles.image} />
                    ) : (
                      <View style={{ flex: 1, backgroundColor: '#EEE' }} />
                    )}
                  </View>

                  <View style={styles.textContainer}>
                    <Text style={styles.serviceName} numberOfLines={1}>
                      {service.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ===========================
   STYLES (UNCHANGED)
=========================== */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  searchRow: { flexDirection: 'row', gap: 12 },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    height: 54,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  micBtn: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#FF7A00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: { padding: 16, paddingBottom: 100 },
  section: { marginBottom: 32 },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF7A00',
    marginBottom: 16,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  serviceCard: {
    width: cardWidth,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    overflow: 'hidden',
  },
  imageContainer: { aspectRatio: 1 },
  image: { width: '100%', height: '100%' },
  textContainer: { padding: 6, backgroundColor: '#FAFAFA' },
  serviceName: { fontSize: 12, textAlign: 'center', fontWeight: '600' },
});
