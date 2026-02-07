import React, { useState } from 'react';
import { Syringe, FileText, CheckCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const MedicalTimeline = () => {
    // Mock data for the timeline
    const [events, setEvents] = useState([
        {
            id: 1,
            type: 'checkup',
            title: 'General Pediatric Checkup',
            date: '2025-12-15',
            doctor: 'Dr. M. Karthikeyan',
            details: 'Growth parameters within normal range. Height: 98cm, Weight: 14.5kg.',
            status: 'completed'
        },
        {
            id: 2,
            type: 'vaccine',
            title: 'Flu Vaccination (Annual)',
            date: '2025-11-20',
            doctor: 'Nurse Station',
            details: 'Administered influenza vaccine batch #4521. Next dose due in Nov 2026.',
            status: 'completed'
        },
        {
            id: 3,
            type: 'lab',
            title: 'Blood Work Points',
            date: '2025-08-05',
            doctor: 'Lab Technician',
            details: 'CBC and Iron studies. Results: Hemoglobin 11.2 g/dL (Normal).',
            status: 'completed'
        },
        {
            id: 4,
            type: 'checkup',
            title: 'Dermatology Consultation',
            date: '2025-06-12',
            doctor: 'Dr. Sarah Smith',
            details: 'Mild eczema on elbows. Prescribed topical cream. Follow up in 2 months.',
            status: 'completed'
        }
    ]);

    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const getIcon = (type) => {
        switch (type) {
            case 'vaccine': return <Syringe size={18} />;
            case 'lab': return <FileText size={18} />;
            default: return <CheckCircle size={18} />;
        }
    };

    const getColor = (type) => {
        switch (type) {
            case 'vaccine': return 'bg-amber-100 text-amber-600 border-amber-200';
            case 'lab': return 'bg-blue-100 text-blue-600 border-blue-200';
            default: return 'bg-emerald-100 text-emerald-600 border-emerald-200';
        }
    };

    return (
        <div className="timeline-container">
            <h3 className="section-title">Medical History</h3>

            <div className="timeline">
                {events.map((event, index) => (
                    <div key={event.id} className="timeline-item animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="timeline-date">
                            <span className="date-month">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                            <span className="date-day">{new Date(event.date).getDate()}</span>
                            <span className="date-year">{new Date(event.date).getFullYear()}</span>
                        </div>

                        <div className="timeline-marker">
                            <div className={`icon-circle ${getColor(event.type)}`}>
                                {getIcon(event.type)}
                            </div>
                            {index !== events.length - 1 && <div className="timeline-line"></div>}
                        </div>

                        <div className="timeline-content card-hover" onClick={() => toggleExpand(event.id)}>
                            <div className="content-header">
                                <div>
                                    <h4 className="event-title">{event.title}</h4>
                                    <p className="event-doctor">With {event.doctor}</p>
                                </div>
                                <button className="btn-expand">
                                    {expandedId === event.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                            </div>

                            <div className={`content-details ${expandedId === event.id ? 'expanded' : ''}`}>
                                <p>{event.details}</p>
                                <div className="status-badge">
                                    <Clock size={12} /> Completed
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        .timeline-container {
          padding: 1rem 0;
        }
        .section-title {
          font-size: 1.25rem;
          color: var(--gray-800);
          margin-bottom: 1.5rem;
          padding-left: 0.5rem;
          border-left: 4px solid var(--primary);
        }
        .timeline {
          position: relative;
        }
        .timeline-item {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .timeline-date {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 60px;
          text-align: center;
        }
        .date-month {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--gray-500);
        }
        .date-day {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--gray-800);
          line-height: 1;
        }
        .date-year {
          font-size: 0.8rem;
          color: var(--gray-400);
        }
        
        .timeline-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .icon-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          z-index: 2;
        }
        .bg-amber-100 { background: #fef3c7; color: #d97706; border-color: #fcd34d; }
        .bg-blue-100 { background: #dbeafe; color: #2563eb; border-color: #bfdbfe; }
        .bg-emerald-100 { background: #d1fae5; color: #059669; border-color: #a7f3d0; }
        
        .timeline-line {
          position: absolute;
          top: 36px;
          bottom: -2rem; /* Extend to next item */
          width: 2px;
          background: #e2e8f0;
          z-index: 1;
        }
        
        .timeline-content {
          flex: 1;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .timeline-content:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
          border-color: var(--primary-300);
        }
        
        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .event-title {
          margin: 0;
          font-size: 1rem;
          color: var(--gray-800);
        }
        .event-doctor {
          margin: 4px 0 0 0;
          font-size: 0.85rem;
          color: var(--gray-500);
        }
        
        .content-details {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-in-out, margin-top 0.3s ease;
        }
        .content-details.expanded {
          max-height: 200px;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px dashed #e2e8f0;
        }
        .content-details p {
          font-size: 0.9rem;
          color: var(--gray-600);
          line-height: 1.5;
          margin-bottom: 0.5rem;
        }
        
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #f1f5f9;
          color: #64748b;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        /* Dark Mode */
        [data-theme='dark'] .date-day, [data-theme='dark'] .event-title { color: var(--text-primary); }
        [data-theme='dark'] .section-title { color: var(--text-primary); }
        [data-theme='dark'] .timeline-content { background: var(--bg-secondary); border-color: var(--border-color); }
        [data-theme='dark'] .date-month, [data-theme='dark'] .event-doctor, [data-theme='dark'] .content-details p { color: var(--text-secondary); }
        [data-theme='dark'] .status-badge { background: #334155; color: #cbd5e1; }
      `}</style>
        </div>
    );
};

export default MedicalTimeline;
