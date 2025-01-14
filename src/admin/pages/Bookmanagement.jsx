import React, { useEffect, useState } from "react";
import { getBooks, updateBook, createBook } from "../../api/bookApi";
import Sidebar from "../components/Sidebar";
import UpdatePopup from "./UpdatePopup";
import CreatePopup from "./CreatePopup";
import "./Bookmanagement.css";

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [updatedBook, setUpdatedBook] = useState({
    name_book: "",
    author: "",
    description: "",
    list_price: "",
    isbn: "",
    quantity: "",
    sold_quantity: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newBook, setNewBook] = useState({
    name_book: "",
    author: "",
    description: "",
    list_price: "",
    isbn: "",
    quantity: "",
    sold_quantity: "",
    idGenres: [], // Lưu genres
    thumbnail: "", // Lưu ảnh thumbnail base64
    relatedImg: [], // Lưu ảnh liên quan base64
  });

  const pageNo = 1;
  const pageSize = 10;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await getBooks(pageNo, pageSize);
        setBooks(result.results);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleEdit = (book) => {
    setEditingBook(book);
    setUpdatedBook({
      name_book: book.name_book,
      author: book.author,
      description: book.description || "",
      isbn: book.isbn || "",
      list_price: book.list_price || "",
      sold_quantity: book.sold_quantity || "",
      quantity: book.quantity || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updated = await updateBook(editingBook.id_book, updatedBook);
      const updatedBooks = books.map((book) =>
        book.id_book === editingBook.id_book ? updated : book
      );
      setBooks(updatedBooks);
      setEditingBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
      setError(error);
    }
  };

  const handleAddBook = async () => {
    try {
      const createdBook = await createBook(newBook);
      setBooks((prev) => [...prev, createdBook]);
      setIsAdding(false);
      setNewBook({
        name_book: "",
        author: "",
        description: "",
        list_price: "",
        isbn: "",
        quantity: "",
        sold_quantity: "",
        idGenres: [],
        thumbnail: "",
        relatedImg: [],
      });
    } catch (error) {
      console.error("Error creating book:", error);
      setError(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="book-management-container">
      <Sidebar />
      <div className="content">
        <h2>Quản lý sách</h2>
        <button className="add-btn" onClick={() => setIsAdding(true)}>
          Thêm sách mới
        </button>
        <table className="book-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sách</th>
              <th>Tác giả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book.id_book}>
                  <td>{book.id_book}</td>
                  <td>{book.name_book}</td>
                  <td>{book.author}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(book)}>
                      Sửa
                    </button>
                    <button className="delete-btn">Xóa</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Không có sách nào.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Sử dụng UpdatePopup */}
        {editingBook && (
          <UpdatePopup
            book={editingBook}
            updatedBook={updatedBook}
            onSave={handleSave}
            onCancel={() => setEditingBook(null)}
            onChange={handleChange}
          />
        )}

        {/* Sử dụng CreatePopup */}
        {isAdding && (
          <CreatePopup
            book={newBook}
            onSave={handleAddBook}
            onCancel={() => setIsAdding(false)}
            onChange={handleAddChange}
          />
        )}
      </div>
    </div>
  );
};

export default BookManagement;
