import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initDB, authDB } from './data/db';

// Public Layout & Pages
import PublicLayout from './components/layout/PublicLayout';
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import OurTeamPage from './pages/public/OurTeamPage';
import FindHelpPage from './pages/public/FindHelpPage';
import ProgramsPage from './pages/public/ProgramsPage';
import BlogsPage from './pages/public/BlogsPage';
import BlogDetailPage from './pages/public/BlogDetailPage';
import ContactPage from './pages/public/ContactPage';
import BookConsultationPage from './pages/public/BookConsultationPage';
import FAQsPublicPage from './pages/public/FAQsPublicPage';

// Admin
import AdminLayout from './components/layout/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDoctors from './pages/admin/AdminDoctors';
import AdminAddDoctor from './pages/admin/AdminAddDoctor';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminLeads from './pages/admin/AdminLeads';
import AdminFAQs from './pages/admin/AdminFAQs';
import AdminHolidays from './pages/admin/AdminHolidays';
import NotFoundPage from './pages/public/NotFoundPage';

// Protected route
function ProtectedRoute({ children }) {
  return authDB.isLoggedIn() ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  useEffect(() => { initDB(); }, []);

  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="our-team" element={<OurTeamPage />} />
          <Route path="find-help" element={<FindHelpPage />} />
          <Route path="programs" element={<ProgramsPage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="blogs/:id" element={<BlogDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="book-consultation" element={<BookConsultationPage />} />
          <Route path="faqs" element={<FAQsPublicPage />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="doctors/add" element={<AdminAddDoctor />} />
          <Route path="doctors/edit/:id" element={<AdminAddDoctor />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="faqs" element={<AdminFAQs />} />
          <Route path="holidays" element={<AdminHolidays />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
