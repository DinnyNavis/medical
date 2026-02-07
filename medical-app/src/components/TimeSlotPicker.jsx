import React, { useState, useEffect } from 'react';
import { Clock, Users } from 'lucide-react';

const TimeSlotPicker = ({ selectedDate, onSlotSelect, selectedTime }) => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);

    // Simulate fetching slots based on date
    useEffect(() => {
        if (!selectedDate) return;

        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            const generatedSlots = generateTimeSlots();
            setSlots(generatedSlots);
            setLoading(false);
        }, 600);
    }, [selectedDate]);

    const generateTimeSlots = () => {
        const times = [
            '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
            '11:00 AM', '11:30 AM', '04:00 PM', '04:30 PM',
            '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'
        ];

        // Randomly disable some slots to simulate unavailability
        return times.map(time => ({
            time,
            available: Math.random() > 0.3, // 70% chance of being available
            queuePosition: Math.floor(Math.random() * 5) + 1 // Random queue position 1-5
        }));
    };

    return (
        <div className="time-slot-picker">
            <h4 className="picker-title">
                <Clock size={16} /> Select Time Slot
            </h4>

            {loading ? (
                <div className="slots-loading">
                    <div className="spinner-mini"></div> Finding available slots...
                </div>
            ) : (
                <div className="slots-grid">
                    {slots.map((slot, index) => (
                        <button
                            key={index}
                            type="button"
                            disabled={!slot.available}
                            className={`slot-btn ${selectedTime === slot.time ? 'active' : ''} ${!slot.available ? 'disabled' : ''}`}
                            onClick={() => onSlotSelect(slot)}
                        >
                            {slot.time}
                        </button>
                    ))}
                </div>
            )}

            {selectedTime && (
                <div className="virtual-queue-card animate-fade-in-up">
                    <div className="queue-icon-bg">
                        <Users size={20} />
                    </div>
                    <div>
                        <span className="queue-label">Virtual Queue Estimate</span>
                        <div className="queue-value">
                            You are approximately <strong>#{slots.find(s => s.time === selectedTime)?.queuePosition || 3}</strong> in line
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        .time-slot-picker {
          margin: 1.5rem 0;
        }
        .picker-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 1rem;
          color: var(--gray-700);
          font-weight: 600;
        }
        .slots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 10px;
        }
        .slot-btn {
          padding: 10px;
          border: 1px solid var(--gray-200);
          background: white;
          border-radius: 8px;
          font-size: 0.9rem;
          color: var(--gray-700);
          cursor: pointer;
          transition: all 0.2s;
        }
        .slot-btn:hover:not(:disabled) {
          border-color: var(--primary);
          color: var(--primary);
          background: var(--primary-50);
        }
        .slot-btn.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          box-shadow: 0 4px 6px -1px rgba(2, 132, 199, 0.3);
        }
        .slot-btn:disabled {
          background: var(--gray-50);
          color: var(--gray-400);
          cursor: not-allowed;
          text-decoration: line-through;
        }
        .slots-loading {
          text-align: center;
          padding: 2rem;
          color: var(--gray-500);
          font-size: 0.9rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .spinner-mini {
          width: 20px;
          height: 20px;
          border: 2px solid var(--gray-200);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        
        .virtual-queue-card {
          margin-top: 1.5rem;
          padding: 1rem;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 1px solid #bae6fd;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .queue-icon-bg {
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .queue-label {
          font-size: 0.8rem;
          color: var(--gray-600);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
        .queue-value {
          color: var(--gray-900);
          font-size: 0.95rem;
        }
        
        /* Dark mode overrides */
        [data-theme='dark'] .slot-btn {
          background: var(--bg-secondary);
          border-color: var(--border-color);
          color: var(--text-primary);
        }
        [data-theme='dark'] .slot-btn:hover:not(:disabled) {
          background: #1e3a8a;
          border-color: #3b82f6;
        }
        [data-theme='dark'] .slot-btn:disabled {
          background: #334155;
          color: #64748b;
        }
        [data-theme='dark'] .virtual-queue-card {
          background: rgba(15, 23, 42, 0.6);
          border-color: #1e3a8a;
        }
        [data-theme='dark'] .queue-value {
          color: var(--text-primary);
        }
        [data-theme='dark'] .queue-label {
          color: var(--text-secondary);
        }
      `}</style>
        </div>
    );
};

export default TimeSlotPicker;
