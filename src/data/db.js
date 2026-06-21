// =============================================
// Manas Healthcare - Local Database (localStorage)
// =============================================

const KEYS = {
  DOCTORS: "manas_doctors",
  APPOINTMENTS: "manas_appointments",
  LEADS: "manas_leads",
  FAQS: "manas_faqs",
  HOLIDAYS: "manas_holidays",
  BLOGS: "manas_blogs",
  ADMIN: "manas_admin",
};

// Seed data
const SEED = {
  doctors: [
    {
      id: 1,
      doctorId: 101,
      firstName: "Dr. Priya",
      lastName: "Sharma",
      email: "priya.sharma@manashealthcare.in",
      phone: "+91 9876543210",
      location: "Bengaluru",
      experience: 12,
      degree: "MD Psychiatry",
      university: "AIIMS Delhi",
      passingYear: 2012,
      specialization: "Psychiatry & Medication Management",
      bio: "Dr. Priya Sharma is a compassionate psychiatrist with over 12 years of experience helping patients navigate anxiety, depression, and other mental health conditions.",
      image: "/assets/dr-priya.png",
      status: 1,
      totalAppointments: 34,
      availability: {
        Mon: ["10:00", "11:00", "14:00"],
        Tue: ["10:00", "15:00"],
        Wed: ["10:00", "11:00"],
        Thu: [],
        Fri: ["10:00", "14:00"],
        Sat: ["10:00"],
        Sun: [],
      },
    },
    {
      id: 2,
      doctorId: 102,
      firstName: "Ms. Lakshmi",
      lastName: "Venkat",
      email: "lakshmi.v@manashealthcare.in",
      phone: "+91 9876543211",
      location: "Hyderabad",
      experience: 8,
      degree: "M.Phil Clinical Psychology",
      university: "Tata Institute",
      passingYear: 2016,
      specialization: "CBT & Anxiety",
      bio: "Ms. Lakshmi Venkat specialises in Cognitive Behaviour Therapy and has worked extensively with adolescents and adults dealing with anxiety and stress disorders.",
      image: "/assets/dr-lakshmi.png",
      status: 1,
      totalAppointments: 21,
      availability: {
        Mon: ["11:00", "15:00"],
        Tue: ["10:00", "11:00"],
        Wed: [],
        Thu: ["10:00", "14:00"],
        Fri: ["11:00"],
        Sat: [],
        Sun: [],
      },
    },
    {
      id: 3,
      doctorId: 103,
      firstName: "Dr. Arun",
      lastName: "Krishnamurthy",
      email: "arun.k@manashealthcare.in",
      phone: "+91 9876543212",
      location: "Bengaluru",
      experience: 15,
      degree: "MD Psychiatry",
      university: "NIMHANS Bangalore",
      passingYear: 2009,
      specialization: "Child & Adolescent Psychiatry",
      bio: "Dr. Arun Krishnamurthy is a senior psychiatrist with a decade and a half of experience in child and adolescent mental health care.",
      image: "/assets/dr-arun.png",
      status: 1,
      totalAppointments: 18,
      availability: {
        Mon: [],
        Tue: ["14:00", "15:00"],
        Wed: ["10:00"],
        Thu: ["10:00", "11:00"],
        Fri: [],
        Sat: ["10:00", "11:00"],
        Sun: [],
      },
    },
    {
      id: 4,
      doctorId: 104,
      firstName: "Ms. Divya",
      lastName: "Patel",
      email: "divya.p@manashealthcare.in",
      phone: "+91 9876543213",
      location: "Mumbai",
      experience: 5,
      degree: "MSc Psychology",
      university: "Mumbai University",
      passingYear: 2019,
      specialization: "Trauma & EMDR",
      bio: "Ms. Divya Patel is trained in EMDR and trauma-focused therapies, helping survivors of abuse and PTSD reclaim their lives.",
      image: "/assets/dr-divya.png",
      status: 0,
      totalAppointments: 9,
      availability: {
        Mon: ["10:00"],
        Tue: [],
        Wed: ["14:00"],
        Thu: [],
        Fri: ["10:00", "11:00"],
        Sat: [],
        Sun: [],
      },
    },
  ],
  appointments: [
    {
      id: 1,
      patientId: 71,
      patientName: "Anjali Mehta",
      slot: "2026-06-25 10:00 AM - 11:00 AM",
      createdDate: "2026-06-18",
      consultationFor: "Anxiety, Depression",
      contact: "9876543220",
      doctor: "Dr. Priya Sharma",
      sessionType: "Online",
      location: "-",
      status: "Booked",
    },
    {
      id: 2,
      patientId: 70,
      patientName: "Rohit Sharma",
      slot: "2026-06-20 04:00 PM - 05:00 PM",
      createdDate: "2026-06-18",
      consultationFor: "Depression",
      contact: "9876543221",
      doctor: "Ms. Lakshmi Venkat",
      sessionType: "In-Person",
      location: "Bengaluru",
      status: "Booked",
    },
    {
      id: 3,
      patientId: 69,
      patientName: "Meena Iyer",
      slot: "2026-06-22 11:00 AM - 12:00 PM",
      createdDate: "2026-06-17",
      consultationFor: "Stress & CBT",
      contact: "9876543222",
      doctor: "Dr. Priya Sharma",
      sessionType: "Online",
      location: "-",
      status: "Booked",
    },
    {
      id: 4,
      patientId: 68,
      patientName: "Suresh Babu",
      slot: "2026-06-24 02:00 PM - 03:00 PM",
      createdDate: "2026-06-15",
      consultationFor: "Trauma",
      contact: "9876543223",
      doctor: "Ms. Divya Patel",
      sessionType: "In-Person",
      location: "Bengaluru",
      status: "Pending",
    },
    {
      id: 5,
      patientId: 67,
      patientName: "Preethi Nair",
      slot: "2026-07-01 10:00 AM - 11:00 AM",
      createdDate: "2026-06-10",
      consultationFor: "Mood & Emotions",
      contact: "9876543224",
      doctor: "Dr. Arun Krishnamurthy",
      sessionType: "Online",
      location: "-",
      status: "Booked",
    },
  ],
  leads: [
    {
      id: 1,
      fullName: "Vijay Ramesh",
      email: "vijay@gmail.com",
      phone: "9876543230",
      createdDate: "2026-06-18",
      screenType: "Anxiety & Stress",
      utmSource: "-",
      utmMedium: "-",
      utmCampaign: "-",
    },
    {
      id: 2,
      fullName: "Shalini Das",
      email: "shalini@gmail.com",
      phone: "9876543231",
      createdDate: "2026-06-10",
      screenType: "CBT",
      utmSource: "-",
      utmMedium: "-",
      utmCampaign: "-",
    },
    {
      id: 3,
      fullName: "Kiran Bose",
      email: "kiran@gmail.com",
      phone: "9876543232",
      createdDate: "2026-05-28",
      screenType: "Home",
      utmSource: "-",
      utmMedium: "-",
      utmCampaign: "-",
    },
    {
      id: 4,
      fullName: "Nithya Raj",
      email: "nithya@gmail.com",
      phone: "9876543233",
      createdDate: "2026-05-15",
      screenType: "Mood & Emotions",
      utmSource: "-",
      utmMedium: "-",
      utmCampaign: "-",
    },
    {
      id: 5,
      fullName: "Harish Menon",
      email: "harish@gmail.com",
      phone: "9876543234",
      createdDate: "2026-04-30",
      screenType: "EMDR",
      utmSource: "-",
      utmMedium: "-",
      utmCampaign: "-",
    },
  ],
  faqs: [
    {
      id: 1,
      question: "What is mental health counselling?",
      answer:
        "Mental health counselling is a professional service where trained therapists help individuals understand and manage their emotional, psychological, and social well-being.",
    },
    {
      id: 2,
      question: "How do I book an appointment?",
      answer:
        'You can book an appointment through our website by clicking the "Book Consultation" button, or by calling us directly at +91 98765 43200.',
    },
    {
      id: 3,
      question: "Are online sessions effective?",
      answer:
        "Yes, research shows online therapy is just as effective as in-person sessions for most mental health concerns. Our therapists use secure, confidential video platforms.",
    },
    {
      id: 4,
      question: "Is my information kept confidential?",
      answer:
        "Absolutely. All information shared with our therapists is strictly confidential and protected by professional ethics and applicable laws.",
    },
    {
      id: 5,
      question: "How long does a session last?",
      answer:
        "A standard therapy session at Manas Healthcare lasts 50-60 minutes. Assessment sessions may take up to 90 minutes.",
    },
  ],
  holidays: [
    {
      id: 1,
      name: "Independence Day",
      date: "2026-08-15",
      note: "National Holiday",
    },
    {
      id: 2,
      name: "Gandhi Jayanti",
      date: "2026-10-02",
      note: "National Holiday",
    },
    { id: 3, name: "Diwali", date: "2026-10-20", note: "Festival Holiday" },
    { id: 4, name: "Christmas", date: "2026-12-25", note: "Festival Holiday" },
  ],
  blogs: [
    {
      id: 1,
      title: "Understanding Anxiety: Signs, Causes, and Treatments",
      category: "Anxiety",
      date: "2026-06-10",
      summary:
        "Anxiety is one of the most common mental health conditions. Learn to recognize the signs and explore evidence-based treatments that can help.",
      content:
        "Anxiety disorders affect millions worldwide, impacting daily life, relationships, and overall well-being. These conditions can cause excessive worry, fear, restlessness, and physical symptoms such as rapid heartbeat or fatigue. Early identification and professional support can significantly improve quality of life. Through therapy, medication, lifestyle changes, and emotional support, individuals can effectively manage anxiety and lead healthy, fulfilling lives.",
      image: null,
    },
    {
      id: 2,
      title: "How CBT Can Transform Your Mental Health",
      category: "Therapy",
      date: "2026-05-22",
      summary:
        "Cognitive Behaviour Therapy has decades of research behind it. Discover how this structured approach can help you break negative thought patterns.",
      content:
        "CBT (Cognitive Behavioral Therapy) is a form of psychotherapy that helps individuals identify and change negative thought patterns and behaviors. It is widely used to treat anxiety, depression, stress, and other mental health conditions. Through structured sessions, CBT equips individuals with practical coping strategies, problem-solving skills, and healthier thinking patterns, enabling them to manage challenges effectively and improve their overall emotional well-being.",
      image: null,
    },
    {
      id: 3,
      title: "Caring for Your Mental Health at Work",
      category: "Corporate",
      date: "2026-05-05",
      summary:
        "Workplace stress affects productivity and personal wellbeing. Here are practical strategies to maintain mental health in a demanding work environment.",
      content:
        "Work-related stress is increasingly common in todays fast-paced environment, affecting both mental and physical well-being. Excessive workload, tight deadlines, and workplace pressures can lead to anxiety, burnout, reduced productivity, and emotional exhaustion. Recognizing stress early and adopting healthy coping strategies, such as time management, mindfulness, and professional support, can help individuals maintain balance, improve resilience, and enhance overall quality of life.",
      image: null,
    },
    {
      id: 4,
      title: "Talking to Children About Mental Health",
      category: "Child & Family",
      date: "2026-04-18",
      summary:
        "Opening up conversations about feelings and mental health with children helps build emotional resilience from an early age.",
      content:
        "Children benefit enormously from early mental health support, as it helps them develop emotional resilience, healthy coping skills, and positive social behaviors. Addressing emotional or behavioral challenges at an early stage can improve academic performance, relationships, and overall well-being. Through therapy, guidance, and family involvement, children can build confidence, manage emotions effectively, and thrive in both personal and educational environments.",
      image: null,
    },
  ],
};

