import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { getCartByUser, updateCartItem } from "../../api/bookApi";
import LoginPopup from "../LoginPopup/LoginPopup";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

 
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setShowLoginPopup(true); 
      fetchCart(userId); 
    }
  }, [userId]);


  const fetchCart = async (userId) => {
    try {
      setLoading(true);
      const data = await getCartByUser(userId); 
      if (data && Array.isArray(data)) {
        setCartItems(data); 
        calculateTotalPrice(data); 
      }
    } catch (error) {
      setError("Không thể tải giỏ hàng. Vui lòng thử lại sau.");
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.quantity * item.book.list_price,
      0
    );
    setTotalPrice(total);
  };

  const handleUpdateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(cartId, userId, newQuantity);
      const updatedItems = cartItems.map((item) =>
        item.idCart === cartId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);
    } catch (error) {
      setError("Không thể cập nhật số lượng. Vui lòng thử lại.");
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (cartId) => {
    try {
      const updatedItems = cartItems.filter((item) => item.idCart !== cartId);
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);
    } catch (error) {
      setError("Không thể xóa sản phẩm. Vui lòng thử lại.");
      console.error("Error removing item:", error);
    }
  };

  
  const handleLoginSuccess = () => {
    setShowLoginPopup(false);
    fetchCart(userId); 
  };

 
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {showLoginPopup && (
        <LoginPopup
          isOpen={showLoginPopup}
          onClose={() => setShowLoginPopup(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      <nav className="mb-6">
        <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại trang chủ
        </Link>
      </nav>

      <div className="bg-white rounded-lg shadow p-6">
        <header className="flex items-center mb-6">
          <ShoppingCart className="w-6 h-6 mr-2" />
          <h1 className="text-2xl font-bold">Giỏ Hàng</h1>
        </header>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
            {error}
          </div>
        )}

        {!userId ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Vui lòng đăng nhập để xem giỏ hàng của bạn</p>
            <button
              onClick={() => setShowLoginPopup(true)}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Đăng nhập ngay
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống</p>
            <Link to="/books" className="text-blue-600 hover:text-blue-800 underline">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.idCart} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.book.name_book}</h3>
                    <p className="text-gray-600">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.book.list_price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => handleUpdateQuantity(item.idCart, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.idCart, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.idCart)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Tổng tiền:</span>
                <span className="text-xl font-bold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPrice)}
                </span>
              </div>

              <Link to="/checkout">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Tiến hành thanh toán
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
