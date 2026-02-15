import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Alert, Platform } from 'react-native';
import { User } from '../types/auth';
import { OtpManager } from '../services/OtpManager';
import { Logger } from '../services/Logger';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    sessionStartTime: number | null;
    login: (email: string) => Promise<boolean>;
    verifyOtp: (email: string, code: string) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);

    const login = async (email: string) => {
        const otp = OtpManager.generateOtp(email);
        await Logger.log('OTP_GENERATED', { email, otp });

        // For demo purposes only
        if (Platform.OS === 'web') {
            window.alert(`Your OTP is: ${otp}`);
        } else {
            Alert.alert('Demo OTP', `Your OTP is: ${otp}`);
        }
        return true;
    };

    const verifyOtp = async (email: string, code: string) => {
        const result = OtpManager.validateOtp(email, code);

        if (result.success) {
            setUser({ email });
            setIsAuthenticated(true);
            setSessionStartTime(Date.now());
            await Logger.log('OTP_VALIDATION_SUCCESS', { email });
        } else {
            await Logger.log('OTP_VALIDATION_FAILURE', { email, reason: result.message });
        }

        return result;
    };

    const logout = async () => {
        const email = user?.email;
        setUser(null);
        setIsAuthenticated(false);
        setSessionStartTime(null);
        await Logger.log('LOGOUT', { email });
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, sessionStartTime, login, verifyOtp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
