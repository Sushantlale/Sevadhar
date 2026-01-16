import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Check, ChevronDown, ChevronLeft, ChevronRight,
  FileText,
  Globe,
  Layers,
  Map,
  MapPin, Mic,
  Phone,
  Search,
  Star,
  Utensils,
  X
} from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, Modal, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


const { width } = Dimensions.get('window');

const HomePage = () => {
  const router = useRouter();
  const popularScrollRef = useRef<ScrollView>(null); 
  
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [voiceModalVisible, setVoiceModalVisible] = useState(false);
  const [voiceStep, setVoiceStep] = useState<'listening' | 'result'>('listening');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Khopoli');
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

   // --- DATA UPDATES ---
  const [searchHistory, setSearchHistory] = useState(['Plumber', 'Ac Repair', 'Electrician', 'Home Cleaning']);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const trendingSearches = ['Car Cleaner', 'Plumber', 'Electrician', 'Ac Repair', 'Make-UP', 'Home Cleaning', 'Painter', 'Tutor'];
  
  const searchCategories = [
    { id: '1', name: 'Restaurants', icon: Utensils, color: '#EF4444' },
    { id: '2', name: 'Repair', icon: Map, color: '#10B981' },
    { id: '3', name: 'Cleaning', icon: Layers, color: '#3B82F6' },
    { id: '4', name: 'Construction', icon: FileText, color: '#F59E0B' },
  ];

  const allServices = [
  'Aquarium Cleaner',
  'Babysitter',
  'Car Cleaner',
  'Cook Private Chef',
  'Home Cleaning',
  'Home Nurse',
  'Iron Press',
  'Laundry Dry Cleaning',
  'Maid',
  'Toilet Cleaning',
  'Water Tank Cleaner',

  'AC Repair',
  'Carpenter',
  'Computer Laptop Technician',
  'Electrician',
  'Fan  TV Fridge Repair',
  'Inverter & Battery Technician',
  'Key Maker',
  'Mechanic',
  'Mobile Repair',
  'Painter',
  'Plumber',
  'RO Water Purifier Service',

  'Coli',
  'Construction Labor',
  'Demolition Worker',
  'Driller (Wall/Concrete)',
  'POP Worker',
  'Tiles & Marble Worker',
  'Welder Fabrication Worker',

  'Grass Cutter / Bush-Trimmer',
  'Mali / Gardener',
  'Nursery Supplier',
  'Pest Control Service',

  'Glass and Bottle Buyer',
  'Knife Sharpener',
  'Old Clothes Exchange',
  'Raddi Dealer',
  'Scrap Dealer',

  'Astrologer / Palm Reader',
  'Bhajan Kirtankar',
  'Crematorium Helper',
  'Pandit',
  'Pujari',
  'Vastu Consultant',

  'MakeUp Artist',
  'Massage',
  'Mehendi Artist',
  'Tattoo Artist',

  'Milk Vendor',
  'Snacks Seller',
  'Vegetable Seller',
  'Catering & Tiffin Service',
  'Coconut Water Seller',
  'Egg Seller',
  'Grains & Flour Mill',
  'Meat Seller',
  'Book Seller',

  'Dance Teacher',
  'Home Tutor',
  'Music Teacher',
  'Newspaper Services',

  'Button & Needle Seller',
  'Clothes Seller',
  'Jewellery Repair',
  'Spectacles Seller',
  'Tailor',
  'Watch Repairer',
  'Zari Worker',

  'Designing Gifts',
  'Event Decoration Supplier',
  'Tent & Chair Supplier',

  'Bangle Seller',
  'Basket Weaver',
  'Chambhar (Cobbler)',
  'Flower Seller',
  'Potter (Matka / Clay Items)',
  'Utensils Provider',

  'Ambulance Driver',
  'Auto Driver',
  'Bus Driver',
  'Delivery Rider',
  'JCB / Crane Operator',
  'Private Chauffeur',
  'Taxi Driver',
  'Tempo / Mini Van Driver',
  'Tractor Driver',
  'Truck Driver',

  'Corporate Trainers',
  'Dance Teacher (Training)',
  'Gym Trainer',
  'Home Tutor (Training)',
  'Music Teacher (Training)',
  'Sales Trainers',
  'Yoga Trainer',

  'Accountant',
  'Construction Builder',
  'Dentist',
  'DJ Provider',
  'Doctor',
  'Gym',
  'Insurance Agent',
  'Journalist / Media',
  'Lawyer',
  'Nurse',
  'Photographer',
  'Photography Studio',
  'Real Estate Agent',
  'Travel Agency',
  'Typist / Document Writer',

  'Architectural Design',
  'Civil Contractor',
  'Interior Designer',
  'UX/UI Designer',

  'Actor',
  'Actress',
  'Choreographer',
  'Dancer',
  'Musician',
  'Painter / Sketch Artist',
  'Singer',
  'Voiceover Artist',

  'Home Decor Shop',
  'Mattress Store',
  'Paint Shop',
  'Plywood & Timber Shop',
  'Curtain & Blinds Shop',
  'Furniture Shop',
  'Glass & Aluminum Shop',
  'Battery Shop',

  'Bike Repair Shop',
  'Bike Showroom',
  'Bike Washing Center',
  'Car Accessories Shop',
  'Car Service Center',
  'Car Showroom',
  'Car Washing Center',
  'Tyre Shop',
  'Used Car Dealer',

  'Bakery Shop',
  'Cake Shop',
  'Coffee Shop',
  'Dhaba',
  'Fast Food Center',
  'Fruit Seller',
  'Grain Seller',
  'Hotel Services',
  'Ice Cream Seller',
  'Juice Seller',
  'Restaurant Services',
  'Sweet Seller (Halwai)',
  'Tea Shop',

  'General Store',
  'Grocery Shop',
  'Kirana Shop',
  'Supermarket',

  'Fashion Accessories Shop',
  'Footwear Store',
  'Hair Salon',
  'Kids Wear Shop',
  'Men’s Wear Shop',
  'Saree Shop',
  'Women’s Wear Shop',

  'Diamond Jewelry Store',
  'Gold & Silver Shop',
  'Jewelry Shop',
  'Watch Store',

  'Beauty Parlor',
  'Cosmetic Store',
  'Fitness Studio',
  'Salon',
  'Spa & Massage Center',
  'Yoga Studio',

  'Clinic',
  'Dental Clinic',
  'Medical Store',
  'Pharmacy',

  'AC Repair (Shop)',
  'Carpenter (Shop)',
  'Computer/Laptop Technician (Shop)',
  'Electrician (Shop)',
  'Fan, TV, Fridge Repair (Shop)',
  'Inverter & Battery Technician (Shop)',
  'Mechanic (Shop)',
  'Mobile Repair (Shop)',
  'Plumber (Shop)',
  'RO Water Purifier Service (Shop)',

  'CCTV & Security Shop',
  'Computer Shop',
  'Electronics Shop',
  'Home Appliances Store',
  'Mobile Store',
  'Printer & Accessories Store',

  'Book Store',
  'Coaching Classes',
  'Computer Training Institute',
  'Printing & Xerox Shop',
  'Stationery Shop',

  'Building Material Supplier',
  'Cement Shop',
  'Electrical Materials',
  'Fabrication Shop',
  'Sanitaryware Shop',
  'Welding Works',

  'Aquarium Shop',
  'Pet Birds Shop',
  'Pet Dogs Shop',
  'Pet Food Shop',

  'Event Organizer',
  'Gift Shop',
  'Marriage Hall Organizer',

  'Carpentry Tools Shop',
  'Hardware Parts Shop',
  'Plumbing Equipment Shop',
];


  const recommendedData = [
    { 
      id: '1', 
      title: 'AC Service & Repair', 
      sub: 'Summer Special', 
      tag: 'Try & Hire', 
      img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800', 
      slug: 'ac-repair' 
    },
    { 
      id: '2', 
      title: 'Home Cleaning', 
      sub: 'Professional', 
      tag: 'Top Rated', 
      img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400', 
      slug: 'home-cleaning' 
    },
    { 
      id: '3', 
      title: 'Pest Control', 
      sub: 'Hygiene First', 
      tag: 'Warranty', 
      img: 'https://images.unsplash.com/photo-1624923686627-514dd5e57bae?q=80&w=800', 
      slug: 'pest-control' 
    },
    { 
      id: '4', 
      title: 'Wall Painting', 
      sub: 'Festive Offer', 
      tag: 'Try & Hire', 
      img: 'https://plus.unsplash.com/premium_photo-1661313691854-343d607bbace?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      slug: 'painter' 
    },
  ];

  const mostUsedData = [
    { name: 'Plumber', count: '5x booked', img: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=400', slug: 'plumber' },
    { name: 'Cleaning', count: '2x booked', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', slug: 'home-cleaning' },
    { name: 'Electrician', count: '1x booked', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3rqXz5gTku3MFaCAe_ezBBK2aEgiEIWw_oIW89kobD6sxr-wn8X8H27XjEGgEoXg_M1ZAY5nGJyevyjGc6tdD6MDe24XxlO4yH74ZMigIuWIoFNgg6BoE0eTBYaFGWslZnLkBI7-vCe6U91B0l2euyO8ChSgLSpg30HQGI-JjTcur4CH26iaYL7A4EmgScfdyX_wzhcvyzRAtWV4SGmJTtDtVzh4jAPZpzCZFIzCdNI7uemHc6SoDiNoak8l4LrIYBfDghbP6C_nM', slug: 'electrician' },
    { name: 'Painter', count: '3x booked', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlksNnrpbAhA9YYLMhBZ5-e5V-OuLruUDcKE2Wb12reaq1NI2B9cHUYBIuckS6NBvRmbcfMd4e-ynevFltt47ykx5q0wGCC3sJUU4qUoMxQuDTWL5vxEjtM0WlIxzKPyPokYlMOq-H2JGQwsyZrR41NmDxrmSo-XjdIIfTiiqA8kF0EQzREuAZxytBN-IJN76EtpSzZZuhhOUTvcCXMeeoPJJjqUsZqy_lDfMvEXLrnNEnvW0WZBcnB372xdj99lD1gW7jgWLCWY9z', slug: 'painter' },
    { name: 'AC Repair', count: '2x booked', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfNjDatPoigov3tkc0l7Pu-8hEAo9vAEpL4_W8J1p9s1GWhLKM7NAEVQ5xyx1NejGjmCfFpJSkU_lG-KU3rj51ZzcjU15RrP15ObZX6PNfdtdFlaZmAIPcxd7MzErYboQSsirWHePxtaQ7SYhl4wH4LbtJsRALWz7KQPYm7oIHIyF8Gsz0UC7bHAN0vfkkXlznrOCh8olgNGf_C0rwBIDqahLs5eXMBys7ciHeuYNA9qqZrdOSIxg6t2v_y9kX9Ps4daNeGEz0djv1', slug: 'ac-repair' },
  ];

    // --- FUNCTIONS ---
const handleSearchSubmit = (query: string) => {
  if (query.trim()) {
    // Add to history logic
    if (!searchHistory.includes(query)) {
      setSearchHistory([query, ...searchHistory].slice(0, 6));
    }

    // Generate slug and navigate
    const slug = query.toLowerCase().replace(/\s+/g, '-');
    setSearchVisible(false); // Close search modal
    
    router.push({ 
      pathname: '/service/[id]', 
      params: { id: slug } 
    } as any);
  }
};

  const scrollPopular = (direction: 'left' | 'right') => {
    const offset = direction === 'left' ? -200 : 200;
    popularScrollRef.current?.scrollTo({ x: offset, animated: true });
  };

 const handleVoiceTrigger = () => {
  setVoiceStep('listening');
  setVoiceModalVisible(true);
  // Simulating voice recognition delay
  setTimeout(() => { 
    setVoiceStep('result'); 
  }, 2000);
};
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.etherealBg} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* HEADER IS NOW INSIDE SCROLLVIEW */}
          <View style={styles.header}>
            <View style={styles.headerTopRow}>
              <TouchableOpacity style={styles.headerLeft} onPress={() => setLocationModalVisible(true)}>
                <Text style={styles.locLabel}>Current Location</Text>
                <View style={styles.locNameRow}>
                  <MapPin size={14} color="#FF9100" />
                  <Text style={styles.locName}>{selectedLocation}</Text>
                  <ChevronDown size={14} color="#FF9100" />
                </View>
              </TouchableOpacity>
              <Text style={styles.brandTitle}>Sevadhar</Text>
              <TouchableOpacity style={styles.langBtn} onPress={() => setLanguageModalVisible(true)}>
                <Globe size={14} color="#666" />
                <Text style={styles.langText}>{selectedLanguage}</Text>
              </TouchableOpacity>
            </View>

            {/* SEARCH BAR */}
            <View style={styles.searchBarContainer}>
              <TouchableOpacity activeOpacity={1} style={styles.searchBar} onPress={() => setSearchVisible(true)}>
                <Search size={18} color="#9CA3AF" />
                <Text style={styles.searchPlaceholderText}>Search for services...</Text>
                <TouchableOpacity style={styles.micIconBg} onPress={handleVoiceTrigger}>
                  <Mic size={18} color="#FFF" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.contentCard}>
            <View style={styles.dragHandle} />

            {/* PROMOTIONAL BANNER */}
            <LinearGradient colors={['#FFA726', '#FF9100']} style={styles.promoBanner}>
              <View style={styles.promoTextCol}>
                <Text style={styles.promoTitle}>20% OFF</Text>
                <Text style={styles.promoSub}>on your first booking</Text>
                <View style={styles.promoCodeBox}>
                  <Text style={styles.promoCode}>FIRST20</Text>
                </View>
              </View>
              <View style={styles.promoIconCol}>
                 <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6632/6632881.png' }} style={styles.giftIcon} />
              </View>
            </LinearGradient>

             {/* RECOMMENDED SECTION (HORIZONTAL SCROLL) */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recommended for You</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recScrollArea}>
              {recommendedData.map((item) => (
                <TouchableOpacity key={item.id} style={styles.recBannerHorizontal} onPress={() => router.push(`/service/${item.slug}`)}>
                  <Image source={{ uri: item.img }} style={styles.recImg} />
                  <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.recOverlay} />
                  <View style={styles.recTag}><Text style={styles.recTagText}>{item.tag}</Text></View>
                  <View style={styles.recInfo}>
                    <Text style={styles.recSubText}>{item.sub}</Text>
                    <Text style={styles.recMainText}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* MOST USED SECTION (EXPANDED TO 5 ITEMS) */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Most Used by You</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll}>
              {mostUsedData.map((item, idx) => (
                <TouchableOpacity key={idx} style={styles.circleItem} onPress={() => router.push(`/service/${item.slug}`)}>
                  <View style={[styles.circleBorder, idx === 0 && styles.activeCircle]}>
                    <Image source={{ uri: item.img }} style={styles.circleImg} />
                  </View>
                  <Text style={styles.circleTitle}>{item.name}</Text>
                  <Text style={styles.circleSub}>{item.count}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* ALL SERVICES GRID */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>All Services</Text>
              <TouchableOpacity onPress={() => router.push('/services')}><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
            </View>
            <View style={styles.grid}>
              {[
                { name: 'Cleaning', tag: 'Try & Hire', color: '#FF9100', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', slug: 'home-cleaning' },
                { name: 'AC Repair', tag: 'Warranty', color: '#10B981', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfNjDatPoigov3tkc0l7Pu-8hEAo9vAEpL4_W8J1p9s1GWhLKM7NAEVQ5xyx1NejGjmCfFpJSkU_lG-KU3rj51ZzcjU15RrP15ObZX6PNfdtdFlaZmAIPcxd7MzErYboQSsirWHePxtaQ7SYhl4wH4LbtJsRALWz7KQPYm7oIHIyF8Gsz0UC7bHAN0vfkkXlznrOCh8olgNGf_C0rwBIDqahLs5eXMBys7ciHeuYNA9qqZrdOSIxg6t2v_y9kX9Ps4daNeGEz0djv1', slug: 'ac-repair' },
                { name: 'Geyser', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpxud8sfz-jG_LdiDKPaUTXaofxR-cB2yJIzhmm4mO_PImGZNoE_v7jd4AcEPX56Pbxe0YcNgzf04DIO9r0uJypce6JeXTWLls4NPkCsx4esIfOAYu8W-5fZ46Ld4EKsViGson-P7Kwz7TcH6nDRCZybCGqtn3Lt5uogjp5yY4qps36GPJ8B3zKnFYb6bZxQAHvZWMfw5wPchtTU-K5Ze4gdjjyUWmrdmofjDqC5IUR-Gjzqtd94MCvkrkS_t6o14Adc8BC0Ou5vSj', slug: 'geyser-repair' },
                { name: 'Painter', tag: 'Try & Hire', color: '#FF9100', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlksNnrpbAhA9YYLMhBZ5-e5V-OuLruUDcKE2Wb12reaq1NI2B9cHUYBIuckS6NBvRmbcfMd4e-ynevFltt47ykx5q0wGCC3sJUU4qUoMxQuDTWL5vxEjtM0WlIxzKPyPokYlMOq-H2JGQwsyZrR41NmDxrmSo-XjdIIfTiiqA8kF0EQzREuAZxytBN-IJN76EtpSzZZuhhOUTvcCXMeeoPJJjqUsZqy_lDfMvEXLrnNEnvW0WZBcnB372xdj99lD1gW7jgWLCWY9z', slug: 'painter' },
                { name: 'Scrap', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYjBSKX1xDKtNWZlWrvr-xqkiFeL8wcm0Mq-oGeD0WBDw0EOKBPvQqqvCM5QBFSLA510TOkkPvKnPzsYH0-LFft9jagT1HRaMf0yoWUHxM9boqcC49toLk3jfMRiZQpnJKQv_Z2cUCKzSvQYTQKmQ1wo4utjYzTTIPk5p_rNm1pA61K_AhfNWawIFwSUOIIpq4Mstsf4qAtPKkumZF7VheZ0r8MzQb1MPaidCXK2AUgN0x5iVh_HR93IB4iRpkrSTvVom5Wm7zy9ys', slug: 'scrap-dealer' },
                { name: 'Pandit', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMS_5ZjqcHv1_rzjKZ2HIuK5nNFzHyyPdLZFWzgbLsJ3ZfgkdfkcJwZ8dOgHKLgfFiULHYeNzLjaYxhxgrvTdNaJDbdgwMopruRv_30bwp-sq5EJQ9aBXsiYYoGXSX6MO3qcR93mRpFBJGhqvNRLjnRh3ofsmdKy07GL8Bh5xwOuB8WUcNQLN6BjUoCyOmpwZTWOlRRw7Gt6RDN_DzAksBvr4Yqs3_Q_K0gXMKT8Av0FTmEwJO8TUmObXE1cVA8OGHd269TKvzNbba', slug: 'pandit' },
              ].map((item, idx) => (
                <TouchableOpacity key={idx} style={styles.gridItem} onPress={() => router.push(`/service/${item.slug}`)}>
                  <Image source={{ uri: item.img }} style={styles.gridImg} />
                  <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.gridOverlay} />
                  {item.tag && <View style={[styles.gridTag, { backgroundColor: item.color }]}><Text style={styles.gridTagText}>{item.tag}</Text></View>}
                  <Text style={styles.gridTitle}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* MOST CALLED THIS WEEK */}
            <View style={styles.sectionHeader}>
              <View style={styles.row}><Phone size={18} color="#FF9100" style={{marginRight: 6}} /><Text style={styles.sectionTitle}>Most Called This Week</Text></View>
            </View>
            <View style={styles.workerList}>
              {[
                { name: 'Raju Plumber', rating: '4.9', calls: '234 calls', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwcAgP-1vyZMA4FYPdsbE_dquZfQsBj1ssM60aN8DSDVmtJlKCvMX81qXR714ewWsehnKId5Q5yQQhrlW7aWz8ov9UvJIoDQFcxTopqwUOkhVxbpQCdPrYJfdTDJixv-Zh41NGceELM5uFoY3NZQHPnSbnhsKX-Gvk3mK8VeaX72EIN54yDO4m8LquOZM3c61NbFPu_Gl7vkx7IN45NGllU8SmaxsO2_j4WQTAk7kUCDmPMELR4D3G-pbktJ8v7wo64tnjokSJOxes', service: 'Plumber' },
                { name: 'Suresh Electric', rating: '4.8', calls: '198 calls', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACFoewEyNiSan3LXWe-iu8whgjZgdhdMeL7xjbVDcAQnIbsbrIdrUsmSpQwaStt8s9q9rJUHo5ovRdryQUmyrrx9tirn0NvNlawkmPIpmW-_virvnul9CbpXh4oHuXcPWaNNMWtChkKo_Pf5PjRiDcg3ObL4nOGDj9CCtY4yTEY38037NSGQWXa99M_cNGiaVC5fBQIGCTuABFNA_p22nJLChVI3E-4vcP1nAXe4AskwgEv8od6WOnHNUoXemmhFh_sECK5AITqs0V', service: 'Electrician' },
                { name: 'Priya Cleaning', rating: '4.7', calls: '176 calls', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6PBgHdK-2jQHZI5F-E-hgcmhT73csEhoLCsCQzDr7ew80ZYzjTzCn00HfMgOgY7AKpiGsw1J2Hroqwj90aPAsy1t0r8lr8fYuAlnTQQQnzCwfMpNray0mHyQf-iMjXP6r3jwS0egpN8XfEif03-lkKuTpEGUFkVP9HaGlHMdFEvxraYYW7_Xar-wsHr4QGuuFVm-DNrO9owI0kZiCVeRzynLGubBmm_STKb4qOxuAyoF-zRDblTaIQcLQi7HKpPwL4jtfdSX8H5Hh', service: 'Home Cleaning' },
              ].map((worker, idx) => (
                <TouchableOpacity 
                  key={idx} 
                  style={styles.workerCard}
                  onPress={() => router.push({
                    pathname: '/service/serviceprofile',
                    params: { name: worker.name, rating: worker.rating, calls: worker.calls,}
                  })}
                >
                  <View style={styles.avatarWrapper}>
                    <Image source={{ uri: worker.img }} style={styles.avatar} />
                    <View style={styles.onlineDot} />
                  </View>
                  <View style={styles.workerMain}>
                    <Text style={styles.workerName}>{worker.name}</Text>
                    <Text style={styles.workerSub}>{worker.service}</Text>
                  </View>
                  <View style={styles.workerEnd}>
                    <View style={styles.row}><Star size={14} color="#FF9100" fill="#FF9100" /><Text style={styles.workerRating}>{worker.rating}</Text></View>
                    <Text style={styles.workerCalls}>{worker.calls}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* MOST POPULAR SERVICES */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Most Popular</Text>
            </View>
            <View style={styles.popularWrapper}>
              <ScrollView ref={popularScrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.popularScroll}>
                {[
                  { name: 'Home Cleaning', rating: '4.8', reviews: '3.8M', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', slug: 'home-cleaning' },
                  { name: 'Plumber', rating: '4.7', reviews: '2.8M', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400', slug: 'plumber' },
                  { name: 'Electrician', rating: '4.9', reviews: '1.5M', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400', slug: 'electrician' },
                ].map((item, idx) => (
                  <TouchableOpacity key={idx} style={styles.popularCard} onPress={() => router.push(`/service/${item.slug}`)}>
                    <Image source={{ uri: item.img }} style={styles.popularImg} />
                    <View style={styles.popularMeta}>
                      <Text style={styles.popularName}>{item.name}</Text>
                      <View style={styles.row}>
                        <Star size={12} color="#FF9100" fill="#FF9100" />
                        <Text style={styles.popularRatingText}>{item.rating} </Text>
                        <Text style={styles.popularReviews}>({item.reviews})</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              {/* NAV CIRCLES & INDICATOR */}
              <TouchableOpacity style={[styles.navCircle, styles.leftCircle]} onPress={() => scrollPopular('left')}>
                <ChevronLeft size={20} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navCircle, styles.rightCircle]} onPress={() => scrollPopular('right')}>
                <ChevronRight size={20} color="#333" />
              </TouchableOpacity>

              <View style={styles.indicatorTrack}>
                <View style={styles.indicatorThumb} />
              </View>
            </View>
            
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* SOS BUTTON */}
      <TouchableOpacity style={styles.sosBtn}>
        <Phone size={24} color="#FFF" fill="#FFF" />
      </TouchableOpacity>

      {/* SEARCH MODAL (History, Category, Trending) */}
      <Modal visible={isSearchVisible} animationType="slide" onRequestClose={() => setSearchVisible(false)}>
        <SafeAreaView style={styles.searchOverlay}>
          <View style={styles.searchHeaderCustom}>
            <TouchableOpacity onPress={() => setSearchVisible(false)}>
              <ArrowLeft size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.searchTitleCustom}>Search</Text>
          </View>

          {/* SEARCH INPUT */}
          <View style={styles.searchInputContainerCustom}>
             <Search size={22} color="#9CA3AF" style={{ marginRight: 10 }} />
             <TextInput 
                placeholder="Find services, food, or places" 
                style={styles.fullSearchInput} 
                autoFocus={true} 
                value={searchQuery} 
                onChangeText={(text) => {
                  setSearchQuery(text);
                
                  if (text.trim().length > 0) {
                    const filtered = allServices.filter(item =>
                      item.toLowerCase().includes(text.toLowerCase())
                    );
                    setSearchSuggestions(filtered);
                  } else {
                    setSearchSuggestions([]);
                  }
                }}
                onSubmitEditing={() => handleSearchSubmit(searchQuery)}
              />
          </View>

          {/* SEARCH SUGGESTIONS */}
          {searchQuery.length > 0 && searchSuggestions.length > 0 && (
            <View style={styles.suggestionBox}>
              {searchSuggestions.map((item, index) => (
                <TouchableOpacity
    key={index}
    style={styles.suggestionItem}
    onPress={() => {
      // 1. Convert the name to the lowercase slug used in your URL (e.g., 'AC-Repair' -> 'ac-repair')
      const slug = item.toLowerCase(); 
      
      // 2. Add to history
      handleSearchSubmit(item);
      
      // 3. Clear suggestions and CLOSE the search modal
      setSearchSuggestions([]);
      setSearchVisible(false); // <--- Crucial: Close the search screen
      setSearchQuery('');

      // 4. Navigate to the Service Listing page
      router.push({ 
        pathname: '/service/[id]', 
        params: { id: slug } 
      } as any);
    }}
  >
    <Search size={16} color="#9CA3AF" />
    <Text style={styles.suggestionText}>{item}</Text>
  </TouchableOpacity>
              ))}
            </View>
          )}


          {/* SEARCH CONTENT */}
          <ScrollView style={styles.searchScrollBody} showsVerticalScrollIndicator={false}>
            {searchQuery.length === 0 && (
              <>
             <Text style={styles.searchSectionTitle}>Recent history</Text>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.historyChipsRow}>
                {searchHistory.map((item, idx) => (
                  // <TouchableOpacity key={idx} style={styles.historyChip} onPress={() => setSearchQuery(item)}>
                  //   <Text style={styles.chipText}>{item}</Text>
                  // </TouchableOpacity>
                  <View key={idx} style={styles.historyChip}>
  <TouchableOpacity onPress={() => setSearchQuery(item)}>
    <Text style={styles.chipText}>{item}</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() =>
      setSearchHistory(prev => prev.filter(h => h !== item))
    }
  >
    <X size={14} color="#6B7280" />
  </TouchableOpacity>
</View>

                ))}
             </ScrollView>
             </>
            )}

            {/* SEARCH BY CATEGORY */}
            {searchQuery.length === 0 && (
            <>
             <Text style={styles.searchSectionTitle}>Search by category</Text>
<View style={styles.categoryGridCustom}>
  {searchCategories.map((cat) => (
    <TouchableOpacity 
      key={cat.id} 
      style={styles.categoryCardCustom}
      onPress={() => {
        const categorySlug = cat.name.toLowerCase();
        setSearchVisible(false);
        // Important: Pass 'type: category' for broad filtering
        router.push({ 
          pathname: '/service/[id]', 
          params: { id: categorySlug, type: 'category' } 
        } as any);
      }}
    >
      <cat.icon size={22} color={cat.color} />
      <Text style={styles.categoryCardText}>{cat.name}</Text>
    </TouchableOpacity>
  ))}
</View>   </>)}

            {/* TRENDING SEARCHES */}
            {searchQuery.length === 0 && (
            <>
             <Text style={styles.searchSectionTitle}>Trending searches</Text>
     
<View style={styles.trendingWrap}>
  {trendingSearches.map((item, idx) => (
    <TouchableOpacity 
      key={idx} 
      style={styles.historyChip} 
      onPress={() => {
        const slug = item.toLowerCase().replace(/\s+/g, '-');
        setSearchVisible(false); // Close Modal immediately
        handleSearchSubmit(item); 
        router.push({ pathname: '/service/[id]', params: { id: slug } } as any);
      }}
    >
      <Text style={styles.chipText}>{item}</Text>
    </TouchableOpacity>
  ))}
</View>
            </>)}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* LOCATION MODAL */}
      <Modal visible={locationModalVisible} transparent animationType="fade">
        <View style={styles.dropdownOverlay}>
          <View style={styles.dropdownCard}>
            <View style={styles.dropdownHeader}><Text style={styles.dropdownTitle}>Select Location</Text><TouchableOpacity onPress={() => setLocationModalVisible(false)}><X size={20} color="#666" /></TouchableOpacity></View>
            {['Khopoli', 'Khalapur'].map((loc) => (
              <TouchableOpacity key={loc} style={styles.dropdownItem} onPress={() => { setSelectedLocation(loc); setLocationModalVisible(false); }}>
                <Text style={[styles.dropdownText, selectedLocation === loc && { color: '#FF7A00', fontWeight: 'bold' }]}>{loc}</Text>
                {selectedLocation === loc && <Check size={18} color="#FF7A00" />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* LANGUAGE MODAL */}
      <Modal visible={languageModalVisible} transparent animationType="fade">
        <View style={styles.dropdownOverlay}>
          <View style={styles.dropdownCard}>
            <View style={styles.dropdownHeader}><Text style={styles.dropdownTitle}>Select Language</Text><TouchableOpacity onPress={() => setLanguageModalVisible(false)}><X size={20} color="#666" /></TouchableOpacity></View>
            {[{ label: 'English', value: 'EN' }, { label: 'मराठी', value: 'MR' }, { label: 'हिंदी', value: 'HI' }].map((lang) => (
              <TouchableOpacity key={lang.value} style={styles.dropdownItem} onPress={() => { setSelectedLanguage(lang.value); setLanguageModalVisible(false); }}>
                <Text style={[styles.dropdownText, selectedLanguage === lang.value && { color: '#FF7A00', fontWeight: 'bold' }]}>{lang.label}</Text>
                {selectedLanguage === lang.value && <Check size={18} color="#FF7A00" />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* VOICE SEARCH MODAL */}
<Modal visible={voiceModalVisible} transparent={true} animationType="fade">
  <View style={styles.voiceOverlayBg}>
    <View style={styles.voiceContainer}>
      <TouchableOpacity 
        style={styles.closeVoice} 
        onPress={() => setVoiceModalVisible(false)}
      >
        <X size={24} color="#666" />
      </TouchableOpacity>
      
      <Text style={styles.voiceTitle}>Voice Search</Text>
      
      {voiceStep === 'listening' ? (
        <>
          <Text style={styles.voiceInstruction}>Tap the microphone to speak</Text>
          <View style={styles.voiceMicCircle}>
            <Mic size={40} color="#FFF" />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.voiceInstruction}>Search result:</Text>
          <View style={styles.voiceResultBox}>
            <Text style={styles.voiceResultText}>"Plumber"</Text>
          </View>
          <View style={styles.voiceActionRow}>
            <TouchableOpacity 
              style={styles.voiceTryAgain} 
              onPress={() => setVoiceStep('listening')}
            >
              <Text style={styles.tryAgainText}>Try Again</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.voiceSearchBtn} 
              onPress={() => { 
                setVoiceModalVisible(false); 
                // Triggers navigation + 7-item history tracking
                handleSearchSubmit('Plumber'); 
              }}
            >
              <Text style={styles.searchBtnText}>Search</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  </View>
</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  etherealBg: { ...StyleSheet.absoluteFillObject, backgroundColor: '#FFF8F0' },
  safeArea: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: Platform.OS === 'web' ? 10 : 30, paddingBottom: 10, backgroundColor: 'transparent' },
  headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  headerLeft: { flex: 1 },
  locLabel: { fontSize: 10, color: '#6B7280' },
  locNameRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locName: { fontSize: 14, fontWeight: 'bold', color: '#FF9100' },
  brandTitle: { fontSize: 20, fontWeight: 'bold', color: '#FF9100', letterSpacing: 0.5, flex: 1, textAlign: 'center',paddingRight: 40 },
  langBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFF' },
  langText: { fontSize: 12, fontWeight: '600' },
  searchBarContainer: { paddingVertical: 5 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, paddingHorizontal: 12, height: 50, elevation: 2, shadowColor: '#FF9100', shadowOpacity: 0.1 },
  searchPlaceholderText: { flex: 1, marginLeft: 10, fontSize: 14, color: '#9CA3AF' },
  micIconBg: { backgroundColor: '#FF9100', padding: 8, borderRadius: 8 },
  scrollContent: { paddingBottom: 20 },
  contentCard: { flex: 1, backgroundColor: '#FFF', borderTopLeftRadius: 40, borderTopRightRadius: 40, marginTop: 5, paddingHorizontal: 20, elevation: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 20 },
  dragHandle: { width: 50, height: 5, backgroundColor: '#E5E7EB', borderRadius: 10, alignSelf: 'center', marginVertical: 12 },
  promoBanner: { borderRadius: 20, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  promoTextCol: { flex: 2 },
  promoIconCol: { flex: 1, alignItems: 'flex-end' },
  promoTitle: { fontSize: 32, fontWeight: '900', color: '#FFF' },
  promoSub: { fontSize: 14, color: '#FFF', opacity: 0.9, marginBottom: 10 },
  promoCodeBox: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, alignSelf: 'flex-start', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  promoCode: { color: '#FFF', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  giftIcon: { width: 80, height: 80, transform: [{ rotate: '12deg' }] },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  viewAll: { color: '#FF9100', fontSize: 14, fontWeight: '600' },

  recScrollArea: { paddingBottom: 10 },
  recBannerHorizontal: { width: width * 0.85, height: 160, borderRadius: 20, overflow: 'hidden', marginRight: 15 },
  recImg: { width: '100%', height: '100%' },
  recOverlay: { ...StyleSheet.absoluteFillObject },
  recTag: { position: 'absolute', top: 12, left: 12, backgroundColor: '#FF9100', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  recTagText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  recInfo: { position: 'absolute', bottom: 15, left: 15 },
  recSubText: { color: '#FFF', opacity: 0.9, fontSize: 12 },
  recMainText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },

  hScroll: { marginBottom: 20 },
  circleItem: { width: 85, alignItems: 'center', marginRight: 15 },
  circleBorder: { width: 65, height: 65, borderRadius: 35, borderWidth: 2, borderColor: 'transparent', padding: 2 },
  activeCircle: { borderColor: '#FF9100' },
  circleImg: { width: '100%', height: '100%', borderRadius: 35 },
  circleTitle: { fontSize: 12, fontWeight: 'bold', marginTop: 8, color: '#333' },
  circleSub: { fontSize: 10, color: '#6B7280' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' },
  gridItem: { width: (width - 60) / 3, aspectRatio: 1, borderRadius: 15, overflow: 'hidden', marginBottom: 5 },
  gridImg: { width: '100%', height: '100%' },
  gridOverlay: { ...StyleSheet.absoluteFillObject },
  gridTitle: { position: 'absolute', bottom: 10, width: '100%', textAlign: 'center', color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  gridTag: { position: 'absolute', top: 8, left: 8, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  gridTagText: { color: '#FFF', fontSize: 8, fontWeight: 'bold' },
  workerList: { gap: 12, marginBottom: 20 },
  workerCard: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: '#F3F4F6' },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 55, height: 55, borderRadius: 30 },
  onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderRadius: 7, backgroundColor: '#10B981', borderWidth: 2, borderColor: '#FFFFFF' },
  workerMain: { flex: 1, marginLeft: 15 },
  workerName: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  workerSub: { fontSize: 12, color: '#6B7280' },
  workerEnd: { alignItems: 'flex-end' },
  workerRating: { fontSize: 14, fontWeight: 'bold', color: '#FF9100', marginLeft: 4 },
  workerCalls: { fontSize: 10, color: '#6B7280', marginTop: 2 },

  popularWrapper: { position: 'relative', paddingBottom: 40 },
  popularScroll: { paddingRight: 20 },
  popularCard: { width: width * 0.45, marginRight: 15 },
  popularImg: { width: '100%', height: 130, borderRadius: 20 },
  popularMeta: { marginTop: 10 },
  popularName: { fontSize: 15, fontWeight: 'bold', color: '#1F2937' },
  popularRatingText: { fontSize: 13, fontWeight: 'bold', color: '#1F2937', marginLeft: 4 },
  popularReviews: { fontSize: 13, color: '#9CA3AF' },
  navCircle: { position: 'absolute', top: 45, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.95)', justifyContent: 'center', alignItems: 'center', elevation: 4, zIndex: 10 },
  leftCircle: { left: -10 },
  rightCircle: { right: 5 },
  indicatorTrack: { height: 4, backgroundColor: '#E5E7EB', width: 100, alignSelf: 'center', marginTop: 15, borderRadius: 2, overflow: 'hidden' },
  indicatorThumb: { height: '100%', width: 40, backgroundColor: '#FF9100', borderRadius: 2 },

  sosBtn: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#EF4444', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  row: { flexDirection: 'row', alignItems: 'center' },
  dropdownOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  dropdownCard: { width: width * 0.8, backgroundColor: '#FFF', borderRadius: 20, padding: 20, elevation: 5 },
  dropdownHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#EEE', paddingBottom: 10 },
  dropdownTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  dropdownItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  dropdownText: { fontSize: 16, color: '#444' },

  searchOverlay: { flex: 1, backgroundColor: '#FFF' },
  searchHeaderCustom: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  searchTitleCustom: { fontSize: 22, fontWeight: 'bold', marginLeft: 12, color: '#1F2937' },
  searchInputContainerCustom: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', marginHorizontal: 16, borderRadius: 30, paddingHorizontal: 16, height: 52, marginBottom: 10 },
  fullSearchInput: { flex: 1, fontSize: 16, color: '#333' },
  searchScrollBody: { flex: 1, paddingHorizontal: 16 },
  searchSectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginTop: 24, marginBottom: 15 },
  historyChipsRow: { paddingBottom: 5 },
  // historyChip: { backgroundColor: '#F3F4F6', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 25, marginRight: 10, marginBottom: 10 },
  historyChip: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F3F4F6',
  paddingHorizontal: 14,
  paddingVertical: 10,
  borderRadius: 25,
  marginRight: 10,
  marginBottom: 10,
  gap: 6,
},

  chipText: { color: '#4B5563', fontSize: 14, fontWeight: '500' },
  categoryGridCustom: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryCardCustom: { width: '48%', flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#F3F4F6', elevation: 2 },
  categoryCardText: { marginLeft: 12, fontSize: 16, fontWeight: '600', color: '#374151' },
  trendingWrap: { flexDirection: 'row', flexWrap: 'wrap' },

  voiceOverlayBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  voiceContainer: { width: width * 0.85, backgroundColor: '#FFF', borderRadius: 25, padding: 24, alignItems: 'center' },
  closeVoice: { alignSelf: 'flex-end' },
  voiceTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  voiceInstruction: { fontSize: 16, color: '#666', marginBottom: 30 },
  voiceMicCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FF7A00', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  voiceResultBox: { backgroundColor: '#FFF7ED', padding: 20, borderRadius: 12, width: '100%', marginBottom: 30 },
  voiceResultText: { fontSize: 22, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  voiceActionRow: { flexDirection: 'row', gap: 15, width: '100%' },
  voiceTryAgain: { flex: 1, height: 50, borderRadius: 12, borderWidth: 1, borderColor: '#FF7A00', justifyContent: 'center', alignItems: 'center' },
  voiceSearchBtn: { flex: 1, height: 50, borderRadius: 12, backgroundColor: '#FF7A00', justifyContent: 'center', alignItems: 'center' },
  searchBtnText: { color: '#FFF', fontWeight: 'bold' },
  tryAgainText: { color: '#FF7A00', fontWeight: 'bold' },

  suggestionBox: {
  backgroundColor: '#FFF',
  borderRadius: 12,
  marginHorizontal: 16,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#E5E7EB',
  overflow: 'hidden',
},

suggestionItem: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 14,
  borderBottomWidth: 1,
  borderBottomColor: '#F3F4F6',
},

suggestionText: {
  marginLeft: 10,
  fontSize: 16,
  color: '#1F2937',
},

});

export default HomePage;