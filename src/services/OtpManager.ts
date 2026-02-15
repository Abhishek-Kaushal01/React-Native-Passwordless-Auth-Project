import { OtpData } from '../types/auth';

const OTP_EXPIRY_MS = 60 * 1000;
const MAX_ATTEMPTS = 3;

const otpStore = new Map<string, OtpData>();

export const OtpManager = {
    generateOtp: (email: string): string => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + OTP_EXPIRY_MS;

        otpStore.set(email, {
            code,
            expiresAt,
            attempts: 0,
        });

        console.log(`[OTP] Generated for ${email}: ${code}`);
        return code;
    },

    validateOtp: (email: string, inputCode: string): { success: boolean; message: string } => {
        const data = otpStore.get(email);

        if (!data) {
            return { success: false, message: 'No OTP found. Please request a new one.' };
        }

        if (Date.now() > data.expiresAt) {
            otpStore.delete(email);
            return { success: false, message: 'OTP expired.' };
        }

        if (data.attempts >= MAX_ATTEMPTS) {
            otpStore.delete(email);
            return { success: false, message: 'Max attempts reached. Please request a new OTP.' };
        }

        if (data.code !== inputCode) {
            data.attempts += 1;
            otpStore.set(email, data);
            return { success: false, message: 'Invalid OTP.' };
        }

        // Success
        otpStore.delete(email);
        return { success: true, message: 'Login successful' };
    },

    resendOtp: (email: string): string => {
        return OtpManager.generateOtp(email);
    }
};
