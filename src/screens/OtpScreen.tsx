import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../context/AuthContext';

type OtpScreenRouteProp = RouteProp<RootStackParamList, 'Otp'>;

export default function OtpScreen() {
    const route = useRoute<OtpScreenRouteProp>();
    const { email } = route.params;
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const { verifyOtp, login } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleVerify = async () => {
        if (otp.length !== 6) {
            Alert.alert('Invalid OTP', 'OTP must be 6 digits.');
            return;
        }

        const { success, message } = await verifyOtp(email, otp);
        if (!success) {
            Alert.alert('Verification Failed', message);
            if (message.includes('Max attempts')) {
                navigation.goBack();
            }
        }
    };

    const handleResend = async () => {
        setCanResend(false);
        setTimer(60);
        setOtp('');
        await login(email);
        Alert.alert('OTP Resent', 'A new OTP has been sent to your email.');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.subtitle}>Sent to {email}</Text>

            <TextInput
                style={styles.input}
                placeholder="6-digit OTP"
                value={otp}
                onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ''))}
                keyboardType="number-pad"
                maxLength={6}
            />

            <Button title="Verify" onPress={handleVerify} />

            <View style={styles.resendContainer}>
                {canResend ? (
                    <Button title="Resend OTP" onPress={handleResend} />
                ) : (
                    <Text>Resend OTP in {timer}s</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#666',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 18,
        letterSpacing: 5,
    },
    resendContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});
