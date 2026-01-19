import {
  CheckCircle2,
  Heart,
  Linkedin,
  ShieldCheck,
  Star,
  Twitter,
  Users
} from 'lucide-react-native';
import React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function AboutPage() {
  
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Sticky Header */}
      {/* <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoSquare}>
            <Text style={styles.logoLetter}>S</Text>
          </View>
          <Text style={styles.logoText}>SEVADHAR</Text>
        </View>
        <TouchableOpacity style={styles.menuBtn}>
          <Menu size={24} color="#64748b" />
        </TouchableOpacity>
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            Connecting Communities with{"\n"}
            <Text style={styles.primaryText}>Trusted Services</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            Sevadhar bridges the gap between service seekers and verified local workers, 
            creating opportunities for professionals while delivering quality services to families.
          </Text>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5000+</Text>
              <Text style={styles.statLabel}>Happy Families</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1000+</Text>
              <Text style={styles.statLabel}>Verified Workers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1+</Text>
              <Text style={styles.statLabel}>Cities</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.ratingRow}>
                <Text style={styles.statNumber}>4.8</Text>
                <Star size={20} color="#FF7A00" fill="#FF7A00" />
              </View>
              <Text style={styles.statLabel}>Average Rating</Text>
            </View>
          </View>
        </View>

        {/* Mission Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.bodyText}>
            India's unorganized service sector employs millions of skilled workers who struggle to find consistent work and fair wages. Sevadhar is changing this.
          </Text>
          <Text style={[styles.bodyText, { marginTop: 15 }]}>
            We provide a platform where workers can build their reputation, get discovered by customers in their neighborhood, and grow their income—all while maintaining the trust and safety standards that families expect.
          </Text>
          
          <View style={styles.bulletList}>
            {[
              "No commissions on workers",
              "Zero typing onboarding",
              "Voice-first design"
            ].map((item, index) => (
              <View key={index} style={styles.bulletItem}>
                <View style={styles.checkCircle}>
                  <CheckCircle2 size={14} color="#FF7A00" />
                </View>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Values Section */}
        <View style={styles.section}>
          <View style={styles.centeredHeader}>
            <Text style={styles.sectionTitle}>Our Values</Text>
            <Text style={styles.sectionSubtitleText}>Everything we do is guided by these core principles</Text>
          </View>

          <View style={styles.valuesList}>
            <ValueCard 
              icon={<ShieldCheck size={32} color="#FF7A00" />} 
              title="Trust & Safety" 
              desc="Every worker is Aadhaar verified and background checked for your safety."
            />
            <ValueCard 
              icon={<Users size={32} color="#FF7A00" />} 
              title="Empowering Workers" 
              desc="We help blue-collar workers grow their business and earn with dignity."
            />
            <ValueCard 
              icon={<Heart size={32} color="#FF7A00" />} 
              title="Community First" 
              desc="Building stronger neighborhoods through reliable local services."
            />
            <ValueCard 
              icon={<CheckCircle2 size={32} color="#FF7A00" />} 
              title="Quality Service" 
              desc="Feedback-driven system ensures consistent quality across all services."
            />
          </View>
        </View>

        {/* Founders Section */}
        <View style={styles.section}>
          <View style={styles.centeredHeader}>
            <Text style={styles.sectionTitle}>Meet our Founders</Text>
            <Text style={styles.sectionSubtitleText}>The visionary team behind Sevadhar</Text>
          </View>

          <FounderCard 
            name="Shree Nivas Kunte" 
            role="Co-Founder & CEO"
            image="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            bio="Passionate about using technology to organize India's massive informal workforce."
          />
          <FounderCard 
            name="Yogesh Khandke" 
            role="Founder"
            image="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
            bio="Leading operational excellence and worker empowerment initiatives across 2 cities."
          />
        </View>

        {/* Story Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Story</Text>
          <View style={styles.timelineContainer}>
            <TimelineItem 
              year="2011" 
              title="The Spark" 
              desc="Witnessed the daily struggle of local help finding work during the pandemic. Started with just 10 workers."
            />
            <TimelineItem 
              year="2024" 
              title="Expanding Horizons" 
              desc="Launched our tech-first platform with Aadhaar verification. Scaled to 1 major cities."
            />
            <TimelineItem 
              year="2025" 
              title="National Presence" 
              desc="Reached 1000+ verified workers and established ourselves as a trusted name in 3 cities."
              isLast
            />
          </View>
        </View>

        {/* CTA Card */}
        {/* <View style={styles.ctaContainer}>
          <LinearGradient colors={['#FF7A00', '#ea580c']} style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>Join the Movement</Text>
            <Text style={styles.ctaSubtitle}>Be a part of the platform that is redefining local services for a better India.</Text>
            
            <TouchableOpacity style={styles.ctaWhiteBtn}>
              <Text style={styles.ctaWhiteBtnText}>Download the App</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.ctaOutlineBtn}>
              <Text style={styles.ctaOutlineBtnText}>Become a Partner</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View> */}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Sevadhar Solutions Private Limited.{"\n"}
            Made with <Text style={{color: '#ef4444'}}>♥</Text> for the community.
          </Text>
        </View>

        <View style={{height: 100}} />
      </ScrollView>
    </SafeAreaView>
  );
}  
// Sub-components
const ValueCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <View style={styles.valueCard}>
    <View style={styles.valueIconBg}>{icon}</View>
    <Text style={styles.valueTitle}>{title}</Text>
    <Text style={styles.valueDesc}>{desc}</Text>
  </View>
);

