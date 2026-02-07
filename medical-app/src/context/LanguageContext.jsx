import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
    en: {
        dashboard: "Dashboard",
        appointments: "Appointments",
        medicalHistory: "Medical History",
        labReports: "Lab Reports",
        symptomAI: "Symptom AI",
        settings: "Settings",
        welcome: "Hello",
        overview: "Here's the health overview for",
        bookAppointment: "Book Appointment",
        upcomingAppointments: "Upcoming Appointments",
        quickActions: "Quick Actions",
        medicines: "Medicines",
        teleConsult: "Tele-Consult",
        sos: "SOS",
        emergency: "Emergency",
        cancel: "Cancel",
    },
    ta: {
        dashboard: "முகப்பு",
        appointments: "நியமனங்கள்",
        medicalHistory: "மருத்துவ வரலாறு",
        labReports: "ஆய்வக அறிக்கைகள்",
        symptomAI: "அறிகுறி சோதனையாளர்",
        settings: "அமைப்புகள்",
        welcome: "வணக்கம்",
        overview: "இங்கு உங்கள் உடல்நலம் பற்றிய கண்ணோட்டம்",
        bookAppointment: "முன்பதிவு செய்யவும்",
        upcomingAppointments: "வரவிருக்கும் நியமனங்கள்",
        quickActions: "விரைவான செயல்கள்",
        medicines: "மருந்துகள்",
        teleConsult: "தொலை மருத்துவ ஆலோசனை",
        sos: "அவசரம்",
        emergency: "அவசர உதவி",
        cancel: "ரத்து செய்",
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const t = (key) => {
        return translations[language][key] || key;
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ta' : 'en');
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
