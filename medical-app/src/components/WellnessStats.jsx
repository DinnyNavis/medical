import React from 'react';
import { Activity, Heart, Scale, TrendingUp, Zap } from 'lucide-react';

const WellnessStats = () => {
    return (
        <div className="wellness-container">
            <h3 className="section-title">Wellness Dashboard</h3>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card gradient-blue">
                    <div className="stat-icon"><Activity size={24} /></div>
                    <div className="stat-info">
                        <span className="stat-label">Heart Rate</span>
                        <span className="stat-value">98 <small>bpm</small></span>
                    </div>
                    <div className="stat-chart">
                        <TrendingUp size={16} /> Normal
                    </div>
                </div>

                <div className="stat-card gradient-purple">
                    <div className="stat-icon"><Scale size={24} /></div>
                    <div className="stat-info">
                        <span className="stat-label">Weight</span>
                        <span className="stat-value">14.5 <small>kg</small></span>
                    </div>
                    <div className="stat-chart">
                        <span className="badge-growth">+0.5kg</span>
                    </div>
                </div>

                <div className="stat-card gradient-orange">
                    <div className="stat-icon"><Heart size={24} /></div>
                    <div className="stat-info">
                        <span className="stat-label">Height</span>
                        <span className="stat-value">98 <small>cm</small></span>
                    </div>
                    <div className="stat-chart">
                        <span className="badge-growth">+1.2cm</span>
                    </div>
                </div>
            </div>

            {/* Health Tips */}
            <div className="tips-card glass-panel">
                <div className="tips-header">
                    <Zap size={20} className="text-warning" />
                    <h4>Daily Health Tip</h4>
                </div>
                <p className="tip-text">
                    "Ensure your child gets at least 10-12 hours of sleep. A consistent bedtime routine helps improve growth immunity."
                </p>
                <button className="btn-link">Read More</button>
            </div>

            <style>{`
        .wellness-container {
          margin-bottom: 2rem;
        }
        .section-title {
          font-size: 1.25rem;
          color: var(--gray-800);
          margin-bottom: 1.5rem;
          padding-left: 0.5rem;
          border-left: 4px solid var(--primary);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .stat-card {
          padding: 1.5rem;
          border-radius: 16px;
          color: white;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s;
        }
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px -5px rgba(0,0,0,0.15);
        }
        .gradient-blue { background: linear-gradient(135deg, #60a5fa 0%, #2563eb 100%); }
        .gradient-purple { background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%); }
        .gradient-orange { background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%); }
        
        .stat-icon {
          background: rgba(255,255,255,0.2);
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          backdrop-filter: blur(5px);
        }
        .stat-info { margin-bottom: 0.5rem; }
        .stat-label { display: block; font-size: 0.85rem; opacity: 0.9; margin-bottom: 4px; }
        .stat-value { font-size: 2rem; font-weight: 700; line-height: 1; }
        .stat-value small { font-size: 1rem; font-weight: 500; opacity: 0.8; }
        
        .stat-chart {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          opacity: 0.9;
          margin-top: 8px;
        }
        .badge-growth {
          background: rgba(255,255,255,0.2);
          padding: 2px 8px;
          border-radius: 10px;
        }
        
        .glass-panel {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }
        .tips-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
        }
        .text-warning { color: #d97706; fill: #fcd34d; }
        .tips-header h4 { margin: 0; font-size: 1.1rem; color: var(--gray-800); }
        .tip-text { color: var(--gray-600); line-height: 1.6; margin-bottom: 1rem; font-style: italic; }
        .btn-link {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 600;
          padding: 0;
          cursor: pointer;
          font-size: 0.9rem;
        }
        
        /* Dark Mode */
        [data-theme='dark'] .section-title { color: var(--text-primary); }
        [data-theme='dark'] .glass-panel { background: var(--bg-secondary); border-color: var(--border-color); }
        [data-theme='dark'] .tips-header h4 { color: var(--text-primary); }
        [data-theme='dark'] .tip-text { color: var(--text-secondary); }
      `}</style>
        </div>
    );
};

export default WellnessStats;
