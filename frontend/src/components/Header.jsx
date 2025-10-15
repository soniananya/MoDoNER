import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import mdonerLogo from '../assets/images/mdoner-logo.png';
import '../App.css';

const Header = ({ user, onLogout }) => {
    const navigate = useNavigate();

    const handleLogoutAndRedirect = () => {
        onLogout();
        navigate('/');
    };

    return (
        <header className="site-header">
            <div className="container header-container">
                <Link to="/" className="logo">
                    <img src={mdonerLogo} alt="MDoNER Logo" />
                </Link>
                <nav className="main-nav">
                    <NavLink to="/">Home</NavLink>
                    {user ? (
                        <>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                            <NavLink to="/analytics">Analytics</NavLink>
                        </>
                    ) : (
                        <a href="/#problem">The Problem</a>
                    )}
                </nav>
                {user ? (
                    <div className="header-user-info">
                        <span className="user-welcome">Welcome, {user.name}</span>
                        <button onClick={handleLogoutAndRedirect} className="cta-button header-cta logout-btn">Logout</button>
                    </div>
                ) : (
                    <Link to="/login" className="cta-button header-cta">Login / Signup</Link>
                )}
            </div>
        </header>
    );
};

export default Header;