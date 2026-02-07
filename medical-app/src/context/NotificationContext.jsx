import React, { createContext, useContext, useState } from 'react';
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react';

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = ({ type = 'info', title, message, duration = 5000 }) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, type, title, message }]);

        if (duration > 0) {
            setTimeout(() => removeNotification(id), duration);
        }
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    const success = (title, message) => showNotification({ type: 'success', title, message });
    const error = (title, message) => showNotification({ type: 'error', title, message });
    const info = (title, message) => showNotification({ type: 'info', title, message });
    const warning = (title, message) => showNotification({ type: 'warning', title, message });

    return (
        <NotificationContext.Provider value={{ success, error, info, warning }}>
            {children}
            <ToastContainer notifications={notifications} onRemove={removeNotification} />
        </NotificationContext.Provider>
    );
};

const ToastContainer = ({ notifications, onRemove }) => {
    return (
        <div className="toast-container">
            {notifications.map(notif => (
                <Toast key={notif.id} {...notif} onClose={() => onRemove(notif.id)} />
            ))}
        </div>
    );
};

const Toast = ({ type, title, message, onClose }) => {
    const icons = {
        success: <CheckCircle size={20} />,
        error: <XCircle size={20} />,
        warning: <AlertCircle size={20} />,
        info: <Info size={20} />
    };

    return (
        <div className={`toast toast-${type}`}>
            <div className="toast-icon">{icons[type]}</div>
            <div className="toast-content">
                <h4 className="toast-title">{title}</h4>
                {message && <p className="toast-message">{message}</p>}
            </div>
            <button className="toast-close" onClick={onClose} aria-label="Close">
                <X size={16} />
            </button>
        </div>
    );
};
