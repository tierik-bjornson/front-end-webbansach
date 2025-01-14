import axios from 'axios';


const API_URL = 'http://localhost:8080/';  


const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem('access_token');
    if (token) {
     
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Hàm lấy tất cả sách
export const getBooks = async (pageNo = 1, pageSize = 12, keyword = '', idCategory = '', sort = '') => {
    try {
        const response = await apiClient.get(`/books/`, {
            params: { pageNo, pageSize, keyword, idCategory, sort },
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy sách:', error);
        throw error;
    }
};

// Hàm lấy thông tin chi tiết một cuốn sách theo ID
export const getBookById = async (id) => {
    try {
        const response = await apiClient.get(`/books/${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi lấy sách với ID ${id}:`, error);
        throw error;
    }
};

// Hàm tạo sách mới
export const createBook = async (bookData) => {
    try {
        const response = await apiClient.post(`/book/save/`, bookData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo sách:', error);
        throw error;
    }
};

// Hàm cập nhật sách
export const updateBook = async (id, bookData) => {
    try {
        const response = await apiClient.put(`/book/update/${id}/`, bookData);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi cập nhật sách với ID ${id}:`, error);
        throw error;
    }
};

// Hàm lấy tổng số sách
export const getTotalBooks = async () => {
    try {
        const response = await apiClient.get(`/book/get-total`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy tổng số sách:', error);
        throw error;
    }
};

// Hàm lấy sách hot
export const getHotBooks = async () => {
    try {
        const response = await apiClient.get(`/books/hot_books`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy sách hot:', error);
        throw error;
    }
};

// Hàm lấy tất cả thể loại sách
export const getCategories = async () => {
    try {
        const response = await apiClient.get(`/categories/`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy thể loại sách:', error);
        throw error;
    }
};

// Hàm lấy hình ảnh sách theo ID sách
export const getBookImages = async (bookId) => {
    try {
        const response = await apiClient.get(`/images/book/${bookId}/`);
        console.log(response.data);  
        return response.data;  
       
    } catch (error) {
        console.error(`Lỗi khi lấy hình ảnh cho sách với ID ${bookId}:`, error);
        throw error;
    }
};

// Hàm tạo thể loại sách mới
export const createCategory = async (categoryData) => {
    try {
        const response = await apiClient.post(`/categorie/`, categoryData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo thể loại:', error);
        throw error;
    }
};

// Hàm cập nhật thể loại sách
export const updateCategory = async (categoryId, categoryData) => {
    try {
        const response = await apiClient.put(`/categorie/${categoryId}/`, categoryData);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi cập nhật thể loại với ID ${categoryId}:`, error);
        throw error;
    }
};

// Hàm thêm sách vào giỏ hàng của người dùng
export const addToCart = async (userId, cartItems) => {
    try {
        const response = await apiClient.post(`/cart-item/add_to_cart/${userId}/`, cartItems);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi thêm sách vào giỏ hàng:', error);
        throw error;
    }
};

// Hàm cập nhật số lượng sách trong giỏ hàng
export const updateCartItem = async (cartId, userId, quantity) => {
    try {
        const response = await apiClient.put(`/cart-items/update_cart_item/${cartId}/${userId}/`, {
            quantity: quantity
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm trong giỏ hàng:', error);
        throw error;
    }
};

// Hàm lấy giỏ hàng của người dùng
export const getCartByUser = async (userId) => {
    try {
        const response = await apiClient.get(`/cart-item/user/${userId}/`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy giỏ hàng của người dùng:', error);
        throw error;
    }
};