// Initialize DB
export function initDB() {
  if (!localStorage.getItem(KEYS.DOCTORS))
    localStorage.setItem(KEYS.DOCTORS, JSON.stringify(SEED.doctors));
  if (!localStorage.getItem(KEYS.APPOINTMENTS))
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(SEED.appointments));
  if (!localStorage.getItem(KEYS.LEADS))
    localStorage.setItem(KEYS.LEADS, JSON.stringify(SEED.leads));
  if (!localStorage.getItem(KEYS.FAQS))
    localStorage.setItem(KEYS.FAQS, JSON.stringify(SEED.faqs));
  if (!localStorage.getItem(KEYS.HOLIDAYS))
    localStorage.setItem(KEYS.HOLIDAYS, JSON.stringify(SEED.holidays));
  if (!localStorage.getItem(KEYS.BLOGS))
    localStorage.setItem(KEYS.BLOGS, JSON.stringify(SEED.blogs));
  if (!localStorage.getItem(KEYS.ADMIN))
    localStorage.setItem(
      KEYS.ADMIN,
      JSON.stringify({
        username: "admin",
        password: "manas@2024",
        name: "Admin",
        loggedIn: false,
      }),
    );
}

// Generic helpers
function getAll(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}
function setAll(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function nextId(arr) {
  return arr.length ? Math.max(...arr.map((x) => x.id)) + 1 : 1;
}

// ---- DOCTORS ----
export const doctorsDB = {
  getAll: () => getAll(KEYS.DOCTORS),
  getById: (id) => getAll(KEYS.DOCTORS).find((d) => d.id === Number(id)),
  add: (doc) => {
    const all = getAll(KEYS.DOCTORS);
    const newDoc = {
      ...doc,
      id: nextId(all),
      doctorId: 100 + nextId(all),
      totalAppointments: 0,
      createdAt: new Date().toISOString(),
    };
    setAll(KEYS.DOCTORS, [...all, newDoc]);
    return newDoc;
  },
  update: (id, data) => {
    const all = getAll(KEYS.DOCTORS);
    const updated = all.map((d) =>
      d.id === Number(id) ? { ...d, ...data } : d,
    );
    setAll(KEYS.DOCTORS, updated);
  },
  delete: (id) => {
    const all = getAll(KEYS.DOCTORS).filter((d) => d.id !== Number(id));
    setAll(KEYS.DOCTORS, all);
  },
};

// ---- APPOINTMENTS ----
export const appointmentsDB = {
  getAll: () => getAll(KEYS.APPOINTMENTS),
  getById: (id) => getAll(KEYS.APPOINTMENTS).find((a) => a.id === Number(id)),
  add: (appt) => {
    const all = getAll(KEYS.APPOINTMENTS);
    const newAppt = {
      ...appt,
      id: nextId(all),
      patientId: 70 + nextId(all),
      createdDate: new Date().toISOString().slice(0, 10),
      status: "Booked",
    };
    setAll(KEYS.APPOINTMENTS, [...all, newAppt]);
    // Update doctor appointment count
    const docs = getAll(KEYS.DOCTORS);
    const doc = docs.find(
      (d) => `${d.firstName} ${d.lastName}` === appt.doctor,
    );
    if (doc) {
      doc.totalAppointments = (doc.totalAppointments || 0) + 1;
      setAll(KEYS.DOCTORS, docs);
    }
    // Save as lead
    const leads = getAll(KEYS.LEADS);
    leads.unshift({
      id: nextId(leads),
      fullName: appt.patientName,
      email: appt.email || "",
      phone: appt.contact,
      createdDate: new Date().toISOString().slice(0, 10),
      screenType: appt.consultationFor,
      utmSource: "-",
      utmMedium: "-",
      utmCampaign: "-",
    });
    setAll(KEYS.LEADS, leads);
    return newAppt;
  },
  update: (id, data) => {
    const all = getAll(KEYS.APPOINTMENTS).map((a) =>
      a.id === Number(id) ? { ...a, ...data } : a,
    );
    setAll(KEYS.APPOINTMENTS, all);
  },
  delete: (id) =>
    setAll(
      KEYS.APPOINTMENTS,
      getAll(KEYS.APPOINTMENTS).filter((a) => a.id !== Number(id)),
    ),
};

// ---- LEADS ----
export const leadsDB = {
  getAll: () => getAll(KEYS.LEADS),
  add: (lead) => {
    const all = getAll(KEYS.LEADS);
    const newLead = {
      ...lead,
      id: nextId(all),
      createdDate: new Date().toISOString().slice(0, 10),
    };
    setAll(KEYS.LEADS, [newLead, ...all]);
    return newLead;
  },
  delete: (id) =>
    setAll(
      KEYS.LEADS,
      getAll(KEYS.LEADS).filter((l) => l.id !== Number(id)),
    ),
};

// ---- FAQS ----
export const faqsDB = {
  getAll: () => getAll(KEYS.FAQS),
  add: (faq) => {
    const all = getAll(KEYS.FAQS);
    const newFaq = { ...faq, id: nextId(all) };
    setAll(KEYS.FAQS, [...all, newFaq]);
    return newFaq;
  },
  update: (id, data) => {
    setAll(
      KEYS.FAQS,
      getAll(KEYS.FAQS).map((f) =>
        f.id === Number(id) ? { ...f, ...data } : f,
      ),
    );
  },
  delete: (id) =>
    setAll(
      KEYS.FAQS,
      getAll(KEYS.FAQS).filter((f) => f.id !== Number(id)),
    ),
};

// ---- HOLIDAYS ----
export const holidaysDB = {
  getAll: () => getAll(KEYS.HOLIDAYS),
  add: (h) => {
    const all = getAll(KEYS.HOLIDAYS);
    const newH = { ...h, id: nextId(all) };
    setAll(KEYS.HOLIDAYS, [...all, newH]);
    return newH;
  },
  delete: (id) =>
    setAll(
      KEYS.HOLIDAYS,
      getAll(KEYS.HOLIDAYS).filter((h) => h.id !== Number(id)),
    ),
};

// ---- BLOGS ----
export const blogsDB = {
  getAll: () => getAll(KEYS.BLOGS),
  getById: (id) => getAll(KEYS.BLOGS).find((b) => b.id === Number(id)),
};

// ---- AUTH ----
export const authDB = {
  login: (username, password) => {
    const admin = JSON.parse(localStorage.getItem(KEYS.ADMIN));
    if (admin.username === username && admin.password === password) {
      admin.loggedIn = true;
      localStorage.setItem(KEYS.ADMIN, JSON.stringify(admin));
      return true;
    }
    return false;
  },
  logout: () => {
    const admin = JSON.parse(localStorage.getItem(KEYS.ADMIN));
    admin.loggedIn = false;
    localStorage.setItem(KEYS.ADMIN, JSON.stringify(admin));
  },
  isLoggedIn: () => {
    const admin = JSON.parse(localStorage.getItem(KEYS.ADMIN) || "{}");
    return !!admin.loggedIn;
  },
};

// ---- STATS ----
export const statsDB = {
  get: () => {
    const doctors = getAll(KEYS.DOCTORS);
    const appointments = getAll(KEYS.APPOINTMENTS);
    const today = new Date().toISOString().slice(0, 10);
    return {
      totalDoctors: doctors.length,
      totalAppointments: appointments.length,
      todayAppointments: appointments.filter(
        (a) => a.slot && a.slot.startsWith(today),
      ).length,
      pendingAppointments: appointments.filter((a) => a.status === "Pending")
        .length,
      // Monthly for chart
      monthly: (() => {
        const months = {};
        appointments.forEach((a) => {
          const m = a.createdDate?.slice(0, 7);
          if (m) months[m] = (months[m] || 0) + 1;
        });
        return Object.entries(months)
          .map(([month, count]) => ({ month, count }))
          .sort((a, b) => a.month.localeCompare(b.month));
      })(),
    };
  },
};
