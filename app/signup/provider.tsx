import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  ArrowLeft,
  Camera,
  Check,
  ChevronRight,
  Mic,
  X,
} from "lucide-react-native";
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
} from "react-native";

/* ---------------- DATA ---------------- */

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

  const [formData, setFormData] = useState({
    aadharFront: null as string | null,
    aadharBack: null as string | null,
    fullName: "",
    dob: "",
    phone: "",
    homeAddress: "",
    selectedSeva: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const recordingRef = useRef<Audio.Recording | null>(null);

  /* ---------------- HELPERS ---------------- */

  const formatDate = (date: Date) => {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  /* ✅ CAMERA + GALLERY PICKER */
  const pickImage = async (
    field: "aadharFront" | "aadharBack",
    fromCamera: boolean
  ) => {
    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required");
      return;
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({
          quality: 0.7,
          allowsEditing: true,
        })
      : await ImagePicker.launchImageLibraryAsync({
          quality: 0.7,
          allowsEditing: true,
        });

    if (!result.canceled) {
      setFormData({
        ...formData,
        [field]: result.assets[0].uri,
      });
    }
  };

  const removeImage = (field: "aadharFront" | "aadharBack") => {
    setFormData({ ...formData, [field]: null });
  };

  /* ---------------- OTP ---------------- */

  const sendOtp = () => {
    if (formData.phone.length !== 10) {
      Alert.alert("Enter valid 10-digit number");
      return;
    }
    Alert.alert("OTP Sent", "Your OTP is 123456");
    setOtpSent(true);
  };

  const verifyOtp = () => {
    if (otp === "123456") {
      setIsOtpVerified(true);
      Alert.alert("Verified");
    } else {
      Alert.alert("Invalid OTP");
    }
  };

  /* ---------------- RECORDING ---------------- */

  const startRecording = async () => {
    const permission = await Audio.requestPermissionsAsync();
    if (!permission.granted) return;

    const { recording } =
      await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

    recordingRef.current = recording;
    setIsRecording(true);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    await recordingRef.current?.stopAndUnloadAsync();
  };

  const handleNext = () => {
    if (step === 1 && (!formData.aadharFront || !formData.aadharBack)) {
      Alert.alert("Upload both Aadhaar images");
      return;
    }

    if (
      step === 2 &&
      (!formData.fullName ||
        !formData.dob ||
        !formData.phone ||
        !isOtpVerified)
    ) {
      Alert.alert("Complete all fields & verify phone");
      return;
    }

    if (step === 3 && !formData.selectedSeva) {
      Alert.alert("Select a service");
      return;
    }

    setStep(step + 1);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            step > 1 ? setStep(step - 1) : router.back()
          }
        >
          <ArrowLeft size={24} />
        </TouchableOpacity>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.headerTitle}>Sevadhar Signup</Text>
          <Text style={styles.headerSub}>Step {step} of 4</Text>
        </View>
      </View>

      <View style={styles.progress}>
        <View
          style={{
            width: `${(step / 4) * 100}%`,
            height: 6,
            backgroundColor: "#FF7A00",
          }}
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <Text style={styles.title}>Upload Aadhaar</Text>

            <View style={styles.uploadRow}>
              {["aadharFront", "aadharBack"].map((key) => (
                <View key={key} style={styles.uploadBox}>
                  {formData[key as "aadharFront"] ? (
                    <>
                      <Image
                        source={{ uri: formData[key as "aadharFront"]! }}
                        style={styles.image}
                      />
                      <TouchableOpacity
                        style={styles.removeIcon}
                        onPress={() =>
                          removeImage(key as "aadharFront")
                        }
                      >
                        <X size={18} color="#fff" />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        onPress={() =>
                          pickImage(
                            key as "aadharFront",
                            true
                          )
                        }
                      >
                        <Camera size={26} color="#FF7A00" />
                        <Text>Camera</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          pickImage(
                            key as "aadharFront",
                            false
                          )
                        }
                      >
                        <Text style={{ color: "#FF7A00" }}>
                          Gallery
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              ))}
            </View>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <Text style={styles.title}>Personal Details</Text>

            <TextInput
              placeholder="Full Name"
              style={styles.input}
              onChangeText={(v) =>
                setFormData({ ...formData, fullName: v })
              }
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                placeholder="Date of Birth (DD/MM/YYYY)"
                value={formData.dob}
                editable={false}
                style={styles.input}
              />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                onChange={(e, d) => {
                  setShowDatePicker(false);
                  if (d)
                    setFormData({
                      ...formData,
                      dob: formatDate(d),
                    });
                }}
              />
            )}

            <TextInput
              placeholder="Phone Number"
              keyboardType="phone-pad"
              maxLength={10}
              style={styles.input}
              onChangeText={(v) =>
                setFormData({ ...formData, phone: v })
              }
            />

            {!otpSent && (
              <TouchableOpacity
                style={styles.otpBtn}
                onPress={sendOtp}
              >
                <Text style={styles.otpText}>Send OTP</Text>
              </TouchableOpacity>
            )}

            {otpSent && !isOtpVerified && (
              <>
                <TextInput
                  placeholder="Enter OTP"
                  keyboardType="number-pad"
                  maxLength={6}
                  style={styles.input}
                  value={otp}
                  onChangeText={setOtp}
                />
                <TouchableOpacity
                  style={styles.verifyBtn}
                  onPress={verifyOtp}
                >
                  <Text style={styles.verifyText}>Verify OTP</Text>
                </TouchableOpacity>
              </>
            )}

            {isOtpVerified && (
              <Text style={{ color: "green" }}>
                ✔ Phone Verified
              </Text>
            )}
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <Text style={styles.title}>Select Service</Text>
            {sevaCategories.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.category,
                  formData.selectedSeva === item.id &&
                    styles.categoryActive,
                ]}
                onPress={() =>
                  setFormData({
                    ...formData,
                    selectedSeva: item.id,
                  })
                }
              >
                <Text>{item.name}</Text>
                {formData.selectedSeva === item.id && (
                  <Check color="#fff" />
                )}
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>Voice Introduction</Text>
            <TouchableOpacity
              style={styles.mic}
              onPressIn={startRecording}
              onPressOut={stopRecording}
            >
              <Mic size={40} color="#FFF" />
            </TouchableOpacity>
            <Text>{isRecording ? "Recording..." : "Hold to record"}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>
            {step === 4 ? "Submit" : "Continue"}
          </Text>
          {step < 4 && <ChevronRight color="#FFF" />}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FAF9F6" },
  header: { flexDirection: "row", padding: 20 },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  headerSub: { color: "#666" },
  progress: { height: 6, backgroundColor: "#EEE" },

  container: { padding: 20 },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  uploadRow: { flexDirection: "row", gap: 15 },

  uploadBox: {
    flex: 1,
    height: 150,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#FF7A00",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  image: { width: "100%", height: "100%" },

  removeIcon: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "red",
    padding: 4,
    borderRadius: 12,
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEE",
  },

  otpBtn: {
    backgroundColor: "#FF7A00",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  otpText: { color: "#FFF", fontWeight: "bold" },

  verifyBtn: {
    backgroundColor: "#22C55E",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  verifyText: { color: "#FFF", fontWeight: "bold" },

  category: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },

  categoryActive: { backgroundColor: "#FF7A00" },

  mic: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FF7A00",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  nextBtn: {
    backgroundColor: "#FF7A00",
    padding: 18,
    borderRadius: 30,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  nextText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 6,
  },
});