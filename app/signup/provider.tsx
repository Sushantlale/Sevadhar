import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  ArrowLeft,
  Camera,
  Check,
  ChevronRight,
  Info,
  Mic,
  X,
  MessageSquare,
  Calendar,
  Edit2,
  CheckCircle2,
  ArrowRight,
  Save,
  Trash2,
  Volume2,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

const sevaCategories = [
  { id: "household", name: "Household Help & Cleaning" },
  { id: "repair", name: "Repair & Maintenance" },
  { id: "construction", name: "Construction & Labour" },
  { id: "gardening", name: "Gardening & Outdoor" },
  { id: "scrap", name: "Scrap & Small-Scale Services" },
  { id: "religious", name: "Religious & Community" },
  { id: "personal", name: "Personal Care & Wellness" },
  { id: "food", name: "Food & Beverage Vendors" },
  { id: "education", name: "Education & Knowledge" },
  { id: "medical", name: "Medical & Healthcare" },
];

export default function ProviderSignup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    aadharFront: null as string | null,
    aadharBack: null as string | null,
    fullName: "",
    dob: "",
    phone: "",
    selectedSeva: "",
    voiceUri: null as string | null,
  });

  const [isFrontSaved, setIsFrontSaved] = useState(false);
  const [isBackSaved, setIsBackSaved] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceConfirmed, setIsVoiceConfirmed] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);

  const formatDate = (date: Date) => {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const pickImage = async (field: "aadharFront" | "aadharBack", fromCamera: boolean) => {
    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Camera/Gallery access is needed.");
      return;
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({ quality: 0.7, allowsEditing: true, aspect: [3, 2] })
      : await ImagePicker.launchImageLibraryAsync({ quality: 0.7, allowsEditing: true, aspect: [3, 2] });

    if (!result.canceled) {
      setFormData({ ...formData, [field]: result.assets[0].uri });
      if (field === "aadharFront") setIsFrontSaved(false);
      if (field === "aadharBack") setIsBackSaved(false);
    }
  };

  const sendOtp = () => {
    if (formData.phone.length !== 10) {
      Alert.alert("Error", "Enter valid 10-digit number");
      return;
    }
    setOtpSent(true);
    Alert.alert("OTP Sent", "Your verification code is 123456");
  };

  const verifyOtp = () => {
    if (otp === "123456") {
      setIsOtpVerified(true);
      Alert.alert("Success", "Verified!");
    } else {
      Alert.alert("Error", "Invalid OTP");
    }
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) return;
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      recordingRef.current = recording;
      setIsRecording(true);
    } catch (err) {
      console.error(err);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    try {
      await recordingRef.current?.stopAndUnloadAsync();
      const uri = recordingRef.current?.getURI();
      if (uri) setFormData({ ...formData, voiceUri: uri });
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.aadharFront || !formData.aadharBack) {
        Alert.alert("Missing Info", "Upload both Aadhaar images.");
        return;
      }
      if (!isFrontSaved || !isBackSaved) {
        Alert.alert("Action Required", "Please click 'Save' on the images to confirm.");
        return;
      }
    }
    if (step === 2) {
      if (!formData.fullName || !formData.dob || !formData.phone) {
        Alert.alert("Validation Error", "All fields marked with * are compulsory.");
        return;
      }
      if (!isOtpVerified) {
        Alert.alert("Verification Error", "Please verify your phone number with OTP.");
        return;
      }
    }
    if (step === 3) {
      if (!formData.voiceUri || !isVoiceConfirmed) {
        Alert.alert("Recording Required", "Please record your voice and click 'Confirm Recording' to proceed.");
        return;
      }
    }
    if (step === 4 && !formData.selectedSeva) {
      Alert.alert("Selection Required", "Please select a service category.");
      return;
    }
    if (step === 5) {
      if (!isAgreed) {
        Alert.alert("Agreement", "Please agree to the terms.");
        return;
      }
      router.replace("/signup/status");
      return;
    }
    setStep(step + 1);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (step > 1 ? setStep(step - 1) : router.back())}>
          <ArrowLeft size={28} color="#000" />
        </TouchableOpacity>
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.headerTitle}>Sevadhar Signup</Text>
          <Text style={styles.headerSub}>Step {step} of {totalSteps}</Text>
        </View>
      </View>

      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${(step / totalSteps) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        {step === 1 && (
          <View>
            <Text style={styles.sectionTitle}>Upload Aadhaar</Text>
            <View style={styles.uploadGrid}>
              {[
                { key: "aadharFront", label: "Front Side", saved: isFrontSaved, setSaved: setIsFrontSaved },
                { key: "aadharBack", label: "Back Side", saved: isBackSaved, setSaved: setIsBackSaved },
              ].map((item) => (
                <View key={item.key} style={styles.uploadCard}>
                  {formData[item.key as "aadharFront"] ? (
                    <View style={styles.imageWrapper}>
                      <Image source={{ uri: formData[item.key as "aadharFront"]! }} style={styles.previewImage} />
                      <View style={styles.imageOverlay}>
                        {!item.saved ? (
                          <TouchableOpacity style={styles.saveBtnSmall} onPress={() => item.setSaved(true)}>
                            <Save size={16} color="#FFF" /><Text style={styles.saveBtnTextSmall}>Save</Text>
                          </TouchableOpacity>
                        ) : (
                          <View style={styles.savedIndicator}>
                            <CheckCircle2 size={16} color="#22C55E" /><Text style={styles.savedTextSmall}>Saved</Text>
                          </View>
                        )}
                        <TouchableOpacity style={styles.changeImageBtn} onPress={() => { setFormData({ ...formData, [item.key]: null }); item.setSaved(false); }}>
                          <X size={16} color="#FFF" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.uploadPlaceholder}>
                      <View style={styles.cameraIconBg}><Camera size={32} color="#FF7A00" /></View>
                      <Text style={styles.uploadLabel}>{item.label}</Text>
                      <View style={styles.uploadActions}>
                        <TouchableOpacity onPress={() => pickImage(item.key as any, true)}><Text style={styles.actionText}>Camera</Text></TouchableOpacity>
                        <Text style={styles.divider}>|</Text>
                        <TouchableOpacity onPress={() => pickImage(item.key as any, false)}><Text style={styles.actionText}>Gallery</Text></TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>FULL NAME <Text style={{ color: 'red' }}>*</Text></Text>
              <TextInput placeholder="Enter full name" style={styles.input} value={formData.fullName} onChangeText={(v) => setFormData({ ...formData, fullName: v })} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>DATE OF BIRTH <Text style={{ color: 'red' }}>*</Text></Text>
              <View style={styles.dateInputContainer}>
                <TextInput
                  placeholder="DD/MM/YYYY"
                  value={formData.dob}
                  style={[styles.input, { marginBottom: 0, paddingRight: 50 }]}
                  onChangeText={(v) => setFormData({ ...formData, dob: v })}
                />
                <TouchableOpacity style={styles.rightIcon} onPress={() => setShowDatePicker(true)}>
                  <Calendar size={20} color="#94A3B8" />
                </TouchableOpacity>
              </View>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                onChange={(e, d) => {
                  setShowDatePicker(false);
                  if (d) setFormData({ ...formData, dob: formatDate(d) });
                }}
              />
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>PHONE NUMBER <Text style={{ color: 'red' }}>*</Text></Text>
              <TextInput placeholder="Enter phone number" keyboardType="phone-pad" maxLength={10} style={styles.input} value={formData.phone} onChangeText={(v) => setFormData({ ...formData, phone: v })} />
              {!isOtpVerified && (
                <TouchableOpacity style={styles.sendOtpBtn} onPress={sendOtp}>
                  <MessageSquare size={20} color="#FF7A00" />
                  <Text style={styles.sendOtpText}>{otpSent ? "Resend OTP" : "Send OTP"}</Text>
                </TouchableOpacity>
              )}
            </View>
            {otpSent && !isOtpVerified && (
              <View style={styles.inputGroup}>
                <TextInput placeholder="Enter OTP" keyboardType="number-pad" maxLength={6} style={styles.input} value={otp} onChangeText={setOtp} />
                <TouchableOpacity style={styles.verifyBtn} onPress={verifyOtp}><Text style={styles.verifyBtnText}>Verify OTP</Text></TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {step === 3 && (
          <View style={styles.centerContent}>
            <Text style={styles.sectionTitle}>Voice Introduction</Text>
            {!formData.voiceUri ? (
              <>
                <TouchableOpacity
                  style={[styles.micBtn, isRecording && styles.micBtnActive]}
                  onPressIn={startRecording}
                  onPressOut={stopRecording}
                >
                  <Mic size={40} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.micStatus}>{isRecording ? "Recording..." : "Hold to record voice"}</Text>
              </>
            ) : (
              <View style={styles.voicePreviewCard}>
                <View style={styles.voiceActions}>
                  <CheckCircle2 size={32} color={isVoiceConfirmed ? "#22C55E" : "#94A3B8"} />
                  <Text style={styles.voiceReadyText}>Recording Ready</Text>
                  <TouchableOpacity onPress={() => { setFormData({ ...formData, voiceUri: null }); setIsVoiceConfirmed(false); }}>
                    <Trash2 size={24} color="#EF4444" />
                  </TouchableOpacity>
                </View>
                {!isVoiceConfirmed && (
                  <TouchableOpacity style={styles.confirmVoiceBtn} onPress={() => setIsVoiceConfirmed(true)}>
                    <Check size={18} color="#FFF" /><Text style={styles.confirmVoiceText}>Confirm Recording</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        )}

        {step === 4 && (
          <View>
            <Text style={styles.sectionTitle}>Select Category</Text>
            {sevaCategories.map((item) => (
              <TouchableOpacity key={item.id} style={[styles.categoryCard, formData.selectedSeva === item.id && styles.categoryCardActive]} onPress={() => setFormData({ ...formData, selectedSeva: item.id })}>
                <Text style={[styles.categoryText, formData.selectedSeva === item.id && { color: '#FFF' }]}>{item.name}</Text>
                {formData.selectedSeva === item.id && <Check size={20} color="#FFF" />}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {step === 5 && (
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitleLarge}>Review & Submit</Text>
            <Text style={styles.sectionSubtitle}>Double-check details before completing registration.</Text>

            {/* Personal Info */}
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewTitle}>Personal Information</Text>
                <TouchableOpacity onPress={() => setStep(2)}><Edit2 size={18} color="#FF7A00" /></TouchableOpacity>
              </View>
              <View style={styles.reviewContent}>
                <Text style={styles.reviewLabel}>FULL NAME</Text>
                <Text style={styles.reviewText}>{formData.fullName}</Text>
                <Text style={styles.reviewLabel}>PHONE NUMBER</Text>
                <Text style={styles.reviewText}>+91 {formData.phone}</Text>
                <Text style={styles.reviewLabel}>DOB</Text>
                <Text style={styles.reviewText}>{formData.dob}</Text>
              </View>
            </View>

            {/* Services */}
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewTitle}>Selected Services</Text>
                <TouchableOpacity onPress={() => setStep(4)}><Edit2 size={18} color="#FF7A00" /></TouchableOpacity>
              </View>
              <View style={styles.tagContainer}>
                <View style={styles.serviceTag}>
                  <Text style={styles.serviceTagText}>{sevaCategories.find(c => c.id === formData.selectedSeva)?.name || "Not Selected"}</Text>
                </View>
              </View>
            </View>

            {/* Voice Recording Review */}
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewTitle}>Voice Introduction</Text>
                <TouchableOpacity onPress={() => setStep(3)}><Edit2 size={18} color="#FF7A00" /></TouchableOpacity>
              </View>
              <View style={styles.voiceReviewContent}>
                <View style={styles.voiceReviewIconBg}>
                  <Volume2 size={24} color="#FF7A00" />
                </View>
                <Text style={styles.voiceReviewText}>Voice recording confirmed</Text>
                <CheckCircle2 size={20} color="#22C55E" style={{ marginLeft: 'auto' }} />
              </View>
            </View>

            {/* Documents */}
            <Text style={styles.documentTitle}>Document Status</Text>
            <View style={styles.docGrid}>
              <View style={styles.docCard}>
                <Image source={{ uri: formData.aadharFront || '' }} style={styles.docImage} />
                <View style={styles.verifiedBadgeSmall}><CheckCircle2 size={12} color="#166534" /><Text style={styles.verifiedTextSmall}>VERIFIED</Text></View>
                <Text style={styles.docLabel}>Aadhaar (Front)</Text>
              </View>
              <View style={styles.docCard}>
                <Image source={{ uri: formData.aadharBack || '' }} style={styles.docImage} />
                <View style={styles.verifiedBadgeSmall}><CheckCircle2 size={12} color="#166534" /><Text style={styles.verifiedTextSmall}>VERIFIED</Text></View>
                <Text style={styles.docLabel}>Aadhaar (Back)</Text>
              </View>
            </View>

            {/* Declaration */}
            <TouchableOpacity style={styles.declarationRow} onPress={() => setIsAgreed(!isAgreed)}>
              <View style={[styles.checkbox, isAgreed && styles.checkboxActive]}>{isAgreed && <Check size={14} color="#FFF" />}</View>
              <Text style={styles.declarationText}>I agree to the <Text style={styles.linkText}>Terms</Text> and <Text style={styles.linkText}>Privacy Policy</Text>.</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={[styles.continueBtn, (step === 5 && !isAgreed) && { opacity: 0.6 }]} onPress={handleNext}>
          <Text style={styles.continueBtnText}>{step === 5 ? "Complete Registration" : "Continue"}</Text>
          {step === 5 ? <ArrowRight size={20} color="#FFF" /> : <ChevronRight size={20} color="#FFF" />}
        </TouchableOpacity>

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FAF9F6" },
  header: { flexDirection: "row", paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 60 : 50, paddingBottom: 15, alignItems: 'center', backgroundColor: '#FFF' },
  headerTitle: { fontSize: 20, fontWeight: "800", color: '#0F172A' },
  headerSub: { color: "#64748B", fontWeight: '600', fontSize: 13 },
  progressBarBg: { height: 4, backgroundColor: "#E2E8F0", width: '100%' },
  progressBarFill: { height: 4, backgroundColor: "#FF7A00" },
  scrollContainer: { padding: 20 },
  sectionTitle: { fontSize: 24, fontWeight: "800", textAlign: "center", marginBottom: 25, color: '#1E293B' },
  sectionTitleLarge: { fontSize: 32, fontWeight: "800", color: '#181411', marginBottom: 8 },
  sectionSubtitle: { fontSize: 16, color: '#64748B', marginBottom: 20 },

  uploadGrid: { flexDirection: "row", gap: 15, marginBottom: 25 },
  uploadCard: { flex: 1, aspectRatio: 0.75, backgroundColor: '#FFF', borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#F1F5F9' },
  uploadPlaceholder: { flex: 1, alignItems: "center", justifyContent: "center", padding: 15 },
  cameraIconBg: { backgroundColor: '#FFF7ED', padding: 15, borderRadius: 50, marginBottom: 10 },
  uploadLabel: { fontWeight: "700", fontSize: 15, marginBottom: 8 },
  uploadActions: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  actionText: { color: '#FF7A00', fontSize: 13, fontWeight: '600' },
  divider: { color: '#CBD5E1' },
  imageWrapper: { flex: 1, position: 'relative' },
  previewImage: { width: '100%', height: '100%' },
  imageOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  saveBtnSmall: { backgroundColor: '#FF7A00', flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, alignItems: 'center', gap: 5 },
  saveBtnTextSmall: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  savedIndicator: { backgroundColor: '#FFF', flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, alignItems: 'center', gap: 5 },
  savedTextSmall: { color: '#22C55E', fontWeight: 'bold', fontSize: 12 },
  changeImageBtn: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(255,0,0,0.6)', padding: 5, borderRadius: 15 },

  inputGroup: { marginBottom: 18 },
  inputLabel: { fontSize: 12, fontWeight: '700', color: '#64748B', marginBottom: 8, marginLeft: 4 },
  input: { backgroundColor: "#FFF", borderRadius: 12, padding: 16, fontSize: 16, borderWidth: 1, borderColor: '#E2E8F0', color: '#1E293B' },
  dateInputContainer: { position: 'relative', justifyContent: 'center' },
  rightIcon: { position: 'absolute', right: 18 },
  sendOtpBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF7ED', padding: 16, borderRadius: 12, marginTop: 10, borderWidth: 1, borderColor: '#FFEDD5', gap: 8 },
  sendOtpText: { color: '#FF7A00', fontWeight: '800', fontSize: 16 },
  verifyBtn: { backgroundColor: '#22C55E', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  verifyBtnText: { color: '#FFF', fontWeight: '800', fontSize: 16 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginLeft: 4, marginTop: 8 },
  verifiedText: { color: '#22C55E', fontWeight: '600', fontSize: 13 },

  centerContent: { alignItems: 'center', paddingTop: 30 },
  micBtn: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#FF7A00', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  micBtnActive: { backgroundColor: '#EF4444' },
  micStatus: { color: '#64748B', fontWeight: '600', marginBottom: 20 },
  voicePreviewCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 20, width: '100%', borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center' },
  voiceActions: { flexDirection: 'row', alignItems: 'center', gap: 15, marginBottom: 20 },
  voiceReadyText: { fontSize: 18, fontWeight: '700', color: '#1E293B' },
  confirmVoiceBtn: { backgroundColor: '#22C55E', flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, alignItems: 'center', gap: 10 },
  confirmVoiceText: { color: '#FFF', fontWeight: '700' },

  categoryCard: { flexDirection: 'row', justifyContent: 'space-between', padding: 18, backgroundColor: '#FFF', borderRadius: 12, marginBottom: 10, alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9' },
  categoryCardActive: { backgroundColor: '#FF7A00', borderColor: '#FF7A00' },
  categoryText: { fontWeight: '600', color: '#1E293B' },

  reviewCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, marginBottom: 15, borderWidth: 1, borderColor: '#F1F5F9' },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  reviewTitle: { fontSize: 18, fontWeight: '800', color: '#181411' },
  reviewContent: { gap: 4 },
  reviewLabel: { fontSize: 11, fontWeight: '700', color: '#94A3B8', letterSpacing: 1, marginTop: 12 },
  reviewText: { fontSize: 16, fontWeight: '600', color: '#1E293B', marginTop: 2 },
  
  voiceReviewContent: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAF9F6', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  voiceReviewIconBg: { backgroundColor: '#FFEBDC', padding: 8, borderRadius: 8, marginRight: 12 },
  voiceReviewText: { fontSize: 14, fontWeight: '600', color: '#1E293B' },

  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  serviceTag: { backgroundColor: '#FFF7ED', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#FFEDD5' },
  serviceTagText: { color: '#FF7A00', fontWeight: '700', fontSize: 14 },
  documentTitle: { fontSize: 18, fontWeight: '800', marginVertical: 15 },
  docGrid: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  docCard: { flex: 1, backgroundColor: '#FFF', padding: 10, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9' },
  docImage: { width: '100%', height: 80, borderRadius: 8, marginBottom: 10, opacity: 0.8 },
  verifiedBadgeSmall: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(34, 197, 94, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  verifiedTextSmall: { color: '#166534', fontSize: 10, fontWeight: '800' },
  docLabel: { fontSize: 12, color: '#64748B', marginTop: 8, fontWeight: '500' },
  declarationRow: { flexDirection: 'row', gap: 12, marginTop: 10, paddingRight: 20 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center' },
  checkboxActive: { backgroundColor: '#FF7A00', borderColor: '#FF7A00' },
  declarationText: { fontSize: 13, color: '#64748B', lineHeight: 20 },
  linkText: { color: '#FF7A00', fontWeight: '800' },
  continueBtn: { backgroundColor: "#FF7A00", padding: 18, borderRadius: 16, marginTop: 25, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, elevation: 4 },
  continueBtnText: { color: "#FFF", fontSize: 18, fontWeight: "800" },
});