import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function ContactUsPage() {
  const router = useRouter();
  
  // Form State
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  // FAQ State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I track my service?",
      answer: "You can track your service in real-time through the 'History' page in the app Navigation bar."
    },
    {
      question: "Are we responsible for refund?",
      answer: "No, Sevadhar is not responsible for any refunds. Please contact the service provider directly for refund-related queries."
    },
    {
      question: "Can I change my service availiability everyday?",
      answer: "Yes, you can change through profile ."
    }
  ];

  const handleSendMessage = () => {
    if (!form.name || !form.phone || !form.subject || !form.message) {
      Alert.alert("Required Fields", "Please fill in all fields marked with *");
      return;
    }
    Alert.alert("Success", "Your message has been sent! We will get back to you soon.");
    setForm({ name: '', phone: '', email: '', subject: '', message: '' });
  };

  const openWhatsApp = () => {
    Linking.openURL('whatsapp://send?phone=911800000000&text=Hello Sevadhar Support');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={24} color="#0f172a" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>Contact Us</Text>
            <Text style={styles.subTitle}>Have questions? We're here to help.</Text>
          </View>

          {/* Contact Info Cards */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Get in Touch</Text>
            
            <ContactCard 
              icon={<Phone size={22} color="#F5821F" />} 
              title="Phone" 
              value="+91 1800-XXX-XXXX" 
              subValue="Toll Free (9 AM - 9 PM)" 
            />
            <ContactCard 
              icon={<Mail size={22} color="#F5821F" />} 
              title="Email" 
              value="support@sevadhar.com" 
              subValue="We reply within 24 hours" 
            />
            <ContactCard 
              icon={<MapPin size={22} color="#F5821F" />} 
              title="Address" 
              value="Khopoli, Maharashtra" 
              subValue="India" 
            />
            <ContactCard 
              icon={<Clock size={22} color="#F5821F" />} 
              title="Support Hours" 
              value="9 AM - 9 PM IST" 
              subValue="Monday to Sunday" 
            />
          </View>

          {/* WhatsApp Button */}
          <TouchableOpacity style={styles.whatsappBtn} onPress={openWhatsApp}>
            <MessageCircle size={24} color="white" fill="white" />
            <Text style={styles.whatsappBtnText}>Chat on WhatsApp</Text>
          </TouchableOpacity>

          {/* Message Form */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Send us a Message</Text>
            <Text style={styles.formSubtitle}>Fill out the form below and we'll get back to you as soon as possible.</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name <Text style={{color: '#F5821F'}}>*</Text></Text>
              <TextInput 
                style={styles.input} 
                placeholder="Your name" 
                value={form.name}
                onChangeText={(t) => setForm({...form, name: t})}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone <Text style={{color: '#F5821F'}}>*</Text></Text>
              <TextInput 
                style={styles.input} 
                placeholder="+91 98765 43210" 
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(t) => setForm({...form, phone: t})}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput 
                style={styles.input} 
                placeholder="your@email.com" 
                keyboardType="email-address"
                value={form.email}
                onChangeText={(t) => setForm({...form, email: t})}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Subject <Text style={{color: '#F5821F'}}>*</Text></Text>
              <TextInput 
                style={styles.input} 
                placeholder="How can we help?" 
                value={form.subject}
                onChangeText={(t) => setForm({...form, subject: t})}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Message <Text style={{color: '#F5821F'}}>*</Text></Text>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                placeholder="Tell us more about your query..." 
                multiline 
                numberOfLines={4}
                value={form.message}
                onChangeText={(t) => setForm({...form, message: t})}
              />
            </View>

            <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
              <Text style={styles.sendBtnText}>Send Message</Text>
            </TouchableOpacity>
          </View>

          {/* FAQs Section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>FAQs</Text>
            {faqs.map((faq, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.faqItem}
                onPress={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  {expandedFaq === index ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </View>
                {expandedFaq === index && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2024 Sevadhar. All Rights Reserved.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ContactCard = ({ icon, title, value, subValue }: { icon: any, title: string, value: string, subValue: string }) => (
  <View style={styles.contactCard}>
    <View style={styles.iconContainer}>{icon}</View>
    <View style={styles.contactTextContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardSubValue}>{subValue}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { paddingHorizontal: 20, paddingVertical: 10 ,paddingTop: Platform.OS === 'web' ? 12 : 50, flexDirection: 'row', alignItems: 'center' },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  
  titleSection: { marginTop: 10, marginBottom: 30 },
  mainTitle: { fontSize: 32, fontWeight: '900', color: '#0f172a' },
  subTitle: { fontSize: 18, color: '#64748b', marginTop: 5 },
  
  section: { marginBottom: 30 },
  sectionHeading: { fontSize: 20, fontWeight: '800', color: '#0f172a', marginBottom: 15 },
  
  contactCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
      android: { elevation: 2 }
    })
  },
  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 15,
    backgroundColor: '#FFF7ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  contactTextContainer: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  cardValue: { fontSize: 14, color: '#334155', fontWeight: '600', marginTop: 2 },
  cardSubValue: { fontSize: 12, color: '#94a3b8', marginTop: 2 },

  whatsappBtn: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 20,
    gap: 10,
    marginBottom: 30,
    elevation: 4
  },
  whatsappBtnText: { color: 'white', fontSize: 16, fontWeight: '800' },

  formCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 30,
    elevation: 3
  },
  formTitle: { fontSize: 22, fontWeight: '900', color: '#0f172a' },
  formSubtitle: { fontSize: 13, color: '#94a3b8', marginTop: 5, marginBottom: 20, lineHeight: 18 },
  
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '700', color: '#334155', marginBottom: 8, marginLeft: 4 },
  input: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 14,
    color: '#0f172a',
    borderWidth: 1,
    borderColor: '#f1f5f9'
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  
  sendBtn: {
    backgroundColor: '#F5821F',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    elevation: 5
  },
  sendBtnText: { color: 'white', fontSize: 18, fontWeight: '800' },

  faqItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f1f5f9'
  },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQuestion: { fontSize: 15, fontWeight: '700', color: '#0f172a', flex: 1 },
  faqAnswer: { fontSize: 14, color: '#64748b', marginTop: 12, lineHeight: 20 },

  footer: { alignItems: 'center', marginTop: 10 },
  footerText: { fontSize: 12, color: '#94a3b8' }
});