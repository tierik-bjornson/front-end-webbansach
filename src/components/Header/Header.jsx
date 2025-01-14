import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../contex/GlobalState";
import tiki_logo from '../../assets/image/Tiki-logo.png';
import data from '../../data/data.json';
import './Header.css';
import LoginPopup from "../LoginPopup/LoginPopup";
import RegisterPopup from "../RegisterPopup/RegisterPopup";

const removeVietnameseTones = (str) => {
  str = str.toLowerCase();
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/Đ/g, 'D');
  return str;
};

function Header() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cart } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  const handleLoginClick = () => {
    setShowLoginPopup(true);
    setIsDropdownOpen(false);
    setShowRegisterPopup(false);
  
  };

  const handleRegisterClick = () => {
    setShowRegisterPopup(true);
    setIsDropdownOpen(false);
    setShowLoginPopup(false);
  };


  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const closeRegisterPopup = () => {
    setShowRegisterPopup(false);
  };

  const handleLogoutClick = () => {
    navigate('/');
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 0) {
      const filteredData = data.filter((productItem) =>
        removeVietnameseTones(productItem.name).includes(removeVietnameseTones(term))
      );
      setSuggestions(filteredData.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (productItemId) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(`/productItem/${productItemId}`);

  };

  return (
    <div className="main-header shadow-sm sticky-top">
      <div className="top-header">
        <div className="container">
          <div className="row">
            {/* Logo */}
            <div className="col-md-1 my-auto d-none d-sm-none d-md-block d-lg-block">
              <Link to="/">
                <img src={tiki_logo} alt="Logo" className="img-fluid" />
              </Link>
            </div>
            {/* Search */}
            <div className="col-md-5 my-auto">
              <form role="search" className="position-relative">
                <div className="input-group" style={{ width: "100%" }}>
                  <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Tìm kiếm"
                    aria-label="Tìm kiếm"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button type="button" className="btn btn-outline-primary">
                    Tìm kiếm
                  </button>
                </div>
                {suggestions.length > 0 && (
                  <ul className="suggestions-list list-group position-absolute">
                    {suggestions.map((productItem) => (
                      <li
                        key={productItem.id}
                        className="list-group-item"
                        onClick={() => handleSuggestionClick(productItem.id)}
                      >
                        <img
                          src={productItem.images[0].small_url}
                          alt={productItem.name}
                          className="suggestion-image"
                        />
                        {productItem.name}
                      </li>
                    ))}
                  </ul>
                )}
              </form>
            </div>
            {/* Navigation */}
            <div className="col my-auto">
              <ul className="nav justify-content-end">
                <li className="head-item">
                  <Link to="/" className="nav-link">
                    <i className="fa fa-home"></i> Trang chủ
                  </Link>
                </li>
                <li
                  className="head-item dropdown position-relative"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <button className="btn btn-primary">
                    <i className="fa fa-user"></i> Tài khoản
                  </button>
                  {isDropdownOpen && (
                    <ul className="dropdown-menu">
                      <li className="dropdown-item" onClick={handleLoginClick}>
                        Login
                      </li>
                      <li
                        className="dropdown-item"
                        onClick={handleRegisterClick}
                      >
                        Register
                      </li>
                      <li className="dropdown-item" onClick={handleLogoutClick}>
                        Logout
                      </li>
                    </ul>
                  )}
                </li>
                <li className="head-item">
                  <Link to="/cart" className="nav-link">
                    <i className="fa fa-shopping-cart"></i> Giỏ hàng
                    <span className="cart-count" style={{ color: "red" }}>
                      ({cart.length})
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <LoginPopup isOpen={showLoginPopup} onClose={closeLoginPopup} onSwitchToRegister={handleRegisterClick} />
      <RegisterPopup isOpen={showRegisterPopup} onClose={closeRegisterPopup} onSwitchToLogin={handleLoginClick}></RegisterPopup>
    </div>
  );
}
export default Header;