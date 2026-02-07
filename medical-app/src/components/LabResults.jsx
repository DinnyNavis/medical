import React, { useState } from 'react';
import { Upload, FileText, Download, Eye, X, Check } from 'lucide-react';

const LabResults = () => {
    const [reports, setReports] = useState([
        { id: 1, name: 'Blood Test - CBC', date: '2024-01-15', status: 'Available', type: 'PDF' },
        { id: 2, name: 'X-Ray Report', date: '2023-11-20', status: 'Available', type: 'JPG' },
        { id: 3, name: 'Urine Analysis', date: '2023-10-05', status: 'Pending', type: '-' }
    ]);

    const [dragging, setDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        // Simulate file upload
        const newReport = {
            id: Date.now(),
            name: 'New Lab Report.pdf',
            date: new Date().toISOString().split('T')[0],
            status: 'Available',
            type: 'PDF'
        };
        setReports([newReport, ...reports]);
    };

    return (
        <div className="lab-results-container">
            <div className="header-flex">
                <h3 className="section-title">Lab Reports & Documents</h3>
                <button className="btn-upload">
                    <Upload size={16} /> Upload New
                </button>
            </div>

            <div
                className={`upload-zone ${dragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="upload-icon-bg">
                    <Upload size={24} />
                </div>
                <p><strong>Drag & Drop files here</strong> or click to browse</p>
                <small>Supports PDF, JPG, PNG (Max 5MB)</small>
            </div>

            <div className="reports-list">
                {reports.map((report) => (
                    <div key={report.id} className="report-item animate-fade-in-up">
                        <div className="report-icon">
                            <FileText size={20} />
                        </div>
                        <div className="report-info">
                            <h4>{report.name}</h4>
                            <span>{report.date} • {report.type}</span>
                        </div>
                        <div className="report-actions">
                            {report.status === 'Pending' ? (
                                <span className="badge-pending">Processing...</span>
                            ) : (
                                <>
                                    <button className="action-icon" title="View"><Eye size={18} /></button>
                                    <button className="action-icon" title="Download"><Download size={18} /></button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        .lab-results-container {
            padding: 1rem 0;
        }
        .header-flex {
            display: flex; justifyContent: space-between; alignItems: center; margin-bottom: 1.5rem;
        }
        .section-title { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); }
        
        .btn-upload {
            background: var(--primary); color: white; border: none; padding: 8px 16px; border-radius: 8px;
            font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 8px;
        }
        
        .upload-zone {
            border: 2px dashed #e2e8f0; border-radius: 16px; padding: 2rem;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            text-align: center; margin-bottom: 2rem; transition: all 0.2s;
            background: #f8fafc; cursor: pointer;
        }
        .upload-zone.dragging {
            border-color: var(--primary); background: #eff6ff;
        }
        .upload-icon-bg {
            width: 48px; height: 48px; background: white; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 1rem; color: var(--primary);
        }
        .upload-zone p { color: var(--text-primary); margin-bottom: 4px; }
        .upload-zone small { color: var(--text-secondary); }
        
        .reports-list { display: flex; flex-direction: column; gap: 1rem; }
        .report-item {
            display: flex; alignItems: center; padding: 1rem; background: white;
            border: 1px solid #e2e8f0; border-radius: 12px; transition: transform 0.2s;
        }
        .report-item:hover { transform: translateX(5px); border-color: var(--primary); }
        
        .report-icon {
            width: 40px; height: 40px; background: #e0f2fe; color: #0284c7;
            border-radius: 8px; display: flex; align-items: center; justify-content: center;
            margin-right: 1rem;
        }
        .report-info { flex: 1; }
        .report-info h4 { margin: 0; font-size: 1rem; color: var(--text-primary); }
        .report-info span { font-size: 0.85rem; color: var(--text-secondary); }
        
        .report-actions { display: flex; gap: 8px; }
        .action-icon {
            background: transparent; border: none; padding: 8px; border-radius: 50%;
            cursor: pointer; color: var(--text-secondary); transition: 0.2s;
        }
        .action-icon:hover { background: #f1f5f9; color: var(--primary); }
        
        .badge-pending {
            background: #fef3c7; color: #b45309; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600;
        }

        /* Dark Mode */
        [data-theme='dark'] .upload-zone { background: #1e293b; border-color: #334155; }
        [data-theme='dark'] .report-item { background: #1e293b; border-color: #334155; }
        [data-theme='dark'] .upload-icon-bg { background: #0f172a; }
        [data-theme='dark'] .report-icon { background: #172554; }
      `}</style>
        </div>
    );
};

export default LabResults;
