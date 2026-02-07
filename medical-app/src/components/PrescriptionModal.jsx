import React, { useState } from 'react';
import { X, FileText, Plus, Trash, Download, Save } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PrescriptionModal = ({ patient, doctor, onClose }) => {
    const [medicines, setMedicines] = useState([
        { name: '', dosage: '', frequency: '1-0-1', duration: '5 days', instruction: 'After food' }
    ]);
    const [diagnosis, setDiagnosis] = useState('');
    const [notes, setNotes] = useState('');

    const addMedicine = () => {
        setMedicines([...medicines, { name: '', dosage: '', frequency: '1-0-1', duration: '3 days', instruction: 'After food' }]);
    };

    const removeMedicine = (index) => {
        const list = [...medicines];
        list.splice(index, 1);
        setMedicines(list);
    };

    const updateMedicine = (index, field, value) => {
        const list = [...medicines];
        list[index][field] = value;
        setMedicines(list);
    };

    const generatePDF = async () => {
        try {
            // Save prescription to database
            const prescriptionData = {
                appointmentId: patient._id,
                patientId: patient.patientId,
                patientName: patient.patientName,
                doctorId: doctor.id,
                doctorName: doctor.name,
                diagnosis,
                medicines: medicines.map(m => ({
                    name: m.name,
                    dosage: m.dosage,
                    frequency: m.frequency,
                    duration: m.duration
                })),
                notes
            };

            console.log('Saving prescription:', prescriptionData);
            const response = await fetch('http://127.0.0.1:5000/api/prescription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(prescriptionData)
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error('Failed to save prescription');
            }

            // Generate PDF after successful save
            const doc = new jsPDF();

            // Header
            doc.setFontSize(22);
            doc.setTextColor(2, 132, 199); // Primary Blue
            doc.text("Indhira Little Hearts Clinic", 105, 20, null, null, "center");

            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text("123, Medical Center Road, Manapparai - 621306", 105, 26, null, null, "center");
            doc.text("Phone: +91 98765 43210 | Email: contact@littlehearts.com", 105, 31, null, null, "center");

            doc.setDrawColor(200);
            doc.line(10, 35, 200, 35);

            // Doctor & Patient Info
            doc.setFontSize(12);
            doc.setTextColor(0);
            doc.text(`Dr. ${doctor.name || 'M. Karthikeyan'}`, 14, 45);
            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text(doctor.specialty || 'Pediatrician', 14, 50);

            doc.setFontSize(12);
            doc.setTextColor(0);
            doc.text(`Patient: ${patient.patientName}`, 140, 45);
            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text(`Age: ${patient.patientAge} | Sex: ${patient.gender}`, 140, 50);
            doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 55);

            // Diagnosis
            doc.setDrawColor(2, 132, 199);
            doc.setFillColor(240, 249, 255);
            doc.rect(14, 65, 182, 15, 'F');
            doc.setFontSize(11);
            doc.setTextColor(0);
            doc.text(`Diagnosis: ${diagnosis}`, 18, 73);

            // Medicine Table
            doc.autoTable({
                startY: 90,
                head: [['Medicine Name', 'Dosage', 'Frequency', 'Duration', 'Instruction']],
                body: medicines.map(m => [m.name, m.dosage, m.frequency, m.duration, m.instruction]),
                theme: 'grid',
                headStyles: { fillColor: [2, 132, 199] },
                styles: { fontSize: 10, cellPadding: 3 },
            });

            // Notes
            let finalY = doc.lastAutoTable.finalY + 10;
            doc.setFontSize(10);
            doc.text("Additional Notes:", 14, finalY);
            doc.setFontSize(10);
            doc.setTextColor(80);
            doc.text(notes, 14, finalY + 6);

            // Footer
            finalY += 40;
            doc.line(140, finalY, 190, finalY);
            doc.text("Signature", 155, finalY + 5);

            doc.save(`Prescription_${patient.patientName}.pdf`);

            alert('Prescription saved successfully!');
            onClose();
        } catch (error) {
            console.error('Error saving prescription:', error);
            alert('Failed to save prescription. Please try again.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="wide-modal animate-fade-in-up" style={{ maxWidth: '800px' }}>
                <button className="btn-close" onClick={onClose}><X size={20} /></button>

                <div className="modal-header">
                    <h2><FileText className="text-primary" size={24} style={{ marginRight: '10px' }} /> Digital Prescription</h2>
                    <p>Prescribing for: <strong>{patient.patientName}</strong></p>
                </div>

                <div className="prescription-form">
                    <div className="form-group">
                        <label>Diagnosis / Symptoms</label>
                        <input
                            type="text"
                            className="modern-input"
                            placeholder="e.g. Viral Fever, Acute Bronchitis"
                            value={diagnosis}
                            onChange={e => setDiagnosis(e.target.value)}
                        />
                    </div>

                    <div className="medicine-list">
                        <h4 style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Medicines
                            <button type="button" onClick={addMedicine} className="btn-small-primary"><Plus size={14} /> Add Med</button>
                        </h4>

                        {medicines.map((med, index) => (
                            <div key={index} className="med-row">
                                <input
                                    placeholder="Medicine Name"
                                    value={med.name}
                                    onChange={e => updateMedicine(index, 'name', e.target.value)}
                                    style={{ flex: 2 }}
                                />
                                <input
                                    placeholder="Dosage (e.g. 5ml)"
                                    value={med.dosage}
                                    onChange={e => updateMedicine(index, 'dosage', e.target.value)}
                                    style={{ flex: 1 }}
                                />
                                <select
                                    value={med.frequency}
                                    onChange={e => updateMedicine(index, 'frequency', e.target.value)}
                                    style={{ flex: 1 }}
                                >
                                    <option>1-0-1</option>
                                    <option>1-1-1</option>
                                    <option>1-0-0</option>
                                    <option>0-0-1</option>
                                    <option>SOS</option>
                                </select>
                                <input
                                    placeholder="Duration"
                                    value={med.duration}
                                    onChange={e => updateMedicine(index, 'duration', e.target.value)}
                                    style={{ flex: 1 }}
                                />
                                <button className="btn-icon-danger" onClick={() => removeMedicine(index)}><Trash size={16} /></button>
                            </div>
                        ))}
                    </div>

                    <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>Additional Notes</label>
                        <textarea
                            className="modern-textarea"
                            rows="2"
                            placeholder="Dietary advice, follow-up instructions..."
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                        />
                    </div>

                    <div className="form-actions" style={{ justifyContent: 'flex-end', gap: '1rem' }}>
                        <button className="btn-secondary" onClick={onClose}>Cancel</button>
                        <button className="btn-primary" onClick={generatePDF}>
                            <Download size={18} style={{ marginRight: '8px' }} /> Save & Download PDF
                        </button>
                    </div>
                </div>

                <style>{`
          .modal-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            display: flex; align-items: center; justify-content: center;
            z-index: 1000; padding: 20px;
          }
          
          .wide-modal {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.8);
          }
          
          .modal-header {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            padding: 2rem;
            color: white;
            border-bottom: 3px solid #0ea5e9;
          }
          
          .modal-header h2 {
            margin: 0 0 0.5rem 0;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 1.75rem;
            font-weight: 700;
          }
          
          .modal-header p {
            margin: 0;
            opacity: 0.95;
            font-size: 0.95rem;
          }
          
          .prescription-form {
            padding: 2rem;
            max-height: 60vh;
            overflow-y: auto;
          }
          
          .form-group {
            margin-bottom: 1.5rem;
          }
          
          .form-group label {
            display: block;
            font-weight: 600;
            color: #334155;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .modern-input, .modern-textarea {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 0.95rem;
            transition: all 0.3s;
            background: #f8fafc;
          }
          
          .modern-input:focus, .modern-textarea:focus {
            outline: none;
            border-color: #0284c7;
            background: white;
            box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.1);
          }
          
          .medicine-list h4 {
            color: #0f172a;
            margin-bottom: 1rem;
            font-size: 1.1rem;
          }
          
          .med-row {
            display: flex;
            gap: 10px;
            margin-bottom: 12px;
            padding: 12px;
            background: white;
            border-radius: 12px;
            border: 2px solid #e0f2fe;
            transition: all 0.2s;
          }
          
          .med-row:hover {
            border-color: #0284c7;
            box-shadow: 0 4px 12px rgba(2, 132, 199, 0.15);
          }
          
          .med-row input, .med-row select {
            padding: 10px 12px;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            background: #f8fafc;
            font-size: 0.9rem;
            transition: border 0.2s;
          }
          
          .med-row input:focus, .med-row select:focus {
            outline: none;
            border-color: #0284c7;
            background: white;
          }
          
          .btn-small-primary {
            background: linear-gradient(135deg, #0284c7, #0369a1);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s;
            box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
          }
          
          .btn-small-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(2, 132, 199, 0.35);
          }
          
          .btn-icon-danger {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            border: none;
            width: 38px;
            height: 38px;
            border-radius: 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            box-shadow: 0 2px 8px rgba(239, 68, 68, 0.25);
          }
          
          .btn-icon-danger:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.35);
          }
          
          .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            padding-top: 1.5rem;
            border-top: 2px solid #e2e8f0;
          }
          
          .btn-secondary {
            background: #e2e8f0;
            color: #475569;
            padding: 12px 24px;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .btn-secondary:hover {
            background: #cbd5e1;
            transform: translateY(-1px);
          }
          
          .btn-primary {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          }
          
          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
          }
          
          .btn-close {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            z-index: 10;
            color: white;
          }
          
          .btn-close:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: rotate(90deg);
          }
          
          [data-theme='dark'] .wide-modal {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          }
          
          [data-theme='dark'] .modal-header {
            border-bottom-color: #334155;
          }
          
          [data-theme='dark'] .form-group label {
            color: #cbd5e1;
          }
          
          [data-theme='dark'] .modern-input,
          [data-theme='dark'] .modern-textarea,
          [data-theme='dark'] .med-row input,
          [data-theme='dark'] .med-row select {
            background: #0f172a;
            border-color: #334155;
            color: white;
          }
          
          [data-theme='dark'] .med-row {
            background: #1e293b;
            border-color: #334155;
          }
        `}</style>
            </div>
        </div>
    );
};

export default PrescriptionModal;
