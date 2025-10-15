import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import RiskAnalyticsPage from './pages/RiskAnalyticsPage';
import DprReportPage from './pages/DprReportPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot'; 
import './App.css';

function App() {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => setUser(userData);
    const handleLogout = () => setUser(null);

    return (
        <Router>
            <div className="App">
                <Header user={user} onLogout={handleLogout} />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage onLoginSuccess={handleLogin} />} />
                        <Route path="/dashboard" element={user ? <DashboardPage user={user} /> : <Navigate to="/login" />} />
                        <Route path="/analytics" element={user ? <RiskAnalyticsPage /> : <Navigate to="/login" />} />
                        <Route path="/report/:dprId" element={user ? <DprReportPage user={user} /> : <Navigate to="/login" />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
                <Footer />
                <Chatbot />
            </div>
        </Router>
    );
}

export default App;