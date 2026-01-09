import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  ArrowLeft, BookOpen, Briefcase, Calendar, Check, ChevronDown, ChevronLeft, ChevronRight,
  Clapperboard, Construction, Dog, Globe, Hammer, Heart, Home, Layers, Leaf, MapPin, Mic,
  Phone, Scissors, Search, Sprout, Star, Stethoscope, Store, Trash2, Truck, Users, Wrench, X
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar } from 'react-native';

const { width } = Dimensions.get('window');

const HomePage = () => {
  const router = useRouter();
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [voiceModalVisible, setVoiceModalVisible] = useState(false);
  const [voiceStep, setVoiceStep] = useState<'listening' | 'result'>('listening');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Khopoli');
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  const sevadharCategories = [
    { id: '1', name: 'Home Help', icon: Home, color: '#FF7A00' },
    { id: '2', name: 'Repairs', icon: Wrench, color: '#3B82F6' },
    { id: '3', name: 'Construction', icon: Construction, color: '#F59E0B' },
    { id: '4', name: 'Gardening', icon: Leaf, color: '#10B981' },
    { id: '5', name: 'Scrap & Pheri', icon: Trash2, color: '#6B7280' },
    { id: '6', name: 'Religious', icon: Users, color: '#8B5CF6' },
    { id: '7', name: 'Wellness', icon: Heart, color: '#EC4899' },
    { id: '8', name: 'Food Vendors', icon: Store, color: '#EF4444' },
    { id: '9', name: 'Education', icon: BookOpen, color: '#10B981' },
    { id: '10', name: 'Clothing', icon: Scissors, color: '#F97316' },
    { id: '11', name: 'Pets', icon: Dog, color: '#3B82F6' },
    { id: '12', name: 'Healthcare', icon: Stethoscope, color: '#EF4444' },
    { id: '13', name: 'Events', icon: Calendar, color: '#8B5CF6' },
    { id: '14', name: 'Hardware', icon: Hammer, color: '#4B5563' },
    { id: '15', name: 'Traditional', icon: Hammer, color: '#D97706' },
    { id: '16', name: 'Transport', icon: Truck, color: '#2563EB' },
    { id: '17', name: 'Professional', icon: Briefcase, color: '#1F2937' },
    { id: '18', name: 'Design', icon: Layers, color: '#059669' },
    { id: '19', name: 'Arts & Media', icon: Clapperboard, color: '#7C3AED' },
    { id: '20', name: 'Agriculture', icon: Sprout, color: '#15803D' },
  ];

  const handleVoiceTrigger = () => {
    setVoiceStep('listening');
    setVoiceModalVisible(true);
    setTimeout(() => { setVoiceStep('result'); }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.etherealBg} />

      <SafeAreaView style={styles.safeArea}>
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

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.contentCard}>
            <View style={styles.dragHandle} />

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

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recommended for You</Text>
            </View>
            <TouchableOpacity style={styles.recBanner} onPress={() => router.push('/service/home-cleaning')}>
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKdpBWmohGiJR_7wRuLX47LRyOiu_D6Zmel3doCK-l9fbTfV0cO6L-9_yCn2Fr7Z-lg1CoA41EgZY4dLJc0LDndqqBUZulLntLNzbTcojpsDUj59AwZXB6HXfKhuTljsjFcvawAKm5yAtvW11b1Bx-5Tz6HlYkPysicvUI5VxLqVYzKT9sijXd31eQLIXW1RZrf874KQEPdS6HLrFDDjljA3lX9RaIEwV8AffCzGAfOHd2zTO5tMAGDV-CGz9jLcbQsb6nmeGiVZpF' }} style={styles.recImg} />
              <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.recOverlay} />
              <View style={styles.recTag}><Text style={styles.recTagText}>Try & Hire</Text></View>
              <View style={styles.recInfo}>
                <Text style={styles.recSubText}>Summer Special</Text>
                <Text style={styles.recMainText}>AC Service & Repair</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Most Used by You</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll}>
              {[
                { name: 'Plumber', count: '5x booked', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmndxTruogxckO2Au1EWvggLZE-ca13mPz1Owl6jfIgffSLgdujpzFXj4NEaupZFeDT59hLi4tYpHx4YNFIc325vq-Lj7oSosRwCFyC7QxjXBj9ncOuMVERljLZrMcYnXi7T1_BkQniagGqh4q86yM-0mlsKSqzTpH4AAjnz5D8Z2vxyfRwawD_PuxVPnmICgCY6N-tkq4hr2JbwW1WRbwviIthRHG38NANi_tnUmc0YWtQ91HmfZGAoXEshDx7_4PpF8UahulOk7d', slug: 'plumber' },
                { name: 'Cleaning', count: '2x booked', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIRRX7-WMD-cAmIoKtCNYK2c_CsIYiBLJLqLwY-jUXEV2zN67udcsJCIITpDIqCNnUMQqdEbLOO-4OnLTrGj0DZvV3hYZUr110V-0rOeh2_wOxR2ysxUEEQuuqgq88W7C6f0PfYghsbyT5NN9sZ4JlIvNkE0HIBLhMM-U8TVLXGqaWaGmqPovPacQaIQn2AreyU6xKyV5wonbGfEDv6jCN8CbJr9Xbn8ZVFj4lJcB61ZOFx-X4yCKKwSfYRUclC1jwVrx2TmEpMgGG', slug: 'home-cleaning' },
                { name: 'Electrician', count: '1x booked', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3rqXz5gTku3MFaCAe_ezBBK2aEgiEIWw_oIW89kobD6sxr-wn8X8H27XjEGgEoXg_M1ZAY5nGJyevyjGc6tdD6MDe24XxlO4yH74ZMigIuWIoFNgg6BoE0eTBYaFGWslZnLkBI7-vCe6U91B0l2euyO8ChSgLSpg30HQGI-JjTcur4CH26iaYL7A4EmgScfdyX_wzhcvyzRAtWV4SGmJTtDtVzh4jAPZpzCZFIzCdNI7uemHc6SoDiNoak8l4LrIYBfDghbP6C_nM', slug: 'electrician' },
              ].map((item, idx) => (
                <TouchableOpacity key={idx} style={styles.circleItem} onPress={() => router.push(`/service/${item.slug}`)}>
                  <View style={[styles.circleBorder, idx === 0 && styles.activeCircle]}>
                    <Image source={{ uri: item.img }} style={styles.circleImg} />
                  </View>
                  <Text style={styles.circleTitle}>{item.name}</Text>
                  <Text style={styles.circleSub}>{item.count}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>All Services</Text>
              <TouchableOpacity onPress={() => router.push('/services')}><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
            </View>
            <View style={styles.grid}>
              {[
                { name: 'Cleaning', tag: 'Try & Hire', color: '#FF9100', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_DfCdmwpHbvLaAP0-XI8gOheXUNNbJlKwwN7B8rL5w4QX0sObWHjnLmQxBjcCxbLt5FmLVPe1yULcl3VmJWRrGGJiNpoxPXQYv8APGdebWmDUa-uolPsnxlB_41XnVnMoQ2bnHAS78EY4M4773aG3yV2JAm5tiTSTvkeTyyrHOXUC5SbSB7RYMbhUXIu38r56gFmPR1C52tDxytHq3MnthwdAcctsODT-BQAkOcqQgaf94qGpKIaKNo8SjCzWSnP4yYdbzIItYvVn', slug: 'home-cleaning' },
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

            <View style={styles.sectionHeader}>
              <View style={styles.row}><Phone size={18} color="#FF9100" style={{marginRight: 6}} /><Text style={styles.sectionTitle}>Most Called This Week</Text></View>
            </View>
            <View style={styles.workerList}>
              {[
                { name: 'Raju Plumber', dist: '5km away', rating: '4.9', calls: '234 calls', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwcAgP-1vyZMA4FYPdsbE_dquZfQsBj1ssM60aN8DSDVmtJlKCvMX81qXR714ewWsehnKId5Q5yQQhrlW7aWz8ov9UvJIoDQFcxTopqwUOkhVxbpQCdPrYJfdTDJixv-Zh41NGceELM5uFoY3NZQHPnSbnhsKX-Gvk3mK8VeaX72EIN54yDO4m8LquOZM3c61NbFPu_Gl7vkx7IN45NGllU8SmaxsO2_j4WQTAk7kUCDmPMELR4D3G-pbktJ8v7wo64tnjokSJOxes', service: 'Plumber' },
                { name: 'Suresh Electric', dist: '2km away', rating: '4.8', calls: '198 calls', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACFoewEyNiSan3LXWe-iu8whgjZgdhdMeL7xjbVDcAQnIbsbrIdrUsmSpQwaStt8s9q9rJUHo5ovRdryQUmyrrx9tirn0NvNlawkmPIpmW-_virvnul9CbpXh4oHuXcPWaNNMWtChkKo_Pf5PjRiDcg3ObL4nOGDj9CCtY4yTEY38037NSGQWXa99M_cNGiaVC5fBQIGCTuABFNA_p22nJLChVI3E-4vcP1nAXe4AskwgEv8od6WOnHNUoXemmhFh_sECK5AITqs0V', service: 'Electrician' },
                { name: 'Priya Cleaning', dist: '4km away', rating: '4.7', calls: '176 calls', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6PBgHdK-2jQHZI5F-E-hgcmhT73csEhoLCsCQzDr7ew80ZYzjTzCn00HfMgOgY7AKpiGsw1J2Hroqwj90aPAsy1t0r8lr8fYuAlnTQQQnzCwfMpNray0mHyQf-iMjXP6r3jwS0egpN8XfEif03-lkKuTpEGUFkVP9HaGlHMdFEvxraYYW7_Xar-wsHr4QGuuFVm-DNrO9owI0kZiCVeRzynLGubBmm_STKb4qOxuAyoF-zRDblTaIQcLQi7HKpPwL4jtfdSX8H5Hh', service: 'Home Cleaning' },
              ].map((worker, idx) => (
                <TouchableOpacity 
                  key={idx} 
                  style={styles.workerCard}
                  onPress={() => router.push({
                    pathname: '/service/serviceprofile',
                    params: { name: worker.name, rating: worker.rating, calls: worker.calls, location: worker.dist }
                  })}
                >
                  <View style={styles.avatarWrapper}>
                    <Image source={{ uri: worker.img }} style={styles.avatar} />
                    <View style={styles.onlineDot} />
                  </View>
                  <View style={styles.workerMain}>
                    <Text style={styles.workerName}>{worker.name}</Text>
                    <Text style={styles.workerSub}>{worker.service} • {worker.dist}</Text>
                  </View>
                  <View style={styles.workerEnd}>
                    <View style={styles.row}><Star size={14} color="#FF9100" fill="#FF9100" /><Text style={styles.workerRating}>{worker.rating}</Text></View>
                    <Text style={styles.workerCalls}>{worker.calls}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* MOST POPULAR SECTION START */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Most Popular</Text>
            </View>
            <View style={styles.popularWrapper}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.popularScroll}>
                {[
                  { name: 'Home Cleaning', rating: '4.8', reviews: '3.8M', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?w=400' },
                  { name: 'Plumber', rating: '4.7', reviews: '2.8M', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400' },
                  { name: 'Electrician', rating: '4.9', reviews: '1.5M', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400' },
                ].map((item, idx) => (
                  <TouchableOpacity key={idx} style={styles.popularCard}>
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
              
              {/* Circular Slide Controls */}
              <TouchableOpacity style={[styles.navCircle, styles.leftCircle]}>
                <ChevronLeft size={20} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navCircle, styles.rightCircle]}>
                <ChevronRight size={20} color="#333" />
              </TouchableOpacity>

              {/* Orange Sliding Progress Bar */}
              <View style={styles.indicatorTrack}>
                <View style={styles.indicatorThumb} />
              </View>
            </View>
            {/* MOST POPULAR SECTION END */}
            
          </View>
        </ScrollView>
      </SafeAreaView>

      <TouchableOpacity style={styles.sosBtn}>
        <Phone size={24} color="#FFF" fill="#FFF" />
      </TouchableOpacity>

      {/* Modals for functional components */}
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

      <Modal visible={isSearchVisible} animationType="slide" onRequestClose={() => setSearchVisible(false)}>
        <SafeAreaView style={styles.searchOverlay}>
          <View style={styles.searchHeader}><TouchableOpacity onPress={() => setSearchVisible(false)}><ArrowLeft size={24} color="#333" /></TouchableOpacity><Text style={styles.searchTitle}>Search</Text></View>
          <View style={styles.searchInputContainer}><Search size={22} color="#666" style={{ marginRight: 10 }} /><TextInput placeholder="Find Electrician, Maid, or Pandit..." style={styles.fullSearchInput} autoFocus={true} value={searchQuery} onChangeText={setSearchQuery} /></View>
        </SafeAreaView>
      </Modal>

      <Modal visible={voiceModalVisible} transparent={true} animationType="fade">
        <View style={styles.voiceOverlayBg}>
          <View style={styles.voiceContainer}>
            <TouchableOpacity style={styles.closeVoice} onPress={() => setVoiceModalVisible(false)}><X size={24} color="#666" /></TouchableOpacity>
            <Text style={styles.voiceTitle}>Voice Search</Text>
            {voiceStep === 'listening' ? (
              <><Text style={styles.voiceInstruction}>Tap the microphone to speak</Text><View style={styles.voiceMicCircle}><Mic size={40} color="#FFF" /></View></>
            ) : (
              <><Text style={styles.voiceInstruction}>Search result:</Text><View style={styles.voiceResultBox}><Text style={styles.voiceResultText}>"Plumber"</Text></View>
                <View style={styles.voiceActionRow}><TouchableOpacity style={styles.voiceTryAgain} onPress={() => setVoiceStep('listening')}><Text style={styles.tryAgainText}>Try Again</Text></TouchableOpacity><TouchableOpacity style={styles.voiceSearchBtn} onPress={() => { setVoiceModalVisible(false); setSearchVisible(true); setSearchQuery('Plumber'); }}><Text style={styles.searchBtnText}>Search</Text></TouchableOpacity></View></>
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
  header: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 10, backgroundColor: 'rgba(255,255,255,0.7)' },
  headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  headerLeft: { flex: 1 },
  locLabel: { fontSize: 10, color: '#6B7280' },
  locNameRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locName: { fontSize: 14, fontWeight: 'bold', color: '#FF9100' },
  brandTitle: { fontSize: 20, fontWeight: 'bold', color: '#FF9100', letterSpacing: 0.5, flex: 1, textAlign: 'center' },
  langBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFF' },
  langText: { fontSize: 12, fontWeight: '600' },
  searchBarContainer: { paddingVertical: 5 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, paddingHorizontal: 12, height: 50, elevation: 2, shadowColor: '#FF9100', shadowOpacity: 0.1 },
  searchPlaceholderText: { flex: 1, marginLeft: 10, fontSize: 14, color: '#9CA3AF' },
  micIconBg: { backgroundColor: '#FF9100', padding: 8, borderRadius: 8 },
  scrollContent: { paddingBottom: 0 }, // Removed extra bottom space
  contentCard: { flex: 1, backgroundColor: '#FFF', borderTopLeftRadius: 40, borderTopRightRadius: 40, marginTop: 15, paddingHorizontal: 20, elevation: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 20 },
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
  recBanner: { height: 160, borderRadius: 20, overflow: 'hidden', marginBottom: 25 },
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
  onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderRadius: 7, backgroundColor: '#10B981', borderWidth: 2, borderColor: '#FFF' },
  workerMain: { flex: 1, marginLeft: 15 },
  workerName: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  workerSub: { fontSize: 12, color: '#6B7280' },
  workerEnd: { alignItems: 'flex-end' },
  workerRating: { fontSize: 14, fontWeight: 'bold', color: '#FF9100', marginLeft: 4 },
  workerCalls: { fontSize: 10, color: '#6B7280', marginTop: 2 },

  // POPULAR SECTION STYLES
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
  searchHeader: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  searchTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 16 },
  searchInputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', marginHorizontal: 16, borderRadius: 30, paddingHorizontal: 16, height: 50, marginBottom: 20, borderWidth: 1, borderColor: '#EEE' },
  fullSearchInput: { flex: 1, fontSize: 16 },
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
  tryAgainText: { color: '#FF7A00', fontWeight: 'bold' },
  voiceSearchBtn: { flex: 1, height: 50, borderRadius: 12, backgroundColor: '#FF7A00', justifyContent: 'center', alignItems: 'center' },
  searchBtnText: { color: '#FFF', fontWeight: 'bold' }
});

export default HomePage;