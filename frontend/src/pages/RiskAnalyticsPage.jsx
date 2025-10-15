import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { mockAggregateData } from '../data/mockAggregateData';
import '../App.css';

const PIE_COLORS = ['#0d6efd', '#fd7e14', '#6c757d'];

const RiskAnalyticsPage = () => {
  const { budgetStatus, costByState, riskOverTime } = mockAggregateData;

  const handleExport = () => {
    window.print();
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
            <h1>Aggregate Analytics & Insights</h1>
            <p className="header-subtitle">Cross-project analysis of all DPR evaluations in the system.</p>
        </div>
        <button onClick={handleExport} className="cta-button export-button">
            <i className="fas fa-file-pdf"></i> Export as PDF
        </button>
      </header>
      <div className="dashboard-grid">
        <div className="card">
          <h3>Budget Completion Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={budgetStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#8884d8" paddingAngle={5}>
                {budgetStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip /> <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3>Average Project Cost by State</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costByState}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" fontSize={12} />
              <YAxis label={{ value: 'In Crores (₹)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => `₹${value} Cr`} />
              <Bar dataKey="cost" fill="#0d6efd" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card full-width">
          <h3>Risk Categories Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis /> <Tooltip /> <Legend />
              <Line type="monotone" dataKey="HighRisk" name="High Risk" stroke="#d32f2f" strokeWidth={2} />
              <Line type="monotone" dataKey="MediumRisk" name="Medium Risk" stroke="#fbc02d" strokeWidth={2} />
              <Line type="monotone" dataKey="LowRisk" name="Low Risk" stroke="#388e3c" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalyticsPage;