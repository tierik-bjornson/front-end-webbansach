import React, { useState } from "react";
import "./LoginPopup.css";
import authApi from "../../api/authApi";

const LoginPopup = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    username: "", 
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  
  const [successMessage, setSuccessMessage] = useState(""); 

  if (!isOpen) return null;

  // Xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await authApi.login(formData); 
      
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("user", JSON.stringify(response.data.user)); 

      console.log("Login successful:", response.data);
      setSuccessMessage("Đăng nhập thành công"); 
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 3000);
      console.log("Success message set:", successMessage);
      
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="login-popup-overlay">
      <div className="login-popup">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Login Form</h2>

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
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Login</button>
        </form>
        <p>
          Not a member?{" "}
          <a href="#" onClick={onSwitchToRegister}>
            Register now
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
