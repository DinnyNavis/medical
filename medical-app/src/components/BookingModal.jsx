import React, { useState } from 'react';
import { X, CalendarCheck, User, FileText, MapPin, Info } from 'lucide-react';
import TimeSlotPicker from './TimeSlotPicker';

const BookingModal = ({ doctor, user, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reason, setReason] = useState('');
  const [patientName, setPatientName] = useState(user ? user.name : '');
  const [loading, setLoading] = useState(false);

  const handleSlotSelect = (slot) => {
    setSelectedTime(slot.time);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please log in.");
    if (!selectedTime) return alert("Please select a time slot.");

    setLoading(true);

    const bookingData = {
      patientId: user.id || user._id, // Handle both ID formats
      patientName,
      patientAge: user.age,
      doctorId: doctor._id || doctor.id,
      doctorName: doctor.name,
      date: selectedDate,
      time: selectedTime,
      reason
    };

    try {
      await fetch('http://127.0.0.1:5000/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      // Show success message (using native alert for now, could be toast)
      alert("Appointment Booked Successfully!");
      onClose();
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="wide-modal animate-fade-in-up">
        <button className="btn-close" onClick={onClose}><X size={20} /></button>

        <div className="modal-layout">
          {/* LEFT SIDEBAR */}
          <div className="modal-sidebar">
            <div className="profile-section">
              <img src={doctor.image} alt={doctor.name} className="modal-avatar" />
              <div className="doctor-profile-mini">
                <h3>{doctor.name}</h3>
                <span className="badge-pill">{doctor.specialty || doctor.spec}</span>
              </div>
            </div>

            <div className="sidebar-info">
              <div className="info-item">
                <Info size={16} className="text-primary" />
                <div>
                  <span className="label">Consultation Fee</span>
                  <span className="value">₹500</span>
                </div>
              </div>
              <div className="info-item">
                <MapPin size={16} className="text-primary" />
                <div>
                  <span className="label">Location</span>
                  <span className="value">Manapparai Clinic</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="modal-content-area">
            <div className="modal-header">
              <h2>Book Appointment</h2>
              <p className="sub-text">Select a time slot to reserve your appointment.</p>
            </div>

            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-grid">
                <div className="form-group">
                  <label><User size={16} /> Patient Name</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    className="modern-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label><CalendarCheck size={16} /> Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={e => {
                      setSelectedDate(e.target.value);
                      setSelectedTime(null); // Reset time when date changes
                    }}
                    className="modern-input"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>

              {/* NEW SMART TIME PICKER */}
              <TimeSlotPicker
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSlotSelect={handleSlotSelect}
              />

              <div className="form-group">
                <label><FileText size={16} /> Reason for Visit</label>
                <textarea
                  rows="2"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="modern-textarea"
                  placeholder="Describe symptoms or reason..."
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-confirm" disabled={loading || !selectedTime}>
                  {loading ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        .wide-modal {
          background: white;
          width: 100%;
          max-width: 900px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          position: relative;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .btn-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(0,0,0,0.05);
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          z-index: 10;
        }
        .btn-close:hover {
          background: #ef4444;
          color: white;
        }
        .modal-layout {
          display: flex;
          height: 100%;
          overflow: hidden;
        }
        .modal-sidebar {
          width: 300px;
          background: #f8fafc;
          padding: 2rem;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
        }
        .profile-section {
          text-align: center;
          margin-bottom: 2rem;
        }
        .modal-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 4px solid white;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          margin-bottom: 1rem;
        }
        .doctor-profile-mini h3 {
          margin: 0 0 0.5rem 0;
          color: #0f172a;
          font-size: 1.25rem;
        }
        .badge-pill {
          background: #e0f2fe;
          color: #0284c7;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .sidebar-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .info-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          background: white;
          padding: 1rem;
          border-radius: 12px;
          box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
        }
        .text-primary { color: #0284c7; }
        .label { display: block; font-size: 0.75rem; color: #64748b; text-transform: uppercase; font-weight: 600; margin-bottom: 2px; }
        .value { font-size: 0.95rem; color: #0f172a; font-weight: 500; }
        
        .modal-content-area {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }
        .modal-header { margin-bottom: 2rem; }
        .modal-header h2 { margin: 0; font-size: 1.5rem; color: #0f172a; }
        .sub-text { color: #64748b; margin-top: 5px; }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: flex; align-items: center; gap: 8px; font-weight: 500; color: #334155; margin-bottom: 8px; font-size: 0.9rem; }
        .modern-input, .modern-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: border-color 0.2s;
        }
        .modern-input:focus, .modern-textarea:focus {
          outline: none;
          border-color: #0284c7;
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
        }
        .btn-confirm {
          width: 100%;
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          color: white;
          padding: 1rem;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-confirm:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(2, 132, 199, 0.3);
        }
        .btn-confirm:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .modal-layout { flex-direction: column; overflow-y: auto; }
          .modal-sidebar { width: 100%; padding: 1.5rem; flex-direction: row; align-items: center; gap: 1rem; border-right: none; border-bottom: 1px solid #e2e8f0; }
          .profile-section { margin-bottom: 0; text-align: left; display: flex; align-items: center; gap: 1rem; }
          .modal-avatar { margin-bottom: 0; width: 60px; height: 60px; }
          .sidebar-info { display: none; }
          .form-grid { grid-template-columns: 1fr; }
        }
        
        /* Dark Mode */
        [data-theme='dark'] .wide-modal { background: #1e293b; color: #f1f5f9; }
        [data-theme='dark'] .modal-sidebar { background: #0f172a; border-color: #334155; }
        [data-theme='dark'] .doctor-profile-mini h3, 
        [data-theme='dark'] .value, 
        [data-theme='dark'] .modal-header h2 { color: #f1f5f9; }
        [data-theme='dark'] .info-item { background: #1e293b; }
        [data-theme='dark'] .form-group label { color: #cbd5e1; }
        [data-theme='dark'] .modern-input, [data-theme='dark'] .modern-textarea { 
          background: #0f172a; 
          border-color: #334155; 
          color: white; 
        }
        [data-theme='dark'] .btn-close { background: rgba(255,255,255,0.1); color: white; }
      `}</style>
    </div>
  );
};

export default BookingModal;