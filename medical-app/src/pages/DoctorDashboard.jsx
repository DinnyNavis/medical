import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Calendar, Clock, User, Activity, Settings, LayoutDashboard, TrendingUp, Users, DollarSign, FileText, Phone, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import ProfileSettings from '../components/ProfileSettings';
import PrescriptionModal from '../components/PrescriptionModal';

const DoctorDashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedPatientId, setExpandedPatientId] = useState(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const fetchAppointments = () => {
    fetch(`http://127.0.0.1:5000/api/appointments/${user.id}/${user.role}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Enriching data with mock details for "Full Details" feature
          const enrichedData = data.map(appt => ({
            ...appt,
            gender: ['Male', 'Female'][Math.floor(Math.random() * 2)],
            contact: '9876543210',
            lastVisit: '2023-10-15',
            history: 'No major allergies. Previous treatment for mild asthma.',
            bloodGroup: ['A+', 'B+', 'O+', 'AB+'][Math.floor(Math.random() * 4)],
            weight: '18kg',
            height: '105cm'
          }));
          setAppointments(enrichedData);
        }
      });
  };

  useEffect(() => { if (user?.id) fetchAppointments(); }, [user]);

  const updateStatus = async (id, status) => {
    await fetch(`http://127.0.0.1:5000/api/appointment/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchAppointments();
  };

  const toggleExpand = (id) => {
    setExpandedPatientId(expandedPatientId === id ? null : id);
  };

  const handlePrescribe = (patient) => {
    setSelectedPatient(patient);
    setShowPrescriptionModal(true);
  };

  // Mock Data for Charts
  const chartData = [
    { name: 'Mon', patients: 4, revenue: 2000 },
    { name: 'Tue', patients: 7, revenue: 3500 },
    { name: 'Wed', patients: 5, revenue: 2500 },
    { name: 'Thu', patients: 8, revenue: 4000 },
    { name: 'Fri', patients: 12, revenue: 6000 },
    { name: 'Sat', patients: 9, revenue: 4500 },
    { name: 'Sun', patients: 3, revenue: 1500 },
  ];

  const pieData = [
    { name: 'Pediatric', value: 400 },
    { name: 'Vaccination', value: 300 },
    { name: 'Checkup', value: 300 },
    { name: 'Emergency', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="doc-dashboard">
      <style>{`
        .doc-dashboard { max-width: 1400px; margin: 0 auto; padding: 2rem; font-family: 'Inter', sans-serif; }
        .nav-tabs { display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem; }
        .tab-item { background: none; border: none; padding: 0.75rem 1.5rem; cursor: pointer; font-weight: 600; color: #64748b; border-radius: 12px; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
        .tab-item.active { background: #dbeafe; color: #1e40af; }
        .tab-item:hover:not(.active) { background: #f1f5f9; color: #0284c7; }
        
        .dashboard-grid { display: grid; grid-template-columns: 3fr 1fr; gap: 2rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        
        .glass-card {
          background: white;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
          transition: transform 0.2s;
        }
        .glass-card:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
        
        .stat-icon-wrapper {
          width: 48px; height: 48px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
        }
        .stat-val { font-size: 2rem; font-weight: 700; color: #0f172a; line-height: 1; margin-bottom: 4px; }
        .stat-label { color: #64748b; font-size: 0.9rem; font-weight: 500; }
        
        .patient-card {
            background: white;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            margin-bottom: 1rem;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        .patient-card:hover { box-shadow: 0 8px 20px -5px rgba(0,0,0,0.1); }
        
        .card-header {
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
            cursor: pointer;
        }
        .card-body {
            padding: 1.5rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        .field-group { margin-bottom: 1rem; }
        .field-label { font-size: 0.85rem; color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
        .field-value { font-size: 1rem; color: #0f172a; font-weight: 600; margin-top: 4px; }
        
        .status-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
        }
        .status-badge.Pending { background: #fef3c7; color: #b45309; }
        .status-badge.Confirmed { background: #dcfce7; color: #166534; }
        .status-badge.Cancelled { background: #fee2e2; color: #991b1b; }
        .status-badge.Completed { background: #e0e7ff; color: #4338ca; }

        .btn-expand { border: none; background: none; cursor: pointer; color: #64748b; padding: 4px; border-radius: 50%; display: flex; align-items: center; }
        .btn-expand:hover { background: #e2e8f0; color: #0f172a; }

        .action-bar {
            display: flex;
            gap: 10px;
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px dashed #e2e8f0;
        }
        
        .action-btn { 
            border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; 
            display: flex; align-items: center; gap: 8px; transition: 0.2s; 
        }
        .btn-accept { background: #dcfce7; color: #166534; }
        .btn-accept:hover { background: #bbf7d0; }
        .btn-reject { background: #fee2e2; color: #991b1b; }
        .btn-reject:hover { background: #fecaca; }
        .btn-prescribe { background: #0284c7; color: white; }
        .btn-prescribe:hover { background: #0369a1; }
        
        .chart-container { height: 300px; margin-top: 1rem; }
        
        .avatar-circle {
            width: 48px; height: 48px; background: #e0f2fe; color: #0284c7;
            border-radius: 50%; display: flex; align-items: center; justify-content: center;
            font-weight: 700; font-size: 1.2rem; margin-right: 1rem;
        }

        @media (max-width: 1024px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .card-body { grid-template-columns: 1fr; }
        }
        
        /* Dark Mode */
        [data-theme='dark'] .glass-card { background: #1e293b; border-color: #334155; }
        [data-theme='dark'] .stat-val, [data-theme='dark'] .field-value { color: #f1f5f9; }
        [data-theme='dark'] .stat-label, [data-theme='dark'] .field-label { color: #94a3af; }
        [data-theme='dark'] .patient-card { background: #1e293b; border-color: #334155; }
        [data-theme='dark'] .card-header { background: #0f172a; border-color: #334155; }
        [data-theme='dark'] .tab-item:hover { background: #334155; }
        [data-theme='dark'] .btn-expand:hover { background: #334155; color: #f1f5f9; }
      `}</style>

      {showPrescriptionModal && selectedPatient && (
        <PrescriptionModal
          patient={selectedPatient}
          doctor={user}
          onClose={() => setShowPrescriptionModal(false)}
        />
      )}

      {/* Tabs */}
      <div className="nav-tabs">
        <button className={`tab-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
          <LayoutDashboard size={18} /> Precision Dashboard
        </button>
        <button className={`tab-item ${activeTab === 'appointments' ? 'active' : ''}`} onClick={() => setActiveTab('appointments')}>
          <Calendar size={18} /> Patients
        </button>
        <button className={`tab-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
          <Settings size={18} /> Settings
        </button>
      </div>

      {activeTab === 'settings' ? (
        <ProfileSettings user={user} />
      ) : activeTab === 'appointments' ? (
        <div className="appointments-view animate-fade-in-up">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Patient Management</h2>
            <div style={{ color: '#64748b' }}>Total: <strong>{appointments.length}</strong></div>
          </div>

          {appointments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>No appointments found.</div>
          ) : (
            appointments.map(appt => (
              <div key={appt._id} className="patient-card">
                <div className="card-header" onClick={() => toggleExpand(appt._id)}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="avatar-circle">
                      {appt.patientName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>{appt.patientName}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>ID: #{appt._id.slice(-6).toUpperCase()}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div className="date-badge" style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '600' }}>{appt.date}</div>
                      <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{appt.time}</div>
                    </div>
                    <span className={`status-badge ${appt.status}`}>{appt.status}</span>
                    <button className="btn-expand">
                      {expandedPatientId === appt._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>

                {expandedPatientId === appt._id && (
                  <div className="card-body animate-fade-in-up">
                    <div className="left-details">
                      <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Patient Details</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="field-group">
                          <div className="field-label">Age / Gender</div>
                          <div className="field-value">{appt.patientAge} / {appt.gender}</div>
                        </div>
                        <div className="field-group">
                          <div className="field-label">Blood Group</div>
                          <div className="field-value">{appt.bloodGroup}</div>
                        </div>
                        <div className="field-group">
                          <div className="field-label">Height / Weight</div>
                          <div className="field-value">{appt.height} / {appt.weight}</div>
                        </div>
                        <div className="field-group">
                          <div className="field-label">Contact</div>
                          <div className="field-value">{appt.contact}</div>
                        </div>
                      </div>

                      <div className="field-group" style={{ marginTop: '1rem' }}>
                        <div className="field-label">Reason for Visit</div>
                        <div className="field-value" style={{ background: '#f1f5f9', padding: '0.75rem', borderRadius: '8px', marginTop: '0.5rem' }}>{appt.reason}</div>
                      </div>
                    </div>

                    <div className="right-history">
                      <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Medical History</h4>
                      <div className="field-group">
                        <div className="field-label">Last Visit</div>
                        <div className="field-value">{appt.lastVisit}</div>
                      </div>
                      <div className="field-group">
                        <div className="field-label">Medical Notes</div>
                        <div className="field-value" style={{ lineHeight: '1.6' }}>{appt.history}</div>
                      </div>

                      <div className="action-bar">
                        {appt.status === 'Pending' ? (
                          <>
                            <button onClick={() => updateStatus(appt._id, 'Confirmed')} className="action-btn btn-accept"><CheckCircle size={18} /> Accept Appointment</button>
                            <button onClick={() => updateStatus(appt._id, 'Cancelled')} className="action-btn btn-reject"><XCircle size={18} /> Cancel</button>
                          </>
                        ) : (
                          <button onClick={() => handlePrescribe(appt)} className="action-btn btn-prescribe"><FileText size={18} /> Write Prescription</button>
                        )}
                        <button className="action-btn" style={{ background: '#f1f5f9', color: '#475569' }}><Phone size={18} /> Call Patient</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="dashboard-grid animate-fade-in-up">
          {/* LEFT COLUMN: STATS & CHARTS */}
          <div className="main-col">
            <div className="stats-grid">
              <div className="glass-card">
                <div className="stat-icon-wrapper" style={{ background: '#dbeafe', color: '#1e40af' }}>
                  <Users size={24} />
                </div>
                <div className="stat-val">{appointments.length}</div>
                <div className="stat-label">Total Patients</div>
              </div>

              <div className="glass-card">
                <div className="stat-icon-wrapper" style={{ background: '#fef3c7', color: '#b45309' }}>
                  <Activity size={24} />
                </div>
                <div className="stat-val">{appointments.filter(a => a.status === 'Pending').length}</div>
                <div className="stat-label">Pending Requests</div>
              </div>

              <div className="glass-card">
                <div className="stat-icon-wrapper" style={{ background: '#dcfce7', color: '#166534' }}>
                  <DollarSign size={24} />
                </div>
                <div className="stat-val">₹{appointments.length * 500}</div>
                <div className="stat-label">Est. Revenue</div>
              </div>

              <div className="glass-card">
                <div className="stat-icon-wrapper" style={{ background: '#e0e7ff', color: '#4338ca' }}>
                  <TrendingUp size={24} />
                </div>
                <div className="stat-val">+12%</div>
                <div className="stat-label">Growth this week</div>
              </div>
            </div>

            <div className="glass-card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Patient Trends & Revenue</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorRe" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorPa" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRe)" />
                    <Area type="monotone" dataKey="patients" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPa)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: APPOINTMENTS & PIE */}
          <div className="side-col">
            <div className="glass-card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Pending Appointments</h3>
              <div className="appointments-list">
                {appointments.filter(a => a.status === 'Pending').length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0', color: '#94a3af' }}>
                    <CheckCircle size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <p>All caught up!</p>
                  </div>
                ) : (
                  appointments.filter(a => a.status === 'Pending').slice(0, 5).map(appt => (
                    <div key={appt._id} className="appt-item">
                      <div className="patient-info">
                        <strong>{appt.patientName}</strong>
                        <small>{new Date(appt.date).toLocaleDateString()}</small>
                      </div>
                      <div className="actions">
                        <button onClick={() => updateStatus(appt._id, 'Confirmed')} className="action-btn btn-accept"><CheckCircle size={16} /></button>
                        <button onClick={() => updateStatus(appt._id, 'Cancelled')} className="action-btn btn-reject"><XCircle size={16} /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="glass-card">
              <h3 style={{ marginBottom: '1rem' }}>Practice Mix</h3>
              <div style={{ height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                {pieData.map((entry, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS[index] }}></span>
                    {entry.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;