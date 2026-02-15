# React Native Passwordless Auth Project

## Overview
This project implements a passwordless authentication flow using Email + OTP in React Native (Expo). It features a local OTP generation system, session tracking with a live timer, and event logging using AsyncStorage.

## Features
1.  **Email + OTP Login**: User enters email, receives a locally generated OTP.
2.  **OTP Security**:
    -   6-digit numeric code.
    -   Expires in 60 seconds.
    -   Maximum 3 attempts allowed.
    -   Generates a new OTP on request, invalidating the previous one.
3.  **Session Management**:
    -   Tracks login duration in real-time.
    -   Persists session start time in memory (scoped to app lifecycle).
    -   Auto-logout support.
4.  **Logging**: Important events (OTP generation, success, failure) are logged to AsyncStorage.

## Setup Instructions

### Prerequisites
-   Node.js installed.
-   Expo Go app on your mobile device (or Android Studio/Xcode for emulator).

### Installation
1.  Clone the repository or navigate to the project directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the app:
    ```bash
    npx expo start
    ```
4.  Scan the QR code with Expo Go (Android/iOS) or press `a` for Android Emulator / `i` for iOS Simulator.

## Architecture

### 1. OTP Logic & Expiry
-   **Storage**: OTPs are stored in an in-memory `Map<string, OtpData>`, keyed by email. This ensures O(1) access and simple cleanup.
-   **Expiry**: Each OTP record has an `expiresAt` timestamp. The `validateOtp` function checks `Date.now() > expiresAt`.
-   **Attempts**: An `attempts` counter tracks failed tries. If it reaches 3, the OTP is invalidated.

### 2. Data Structures
-   **`OtpData` Interface**:
    ```typescript
    interface OtpData {
      code: string;
      expiresAt: number;
      attempts: number;
    }
    ```
    Centralizes all necessary OTP state.
-   **`AuthContext` State**:
    -   `user`: Current authenticated user info.
    -   `isAuthenticated`: Boolean flag for navigation switching.
    -   `sessionStartTime`: Timestamp for the duration timer.

### 3. External SDK Integration
**Chosen SDK: `@react-native-async-storage/async-storage`**
-   **Purpose**: Used to implement a persistent `Logger` service (`src/services/Logger.ts`).
-   **Why**: AsyncStorage is lightweight and standard for React Native data persistence, suitable for log storage in this scope.

## Project Structure
-   `src/screens`: UI Components (Login, Otp, Session).
-   `src/services`: Business logic (OtpManager, Logger).
-   `src/context`: Global state (AuthContext).
-   `src/hooks`: Custom hooks (useSessionTimer).
-   `src/types`: TypeScript definitions.

## Key Files
-   `src/services/OtpManager.ts`: Core business logic for OTPs.
-   `src/hooks/useSessionTimer.ts`: Hook for the session duration timer.
