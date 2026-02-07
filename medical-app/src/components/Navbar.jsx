// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Baby, Stethoscope, Home, User, LogOut, LayoutDashboard } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = ({ user, onLogout, notificationCount }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="brand">
          <div className="logo-circle"><Baby size={24} /></div>
          <div>
            <h2 className="brand-name">Indhira Little Hearts</h2>
            <small className="brand-sub">Dr. M. Karthikeyan</small>
          </div>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-item"><Home size={18} /> Home</Link>

          {/* Show Links Based on Role */}
          {user?.role === 'patient' && (
            <Link to="/patient-dashboard" className="nav-item"><User size={18} /> Parent Zone</Link>
          )}

          {user?.role === 'doctor' && (
            <Link to="/doctor-dashboard" className="nav-item">
              <div style={{ position: 'relative' }}>
                <Stethoscope size={18} />
                {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
              </div>
              Doctor
            </Link>
          )}

          {user?.role === 'admin' && (
            <Link to="/admin-dashboard" className="nav-item"><LayoutDashboard size={18} /> Admin</Link>
          )}

          {/* Dark Mode Toggle */}
          <DarkModeToggle />

          {/* Login / User Profile Section */}
          {!user ? (
            <Link to="/login" className="btn-login">Log In</Link>
          ) : (
            <div className="user-menu">
              <span className="user-name">Hi, {user.name.split(' ')[0]}</span>
              <button onClick={handleLogout} className="btn-logout" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;