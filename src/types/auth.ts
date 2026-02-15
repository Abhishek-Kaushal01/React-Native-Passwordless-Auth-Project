export interface User {
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  sessionStartTime: number | null;
}

export interface OtpData {
  code: string;
  expiresAt: number;
  attempts: number;
}
