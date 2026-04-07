import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import ParticipantDashboard from './pages/ParticipantDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminParticipants from './pages/AdminParticipants';
import AdminSubmissions from './pages/AdminSubmissions';
import AdminSponsors from './pages/AdminSponsors';
import Community from './pages/Community';
import DocsPage from './pages/DocsPage';
import EventsList from './pages/EventsList';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import SubmissionPage from './pages/SubmissionPage';
import ResultsPage from './pages/ResultsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

function ProtectedRoute({ children, role }: { children: React.ReactNode, role?: 'participant' | 'admin' }) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute role="participant">
              <PageTransition><ParticipantDashboard /></PageTransition>
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <PageTransition><AdminDashboard /></PageTransition>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/participants" element={
            <ProtectedRoute role="admin">
              <PageTransition><AdminParticipants /></PageTransition>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/submissions" element={
            <ProtectedRoute role="admin">
              <PageTransition><AdminSubmissions /></PageTransition>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/sponsors" element={
            <ProtectedRoute role="admin">
              <PageTransition><AdminSponsors /></PageTransition>
            </ProtectedRoute>
          } />
          
          <Route path="/events" element={<PageTransition><EventsList /></PageTransition>} />
          <Route path="/events/:id" element={<PageTransition><EventDetail /></PageTransition>} />
          <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
          <Route path="/docs" element={<PageTransition><DocsPage /></PageTransition>} />
          
          <Route path="/submissions" element={
            <ProtectedRoute role="participant">
              <PageTransition><SubmissionPage /></PageTransition>
            </ProtectedRoute>
          } />
          
          <Route path="/results" element={
            <ProtectedRoute>
              <PageTransition><ResultsPage /></PageTransition>
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <PageTransition><ProfilePage /></PageTransition>
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <PageTransition><SettingsPage /></PageTransition>
            </ProtectedRoute>
          } />
          
          {/* Fallback routes */}
          <Route path="/my-events" element={<PageTransition><EventsList /></PageTransition>} />
          <Route path="/my-submissions" element={<Navigate to="/submissions" replace />} />
          <Route path="/participants" element={<AdminDashboard />} />
          <Route path="/sponsors" element={<AdminDashboard />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
