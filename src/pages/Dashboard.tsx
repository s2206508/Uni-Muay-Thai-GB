import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out');
    }
  };

  if (!userProfile) {
    return (
      <div className="dashboard-loading">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-content">
          <div className="logo">
            <h2>Muay Thai GB</h2>
          </div>
          <div className="nav-actions">
            <span className="user-greeting">Welcome, {userProfile.displayName}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Your Dashboard</h1>
          <p>Welcome to your Muay Thai GB member portal</p>
        </div>

        <div className="user-info-card">
          <h2>Profile Information</h2>
          <div className="profile-details">
            <div className="profile-item">
              <label>Name:</label>
              <span>{userProfile.displayName}</span>
            </div>
            <div className="profile-item">
              <label>Email:</label>
              <span>{userProfile.email}</span>
            </div>
            <div className="profile-item">
              <label>Account Type:</label>
              <span className="user-type">{userProfile.userType === 'athlete' ? 'Individual Athlete' : 'Medical Professional'}</span>
            </div>
            <div className="profile-item">
              <label>Phone:</label>
              <span>{userProfile.phone}</span>
            </div>
            {userProfile.userType === 'athlete' && (
              <>
                <div className="profile-item">
                  <label>Member Number:</label>
                  <span>{userProfile.membershipNumber}</span>
                </div>
                {userProfile.dateOfBirth && (
                  <div className="profile-item">
                    <label>Date of Birth:</label>
                    <span>{userProfile.dateOfBirth}</span>
                  </div>
                )}
                {userProfile.address && (
                  <div className="profile-item">
                    <label>Address:</label>
                    <span>{userProfile.address}</span>
                  </div>
                )}
                {userProfile.affiliatedGym && (
                  <div className="profile-item">
                    <label>Affiliated Gym:</label>
                    <span>{userProfile.affiliatedGym}</span>
                  </div>
                )}
                {userProfile.emergencyContact && (
                  <div className="profile-item">
                    <label>Emergency Contact:</label>
                    <span>{userProfile.emergencyContact}</span>
                  </div>
                )}
                {userProfile.medicalConditions && (
                  <div className="profile-item">
                    <label>Medical Conditions:</label>
                    <span>{userProfile.medicalConditions}</span>
                  </div>
                )}
                {userProfile.allergies && (
                  <div className="profile-item">
                    <label>Allergies:</label>
                    <span>{userProfile.allergies}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">📷</div>
            <h3>{userProfile.userType === 'athlete' ? 'View QR Code' : 'Scan QR Code'}</h3>
            <p>{userProfile.userType === 'athlete' ? 'View your unique QR code and download to your wallet' : 'Scan QR code to view and manage Athlete information'}</p>
            <button className="card-button" disabled>
              Coming Soon
            </button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">⚙️</div>
            <h3>Account</h3>
            <p>View and manage your account into.</p>
            <button className="card-button" disabled>
              Coming Soon
            </button>
          </div>

        <div className="dashboard-card">
            <div className="card-icon">📈</div>
            <h3>More features</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button className="card-button" disabled>
                Coming Soon
            </button>
        </div>
        </div>

        <div className="welcome-message">
          <h2>Welcome to Muay Thai GB! 🥊</h2>
          <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

      </main>
    </div>
  );
}