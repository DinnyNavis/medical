import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Baby, Mail, Lock, User, Calendar, ArrowRight, Stethoscope } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.success) {
        onLogin(data.user);
        if (data.user.role === 'admin') navigate('/admin-dashboard');
        else if (data.user.role === 'doctor') navigate('/doctor-dashboard');
        else navigate('/patient-dashboard');
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      alert("Server Connection Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-auth-container">
      {/* LEFT SIDE: BRANDING PANEL */}
      <div className="auth-brand-panel">
        <div className="brand-content">
          <div className="logo-badge">
            <Baby size={40} color="#0284c7" />
          </div>
          <h1>Indhira <br /><span className="highlight-text">Little Hearts</span></h1>
          <p className="brand-tagline">Specialized Pediatric & Neonatology Care</p>

          <div className="feature-list">
            <div className="feature-item">
              <div className="dot"></div> 24/7 Expert Care
            </div>
            <div className="feature-item">
              <div className="dot"></div> Online Booking
            </div>
            <div className="feature-item">
              <div className="dot"></div> Digital Reports
            </div>
          </div>
        </div>

        {/* Abstract Background Shapes */}
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>

      {/* RIGHT SIDE: FORM PANEL */}
      <div className="auth-form-panel">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="modern-form">
            <div className="input-field">
              <label>Email Address</label>
              <div className="input-box">
                <Mail size={18} className="icon" />
                <input
                  required
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="input-field">
              <label>Password</label>
              <div className="input-box">
                <Lock size={18} className="icon" />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Processing...' : 'Sign In'}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-footer" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#64748b' }}>Don't have an account? <Link to="/signup" style={{ color: '#0284c7', fontWeight: 'bold', textDecoration: 'none' }}>Sign up here</Link></p>
          </div>

          <div className="staff-hint">
            <Stethoscope size={14} />
            <span>Doctor Login: <strong>dr.karthi@clinic.com</strong> / <strong>doc123</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;