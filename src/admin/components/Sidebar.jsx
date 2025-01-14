import React from 'react';
import { FaBook, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Đảm bảo import CSS

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        
        <Link to="/admin" className="dashboard-link">
          <h2 className="text-white" >Admin Dashboard</h2>
        </Link>
      </div>

      <div className="menu">
        <div className="menu-item">
          <FaBook className="icon" />
          <Link to="/admin/books" className="menu-item-text">Quản lý sách</Link>
        </div>

        <div className="menu-item">
          <FaShoppingCart className="icon" />
          <Link to="/admin/orders" className="menu-item-text">Quản lý đơn hàng</Link>
        </div>

    
        <div className="menu-item">
          <FaSignOutAlt className="icon" />
          <Link to="/" className="menu-item-text">Đăng xuất</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
