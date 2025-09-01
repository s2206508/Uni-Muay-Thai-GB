import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'athlete' | 'medic'>('athlete');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    phone: '',
    dateOfBirth: '',
    emergencyContact: '',
    address: '',
    affiliatedGym: '',
    medicalConditions: '',
    allergies: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      const userData = {
        displayName: formData.displayName,
        userType,
        phone: formData.phone,
        ...(userType === 'athlete' && {
          dateOfBirth: formData.dateOfBirth,
          emergencyContact: formData.emergencyContact,
          address: formData.address,
          affiliatedGym: formData.affiliatedGym,
          medicalConditions: formData.medicalConditions,
          allergies: formData.allergies
        })
      };

      await signup(formData.email, formData.password, userData);
      navigate('/dashboard');
    } catch (error: any) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Join Muay Thai GB</h2>
          <p>Create your account and start your journey</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="user-type-selector">
          <button
            type="button"
            className={`user-type-btn ${userType === 'athlete' ? 'active' : ''}`}
            onClick={() => setUserType('athlete')}
          >
            Individual Athlete
          </button>
          <button
            type="button"
            className={`user-type-btn ${userType === 'medic' ? 'active' : ''}`}
            onClick={() => setUserType('medic')}
          >
            Medical Professional
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="displayName">Full Name</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Your phone number"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
                minLength={6}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                minLength={6}
              />
            </div>
          </div>

          {userType === 'athlete' && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="affiliatedGym">Affiliated Gym/Club</label>
                  <input
                    type="text"
                    id="affiliatedGym"
                    name="affiliatedGym"
                    value={formData.affiliatedGym}
                    onChange={handleChange}
                    placeholder="Your gym or club name"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Your full address"
                />
              </div>
              <div className="form-group">
                <label htmlFor="emergencyContact">Emergency Contact</label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                  placeholder="Emergency contact name and phone"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="medicalConditions">Pre-existing Medical Conditions</label>
                  <input
                    type="text"
                    id="medicalConditions"
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleChange}
                    placeholder="Any medical conditions (optional)"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="allergies">Allergies</label>
                  <input
                    type="text"
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    placeholder="Any known allergies (optional)"
                  />
                </div>
              </div>
            </>
          )}

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <span onClick={() => navigate('/login')} className="auth-link">Sign in</span></p>
        </div>
      </div>
    </div>
  );
}