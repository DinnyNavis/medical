import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const CalendarSelector = ({ onDateTimeSelect, bookedSlots = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM"
  ];

  const handleDateClick = (date) => {
    if (!date) return;
    setSelectedDate(date);
    setSelectedTime(null);
  };

  // Helper to check if a specific slot is booked
  const isSlotBooked = (time) => {
    if (!selectedDate) return false;
    // Must match the format stored in DB EXACTLY
    const dateStr = selectedDate.toLocaleDateString('en-US', { 
      weekday: 'short', month: 'short', day: 'numeric' 
    });
    const fullSlotString = `${dateStr} @ ${time}`;
    return bookedSlots.includes(fullSlotString);
  };

  const handleTimeClick = (time) => {
    if (isSlotBooked(time)) return; // Prevent clicking
    
    setSelectedTime(time);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-US', { 
        weekday: 'short', month: 'short', day: 'numeric' 
      });
      onDateTimeSelect(`${formattedDate} @ ${time}`);
    }
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="custom-calendar">
      <div className="calendar-header">
        <button type="button" onClick={() => changeMonth(-1)}><ChevronLeft size={20}/></button>
        <span>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
        <button type="button" onClick={() => changeMonth(1)}><ChevronRight size={20}/></button>
      </div>

      <div className="calendar-grid">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="day-label">{d}</div>)}
        {getDaysInMonth(currentDate).map((date, idx) => (
          <div 
            key={idx} 
            className={`calendar-day ${!date ? 'empty' : ''} ${
              date && selectedDate?.toDateString() === date.toDateString() ? 'selected' : ''
            }`}
            onClick={() => handleDateClick(date)}
          >
            {date ? date.getDate() : ''}
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="time-section fade-in">
          <h4><Clock size={14}/> Available Slots</h4>
          <div className="time-grid">
            {timeSlots.map(time => {
              const booked = isSlotBooked(time);
              return (
                <button
                  key={time}
                  type="button"
                  disabled={booked} // Disable HTML button
                  className={`time-chip ${selectedTime === time ? 'active' : ''} ${booked ? 'booked' : ''}`}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarSelector;