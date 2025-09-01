// API service layer for Muay Thai GB app
// This provides mock endpoints that will be replaced with real API calls later

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  userType: 'athlete' | 'medic';
  phone: string;
  dateOfBirth?: string;
  emergencyContact?: string;
  address?: string;
  affiliatedGym?: string;
  medicalConditions?: string;
  allergies?: string;
  membershipNumber?: string;
  createdAt: Date;
}

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
}

// Mock data store (in real app, this would be handled by the backend)
const mockUsers: Record<string, UserProfile> = {};

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


class ApiService {
  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<{ user: AuthUser; profile: UserProfile }>> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Check if we have a profile for this user in our mock store
      const profile = mockUsers[firebaseUser.uid];
      if (!profile) {
        return {
          success: false,
          error: 'User profile not found. Please complete registration.'
        };
      }

      return {
        success: true,
        data: {
          user: {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || profile.displayName
          },
          profile
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Login failed'
      };
    }
  }

  async signup(email: string, password: string, userData: Partial<UserProfile>): Promise<ApiResponse<{ user: AuthUser; profile: UserProfile }>> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Create user profile in mock store (in real app, this would be saved to backend)
      const userProfile: UserProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: userData.displayName || '',
        userType: userData.userType || 'athlete',
        phone: userData.phone || '',
        dateOfBirth: userData.dateOfBirth,
        emergencyContact: userData.emergencyContact,
        address: userData.address,
        affiliatedGym: userData.affiliatedGym,
        medicalConditions: userData.medicalConditions,
        allergies: userData.allergies,
        membershipNumber: `MTG${Date.now()}`,
        createdAt: new Date()
      };

      mockUsers[firebaseUser.uid] = userProfile;

      return {
        success: true,
        data: {
          user: {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: userProfile.displayName
          },
          profile: userProfile
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Signup failed'
      };
    }
  }

  async getUserProfile(uid: string): Promise<ApiResponse<UserProfile>> {
    await delay(500); // Simulate API call
    
    const profile = mockUsers[uid];
    if (!profile) {
      return {
        success: false,
        error: 'User profile not found'
      };
    }

    return {
      success: true,
      data: profile
    };
  }

  async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    await delay(600); // Simulate API call
    
    const profile = mockUsers[uid];
    if (!profile) {
      return {
        success: false,
        error: 'User profile not found'
      };
    }

    const updatedProfile = { ...profile, ...updates };
    mockUsers[uid] = updatedProfile;

    return {
      success: true,
      data: updatedProfile
    };
  }

  // Medical endpoints (for future use)
  async getMedicalHistory(athleteId: string): Promise<ApiResponse<any[]>> {
    await delay(400);
    // Mock implementation - in real app would fetch from backend
    return {
      success: true,
      data: []
    };
  }

  async addMedicalEntry(athleteId: string, entry: any): Promise<ApiResponse<any>> {
    await delay(500);
    // Mock implementation - in real app would save to backend
    return {
      success: true,
      data: { id: `medical_${Date.now()}`, ...entry }
    };
  }

  // QR code endpoints (for future use)
  async generateQRCode(athleteId: string): Promise<ApiResponse<string>> {
    await delay(300);
    // Mock implementation - in real app would generate secure QR code
    return {
      success: true,
      data: `https://api.muaythaigb.org/qr/${athleteId}_${Date.now()}`
    };
  }
}

export const apiService = new ApiService();