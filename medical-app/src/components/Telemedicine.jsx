import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Users, Settings } from 'lucide-react';

const Telemedicine = ({ onClose }) => {
    const [micOn, setMicOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);
    const [messages, setMessages] = useState([{ sender: 'Dr. Karthikeyan', text: 'Hello! I can see you now. How is Kavya doing today?' }]);
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (!inputText.trim()) return;
        setMessages([...messages, { sender: 'You', text: inputText }]);
        setInputText('');
    };

    return (
        <div className="telemedicine-room animate-fade-in-up">
            <div className="video-grid">
                {/* Main Doctor Video */}
                <div className="main-video">
                    <div className="video-placeholder">
                        <div className="avatar-doctor">Dr. K</div>
                        <p>Dr. Karthikeyan is in the room</p>
                    </div>
                    <div className="doctor-badge">Dr. Karthikeyan</div>
                </div>

                {/* Self Video (Picture-in-Picture) */}
                <div className="self-video">
                    {videoOn ? (
                        <div className="self-video-placeholder">You</div>
                    ) : (
                        <div className="video-off-indicator"><VideoOff size={20} /></div>
                    )}
                </div>
            </div>

            {/* Controls Bar */}
            <div className="controls-bar">
                <button className={`control-btn ${!micOn ? 'off' : ''}`} onClick={() => setMicOn(!micOn)}>
                    {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                </button>
                <button className={`control-btn ${!videoOn ? 'off' : ''}`} onClick={() => setVideoOn(!videoOn)}>
                    {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
                </button>
                <button className="control-btn end-call" onClick={onClose}>
                    <PhoneOff size={24} />
                </button>
                <button className="control-btn">
                    <MessageSquare size={20} />
                </button>
                <button className="control-btn">
                    <Settings size={20} />
                </button>
            </div>

            {/* Chat Sidebar (Optional/Collapsible) */}
            <div className="chat-overlay">
                <div className="chat-messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`chat-bubble ${msg.sender === 'You' ? 'me' : 'them'}`}>
                            <strong>{msg.sender === 'Dr. Karthikeyan' ? 'Dr. K' : 'Me'}:</strong> {msg.text}
                        </div>
                    ))}
                </div>
                <div className="chat-input-area">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                </div>
            </div>

            <style>{`
        .telemedicine-room {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: #0f172a; z-index: 3000;
            display: flex; flex-direction: column;
        }
        
        .video-grid {
            flex: 1; position: relative;
            display: flex; align-items: center; justify-content: center;
        }
        
        .main-video {
            width: 100%; height: 100%;
            background: #1e293b;
            display: flex; align-items: center; justify-content: center;
            position: relative;
        }
        .video-placeholder {
            display: flex; flex-direction: column; align-items: center; color: #94a3af;
        }
        .avatar-doctor {
            width: 100px; height: 100px; background: #3b82f6; color: white;
            border-radius: 50%; display: flex; align-items: center; justify-content: center;
            font-size: 2rem; font-weight: 700; margin-bottom: 1rem;
        }
        .doctor-badge {
            position: absolute; bottom: 20px; left: 20px;
            background: rgba(0,0,0,0.6); color: white; padding: 6px 16px;
            border-radius: 20px; font-size: 0.9rem;
        }
        
        .self-video {
            position: absolute; bottom: 100px; right: 20px;
            width: 200px; height: 150px;
            background: #334155; border: 2px solid rgba(255,255,255,0.2);
            border-radius: 16px; overflow: hidden;
            display: flex; align-items: center; justify-content: center; color: white;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);
        }
        
        .controls-bar {
            height: 80px; background: rgba(0,0,0,0.8);
            display: flex; align-items: center; justify-content: center; gap: 1.5rem;
            backdrop-filter: blur(10px);
        }
        
        .control-btn {
            width: 50px; height: 50px; border-radius: 50%;
            border: none; background: #334155; color: white;
            cursor: pointer; display: flex; align-items: center; justify-content: center;
            transition: 0.2s;
        }
        .control-btn:hover { background: #475569; }
        .control-btn.off { background: #ef4444; }
        .control-btn.end-call { background: #ef4444; width: 60px; height: 60px; }
        .control-btn.end-call:hover { background: #dc2626; }
        
        .chat-overlay {
            position: absolute; top: 20px; right: 20px;
            width: 300px; height: 400px;
            background: rgba(255,255,255,0.95);
            border-radius: 16px; padding: 1rem;
            display: flex; flex-direction: column;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2);
            display: none; /* Hidden by default for simplicity */
        }
        
        .chat-input-area input {
            width: 100%; padding: 10px; border-radius: 20px; border: 1px solid #e2e8f0;
        }
      `}</style>
        </div>
    );
};

export default Telemedicine;
