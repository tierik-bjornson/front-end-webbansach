import React, { useState, useEffect } from "react";
import data from '../../data/data.json';
import ProductList from "../Product/ProductList/ProductList";

function HomePage() {
  const [filteredItems, setFilteredItems] = useState(data);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  const handleCategoryChange = (category) => {
    const index = selectedCategories.indexOf(category);
    if (index === -1) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      const updatedCategories = [...selectedCategories];
      updatedCategories.splice(index, 1);
      setSelectedCategories(updatedCategories);
    }
  };

  const handleRatingChange = (rating) => {
    if (selectedRating === rating) {
      setSelectedRating(null);
    } else {
      setSelectedRating(rating);
    }
  };

  useEffect(() => {
    let filtered = data;
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((productItem) =>
        selectedCategories.includes(productItem.categories.name)
      );
    }
    if (selectedRating !== null) {
      filtered = filtered.filter((productItem) => productItem.rating_average >= selectedRating);
    }
    setFilteredItems(filtered);
  }, [selectedCategories, selectedRating]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-4 col-12 mb-3">
          <div className="filter-container card box-shadow">
            <div className="card-body">
              <h3>Danh mục sản phẩm</h3>
              {data.reduce((acc, productItem) => {
                const categoryName = productItem.categories.name;
                if (!acc.includes(categoryName)) {
                  acc.push(categoryName);
                }
                return acc;
              }, []).map((category) => (
                <div key={category} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label className="form-check-label" htmlFor={category}>
                    {category}
                  </label>
                </div>
              ))}
              <h3>Đánh giá</h3>
              {[5, 4, 3].map((rating) => (
                <div key={rating} className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id={`rating-${rating}`}
                    checked={selectedRating === rating}
                    onChange={() => handleRatingChange(rating)}
                  />
                  <label className="form-check-label" htmlFor={`rating-${rating}`}>
                    {rating} sao trở lên
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-8 col-12">
          <ProductList data={filteredItems} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
