import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiService, UserProfile, AuthUser } from '../services/api';

interface AuthContextType {
  currentUser: AuthUser | null;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, userData: Partial<UserProfile>) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  async function signup(email: string, password: string, userData: Partial<UserProfile>) {
    const response = await apiService.signup(email, password, userData);
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create account');
    }

    setCurrentUser(response.data.user);
    setUserProfile(response.data.profile);
    
    // Store auth info in localStorage for persistence
    localStorage.setItem('auth_user', JSON.stringify(response.data.user));
    localStorage.setItem('user_profile', JSON.stringify(response.data.profile));
  }

  async function login(email: string, password: string) {
    const response = await apiService.login(email, password);
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to login');
    }

    setCurrentUser(response.data.user);
    setUserProfile(response.data.profile);
    
    // Store auth info in localStorage for persistence
    localStorage.setItem('auth_user', JSON.stringify(response.data.user));
    localStorage.setItem('user_profile', JSON.stringify(response.data.profile));
  }

  async function logout() {
    setCurrentUser(null);
    setUserProfile(null);
    
    // Clear localStorage
    localStorage.removeItem('auth_user');
    localStorage.removeItem('user_profile');
  }

  useEffect(() => {
    // Check for existing auth state in localStorage
    const storedUser = localStorage.getItem('auth_user');
    const storedProfile = localStorage.getItem('user_profile');

    if (storedUser && storedProfile) {
      try {
        const user = JSON.parse(storedUser) as AuthUser;
        const profile = JSON.parse(storedProfile) as UserProfile;
        setCurrentUser(user);
        setUserProfile(profile);
      } catch (error) {
        console.error('Failed to parse stored auth data:', error);
        localStorage.removeItem('auth_user');
        localStorage.removeItem('user_profile');
      }
    }

    setLoading(false);
  }, []);

  const value = {
    currentUser,
    userProfile,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}