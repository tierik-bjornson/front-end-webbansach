import React from "react";
import "./UpdatePopup.css";

const UpdatePopup = ({  book, updatedBook, onSave, onCancel, onChange }) => {
  if (!book) return null; // Nếu không có sách để cập nhật, không hiển thị gì

  return (
    <div className="popup-wrapper">
      <div className="popup-content">
        <h2 className="popup-title">Cập nhật sách</h2>
        <form className="popup-form">
          {/* Tên sách */}
          <div className="form-group">
            <label htmlFor="name_book">Tên sách</label>
            <input
              type="text"
              id="name_book"
              name="name_book"
              value={updatedBook.name_book || ''}
              onChange={onChange}
              placeholder="Nhập tên sách"
              required
            />
          </div>

          {/* Tác giả */}
          <div className="form-group">
            <label htmlFor="author">Tác giả</label>
            <input
              type="text"
              id="author"
              name="author"
              value={updatedBook.author || ''}
              onChange={onChange}
              placeholder="Nhập tên tác giả"
              required
            />
          </div>

          {/* ISBN */}
          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={updatedBook.isbn || ''}
              onChange={onChange}
              placeholder="Nhập ISBN"
            />
          </div>

          {/* Giá gốc */}
          <div className="form-group">
            <label htmlFor="list_price">Giá gốc</label>
            <input
              type="number"
              id="list_price"
              name="list_price"
              value={updatedBook.list_price}
              onChange={onChange}
              placeholder="Nhập giá gốc"
              required
            />
          </div>

          {/* Số lượng */}
          <div className="form-group">
            <label htmlFor="quantity">Số lượng</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={updatedBook.quantity || ''}
              onChange={onChange}
              placeholder="Nhập số lượng"
              required
            />
          </div>


          {/* Mô tả */}
          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              name="description"
              value={updatedBook.description || ''}
              onChange={onChange}
              placeholder="Nhập mô tả"
            ></textarea>
          </div>

          {/* Nút hành động */}
          <div className="form-actions">
            <button type="button" onClick={onSave} className="save-btn">
              Lưu
            </button>
            <button type="button" onClick={onCancel} className="cancel-btn">
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePopup;
