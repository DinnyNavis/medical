require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { sendAppointmentConfirmation } = require('./services/emailService');

const app = express();

app.use(express.json({ limit: '10mb' })); // Allows sending images up to 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());

// 1. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/medical_db')
  .then(() => {
    console.log("Connected to MongoDB");
    seedData();
  })
  .catch(err => console.error("Connection Error:", err));

// --- 2. DEFINE SEPARATE SCHEMAS ---

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  image: { type: String },
  role: { type: String, default: 'patient' },
  emailNotifications: { type: Boolean, default: true }
});
const Patient = mongoose.model('Patient', PatientSchema);

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },  // <--- NEW FIELD
  image: { type: String },  // <--- NEW FIELD
  role: { type: String, default: 'doctor' }
});
const Doctor = mongoose.model('Doctor', DoctorSchema);

const AdminSchema = new mongoose.Schema({
  name: { type: String, default: 'Administrator' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }
});
const Admin = mongoose.model('Admin', AdminSchema);

const AppointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  patientName: String,
  patientAge: Number,
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  doctorName: String,
  date: String,
  reason: String,
  status: { type: String, default: 'Pending' }
});
const Appointment = mongoose.model('Appointment', AppointmentSchema);

const PrescriptionSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  patientName: String,
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  doctorName: String,
  date: { type: Date, default: Date.now },
  diagnosis: String,
  medicines: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String
  }],
  notes: String
});
const Prescription = mongoose.model('Prescription', PrescriptionSchema);

// --- 3. SEEDER ---
async function seedData() {
  try {
    if (!await Admin.findOne({ email: "admin@clinic.com" })) {
      await new Admin({ email: "admin@clinic.com", password: "admin123" }).save();
      console.log("✅ Admin Collection Initialized");
    }

    const doctorsList = [
      { name: "Dr. M. Karthikeyan", email: "dr.karthi@clinic.com", password: "doc123", specialty: "Pediatrician" },
      { name: "Dr. Sarah Williams", email: "dr.sarah@clinic.com", password: "doc123", specialty: "Nutritionist" },
      { name: "Dr. Rajesh Kumar", email: "dr.rajesh@clinic.com", password: "doc123", specialty: "Dentist" }
    ];

    for (const doc of doctorsList) {
      if (!await Doctor.findOne({ email: doc.email })) {
        await new Doctor(doc).save();
        console.log(`✅ Doctor Added: ${doc.name}`);
      }
    }
  } catch (err) {
    console.error("Seeding Error:", err);
  }
}

// --- 4. API ROUTES ---

// LOGIN
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Admin.findOne({ email, password });
    if (user) return res.json({ success: true, user: { id: user._id, name: user.name, role: 'admin' } });

    user = await Doctor.findOne({ email, password });
    if (user) return res.json({ success: true, user: { id: user._id, name: user.name, role: 'doctor', specialty: user.specialty, image: user.image } });

    user = await Patient.findOne({ email, password });
    if (user) return res.json({ success: true, user: { id: user._id, name: user.name, role: 'patient', age: user.age, image: user.image } });

    res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE PROFILE (NEW ROUTE)
app.put('/api/profile/:id/:role', async (req, res) => {
  const { id, role } = req.params;
  const updates = req.body; // { name, phone, image, password... }

  try {
    let updatedUser;
    if (role === 'doctor') {
      updatedUser = await Doctor.findByIdAndUpdate(id, updates, { new: true });
    } else if (role === 'patient') {
      updatedUser = await Patient.findByIdAndUpdate(id, updates, { new: true });
    } else {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, error: "Update failed" });
  }
});

// REGISTER
app.post('/api/register', async (req, res) => {
  const { name, age, email, password } = req.body;
  try {
    const exists = await Patient.findOne({ email }) || await Doctor.findOne({ email }) || await Admin.findOne({ email });
    if (exists) return res.json({ success: false, message: "Email already taken" });

    const newPatient = new Patient({ name, age, email, password });
    await newPatient.save();
    res.json({ success: true, message: "Patient Registered" });
  } catch (err) {
    res.json({ success: false, message: "Error registering patient" });
  }
});

// GET DOCTORS
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find({}, 'name specialty image'); // Fetch image too
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

// GET BOOKED SLOTS
app.get('/api/booked-slots/:doctorId', async (req, res) => {
  const { doctorId } = req.params;
  try {
    const appointments = await Appointment.find({
      doctorId: doctorId,
      status: { $ne: 'Cancelled' }
    });
    const bookedDates = appointments.map(a => a.date);
    res.json(bookedDates);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch slots" });
  }
});

// BOOK APPOINTMENT
app.post('/api/book', async (req, res) => {
  try {
    const appointment = await new Appointment(req.body).save();

    // Send confirmation email
    try {
      const patient = await Patient.findById(req.body.patientId);
      if (patient && patient.email && patient.emailNotifications) {
        await sendAppointmentConfirmation({
          patientEmail: patient.email,
          patientName: req.body.patientName,
          doctorName: req.body.doctorName,
          date: req.body.date,
          time: req.body.time || '10:00 AM',
          reason: req.body.reason
        });
      }
    } catch (emailError) {
      console.log('Email notification failed:', emailError.message);
      // Continue even if email fails
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET APPOINTMENTS
app.get('/api/appointments/:userId/:role', async (req, res) => {
  const { userId, role } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.json([]);
    let data;
    if (role === 'admin') data = await Appointment.find();
    else if (role === 'doctor') data = await Appointment.find({ doctorId: userId });
    else data = await Appointment.find({ patientId: userId });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// UPDATE APPOINTMENT STATUS
app.put('/api/appointment/:id', async (req, res) => {
  const { status } = req.body;
  try {
    await Appointment.findByIdAndUpdate(req.params.id, { status });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "Update failed" });
  }
});

// CREATE PRESCRIPTION
app.post('/api/prescription', async (req, res) => {
  try {
    const { appointmentId, patientId, patientName, doctorId, doctorName, diagnosis, medicines, notes } = req.body;

    const prescription = new Prescription({
      appointmentId,
      patientId,
      patientName,
      doctorId,
      doctorName,
      diagnosis,
      medicines,
      notes
    });

    await prescription.save();
    res.json({ success: true, prescriptionId: prescription._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET PRESCRIPTIONS for a patient
app.get('/api/prescriptions/:patientId', async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patientId: req.params.patientId });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));