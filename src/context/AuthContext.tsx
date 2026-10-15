import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthStatus } from '../types';

interface AuthContextType {
  user: User | null;
  authStatus: AuthStatus;
  isLoading: boolean;
  isAuthenticated: boolean;
  isGuest: boolean;
  isDeviceLocalMode: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginAsGuest: () => void;
  logout: () => void;
}

const AUTH_STORAGE_KEY = 'travelwise_user_session';
const USERS_STORE_KEY = 'travelwise_registered_users';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>('initializing');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize session safely on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id) {
          setUser(parsed);
          setAuthStatus('authenticated');
        } else {
          setUser(null);
          setAuthStatus('unauthenticated');
        }
      } else {
        setUser(null);
        setAuthStatus('unauthenticated');
      }
    } catch (e) {
      console.warn('Failed to parse user session from localStorage', e);
      setUser(null);
      setAuthStatus('unauthenticated');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Failed to sync user session to localStorage', e);
    }
  }, [user]);

  const login = async (email: string, _password?: string): Promise<{ success: boolean; error?: string }> => {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    // Lookup existing user or synthesize device-local profile
    let existingUsers: User[] = [];
    try {
      const stored = localStorage.getItem(USERS_STORE_KEY);
      if (stored) existingUsers = JSON.parse(stored);
    } catch (e) {
      // ignore
    }

    const matched = existingUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setUser(matched);
      setAuthStatus('authenticated');
      return { success: true };
    }

    // If new email, create local user account
    const derivedName = email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
    const newUser: User = {
      id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: formattedName,
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString()
    };

    existingUsers.push(newUser);
    try {
      localStorage.setItem(USERS_STORE_KEY, JSON.stringify(existingUsers));
    } catch (e) {
      // ignore
    }

    setUser(newUser);
    setAuthStatus('authenticated');
    return { success: true };
  };

  const signup = async (name: string, email: string, _password?: string): Promise<{ success: boolean; error?: string }> => {
    if (!name || name.trim().length < 2) {
      return { success: false, error: 'Please enter your full name.' };
    }
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    let existingUsers: User[] = [];
    try {
      const stored = localStorage.getItem(USERS_STORE_KEY);
      if (stored) existingUsers = JSON.parse(stored);
    } catch (e) {
      // ignore
    }

    const existing = existingUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setUser(existing);
      setAuthStatus('authenticated');
      return { success: true };
    }

    const newUser: User = {
      id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString()
    };

    existingUsers.push(newUser);
    try {
      localStorage.setItem(USERS_STORE_KEY, JSON.stringify(existingUsers));
    } catch (e) {
      // ignore
    }

    setUser(newUser);
    setAuthStatus('authenticated');
    return { success: true };
  };

  const loginAsGuest = () => {
    const guestUser: User = {
      id: `guest_${Date.now()}`,
      name: 'Guest Traveler',
      email: 'guest@travelwise.local',
      isGuest: true,
      createdAt: new Date().toISOString()
    };
    setUser(guestUser);
    setAuthStatus('authenticated');
  };

  const logout = () => {
    setUser(null);
    setAuthStatus('unauthenticated');
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authStatus,
        isLoading,
        isAuthenticated: Boolean(user && authStatus === 'authenticated'),
        isGuest: Boolean(user?.isGuest),
        isDeviceLocalMode: true,
        login,
        signup,
        loginAsGuest,
        logout
      }}
    >
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
