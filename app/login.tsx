import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { ArrowLeft, Eye, EyeOff, Lock, Phone } from 'lucide-react-native';
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

export default function LoginScreen() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [toast, setToast] = useState<{ title: string, msg: string } | null>(null); // NEW: Toast state
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
    });

    // NEW: Function matching your signup page pop-up logic
    const showErrorMessage = (title: string, msg: string) => {
        setToast({ title, msg });
        setTimeout(() => setToast(null), 4000);
    };

    const handleLogin = () => {
        // 1. Mandatory Field Validation matching your logic
        if (!formData.phone || !formData.password) {
            showErrorMessage("Field Required", "Please fill all mandatory fields marked with *");
            return;
        }

        // 2. Phone Number Length Validation
        if (formData.phone.length !== 10) {
            showErrorMessage("Invalid Phone Number", "Please enter a valid 10-digit phone number");
            return;
        }

        // 3. Terms and Conditions Validation
        if (!agreeTerms) {
            showErrorMessage("Terms Required", "Please agree to the Terms and Conditions");
            return;
        }

        // 4. Successful Login Redirection
        Alert.alert("Success", "Logged in successfully!");
        router.push('/(tabs)/home' as any);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                {/* NEW: Error Pop-up (Toast) UI matching your images */}
                {toast && (
                    <View style={styles.errorToast}>
                        <Text style={styles.errorToastTitle}>{toast.title}</Text>
                        <Text style={styles.errorToastMsg}>{toast.msg}</Text>
                    </View>
                )}

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Sign In</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scroll}>
                    <Text style={styles.logoText}>
                        <Text style={{ color: '#FF7A00' }}>Sevadhar</Text>
                    </Text>

                    {/* Phone Number Input Section */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Phone Number <Text style={styles.red}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                            <Phone size={20} color="#9CA3AF" />
                            <TextInput
                                placeholder="Enter Phone Number"
                                keyboardType="phone-pad"
                                maxLength={10}
                                style={styles.input}
                                value={formData.phone}
                                onChangeText={(t) => setFormData({ ...formData, phone: t.replace(/[^0-9]/g, '') })}
                            />
                        </View>
                    </View>

                    {/* Password Input Section */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password <Text style={styles.red}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                            <Lock size={20} color="#9CA3AF" />
                            <TextInput
                                placeholder="Enter Password"
                                secureTextEntry={!showPassword}
                                style={styles.input}
                                value={formData.password}
                                onChangeText={(t) => setFormData({ ...formData, password: t })}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={20} color="#9CA3AF" /> : <Eye size={20} color="#9CA3AF" />}
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Terms and Conditions Section */}
                    <View style={styles.termsRow}>
                        <Checkbox
                            value={agreeTerms}
                            onValueChange={setAgreeTerms}
                            color={agreeTerms ? '#FF7A00' : undefined}
                            style={styles.checkbox}
                        />
                        <Text style={styles.termsText}>
                            I agree with the <Text style={styles.orangeLink}>Terms and Conditions</Text> and <Text style={styles.orangeLink}>Privacy Policy</Text> <Text style={styles.red}>*</Text>
                        </Text>
                    </View>

                    {/* Sign In Button */}
                    <TouchableOpacity style={styles.submitBtn} onPress={handleLogin}>
                        <Text style={styles.submitBtnText}>Sign In</Text>
                    </TouchableOpacity>

                    {/* Forgot Password Section */}
                    <TouchableOpacity 
                        style={styles.forgotBtn} 
                        onPress={() => router.push('/signup/forgot-password' as any)}
                    >
                        <Text style={styles.forgotText}>Forgot Password ?</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAF9F6' },
    // NEW: Error Toast Styles
    errorToast: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        backgroundColor: '#EF4444',
        padding: 15,
        borderRadius: 12,
        zIndex: 1000,
        elevation: 5,
    },
    errorToastTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    errorToastMsg: { color: '#FFF', fontSize: 14, marginTop: 2 },
    
    header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 20, 
        paddingTop: 50, 
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE'
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
    scroll: { padding: 25, flexGrow: 1, justifyContent: 'center' },
    logoText: { fontSize: 42, fontWeight: 'bold', marginBottom: 40, color: '#333', textAlign: 'center' },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 14, color: '#444', marginBottom: 8, fontWeight: '600' },
    red: { color: 'red' },
    inputWrapper: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#FFF', 
        borderRadius: 12, 
        paddingHorizontal: 15, 
        height: 56, 
        borderWidth: 1, 
        borderColor: '#EEE',
        gap: 10
    },
    input: { flex: 1, fontSize: 16, color: '#333' },
    termsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, gap: 10 },
    checkbox: { width: 20, height: 20, borderRadius: 4 },
    termsText: { flex: 1, fontSize: 12, color: '#666', lineHeight: 18 },
    orangeLink: { color: '#FF7A00', fontWeight: 'bold' },
    submitBtn: { 
        backgroundColor: '#FF7A00', 
        height: 56, 
        borderRadius: 28, 
        alignItems: 'center', 
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    submitBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
    forgotBtn: { marginTop: 20, alignItems: 'center' },
    forgotText: { color: '#FF7A00', fontSize: 20, fontWeight: '600', textDecorationLine: 'underline' }
});