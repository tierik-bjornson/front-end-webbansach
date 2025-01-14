import React, { useState } from "react";
import "./CreatePopup.css";

const CreatePopup = ({ book, onSave, onCancel, onChange }) => {
  const [relatedImages, setRelatedImages] = useState([]); // Lưu trữ ảnh liên quan
  const [thumbnail, setThumbnail] = useState(null); // Lưu trữ ảnh thumbnail
  
  if (!book) return null;

  // Handle file change for related images or thumbnail
  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1]; // Chuyển sang base64
        if (type === "thumbnail") {
          setThumbnail(base64Data);
        } else {
          setRelatedImages(prev => [...prev, base64Data]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="popup-wrapper">
      <div className="popup-content">
        <h2 className="popup-title">Thêm sách mới</h2>
        <form className="popup-form">
          {/* Tên sách */}
          <div className="form-group">
            <label htmlFor="name_book">Tên sách</label>
            <input
              type="text"
              id="name_book"
              name="name_book"
              value={book.name_book || ""}
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
              value={book.author || ""}
              onChange={onChange}
              placeholder="Nhập tên tác giả"
              required
            />
          </div>

          {/* Mô tả */}
          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              name="description"
              value={book.description || ""}
              onChange={onChange}
              placeholder="Nhập mô tả về sách"
            />
          </div>

          {/* Thể loại */}
          <div className="form-group">
            <label htmlFor="idGenres">Thể loại</label>
            <select
              id="idGenres"
              name="idGenres"
              multiple
              value={book.idGenres}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <option key={category.idCategory} value={category.idCategory}>
                  {category.nameCategory}
                </option>
              ))}
            </select>
          </div>

          {/* ISBN */}
          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={book.isbn || ""}
              onChange={onChange}
              placeholder="Nhập ISBN của sách"
            />
          </div>

          {/* Giá */}
          <div className="form-group">
            <label htmlFor="list_price">Giá</label>
            <input
              type="number"
              id="list_price"
              name="list_price"
              value={book.list_price || ""}
              onChange={onChange}
              placeholder="Nhập giá của sách"
              min="0"
            />
          </div>

          {/* Số lượng */}
          <div className="form-group">
            <label htmlFor="quantity">Số lượng</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={book.quantity || ""}
              onChange={onChange}
              placeholder="Nhập số lượng sách"
              min="0"
            />
          </div>

          {/* Số lượng đã bán */}
          <div className="form-group">
            <label htmlFor="sold_quantity">Số lượng đã bán</label>
            <input
              type="number"
              id="sold_quantity"
              name="sold_quantity"
              value={book.sold_quantity || ""}
              onChange={onChange}
              placeholder="Nhập số lượng đã bán"
              min="0"
            />
          </div>

          {/* Thêm ảnh thumbnail */}
          <div className="form-group">
            <label htmlFor="thumbnail">Ảnh thumbnail</label>
            <input
              type="file"
              id="thumbnail"
              onChange={(e) => handleImageChange(e, "thumbnail")}
            />
          </div>

          {/* Thêm ảnh liên quan */}
          <div className="form-group">
            <label htmlFor="related_images">Ảnh liên quan</label>
            <input
              type="file"
              multiple
              id="related_images"
              onChange={(e) => handleImageChange(e, "related")}
            />
          </div>

          {/* Nút hành động */}
          <div className="form-actions">
            <button type="button" onClick={() => onSave(book, thumbnail, relatedImages)} className="save-btn">
              Thêm
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

export default CreatePopup;
