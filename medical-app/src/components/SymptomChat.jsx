import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const SymptomChat = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: "Hello! I'm Dr. AI Assistant. How is your child feeling today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const botResponses = [
                "I understand. Could you tell me how long these symptoms have been present?",
                "Has there been any fever associated with this?",
                "I recommend monitoring their temperature and hydration. Would you like to embrace a specialist?",
                "Please note these symptoms. Dr. Karthikeyan can review this chat before your visit."
            ];
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

            const botMsg = { id: Date.now() + 1, sender: 'bot', text: randomResponse };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="chat-interface">
            <div className="chat-header">
                <div className="bot-avatar">
                    <Bot size={20} />
                </div>
                <div>
                    <h3>AI Symptom Checker</h3>
                    <span className="status-dot"></span> <small>Online</small>
                </div>
            </div>

            <div className="chat-messages">
                {messages.map(msg => (
                    <div key={msg.id} className={`message ${msg.sender === 'user' ? 'user-msg' : 'bot-msg'}`}>
                        <div className="msg-bubble">
                            {msg.text}
                        </div>
                        <div className="msg-avatar">
                            {msg.sender === 'user' ? <User size={14} /> : <Sparkles size={14} />}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="message bot-msg">
                        <div className="msg-bubble typing">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSend}>
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type symptoms here..."
                />
                <button type="submit" disabled={!input.trim()}>
                    <Send size={18} />
                </button>
            </form>

            <style>{`
        .chat-interface {
          background: white;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 500px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .chat-header {
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
        }
        .bot-avatar {
          background: rgba(255,255,255,0.2);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chat-header h3 { margin: 0; font-size: 1rem; }
        .status-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          margin-right: 4px;
        }
        .chat-header small { opacity: 0.9; }
        
        .chat-messages {
          flex: 1;
          background: #f8fafc;
          padding: 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .message {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          max-width: 80%;
        }
        .user-msg {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .bot-msg {
          align-self: flex-start;
        }
        
        .msg-bubble {
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 0.95rem;
          line-height: 1.5;
          position: relative;
        }
        .bot-msg .msg-bubble {
          background: white;
          border-bottom-left-radius: 4px;
          color: #334155;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .user-msg .msg-bubble {
          background: #0284c7;
          border-bottom-right-radius: 4px;
          color: white;
          box-shadow: 0 4px 10px rgba(2, 132, 199, 0.2);
        }
        
        .msg-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          flex-shrink: 0;
        }
        .bot-msg .msg-avatar { background: #e0f2fe; color: #0284c7; }
        .user-msg .msg-avatar { background: #e2e8f0; color: #64748b; }
        
        .chat-input-area {
          padding: 1rem;
          background: white;
          border-top: 1px solid #e2e8f0;
          display: flex;
          gap: 10px;
        }
        .chat-input-area input {
          flex: 1;
          padding: 10px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          outline: none;
          transition: border-color 0.2s;
        }
        .chat-input-area input:focus {
          border-color: #0284c7;
        }
        .chat-input-area button {
          background: #0284c7;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        .chat-input-area button:hover:not(:disabled) {
          transform: scale(1.05);
          background: #0369a1;
        }
        .chat-input-area button:disabled {
          background: #cbd5e1;
          cursor: default;
        }
        
        /* Typing Animation */
        .typing {
          display: flex;
          gap: 4px;
          padding: 16px 20px;
        }
        .typing span {
          width: 6px;
          height: 6px;
          background: #94a3af;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .typing span:nth-child(1) { animation-delay: -0.32s; }
        .typing span:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        
        /* Dark Mode */
        [data-theme='dark'] .chat-interface { background: #1e293b; border-color: #334155; }
        [data-theme='dark'] .chat-messages { background: #0f172a; }
        [data-theme='dark'] .bot-msg .msg-bubble { background: #1e293b; color: #f1f5f9; }
        [data-theme='dark'] .chat-input-area { background: #1e293b; border-color: #334155; }
        [data-theme='dark'] .chat-input-area input { background: #0f172a; border-color: #334155; color: white; }
      `}</style>
        </div>
    );
};

export default SymptomChat;
