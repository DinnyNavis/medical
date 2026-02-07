# 🏥 Indhira Little Hearts - Medical Appointment System

A comprehensive, modern medical appointment management system designed specifically for pediatric clinics. Built with React, Node.js, Express, and MongoDB.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![Node](https://img.shields.io/badge/Node-16+-green.svg)

## ✨ Features

### 🔐 Authentication & Authorization
- **Multi-role authentication** - Patient, Doctor, and Admin roles
- **Secure login/signup** with password hashing
- **Session persistence** - User state maintained across page refreshes
- **Role-based access control** - Different dashboards for different user types

### 👨‍⚕️ Doctor Dashboard
- **Appointment Management** - View, approve, and manage patient appointments
- **Digital Prescription System** - Write and save prescriptions to database
- **PDF Generation** - Download professional prescription PDFs
- **Patient Details** - View comprehensive patient information
- **Real-time Updates** - Automatic appointment status updates

### 👤 Patient Dashboard
- **Book Appointments** - Select doctor, date, and time
- **Doctor Selection Modal** - Browse and choose from available specialists
- **Appointment History** - Track past and upcoming appointments
- **Wellness Stats** - View health metrics and statistics
- **Medical Timeline** - Visual representation of medical history
- **Lab Results** - Upload and view test results
- **Symptom Checker** - AI-powered symptom analysis
- **Telemedicine** - Video consultation support
- **Profile Settings** - Update personal information

### 👔 Admin Dashboard
- **User Management** - Manage patients, doctors, and appointments
- **Appointment Oversight** - View and manage all system appointments
- **Analytics** - Statistical insights and reporting
- **System Configuration** - Manage clinic settings

### 🎨 UI/UX Features
- **Dark Mode Support** - Toggle between light and dark themes
- **Bilingual Support** - English and Tamil language options
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Modern Glassmorphism UI** - Premium gradient designs
- **Smooth Animations** - Hover effects and transitions
- **Accessibility** - WCAG compliant interface

### 🚨 Additional Features
- **SOS Button** - Emergency contact with pulse animation
- **Email Notifications** - Automated appointment confirmations
- **Doctor Search & Filter** - Find specialists by name or specialty
- **Rating System** - Review and rate doctors
- **Medical Records** - Centralized patient history storage

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation and routing
- **Lucide React** - Modern icon library
- **jsPDF** - PDF generation for prescriptions
- **Context API** - State management (Theme, Language)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Nodemailer** - Email notifications
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/DinnyNavis/medical.git
cd medical
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/medical-clinic
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

Start the backend server:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd ../medical-app
npm install
```

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 🚀 Usage

### Default Admin Account
```
Email: admin@clinic.com
Password: admin123
```

### Creating Users
1. **Patients**: Navigate to `/signup` and register as a patient
2. **Doctors**: Admin can add doctors through the admin dashboard
3. **Admins**: Created via backend seeding

### Booking an Appointment
1. Login as a patient
2. Click "Book Appointment" on the dashboard
3. Select a doctor from the modal
4. Choose date, time, and reason for visit
5. Submit the appointment request

### Writing a Prescription (Doctor)
1. Login as a doctor
2. View patient appointments on the dashboard
3. Click "Write Prescription" on a patient card
4. Fill in diagnosis, medicines, and notes
5. Click "Save & Download PDF"
6. Prescription is saved to database and PDF is downloaded

---

## 📁 Project Structure

```
medical/
├── backend/
│   ├── server.js           # Express server and API routes
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies
│   └── node_modules/
│
├── medical-app/
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── BookingModal.jsx
│   │   │   ├── PrescriptionModal.jsx
│   │   │   ├── DoctorCard.jsx
│   │   │   ├── ProfileSettings.jsx
│   │   │   ├── WellnessStats.jsx
│   │   │   ├── MedicalTimeline.jsx
│   │   │   ├── LabResults.jsx
│   │   │   ├── SymptomChat.jsx
│   │   │   ├── Telemedicine.jsx
│   │   │   ├── SOSButton.jsx
│   │   │   ├── DarkModeToggle.jsx
│   │   │   └── ReviewSystem.jsx
│   │   │
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── PatientDashboard.jsx
│   │   │   ├── DoctorDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   │
│   │   ├── context/       # React Context providers
│   │   │   ├── ThemeContext.jsx
│   │   │   └── LanguageContext.jsx
│   │   │
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   │
│   ├── public/
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
│
└── README.md              # This file
```

---

## 🗄️ Database Schema

### Collections

#### Patients
```javascript
{
  name: String,
  age: Number,
  email: String (unique),
  password: String (hashed),
  phone: String,
  image: String,
  role: 'patient',
  emailNotifications: Boolean
}
```

#### Doctors
```javascript
{
  name: String,
  specialty: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  image: String,
  role: 'doctor'
}
```

#### Appointments
```javascript
{
  patientId: ObjectId,
  patientName: String,
  patientAge: Number,
  doctorId: ObjectId,
  doctorName: String,
  date: String,
  reason: String,
  status: 'Pending' | 'Approved' | 'Cancelled'
}
```

#### Prescriptions
```javascript
{
  appointmentId: ObjectId,
  patientId: ObjectId,
  patientName: String,
  doctorId: ObjectId,
  doctorName: String,
  date: Date,
  diagnosis: String,
  medicines: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String
  }],
  notes: String
}
```

---

## 🎨 UI Components

### Color Scheme
- **Primary**: `#0284c7` (Sky Blue)
- **Primary Hover**: `#0369a1` (Darker Sky Blue)
- **Background Light**: `#f8fafc` (Slate Gray)
- **Background Dark**: `#0f172a` (Dark Slate)
- **Text Primary**: `#0f172a` / `#f1f5f9` (Dark mode)
- **Success**: `#10b981` (Green)
- **Danger**: `#ef4444` (Red)

### Design Principles
- **Glassmorphism** - Translucent backgrounds with blur effects
- **Gradient Overlays** - Smooth color transitions
- **Micro-interactions** - Hover and click animations
- **Consistent Spacing** - 8px grid system
- **Typography** - Inter font family

---

## 🔌 API Endpoints

### Authentication
- `POST /api/signup` - Register new user
- `POST /api/login` - Authenticate user

### Doctors
- `GET /api/doctors` - Get all doctors

### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/:userId/:role` - Get user appointments
- `PUT /api/appointments/:id` - Update appointment status

### Prescriptions
- `POST /api/prescription` - Save prescription
- `GET /api/prescriptions/:patientId` - Get patient prescriptions

---

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🔒 Security Features

- Password hashing with bcrypt
- CORS protection
- Input validation
- SQL injection prevention
- XSS protection
- Environment variable management

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

**Dinny Paul Navis**
- GitHub: [@DinnyNavis](https://github.com/DinnyNavis)
- Repository: [medical](https://github.com/DinnyNavis/medical)

---

## 🙏 Acknowledgments

- React community for excellent documentation
- MongoDB for robust database solutions
- Lucide for beautiful icons
- All contributors and testers

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: contact@littlehearts.com (demo)

---

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Payment integration
- [ ] Insurance claim processing
- [ ] Multi-language support (additional languages)
- [ ] Advanced analytics dashboard
- [ ] Appointment reminders via SMS
- [ ] Prescription refill requests
- [ ] Telemedicine video enhancements
- [ ] Health records export (PDF)
- [ ] Integration with pharmacy systems

---

**Made with ❤️ for Indhira Little Hearts Pediatric Clinic**
