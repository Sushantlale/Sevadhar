import { useRouter } from 'expo-router';
import { ArrowLeft, Eye, EyeOff, Lock, Phone, ShieldCheck } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function ForgotPasswordScreen() {
    const router = useRouter();
    // Step 0: Enter Phone, Step 1: Verification, Step 2: Reset Password
    const [step, setStep] = useState(0); 
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSendCode = () => {
        if (phone.length !== 10) {
            Alert.alert("Invalid Phone", "Please enter a valid 10-digit phone number");
            return;
        }
        setStep(1); // Proceed to 6-digit verification
    };

    const handleVerifyOtp = () => {
        if (otp.length !== 6) {
            Alert.alert("Field Required", "Please fill all mandatory fields marked with *");
            return;
        }
        setStep(2); // Proceed to Password Reset
    };

    const handleResetPassword = () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert("Field Required", "Please fill all mandatory fields marked with *");
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert("Mismatch", "Passwords do not match");
            return;
        }
        Alert.alert("Success", "Password updated! Please sign in.", [
            { text: "OK", onPress: () => router.push('/login' as any) }
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => step > 0 ? setStep(step - 1) : router.back()}>
                        <ArrowLeft size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        {step === 0 ? "Forgot Password" : step === 1 ? "Verification" : "Reset Password"}
                    </Text>
                </View>

                <ScrollView contentContainerStyle={styles.scroll}>
                    <View style={styles.iconContainer}><ShieldCheck size={60} color="#FF7A00" /></View>

                   {step === 0 && (
    /* NEW STEP 0: PHONE NUMBER ENTRY */
                 <View style={styles.formSection}>
                     <Text style={styles.title}>Enter Phone Number <Text style={styles.red}>*</Text></Text>
                      <Text style={styles.subtitle}>We will send a 6-digit code to verify your account.</Text>
                       <View style={styles.inputWrapper}>
                           <Phone size={20} color="#9CA3AF" />
                          <TextInput
                             placeholder="Enter Registered Phone Number"
                              keyboardType="phone-pad"
                              maxLength={10}
                              style={styles.input}
                             value={phone}
                             onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, ''))}
                             returnKeyType="done"
                             onSubmitEditing={handleSendCode}
                         />
                         </View>
                      <TouchableOpacity style={styles.submitBtn} onPress={handleSendCode}>
                       <Text style={styles.submitBtnText}>Send Verification Code</Text>
                         </TouchableOpacity>
                 </View>
                )}

                    {step === 1 && (
                        /* STEP 1: 6-DIGIT VERIFICATION */
                        <View style={styles.formSection}>
                            <Text style={styles.title}>Enter 6-Digit Code <Text style={styles.red}>*</Text></Text>
                            <Text style={styles.subtitle}>Code sent to {phone}</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    placeholder="0 0 0 0 0 0"
                                    keyboardType="number-pad"
                                    maxLength={6}
                                    style={styles.otpInput}
                                    value={otp}
                                    onChangeText={setOtp}
                                    onSubmitEditing={handleVerifyOtp}
                                />
                            </View>
                            <TouchableOpacity style={styles.submitBtn} onPress={handleVerifyOtp}>
                                <Text style={styles.submitBtnText}>Verify Code</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {step === 2 && (
                        /* STEP 2: PASSWORD RESET */
                        <View style={styles.formSection}>
                            <Text style={styles.title}>Create New Password</Text>
                            <Text style={styles.label}>Phone Number</Text>
                            <View style={[styles.inputWrapper, styles.disabledInput]}>
                                <Phone size={20} color="#999" />
                                <Text style={styles.disabledText}>{phone}</Text>
                            </View>
                            <Text style={styles.label}>New Password <Text style={styles.red}>*</Text></Text>
                            <View style={styles.inputWrapper}>
                                <Lock size={20} color="#9CA3AF" />
                                <TextInput
                                    placeholder="Enter New Password"
                                    secureTextEntry={!showNewPassword}
                                    style={styles.input}
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                />
                                <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                                    {showNewPassword ? <EyeOff size={20} color="#9CA3AF" /> : <Eye size={20} color="#9CA3AF" />}
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.label}>Confirm Password <Text style={styles.red}>*</Text></Text>
                            <View style={styles.inputWrapper}>
                                <Lock size={20} color="#9CA3AF" />
                                <TextInput
                                    placeholder="Confirm New Password"
                                    secureTextEntry={!showConfirmPassword}
                                    style={styles.input}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <EyeOff size={20} color="#9CA3AF" /> : <Eye size={20} color="#9CA3AF" />}
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.submitBtn} onPress={handleResetPassword}>
                                <Text style={styles.submitBtnText}>Update Password</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAF9F6' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
    headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
    scroll: { padding: 25, flexGrow: 1, alignItems: 'center' },
    iconContainer: { marginBottom: 30, marginTop: 20 },
    formSection: { width: '100%' },
    title: { fontSize: 22, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 10 },
    subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30 },
    label: { fontSize: 14, color: '#444', marginBottom: 8, fontWeight: '600', marginTop: 15 },
    red: { color: 'red' },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, paddingHorizontal: 15, height: 56, borderWidth: 1, borderColor: '#EEE', gap: 10 },
    disabledInput: { backgroundColor: '#F0F0F0', borderColor: '#DDD' },
    disabledText: { fontSize: 16, color: '#999', fontWeight: 'bold' },
    input: { flex: 1, fontSize: 16, color: '#333' },
    otpInput: { flex: 1, fontSize: 24, textAlign: 'center', fontWeight: 'bold', letterSpacing: 10, color: '#FF7A00' },
    submitBtn: { backgroundColor: '#FF7A00', height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginTop: 40, elevation: 3 },
    submitBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 }
});