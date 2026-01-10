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
    StatusBar,
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
    const [toast, setToast] = useState<{ title: string, msg: string } | null>(null);
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
    });

    const showErrorMessage = (title: string, msg: string) => {
        setToast({ title, msg });
        setTimeout(() => setToast(null), 4000);
    };

    const handleLogin = () => {
        if (!formData.phone || !formData.password) {
            showErrorMessage("Field Required", "Please fill all mandatory fields marked with *");
            return;
        }

        if (formData.password.length < 8) {
            showErrorMessage("Invalid Password", "Password must be at least 8 characters long");
            return;
        }

        if (formData.phone.length !== 10) {
            showErrorMessage("Invalid Phone Number", "Please enter a valid 10-digit phone number");
            return;
        }

        if (!agreeTerms) {
            showErrorMessage("Terms Required", "Please agree to the Terms and Conditions");
            return;
        }

        Alert.alert("Success", "Logged in successfully!");
        router.push('/(tabs)/home' as any);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                {toast && (
                    <View style={styles.errorToast}>
                        <Text style={styles.errorToastTitle}>{toast.title}</Text>
                        <Text style={styles.errorToastMsg}>{toast.msg}</Text>
                    </View>
                )}

                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={() => router.back()}
                    >
                        <ArrowLeft size={22} color="#334155" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Sign In</Text>
                </View>

                <ScrollView 
                    contentContainerStyle={styles.scroll} 
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.brandContainer}>
                        <Text style={styles.brandText}>Sevadhar</Text>
                        <Text style={styles.subtitleText}>Welcome back! Please sign in to continue.</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Phone Number <Text style={styles.red}>*</Text></Text>
                            <View style={styles.inputWrapper}>
                                <Phone size={20} color="#94A3B8" />
                                <TextInput
                                    placeholder="Enter Phone Number"
                                    placeholderTextColor="#94A3B8"
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                    style={styles.input}
                                    value={formData.phone}
                                    onChangeText={(t) => setFormData({ ...formData, phone: t.replace(/[^0-9]/g, '') })}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password <Text style={styles.red}>*</Text></Text>
                            <View style={styles.inputWrapper}>
                                <Lock size={20} color="#94A3B8" />
                                <TextInput
                                    placeholder="Enter Password"
                                    placeholderTextColor="#94A3B8"
                                    secureTextEntry={!showPassword}
                                    style={styles.input}
                                    value={formData.password}
                                    onChangeText={(t) => setFormData({ ...formData, password: t })}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={20} color="#94A3B8" /> : <Eye size={20} color="#94A3B8" />}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.termsRow}>
                            <Checkbox
                                value={agreeTerms}
                                onValueChange={setAgreeTerms}
                                color={agreeTerms ? '#FF7A00' : '#CBD5E1'}
                                style={styles.checkbox}
                            />
                            <Text style={styles.termsText}>
                                I agree with the <Text style={styles.orangeLink}>Terms and Conditions</Text> and <Text style={styles.orangeLink}>Privacy Policy</Text> <Text style={styles.red}>*</Text>
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.submitBtn} onPress={handleLogin}>
                            <Text style={styles.submitBtnText}>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.forgotBtn} 
                            onPress={() => router.push('/signup/forgot-password' as any)}
                        >
                            <Text style={styles.forgotText}>Forgot Password ?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/')}>
                            <Text style={styles.signUpLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAF9F6' },
    errorToast: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        backgroundColor: '#EF4444',
        padding: 15,
        borderRadius: 12,
        zIndex: 1000,
        elevation: 10,
    },
    errorToastTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    errorToastMsg: { color: '#FFF', fontSize: 14, marginTop: 2 },
    header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 20, 
        paddingVertical: 15, 
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    headerTitle: { fontSize: 18, fontWeight: '700', marginLeft: 15, color: '#1E293B' },
    scroll: { paddingHorizontal: 25, paddingBottom: 40 },
    brandContainer: { alignItems: 'center', marginTop: 40, marginBottom: 40 },
    brandText: { fontSize: 48, fontWeight: '900', color: '#FF7A00', letterSpacing: -1 },
    subtitleText: { fontSize: 14, color: '#64748B', marginTop: 8, fontWeight: '500' },
    form: { width: '100%' },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 14, color: '#475569', marginBottom: 8, fontWeight: '600', marginLeft: 4 },
    red: { color: '#EF4444' },
    inputWrapper: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#FFF', 
        borderRadius: 16, 
        paddingHorizontal: 15, 
        height: 60, 
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        gap: 12
    },
    input: { flex: 1, fontSize: 16, color: '#1E293B', fontWeight: '500' },
    termsRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 30, gap: 12, paddingHorizontal: 4 },
    checkbox: { width: 20, height: 20, borderRadius: 5, marginTop: 2 },
    termsText: { flex: 1, fontSize: 12, color: '#64748B', lineHeight: 18 },
    orangeLink: { color: '#FF7A00', fontWeight: '700' },
    submitBtn: { 
        backgroundColor: '#FF7A00', 
        height: 60, 
        borderRadius: 20, 
        alignItems: 'center', 
        justifyContent: 'center',
        elevation: 8,
        shadowColor: '#FF7A00',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12
    },
    submitBtnText: { color: '#FFF', fontWeight: '800', fontSize: 18 },
    forgotBtn: { marginTop: 20, marginBottom: 10, alignItems: 'center' },
    forgotText: { color: '#FF7A00', fontSize: 15, fontWeight: '700' },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 40 },
    footerText: { fontSize: 14, color: '#64748B' },
    signUpLink: { fontSize: 14, color: '#FF7A00', fontWeight: '800' },
});