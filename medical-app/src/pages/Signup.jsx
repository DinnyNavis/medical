import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Baby, Mail, Lock, User, Calendar, ArrowRight } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', age: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (data.success) {
                alert("Registration Successful! Please Log In.");
                navigate('/login');
            } else {
                alert(data.message || "Registration Failed");
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
                            <div className="dot"></div> Creating Accounts for Better Care
                        </div>
                        <div className="feature-item">
                            <div className="dot"></div> Secure Patient Data
                        </div>
                        <div className="feature-item">
                            <div className="dot"></div> Easy Access to Medical History
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
                        <h2>Patient Registration</h2>
                        <p>Create an account for your child to book appointments and view reports.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="modern-form">
                        <div className="form-row">
                            <div className="input-field">
                                <label>Patient Name</label>
                                <div className="input-box">
                                    <User size={18} className="icon" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="Child's Name"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="input-field small">
                                <label>Age</label>
                                <div className="input-box">
                                    <Calendar size={18} className="icon" />
                                    <input
                                        required
                                        type="number"
                                        placeholder="Age"
                                        value={formData.age}
                                        onChange={e => setFormData({ ...formData, age: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

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
                            {loading ? 'Creating Account...' : 'Sign Up'}
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="auth-footer" style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <p style={{ color: '#64748b' }}>Already have an account? <Link to="/login" style={{ color: '#0284c7', fontWeight: 'bold', textDecoration: 'none' }}>Login here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
