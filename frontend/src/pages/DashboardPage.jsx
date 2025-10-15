import React from 'react';
import { Link } from 'react-router-dom';
import DprUploader from '../components/DprUploader';
import '../App.css';

const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
        case 'architecture': return 'fa-building';
        case 'health': return 'fa-medkit';
        case 'infrastructure': return 'fa-road';
        default: return 'fa-folder';
    }
};

const DashboardPage = ({ user }) => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {user.name}</h1>
                <p className="header-subtitle">Upload a new DPR for analysis or review your existing projects below.</p>
            </header>

            
            <DprUploader />

            <div className="projects-section">
                <h2>Your Projects</h2>
                <div className="projects-grid">
                    {user.projects.map(project => (
                        <Link to={`/report/${project.id}`} key={project.id} className="project-card">
                            <div className="project-card-header">
                                <i className={`fas ${getCategoryIcon(project.category)}`}></i>
                                <span className={`status-pill ${project.status.toLowerCase().replace(' ', '-')}`}>{project.status}</span>
                            </div>
                            <div className="project-card-body">
                                <span className="project-category">{project.category}</span>
                                <h3>{project.name}</h3>
                                <p className="project-id">{project.id}</p>
                            </div>
                            <div className="project-card-footer">
                                <span>Your Role:</span>
                                <span className="role-tag">{project.role}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;