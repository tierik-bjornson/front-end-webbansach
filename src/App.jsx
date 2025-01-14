import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/MainDasbroad/HomePage';
import Header from './components/Header/Header';
import ItemDetail from './components/itemDetail/ItemDetail';
import Footer from './components/footer/footer';
import Cart from './components/Cart/Cart';
import Checkout from './components/checkout/Checkout';
import Orders from './components/Order/Order';
import LoginPopup from './components/LoginPopup/LoginPopup';
import RegisterPopup from './components/RegisterPopup/RegisterPopup';
import AdminDashboard from './admin/pages/dashboard';
import BookManagement from './admin/pages/Bookmanagement';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  return (
    <>
      {showLogin && (
        <LoginPopup
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={handleRegisterClick}
        />
      )}
      {showRegister && (
        <RegisterPopup
          isOpen={showRegister}
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={handleLoginClick}
        />
      )}

      <div>
        <BrowserRouter>
          <Routes>
            {/* Trang không có Header và Footer */}
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path="/admin/books" element={<BookManagement />} />

            {/* Các trang có Header và Footer */}
            <Route
              path='/'
              element={
                <>
                  <Header setShowLogin={setShowLogin} setShowRegister={setShowRegister} />
                  <HomePage />
                  <Footer />
                </>
              }
            />
            <Route
              path='/ProductItem/:id'
              element={
                <>
                  <Header setShowLogin={setShowLogin} setShowRegister={setShowRegister} />
                  <ItemDetail />
                  <Footer />
                </>
              }
            />
            <Route
              path='/cart'
              element={
                <>
                  <Header setShowLogin={setShowLogin} setShowRegister={setShowRegister} />
                  <Cart />
                  <Footer />
                </>
              }
            />
            <Route
              path='/checkout'
              element={
                <>
                  <Header setShowLogin={setShowLogin} setShowRegister={setShowRegister} />
                  <Checkout />
                  <Footer />
                </>
              }
            />
            <Route
              path='/Order'
              element={
                <>
                  <Header setShowLogin={setShowLogin} setShowRegister={setShowRegister} />
                  <Orders />
                  <Footer />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
