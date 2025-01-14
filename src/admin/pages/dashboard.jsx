import React from 'react';
import Sidebar from '../components/Sidebar.jsx';
import { FaBook, FaUser, FaDollarSign } from 'react-icons/fa';
import './dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <h1 className="dashboard-title">Dashboard</h1>

        {/* Cards for Statistics */}
        <div className="stats-cards">
          {/* Card 1: Total Books */}
          <div className="card">
            <h3 className="card-title">Total Books</h3>
            <div className="card-content">
              <FaBook className="card-icon" />
              <div className="card-details">
                <p className="card-number">120</p>
                <p className="card-description">Books in the system</p>
              </div>
            </div>
          </div>

          {/* Card 2: Total Users */}
          <div className="card">
            <h3 className="card-title">Total Users</h3>
            <div className="card-content">
              <FaUser className="card-icon" />
              <div className="card-details">
                <p className="card-number">200</p>
                <p className="card-description">Registered users</p>
              </div>
            </div>
          </div>

          {/* Card 3: Revenue */}
          <div className="card">
            <h3 className="card-title">Revenue</h3>
            <div className="card-content">
              <FaDollarSign className="card-icon" />
              <div className="card-details">
                <p className="card-number">$5000</p>
                <p className="card-description">Total sales revenue</p>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;
