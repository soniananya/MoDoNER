import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mdonerLogo from '../assets/images/mdoner-logo.png';
import '../App.css';
import { mockUser } from '../data/mockUserData';

const LoginPage = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            onLoginSuccess(mockUser); 
            navigate('/dashboard');
        } else {
            alert('Please enter an email.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <img src={mdonerLogo} alt="MDoNER Logo" className="logo-img" />
                    <h2>Intelligent DPR Portal</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <h3>Portal Login</h3>
                    <div className="form-group">
                        <label htmlFor="login-email">Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <input type="password" required />
                    </div>
                    <button type="submit" className="submit-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;