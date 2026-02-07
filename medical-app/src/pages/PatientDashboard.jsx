import React, { useState, useEffect } from 'react';
import { Calendar, Activity, Clock, FileText, MessageSquare, Menu, X, Pill, Stethoscope, Video, AlertCircle, Settings, LayoutDashboard, History, Globe } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import WellnessStats from '../components/WellnessStats';
import MedicalTimeline from '../components/MedicalTimeline';
import SymptomChat from '../components/SymptomChat';
import LabResults from '../components/LabResults';
import SOSButton from '../components/SOSButton';
import Telemedicine from '../components/Telemedicine';
import ProfileSettings from '../components/ProfileSettings';
import { useLanguage } from '../context/LanguageContext';

const PatientDashboard = ({ user }) => {
  const { t, language, toggleLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [showBooking, setShowBooking] = useState(false);
  const [showDoctorSelection, setShowDoctorSelection] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showTelemedicine, setShowTeleMedicine] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetch(`http://127.0.0.1:5000/api/appointments/${user.id}/${user.role}`)
        .then(res => res.json())
        .then(data => { if (Array.isArray(data)) setAppointments(data); });
    }

    // Fetch doctors
    fetch('http://127.0.0.1:5000/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error('Failed to load doctors'));
  }, [user]);

  const handleBookAppointment = () => {
    setShowDoctorSelection(true);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorSelection(false);
    setShowBooking(true);
  };

  return (
    <div className="dashboard-container">
      <style>{`
        :root {
          --primary: #0284c7;
          --primary-light: #e0f2fe;
          --bg-color: #f8fafc;
          --text-primary: #0f172a;
          --text-secondary: #64748b;
          --card-bg: rgba(255, 255, 255, 0.9);
          --glass-border: 1px solid rgba(255, 255, 255, 0.2);
        }
        [data-theme='dark'] {
          --bg-color: #0f172a;
          --text-primary: #f1f5f9;
          --text-secondary: #94a3af;
          --card-bg: rgba(30, 41, 59, 0.9);
          --glass-border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .dashboard-container { display: flex; height: 100vh; background: var(--bg-color); color: var(--text-primary); transition: 0.3s; font-family: 'Inter', sans-serif; overflow: hidden; }
        
        /* Sidebar */
        .sidebar { width: 260px; background: var(--card-bg); border-right: 1px solid #e2e8f0; padding: 1.5rem; display: flex; flex-direction: column; transition: 0.3s; backdrop-filter: blur(10px); z-index: 50; }
        .sidebar.closed { width: 80px; padding: 1.5rem 0.75rem; }
        [data-theme='dark'] .sidebar { border-color: #1e293b; }

        .logo-area { display: flex; alignItems: center; gap: 10px; margin-bottom: 3rem; color: var(--primary); font-weight: 800; font-size: 1.25rem; }
        .logo-icon { width: 32px; height: 32px; background: var(--primary-light); border-radius: 8px; display: flex; alignItems: center; justify-content: center; }

        .nav-item {
          display: flex; alignItems: center; gap: 12px; padding: 12px;
          color: var(--text-secondary); border-radius: 12px;
          cursor: pointer; transition: 0.2s; margin-bottom: 4px; font-weight: 500;
        }
        .nav-item:hover, .nav-item.active { background: var(--primary-light); color: var(--primary); }
        .nav-item.active { font-weight: 700; }

        /* Main Content */
        .main-content { flex: 1; overflow-y: auto; padding: 2rem; position: relative; }
        .header { display: flex; justify-content: space-between; alignItems: center; margin-bottom: 2rem; }
        
        .welcome-text h1 { font-size: 1.8rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .welcome-text p { color: var(--text-secondary); }

        .btn-primary { 
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); 
          color: white; 
          border: none; 
          padding: 8px 16px; 
          border-radius: 10px; 
          cursor: pointer; 
          font-weight: 600; 
          font-size: 0.85rem;
          box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25); 
          transition: all 0.2s; 
          display: inline-flex; 
          gap: 6px; 
          align-items: center;
          white-space: nowrap;
        }
        .btn-primary:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 4px 16px rgba(2, 132, 199, 0.35); 
        }

        /* Dashboard Grid */
        .dashboard-grid { 
            display: grid; 
            grid-template-columns: 2fr 1fr; 
            gap: 2rem; 
            max-width: 1400px;
            margin: 0 auto;
        }

        .glass-panel {
            background: var(--card-bg);
            border: var(--glass-border);
            border-radius: 20px;
            padding: 1.5rem;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
            backdrop-filter: blur(10px);
        }

        .appt-item {
            display: flex; justify-content: space-between; align-items: center;
            padding: 1rem; border-bottom: 1px solid #e2e8f0;
        }
        .appt-item:last-child { border-bottom: none; }
        
        .lang-toggle {
            display: flex; alignItems: center; gap: 8px; cursor: pointer; padding: 8px 12px; border-radius: 8px; transition: 0.2s;
            color: var(--text-secondary); margin-top: auto;
        }
        .lang-toggle:hover { background: var(--primary-light); color: var(--primary); }

        @media (max-width: 1024px) {
            .dashboard-grid { grid-template-columns: 1fr; }
            .sidebar { position: absolute; height: 100%; transform: translateX(-100%); }
            .sidebar.open { transform: translateX(0); }
        }
      `}</style>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="logo-area">
          <div className="logo-icon"><Activity size={20} /></div>
          {sidebarOpen && <span>Little Hearts</span>}
        </div>

        <div className="nav-menu">
          <div className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={20} /> {sidebarOpen && <span>{t('dashboard')}</span>}
          </div>
          <div className={`nav-item ${activeTab === 'appointments' ? 'active' : ''}`} onClick={() => setActiveTab('appointments')}>
            <Calendar size={20} /> {sidebarOpen && <span>{t('appointments')}</span>}
          </div>
          <div className={`nav-item ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
            <Clock size={20} /> {sidebarOpen && <span>{t('medicalHistory')}</span>}
          </div>
          <div className={`nav-item ${activeTab === 'lab' ? 'active' : ''}`} onClick={() => setActiveTab('lab')}>
            <FileText size={20} /> {sidebarOpen && <span>{t('labReports')}</span>}
          </div>
          <div className={`nav-item ${activeTab === 'symptom_checker' ? 'active' : ''}`} onClick={() => setActiveTab('symptom_checker')}>
            <MessageSquare size={20} /> {sidebarOpen && <span>{t('symptomAI')}</span>}
          </div>
          <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <Settings size={20} /> {sidebarOpen && <span>{t('settings')}</span>}
          </div>

          {sidebarOpen && (
            <div className="lang-toggle" onClick={toggleLanguage}>
              <Globe size={18} />
              <span style={{ fontWeight: '600' }}>{language === 'en' ? 'English' : 'தமிழ்'}</span>
            </div>
          )}
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <div className="welcome-text">
            <h1>{t('welcome')}, {user?.name || 'Parent'} 👋</h1>
            <p>{t('overview')} <strong>Kavya</strong></p>
          </div>
          <button className="btn-primary" onClick={handleBookAppointment}>
            <Calendar size={18} /> {t('bookAppointment')}
          </button>
        </div>

        <div className="content-area animate-fade-in-up">
          {activeTab === 'overview' && (
            <div className="dashboard-grid">
              <div className="left-col" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <WellnessStats />
                <div className="glass-panel">
                  <h3>{t('upcomingAppointments')}</h3>
                  {appointments.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      No upcoming appointments.
                    </div>
                  ) : (
                    <div className="appt-list">
                      {appointments.slice(0, 3).map(appt => (
                        <div key={appt._id} className="appt-item">
                          <div>
                            <strong>{new Date(appt.date).toLocaleDateString()}</strong>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{appt.doctorName}</div>
                          </div>
                          <span style={{
                            padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold',
                            backgroundColor: appt.status === 'Confirmed' ? '#dcfce7' : '#fef3c7',
                            color: appt.status === 'Confirmed' ? '#166534' : '#b45309'
                          }}>{appt.status}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="right-col">
                <div className="glass-panel" style={{ marginBottom: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>{t('quickActions')}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <Pill size={24} color="#0284c7" /> <span style={{ fontSize: '0.9rem' }}>{t('medicines')}</span>
                    </button>
                    <button onClick={() => setShowTelemedicine(true)} style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <Video size={24} color="#0284c7" /> <span style={{ fontSize: '0.9rem' }}>{t('teleConsult')}</span>
                    </button>
                  </div>
                </div>
                <SymptomChat />
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="glass-panel">
              <h3>All Appointments</h3>
              {/* Expanded list would go here */}
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                Appointment history list...
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="glass-panel">
              <MedicalTimeline />
            </div>
          )}

          {activeTab === 'lab' && (
            <div className="glass-panel">
              <LabResults />
            </div>
          )}

          {activeTab === 'symptom_checker' && (
            <div className="glass-panel" style={{ height: '600px' }}>
              <SymptomChat />
            </div>
          )}

          {activeTab === 'settings' && <ProfileSettings user={user} />}
        </div>

        <SOSButton />
      </div>

      {showDoctorSelection && (
        <div className="modal-overlay" onClick={() => setShowDoctorSelection(false)}>
          <div className="doctor-select-modal" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '1.5rem' }}>Select a Doctor</h2>
            <div className="doctor-grid">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="doctor-option"
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <img
                    src={doctor.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                    alt={doctor.name}
                    className="doctor-thumb"
                  />
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{doctor.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{doctor.specialty}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showBooking && selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          user={user}
          onClose={() => { setShowBooking(false); setSelectedDoctor(null); }}
          onSuccess={() => { setShowBooking(false); setSelectedDoctor(null); }}
        />
      )}

      {showTelemedicine && (
        <Telemedicine onClose={() => setShowTelemedicine(false)} />
      )}

      <style>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5); backdrop-filter: blur(5px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
        }
        .doctor-select-modal {
          background: var(--card-bg); border-radius: 16px;
          padding: 2rem; max-width: 600px; width: 90%;
          max-height: 80vh; overflow-y: auto;
        }
        .doctor-grid {
          display: grid; gap: 1rem;
        }
        .doctor-option {
          display: flex; align-items: center; gap: 1rem;
          padding: 1rem; border-radius: 12px;
          background: var(--bg-color);
          border: 1px solid #e2e8f0;
          cursor: pointer; transition: all 0.2s;
        }
        .doctor-option:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.15);
          border-color: var(--primary);
        }
        .doctor-thumb {
          width: 48px; height: 48px;
          border-radius: 50%; object-fit: cover;
        }
        [data-theme='dark'] .doctor-option {
          border-color: #334155;
        }
      `}</style>
    </div>
  );
};

export default PatientDashboard;