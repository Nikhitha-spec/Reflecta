import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JournalPage from './pages/JournalPage';
import VoiceJournalPage from './pages/VoiceJournalPage';
import ConnectionsPage from './pages/ConnectionsPage';
import RequestsPage from './pages/RequestsPage';
import WellnessHubPage from './pages/WellnessHubPage';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import CommunityChatPage from './pages/CommunityChatPage';
import { ThemeProvider } from './contexts/ThemeContext';
import AboutUsPage from './pages/AboutUsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

const AppLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-background/90 dark:bg-dark-background/90 backdrop-blur-sm">
    <Header />
    <main className="flex-grow container mx-auto px-4 py-8">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const ChatLayout: React.FC = () => (
  <div className="flex flex-col h-screen bg-background/90 dark:bg-dark-background/90 backdrop-blur-sm">
    <Header />
    <main className="flex-grow container mx-auto px-4 pt-4 pb-8 overflow-hidden">
      <Outlet />
    </main>
    {/* No Footer in Chat Layout */}
  </div>
);


const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <AuthProvider>
          <AppProvider>
            <Routes>
              {/* Standalone auth routes */}
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected app routes */}
              <Route element={<ProtectedRoute />}>
                {/* Chat routes with ChatLayout */}
                <Route element={<ChatLayout />}>
                  <Route path="/chat/:id" element={<ChatPage />} />
                  <Route path="/chat" element={<CommunityChatPage />} />
                </Route>
                
                {/* Other routes with AppLayout */}
                <Route element={<AppLayout />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/journal" element={<JournalPage />} />
                  <Route path="/voice" element={<VoiceJournalPage />} />
                  <Route path="/connect" element={<ConnectionsPage />} />
                  <Route path="/requests" element={<RequestsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/wellness" element={<WellnessHubPage />} />
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsOfServicePage />} />
                </Route>
              </Route>
            </Routes>
          </AppProvider>
        </AuthProvider>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;