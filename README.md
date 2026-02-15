# React Native Passwordless Auth Project
A React Native mobile application implementing passwordless authentication using Email + OTP with session tracking.

[![React Native](https://img.shields.io/badge/React%20Native-0.74.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~51.0.0-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-~5.3.3-blue.svg)](https://www.typescriptlang.org/)


## 📱 Features

- ✅ Email-based passwordless login
- ✅ 6-digit OTP verification (60-second expiry, 3 attempts max)
- ✅ Live session duration tracking with real-time timer
- ✅ Clean architecture with TypeScript
- ✅ AsyncStorage integration for OTP management
- ✅ Expo framework for cross-platform support

## 🛠️ Tech Stack

- **React Native** (v0.74.5) via Expo (~51.0.0)
- **TypeScript** (~5.3.3)
- **AsyncStorage** (v1.23.1)
- **React Hooks** (useState, useEffect, useMemo, useRef)

---

## 📦 Download Android APK

### Quick Install (Recommended)

👉 **[Go to Releases →](https://github.com/kinshukkush/REACT-NATIVE-PASSWORDLESS-AUTH/releases)** Download the latest APK

**Installation Steps:**
1. Download APK from the Releases section
2. Open the downloaded file on your Android device
3. Allow installation from unknown sources if prompted
4. Install and launch the app

---

## 🚀 Run from Source

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- Expo Go app - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779)

### Clone & Run

```bash
git clone https://github.com/kinshukkush/REACT-NATIVE-PASSWORDLESS-AUTH.git
cd REACT-NATIVE-PASSWORDLESS-AUTH
npm install
npm start
```

### Run Options

**📱 On Your Phone (Expo Go - WiFi)**
- Make sure phone and PC are on the same WiFi
- Scan the QR code with Expo Go (Android) or Camera (iOS)

**🔌 On Your Phone (USB Debugging)**
```bash
# Enable USB debugging on your phone first
adb devices  # Verify connection
npm run android
```

**💻 On Android Studio Emulator**
```bash
# Start emulator from Android Studio
npm run android
```

**🌐 On Web Browser**
```bash
npm run web
# Opens at http://localhost:8081
```

---

## 🎯 How to Use

### Login Flow

1. **Enter Email** → Tap "Send OTP"
2. **View OTP** → Check alert popup (dev mode shows OTP)
3. **Enter OTP** → Type the 6-digit code
4. **Session** → View live session timer
5. **Logout** → Tap logout button

### OTP Rules

- ⏱️ **Expiry**: 60 seconds
- 🔢 **Length**: 6 digits
- 🚫 **Max Attempts**: 3 per email
- 🔄 **Resend**: Invalidates old OTP, resets attempts
- 📧 **Per Email**: Isolated OTP state per email address

---

## 📁 Project Structure

```
src/
├── screens/              # UI Components
│   ├── LoginScreen.tsx   # Email input
│   ├── OtpScreen.tsx     # OTP verification
│   └── SessionScreen.tsx # Active session
├── hooks/                # Custom React Hooks
│   └── useSessionTimer.ts
├── services/             # Business Logic
│   ├── otpManager.ts     # OTP operations
│   └── analytics.ts      # Event logging
└── types/                # TypeScript Definitions
    └── auth.ts
```

---

## 🧪 Testing

### Test Cases

1. ✅ **Happy Path**: Email → OTP → Session → Logout
2. ⏰ **Expired OTP**: Wait 60+ seconds before verification
3. ❌ **Wrong OTP**: Enter incorrect OTP 3 times
4. 🔄 **Resend OTP**: Request new OTP after expiry
5. 📱 **Background**: Timer continues when app is backgrounded

---

## 🎨 Technical Highlights

- **Clean Architecture**: Separation of UI, logic, and effects
- **Type Safety**: Full TypeScript with strict mode
- **Memory Safe**: Proper useEffect cleanup
- **Background-Safe Timer**: Timestamp-based calculation
- **Per-Email Storage**: O(1) lookup with complete metadata
- **AsyncStorage SDK**: Local storage and event logging

---


**Built with ❤️ using React Native, TypeScript, and Expo**
