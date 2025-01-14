import React, { useState } from "react";
import "./RegisterPopup.css";
import authApi from "../../api/authApi"; // Đường dẫn tới file API

const RegisterPopup = ({ isOpen, onClose, onSwitchToLogin }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    phone_number: "",
    purchase_address: "",
    delivery_address: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Thêm state cho thông báo thành công

  // Hàm xử lý thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm kiểm tra email
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  // Hàm xử lý đăng ký
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage(""); // Reset success message khi bắt đầu đăng ký

    const {
      username,
      email,
      password,
      confirmPassword,
      first_name,
      last_name,
      date_of_birth,
      phone_number,
      purchase_address,
      delivery_address,
    } = formData;

    // Kiểm tra dữ liệu
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!username || !first_name || !last_name || !date_of_birth || !phone_number || !purchase_address || !delivery_address) {
      setErrorMessage("All fields are required.");
      return;
    }


    try {
      const response = await authApi.register({
        username,
        email,
        password,
        first_name,
        last_name,
        date_of_birth,
        phone_number,
        purchase_address,
        delivery_address,
      });
      console.log("Registration successful:", response.data);

     
      setSuccessMessage("Đăng ký thành công!");

      setTimeout(() => {
        setSuccessMessage(""); 
      }, 3000); 

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        phone_number: "",
        purchase_address: "",
        delivery_address: "",
      });

    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-popup-overlay">
      <div className="register-popup">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Register Form</h2>
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Hiển thị thông báo thành công */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="first_name">First Name:</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Enter your first name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Enter your last name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date_of_birth">Date of Birth:</label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              placeholder="Enter your phone number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="purchase_address">Purchase Address:</label>
            <input
              type="text"
              id="purchase_address"
              name="purchase_address"
              placeholder="Enter your purchase address"
              value={formData.purchase_address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="delivery_address">Delivery Address:</label>
            <input
              type="text"
              id="delivery_address"
              name="delivery_address"
              placeholder="Enter your delivery address"
              value={formData.delivery_address}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <p>
          Already a member? <a href="#" onClick={onSwitchToLogin}>Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPopup;
