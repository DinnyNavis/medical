import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Phone, MapPin } from 'lucide-react';

const SOSButton = () => {
    const [active, setActive] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [alertSent, setAlertSent] = useState(false);

    useEffect(() => {
        let timer;
        if (active && countdown > 0 && !alertSent) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0 && !alertSent) {
            setAlertSent(true);
            // Simulate API call
            console.log("SOS ALERT SENT!");
        }
        return () => clearTimeout(timer);
    }, [active, countdown, alertSent]);

    const handleActivate = () => {
        setActive(true);
        setCountdown(5);
        setAlertSent(false);
    };

    const handleCancel = () => {
        setActive(false);
        setCountdown(5);
        setAlertSent(false);
    };

    return (
        <>
            {/* Floating Button */}
            <button className="sos-float-btn" onClick={handleActivate}>
                <AlertTriangle size={24} />
                <span>SOS</span>
            </button>

            {/* Overlay */}
            {active && (
                <div className="sos-overlay">
                    <div className="sos-modal animate-pulse-fast">
                        {!alertSent ? (
                            <>
                                <div className="warning-icon">
                                    <AlertTriangle size={48} />
                                </div>
                                <h2>Emergency Alert</h2>
                                <p>Sending location and alert to emergency contacts in</p>
                                <div className="countdown-circle">
                                    <span>{countdown}</span>
                                </div>
                                <button className="btn-cancel-sos" onClick={handleCancel}>
                                    <X size={20} /> Cancel Alert
                                </button>
                            </>
                        ) : (
                            <div className="alert-success animate-fade-in-up">
                                <div className="success-icon-large">
                                    <Phone size={48} />
                                </div>
                                <h2>Alert Sent!</h2>
                                <p>Emergency contacts notified.</p>
                                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '10px' }}>
                                    <MapPin size={14} style={{ verticalAlign: 'middle' }} /> Medical Center Road, Manapparai
                                </p>
                                <button className="btn-close-sos" onClick={handleCancel}>Close</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style>{`
                .sos-float-btn {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    background: #ef4444;
                    color: white;
                    border: none;
                    border-radius: 50px;
                    padding: 12px 24px;
                    font-weight: 700;
                    font-size: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.4);
                    cursor: pointer;
                    z-index: 1000;
                    transition: transform 0.2s, box-shadow 0.2s;
                    animation: pulse-red 2s infinite;
                }
                .sos-float-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 20px 25px -5px rgba(239, 68, 68, 0.5);
                }

                @keyframes pulse-red {
                    0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
                    70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
                }

                .sos-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(220, 38, 38, 0.9);
                    backdrop-filter: blur(5px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    color: white;
                    text-align: center;
                }

                .sos-modal {
                    background: white;
                    color: #0f172a;
                    padding: 3rem;
                    border-radius: 24px;
                    max-width: 400px;
                    width: 90%;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .warning-icon {
                    color: #ef4444;
                    margin-bottom: 1rem;
                }

                .countdown-circle {
                    width: 80px; height: 80px;
                    border-radius: 50%;
                    border: 4px solid #ef4444;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #ef4444;
                    margin: 2rem 0;
                }

                .btn-cancel-sos {
                    background: #f1f5f9;
                    color: #64748b;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex; align-items: center; gap: 8px;
                    transition: 0.2s;
                }
                .btn-cancel-sos:hover { background: #e2e8f0; color: #0f172a; }

                .alert-success {
                    background: #ef4444;
                    color: white;
                    padding: 2rem;
                    border-radius: 24px;
                    width: 100%;
                }
                .success-icon-large { margin-bottom: 1rem; }
                .btn-close-sos {
                    margin-top: 2rem;
                    background: white;
                    color: #ef4444;
                    border: none;
                    padding: 10px 30px;
                    border-radius: 8px;
                    font-weight: 700;
                    cursor: pointer;
                }
            `}</style>
        </>
    );
};

export default SOSButton;