const FounderCard = ({ name, role, image, bio }: { name: string, role: string, image: string, bio: string }) => (
  <View style={styles.founderCard}>
    <Image source={{ uri: image }} style={styles.founderImg} />
    <View style={styles.founderInfo}>
      <View style={styles.founderHeaderRow}>
        <View>
          <Text style={styles.founderName}>{name}</Text>
          <Text style={styles.founderRole}>{role}</Text>
        </View>
        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.socialCircle}><Linkedin size={14} color="#64748b" /></TouchableOpacity>
          <TouchableOpacity style={styles.socialCircle}><Twitter size={14} color="#64748b" /></TouchableOpacity>
        </View>
      </View>
      <Text style={styles.founderBio}>{bio}</Text>
    </View>
  </View>
);

const TimelineItem = ({ year, title, desc, isLast }: { year: string, title: string, desc: string, isLast?: boolean }) => (
  <View style={styles.timelineItem}>
    <View style={styles.timelineLineContainer}>
      <View style={styles.timelineDot} />
      {!isLast && <View style={styles.timelineVerticalLine} />}
    </View>
    <View style={styles.timelineContent}>
      <Text style={styles.timelineYear}>{year}</Text>
      <Text style={styles.timelineTitle}>{title}</Text>
      <Text style={styles.timelineDesc}>{desc}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  scrollContent: { paddingBottom: 20 },
  primaryText: { color: '#FF7A00' },
  
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(250, 249, 246, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logoSquare: {
    width: 36,
    height: 36,
    backgroundColor: '#FF7A00',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLetter: { color: 'white', fontWeight: 'bold', fontSize: 20 },
  logoText: { fontSize: 18, fontWeight: '800', marginLeft: 10, letterSpacing: -0.5 },
  menuBtn: { padding: 5 },

  heroSection: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 60, alignItems: 'center', backgroundColor: '#f8fafc' },
  heroTitle: { fontSize: 32, fontWeight: '900', textAlign: 'center', color: '#0f172a', lineHeight: 40 },
  heroSubtitle: { fontSize: 16, textAlign: 'center', color: '#64748b', marginTop: 15, lineHeight: 24 },

  statsCard: {
    marginHorizontal: 24,
    marginTop: -40,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  statItem: { width: '50%', paddingVertical: 15, alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: '900', color: '#FF7A00' },
  statLabel: { fontSize: 12, fontWeight: '600', color: '#64748b', marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },

  section: { paddingHorizontal: 24, marginTop: 40 },
  sectionTitle: { fontSize: 24, fontWeight: '900', color: '#0f172a' },
  centeredHeader: { alignItems: 'center', marginBottom: 30 },
  sectionSubtitleText: { color: '#64748b', marginTop: 5 },
  bodyText: { fontSize: 15, color: '#475569', lineHeight: 24 },

  bulletList: { marginTop: 20, gap: 15 },
  bulletItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  checkCircle: { 
    width: 24, height: 24, borderRadius: 12, borderWidth: 2, 
    borderColor: '#FF7A00', justifyContent: 'center', alignItems: 'center' 
  },
  bulletText: { fontSize: 15, fontWeight: '600', color: '#1e293b' },

  valuesList: { gap: 16, marginTop: 20 },
  valueCard: {
    backgroundColor: 'white', padding: 24, borderRadius: 24, 
    alignItems: 'center', borderWidth: 1, borderColor: '#f1f5f9'
  },
  valueIconBg: {
    width: 64, height: 64, backgroundColor: '#fff7ed', borderRadius: 16,
    justifyContent: 'center', alignItems: 'center', marginBottom: 20
  },
  valueTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  valueDesc: { fontSize: 14, color: '#64748b', textAlign: 'center', marginTop: 8, lineHeight: 20 },

  founderCard: {
    flexDirection: 'row', padding: 20, backgroundColor: 'white', 
    borderRadius: 24, marginBottom: 16, borderWidth: 1, borderColor: '#f1f5f9', gap: 15
  },
  founderImg: { width: 70, height: 70, borderRadius: 40, borderWidth: 2, borderColor: 'rgba(255,122,0,0.1)' },
  founderInfo: { flex: 1 },
  founderHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  founderName: { fontSize: 17, fontWeight: '800', color: '#0f172a' },
  founderRole: { fontSize: 13, color: '#FF7A00', fontWeight: '700' },
  socialIcons: { flexDirection: 'row', gap: 8 },
  socialCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#f1f5f9', justifyContent: 'center', alignItems: 'center' },
  founderBio: { fontSize: 12, color: '#64748b', fontStyle: 'italic', lineHeight: 18 },

  timelineContainer: { marginTop: 30, marginLeft: 10 },
  timelineItem: { flexDirection: 'row', minHeight: 100 },
  timelineLineContainer: { alignItems: 'center', width: 20 },
  timelineDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#FF7A00', zIndex: 1 },
  timelineVerticalLine: { width: 2, flex: 1, backgroundColor: '#f1f5f9', marginTop: -5 },
  timelineContent: { paddingLeft: 20, flex: 1, paddingBottom: 30 },
  timelineYear: { fontSize: 14, fontWeight: '900', color: '#FF7A00' },
  timelineTitle: { fontSize: 16, fontWeight: '800', color: '#0f172a', marginVertical: 4 },
  timelineDesc: { fontSize: 14, color: '#64748b', lineHeight: 20 },

  ctaContainer: { paddingHorizontal: 24, marginTop: 40 },
  ctaCard: { padding: 32, borderRadius: 32, alignItems: 'center' },
  ctaTitle: { color: 'white', fontSize: 24, fontWeight: '900', marginBottom: 10 },
  ctaSubtitle: { color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 30, lineHeight: 22 },
  ctaWhiteBtn: { backgroundColor: 'white', width: '100%', paddingVertical: 16, borderRadius: 16, alignItems: 'center', elevation: 5 },
  ctaWhiteBtnText: { color: '#FF7A00', fontWeight: '800', fontSize: 16 },
  ctaOutlineBtn: { 
    width: '100%', paddingVertical: 16, borderRadius: 16, alignItems: 'center', 
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', marginTop: 12 
  },
  ctaOutlineBtnText: { color: 'white', fontWeight: '800', fontSize: 16 },

  footer: { marginTop: 60, paddingHorizontal: 24, alignItems: 'center' },
  footerText: { fontSize: 13, color: '#94a3b8', textAlign: 'center', lineHeight: 20 },
});