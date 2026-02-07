import React, { useEffect, useState } from 'react';
import { Shield, CheckCircle, XCircle, BarChart3, Users, Calendar } from 'lucide-react';

const AdminDashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);

  const fetchAll = () => {
    fetch(`http://127.0.0.1:5000/api/appointments/${user.id}/${user.role}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAppointments(data);
      });
  };

  useEffect(() => { if (user?.id) fetchAll(); }, [user]);

  const updateStatus = async (id, status) => {
    await fetch(`http://127.0.0.1:5000/api/appointment/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchAll();
  };

  return (
    <div className="admin-dash">
      <style>{`
        .admin-dash {
          max-width: 1200px; margin: 0 auto; padding: 2rem;
          font-family: 'Inter', sans-serif;
        }
        .header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 2rem;
        }
        .header h1 { display: flex; align-items: center; gap: 10px; color: #1e293b; }
        
        /* Dashboard Widgets */
        .widgets {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .widget {
          background: white; padding: 1.5rem; border-radius: 12px;
          border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;
        }
        .w-text h2 { margin: 0; font-size: 2rem; color: #0f172a; }
        .w-text p { margin: 0; color: #64748b; font-size: 0.9rem; }
        .w-icon {
          width: 50px; height: 50px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: #f1f5f9; color: #64748b;
        }

        /* Main Table */
        .data-panel {
          background: white; border-radius: 16px; border: 1px solid #e2e8f0;
          overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .panel-header {
          padding: 1.5rem; border-bottom: 1px solid #e2e8f0;
          display: flex; justify-content: space-between; background: #f8fafc;
        }
        .panel-header h3 { margin: 0; color: #334155; }

        .admin-table { width: 100%; border-collapse: collapse; }
        .admin-table th {
          text-align: left; padding: 1rem 1.5rem; background: #fff;
          color: #94a3b8; font-size: 0.8rem; text-transform: uppercase; border-bottom: 2px solid #f1f5f9;
        }
        .admin-table td {
          padding: 1rem 1.5rem; border-bottom: 1px solid #f1f5f9; color: #334155;
        }
        .admin-table tr:hover { background: #fafafa; }

        .tag {
          padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600;
          border: 1px solid #e2e8f0; background: #f8fafc; color: #64748b;
        }

        .btn-ctrl {
          border: none; width: 30px; height: 30px; border-radius: 6px;
          cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
          transition: 0.2s; margin-right: 6px;
        }
        .c-approve { background: #d1fae5; color: #059669; }
        .c-approve:hover { background: #10b981; color: white; }
        .c-reject { background: #fee2e2; color: #dc2626; }
        .c-reject:hover { background: #ef4444; color: white; }
      `}</style>

      <div className="header">
        <h1><Shield size={32} color="#0284c7" /> Admin Portal</h1>
      </div>

      <div className="widgets">
        <div className="widget">
          <div className="w-text"><h2>{appointments.length}</h2><p>Total Bookings</p></div>
          <div className="w-icon" style={{ background: '#eff6ff', color: '#0284c7' }}><Calendar /></div>
        </div>
        <div className="widget">
          <div className="w-text"><h2>{appointments.filter(a => a.status === 'Pending').length}</h2><p>Action Required</p></div>
          <div className="w-icon" style={{ background: '#fff7ed', color: '#f59e0b' }}><BarChart3 /></div>
        </div>
        <div className="widget">
          <div className="w-text"><h2>4</h2><p>Active Doctors</p></div>
          <div className="w-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}><Users /></div>
        </div>
      </div>

      <div className="data-panel">
        <div className="panel-header">
          <h3>Master Appointment List</h3>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Patient</th>
              <th>Date</th>
              <th>Status</th>
              <th>Controls</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appt => (
              <tr key={appt._id}>
                <td>
                  <strong>{appt.doctorName}</strong>
                </td>
                <td>{appt.patientName} <span className="tag">Age: {appt.patientAge || '?'}</span></td>
                <td>{appt.date}</td>
                <td>
                  <span style={{
                    color: appt.status === 'Confirmed' ? 'green' : appt.status === 'Cancelled' ? 'red' : 'orange',
                    fontWeight: 600
                  }}>
                    {appt.status}
                  </span>
                </td>
                <td>
                  {appt.status === 'Pending' && (
                    <>
                      <button onClick={() => updateStatus(appt._id, 'Confirmed')} className="btn-ctrl c-approve" title="Approve"><CheckCircle size={16} /></button>
                      <button onClick={() => updateStatus(appt._id, 'Cancelled')} className="btn-ctrl c-reject" title="Reject"><XCircle size={16} /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;