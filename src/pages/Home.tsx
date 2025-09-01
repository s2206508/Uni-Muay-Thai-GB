import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <nav className="nav-bar">
        <div className="nav-content">
          <div className="logo">
            <h2>Muay Thai GB</h2>
          </div>
          <div className="nav-actions">
            <button onClick={() => navigate('/login')} className="nav-btn secondary">
              Login
            </button>
            <button onClick={() => navigate('/signup')} className="nav-btn primary">
              Join Now
            </button>
          </div>
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Muay Thai GB</h1>
          <p className="hero-subtitle">
            Your gateway to the authentic world of Muay Thai. Connect with certified trainers, 
            track your progress, and become part of the UK's premier Muay Thai community.
          </p>
          <div className="hero-actions">
            <button onClick={() => navigate('/signup')} className="cta-button">
              Start Your Journey
            </button>
            <button onClick={() => navigate('/login')} className="cta-button secondary">
              Member Login
            </button>
          </div>
        </div>
      </header>

      <section className="features-section">
        <div className="container">
          <h2>Why Choose Muay Thai GB?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🥊</div>
              <h3>Example Card</h3>
              <p>Some more info would go here.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Second point</h3>
              <p>More info would go here.</p>
            </div>
          </div>
        </div>
      </section>


      <section className="cta-section">
        <div className="container">
          <h2>Ready to Begin Your Muay Thai Journey?</h2>
          <p>Join thousands of athletes across the UK who trust Muay Thai GB</p>
          <button onClick={() => navigate('/signup')} className="cta-button large">
            Get Started Today
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Muay Thai GB</h4>
              <p>Lorem Ipsum</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><span onClick={() => navigate('/login')}>Login</span></li>
                <li><span onClick={() => navigate('/signup')}>Join Now</span></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>info@muaythaiGB.co.uk</p>
              <p>+44 20 1234 5678</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Muay Thai GB. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}