import React from 'react';
import { Award } from 'lucide-react';
import StarRating from './StarRating';

const DoctorCard = ({ doctor, onBook }) => {
  return (
    <div className="doctor-card">
      <div className="card-header">
        <img src={doctor.image} alt={doctor.name} className="avatar" />
      </div>
      <div className="card-body">
        <h3>{doctor.name}</h3>
        <span className="specialty">{doctor.specialty || doctor.spec}</span>

        {/* Star Rating */}
        {doctor.rating && (
          <div style={{ marginBottom: '0.75rem' }}>
            <StarRating rating={doctor.rating} readonly size={18} />
          </div>
        )}

        {/* Only show 'Chief Doctor' if it's Dr. Karthikeyan */}
        {doctor.name.includes('Karthikeyan') && (
          <div style={{
            background: '#fef3c7', color: '#b45309',
            padding: '4px 8px', borderRadius: '4px',
            fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px',
            marginBottom: '0.5rem'
          }}>
            <Award size={14} /> Chief Doctor
          </div>
        )}

        <button className="btn-book" onClick={onBook}>
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;