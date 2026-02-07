// src/data/mockData.js

export const CLINIC_INFO = {
  name: "Indhira Little Hearts",
  doctor: "Dr. M. Karthikeyan",
  location: "11A, Old Sarathas, Manapparai",
  phone: "+91 98765 43210"
};

// --- DUMMY USER DATABASE ---
export const USERS = [
  {
    id: 'u1',
    name: "Admin User",
    email: "admin@clinic.com",
    password: "admin123", // Use this to login as Admin
    role: "admin"
  },
  {
    id: 'd1',
    name: "Dr. M. Karthikeyan",
    email: "dr.karthi@clinic.com",
    password: "doc123", // Use this to login as Doctor
    role: "doctor"
  },
  {
    id: 'p1',
    name: "Parent (Dinesh)",
    email: "parent@gmail.com",
    password: "user123", // Use this to login as Patient
    role: "patient"
  }
];

export const DOCTORS = [
  { 
    id: 1, 
    name: "Dr. M. Karthikeyan", 
    spec: "Pediatrician & Neonatologist", 
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    isPrimary: true,
    exp: "8+ Years Experience",
    bio: "Chief Consultant. Specialist in newborn care (Neonatology).",
    availability: ["Mon-Sat: 10am - 1pm", "Mon-Sat: 5pm - 9pm"]
  },
  { 
    id: 2, 
    name: "Dr. Sarah Williams", 
    spec: "Child Nutritionist", 
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    isPrimary: false,
    exp: "5 Years Experience",
    bio: "Expert in pediatric diet planning.",
    availability: ["Tue, Thu, Sat: 4pm - 7pm"]
  }
];