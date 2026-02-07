import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Clock, Users, Star, ArrowRight } from 'lucide-react';
import DoctorCard from '../components/DoctorCard';
import BookingModal from '../components/BookingModal';
import DoctorSearch from '../components/DoctorSearch';

const Home = ({ user }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const navigate = useNavigate();

  // Fetch Doctors
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/doctors')
      .then(res => res.json())
      .then(data => {
        const docs = data.map(d => ({
          ...d,
          id: d._id,
          image: d.image || (d.specialty === 'Nutritionist'
            ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
            : "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"),
          bio: "Dedicated specialist at Indhira Little Hearts.",
          rating: d.rating || 4.5 // Default rating
        }));
        setDoctors(docs);
        setFilteredDoctors(docs);
      })
      .catch(err => console.error("Failed to load doctors"));
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = doctors.filter(doc =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...doctors];

    // Specialty filter
    if (filters.specialty) {
      filtered = filtered.filter(doc => doc.specialty === filters.specialty);
    }

    // Sort
    if (filters.sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filters.sortBy === 'specialty') {
      filtered.sort((a, b) => a.specialty.localeCompare(b.specialty));
    }

    setFilteredDoctors(filtered);
  };

  const handleBookClick = (doctor) => {
    if (!user) {
      alert("Please Login to Book an Appointment");
      navigate('/login');
      return;
    }
    setSelectedDoctor(doctor);
  };

  const scrollToDoctors = () => {
    document.getElementById('specialists').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-wrapper">
      <style>{`
        .home-wrapper { font-family: 'Inter', sans-serif; color: #1e293b; overflow-x: hidden; }
        .hero-section { position: relative; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 6rem 2rem; text-align: center; overflow: hidden; }
        .hero-content { max-width: 800px; margin: 0 auto; position: relative; z-index: 10; }
        .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: white; padding: 6px 16px; border-radius: 30px; font-size: 0.85rem; font-weight: 600; color: #0284c7; box-shadow: 0 4px 10px rgba(0,0,0,0.05); margin-bottom: 1.5rem; }
        .hero-title { font-size: 3.5rem; line-height: 1.1; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -1px; color: #0f172a; }
        .gradient-text { background: linear-gradient(to right, #0284c7, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-desc { font-size: 1.25rem; color: #64748b; margin-bottom: 2.5rem; line-height: 1.6; }
        .cta-group { display: flex; justify-content: center; gap: 1rem; }
        .btn-primary-lg { background: #0284c7; color: white; padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; border-radius: 12px; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: transform 0.2s, box-shadow 0.2s; }
        .btn-primary-lg:hover { transform: translateY(-2px); box-shadow: 0 10px 20px -5px rgba(2, 132, 199, 0.4); background: #0369a1; }
        .btn-outline-lg { background: white; color: #0284c7; padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; border-radius: 12px; border: 1px solid #e0e7ff; cursor: pointer; transition: background 0.2s; }
        .btn-outline-lg:hover { background: #f8fafc; }
        .stats-bar { background: white; padding: 3rem 2rem; display: flex; justify-content: center; gap: 4rem; flex-wrap: wrap; border-bottom: 1px solid #f1f5f9; }
        .stat-item { text-align: center; }
        .stat-value { font-size: 2.5rem; font-weight: 800; color: #0f172a; display: block; }
        .stat-label { color: #64748b; font-weight: 500; }
        .specialists-section { padding: 5rem 2rem; max-width: 1200px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 3rem; }
        .section-header h2 { font-size: 2.5rem; color: #0f172a; margin-bottom: 1rem; }
        .grid-layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.5rem; }
        .features-section { background: #f8fafc; padding: 5rem 2rem; }
        .features-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
        .feature-card { background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); transition: transform 0.2s; }
        .feature-card:hover { transform: translateY(-5px); }
        .feature-icon { background: #e0f2fe; color: #0284c7; width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }
        .feature-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; }
        .feature-text { color: #64748b; line-height: 1.5; }
      `}</style>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge"><Star size={14} fill="#0284c7" /> #1 Pediatric Clinic</div>
          <h1 className="hero-title">Compassionate Care for <br /><span className="gradient-text">Little Hearts</span></h1>
          <p className="hero-desc">Expert pediatric services trusted by over 5,000 families.</p>
          <div className="cta-group">
            <button className="btn-primary-lg" onClick={scrollToDoctors}>Book Appointment <ArrowRight size={20} /></button>
            <button className="btn-outline-lg">Learn More</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-bar">
        <div className="stat-item"><span className="stat-value">8+</span><span className="stat-label">Years Experience</span></div>
        <div className="stat-item"><span className="stat-value">5k+</span><span className="stat-label">Happy Patients</span></div>
        <div className="stat-item"><span className="stat-value">24/7</span><span className="stat-label">Support</span></div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="section-header"><h2>Why Choose Us?</h2><p>Comprehensive care with a gentle touch.</p></div>
        <div className="features-grid">
          <div className="feature-card"><div className="feature-icon"><ShieldCheck size={28} /></div><h3 className="feature-title">Expert Specialists</h3><p className="feature-text">Highly qualified doctors specializing in child care.</p></div>
          <div className="feature-card"><div className="feature-icon"><Clock size={28} /></div><h3 className="feature-title">Zero Wait Time</h3><p className="feature-text">Book online and skip the queue entirely.</p></div>
          <div className="feature-card"><div className="feature-icon"><Users size={28} /></div><h3 className="feature-title">Child-Friendly</h3><p className="feature-text">A warm environment designed for kids.</p></div>
        </div>
      </section>

      {/* DOCTORS */}
      <section id="specialists" className="specialists-section">
        <div className="section-header">
          <h2>Meet Our Specialists</h2>
          <p>Search and filter to find the perfect doctor for your child.</p>
        </div>

        <DoctorSearch onSearch={handleSearch} onFilterChange={handleFilterChange} />

        <div className="grid-layout">
          {filteredDoctors.map(doc => (
            <DoctorCard key={doc.id} doctor={doc} onBook={() => handleBookClick(doc)} />
          ))}
        </div>
      </section>

      {selectedDoctor && <BookingModal doctor={selectedDoctor} user={user} onClose={() => setSelectedDoctor(null)} />}
    </div>
  );
};

export default Home;