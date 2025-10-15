import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/northeast-hero.jpg';
import '../App.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="hero" id="home" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Intelligent DPR Evaluation System</h1>
          <p>An AI-powered platform to streamline project approval, ensure compliance, and predict risks for the North Eastern Region.</p>
          <Link to="/login" className="cta-button hero-cta">
            Get Started
          </Link>
        </div>
      </section>

      <section className="problem" id="problem">
        <div className="container">
          <div className="section-title-container">
            <h2 className="section-title">The Core Challenges in DPR Evaluation</h2>
          </div>
          <div className="grid-container">
             <div className="card">
              <i className="fas fa-layer-group"></i>
              <h3>Manual Bottlenecks</h3>
              <p>Time-intensive manual reviews lead to project delays and impact regional development goals.</p>
            </div>
            <div className="card">
              <i className="fas fa-file-alt"></i>
              <h3>Inconsistent Quality</h3>
              <p>Reports vary in structure and completeness, making standardized evaluation nearly impossible.</p>
            </div>
            <div className="card">
              <i className="fas fa-exclamation-triangle"></i>
              <h3>Hidden Risks</h3>
              <p>Manual reviews struggle to accurately assess feasibility, cost estimates, and potential risks like cost overruns.</p>
            </div>
            <div className="card">
              <i className="fas fa-brain"></i>
              <h3>Lack of Insights</h3>
              <p>Decision-makers lack the data-backed insights needed to approve high-quality, impactful projects efficiently.</p>
            </div>
          </div>
        </div>
      </section>
    </div> // This closing div was missing. It is now fixed.
  );
};

export default HomePage;