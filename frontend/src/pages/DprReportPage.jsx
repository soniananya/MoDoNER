import React from 'react';
import { useParams } from 'react-router-dom';
import { mockDprAnalysis } from '../data/mockAnalysis';
import '../App.css';

const DprReportPage = ({ user }) => {
    const { dprId } = useParams();
    const report = mockDprAnalysis;
    const currentProject = user.projects.find(p => p.id === dprId);
    const currentUserRole = currentProject ? currentProject.role : 'Official';

    const handleExport = () => {
        window.print();
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>Report: {dprId} <span className="role-highlight">{currentUserRole}</span></h1>
                    <p className="header-subtitle">File: {report.dpr_filename}</p>
                </div>
                <button onClick={handleExport} className="cta-button export-button">
                    <i className="fas fa-file-pdf"></i> Export as PDF
                </button>
            </header>

            <div className="dashboard-grid">
                <div className="card">
                    <h3>RAG-Powered Contextual Insights</h3>
                     <ul className="rag-list">{Object.entries(report.rag_status).map(([key, value]) => (<li key={key} className="rag-item"><div className={`rag-dot ${value.status.toLowerCase()}`}></div><div className="rag-content"><div className="rag-title">{key.charAt(0).toUpperCase() + key.slice(1)}</div><div className="rag-details">{value.details}</div></div></li>))}</ul>
                </div>
                
                <div className="card">
                    <h3>Automated Data Extraction</h3>
                    <table className="metadata-table"><tbody>{report.metadata.map(item => (<tr key={item.field}><th>{item.field}</th><td>{item.value}</td></tr>))}</tbody></table>
                </div>

                <div className="card full-width">
                    <h3><i className="fas fa-exclamation-triangle"></i> AI-Powered Risk Prediction</h3>
                    <ul>{report.key_inconsistencies.map(item => (<li key={item.id}><span className={`flag-type ${item.type.toLowerCase()}`}>{item.type}</span>{item.description}{item.recommendation && <p className="recommendation"><strong>Suggestion:</strong> {item.recommendation}</p>}</li>))}</ul>
                </div>

                {currentUserRole === 'Reviewer' && (
                    <div className="card full-width action-panel">
                        <h3>Reviewer Actions</h3>
                        <textarea placeholder="Add your comments here..."></textarea>
                        <div className="action-buttons"><button className="btn-approve">Approve</button><button className="btn-reject">Reject</button></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DprReportPage;