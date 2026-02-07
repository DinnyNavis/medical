import React, { useState } from 'react';
import { Save, User, Phone, Camera, Lock, UploadCloud } from 'lucide-react';

const ProfileSettings = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    image: user.image || '', // This will store the Base64 string
    password: user.password || ''
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(user.image || ''); // For showing the image immediately

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- NEW FUNCTION: CONVERT IMAGE TO BASE64 ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result); // Show preview immediately
        setFormData({ ...formData, image: reader.result }); // Store in state to send to DB
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/profile/${user.id}/${user.role}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.success) {
        alert("Profile Updated Successfully! Please re-login to see changes.");
      } else {
        alert("Update failed.");
      }
    } catch (error) {
      alert("Server Error: Image might be too large.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-card">
      <style>{`
        .settings-card {
          background: white; padding: 2rem; border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #f1f5f9;
          max-width: 600px; margin: 0 auto;
        }
        .settings-header { margin-bottom: 2rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem; }
        .settings-header h2 { margin: 0; color: #0f172a; }
        
        .form-group { margin-bottom: 1.5rem; }
        .form-label { display: block; font-weight: 600; color: #334155; margin-bottom: 0.5rem; }
        .input-wrap { position: relative; display: flex; align-items: center; }
        .input-wrap svg { position: absolute; left: 12px; color: #94a3b8; pointer-events: none; }
        
        .form-input {
          width: 100%; padding: 0.8rem 1rem 0.8rem 2.5rem;
          border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem;
        }
        .form-input:focus { outline: none; border-color: #0284c7; box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1); }
        
        /* IMAGE UPLOAD STYLES */
        .image-upload-area {
          display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem;
        }
        .preview-box {
          width: 80px; height: 80px; border-radius: 50%;
          border: 3px solid #e2e8f0; overflow: hidden;
          background: #f1f5f9; display: flex; align-items: center; justify-content: center;
        }
        .preview-box img { width: 100%; height: 100%; object-fit: cover; }
        
        .upload-btn-wrapper {
          position: relative; overflow: hidden; display: inline-block;
        }
        .btn-upload {
          border: 1px solid #cbd5e1; color: #334155; background: white;
          padding: 8px 16px; border-radius: 8px; font-size: 0.9rem; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; gap: 8px;
        }
        .btn-upload:hover { background: #f8fafc; }
        .upload-btn-wrapper input[type=file] {
          font-size: 100px; position: absolute; left: 0; top: 0; opacity: 0; cursor: pointer;
        }

        .btn-save {
          background: #0284c7; color: white; padding: 0.8rem 1.5rem;
          border: none; border-radius: 8px; font-weight: 600; cursor: pointer;
          display: flex; align-items: center; gap: 8px; transition: 0.2s;
        }
        .btn-save:hover { background: #0369a1; }
      `}</style>

      <div className="settings-header">
        <h2>Profile Settings</h2>
        <p style={{ color: '#64748b' }}>Update your personal information</p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* IMAGE UPLOAD SECTION */}
        <div className="form-group">
          <label className="form-label">Profile Photo</label>
          <div className="image-upload-area">
            <div className="preview-box">
              {preview ? (
                <img src={preview} alt="Profile" />
              ) : (
                <User size={32} color="#94a3b8" />
              )}
            </div>
            <div className="upload-btn-wrapper">
              <button className="btn-upload" type="button">
                <UploadCloud size={18} /> Upload Image
              </button>
              <input
                type="file"
                name="myfile"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <div className="input-wrap">
            <User size={18} />
            <input name="name" type="text" className="form-input" value={formData.name} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <div className="input-wrap">
            <Phone size={18} />
            <input name="phone" type="text" className="form-input" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="input-wrap">
            <Lock size={18} />
            <input name="password" type="password" className="form-input" value={formData.password} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="btn-save" disabled={loading}>
          <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;