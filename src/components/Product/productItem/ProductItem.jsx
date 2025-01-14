import React from "react";
import './ProductItem.css';
import { Link } from "react-router-dom";
function ProductItem({ id,name, rating, price, image, sold }) {
    return (
        <div className="ProductItem-card">
            <img src={image} className="card-img-top" alt="Item Image" width="100%" />
            <div className="ProductItem-name text-dark">{name}</div>
            <div className="ProductItem-info text-dark">
                <div className="ProductItem-rating">
                    <span className="rating-value">{rating}</span>
                    <span className="rating-star">&#9733;</span>
                </div>
                <div className="ProductItem-sold">Đã bán {sold}</div>
            </div>
            <div className="ProductItem-price">{price}VND</div>
            <Link to={`/ProductItem/${id}`} className="btn btn-primary">
                Chi tiết sản phẩm
            </Link>
        </div>
    );
}

export default ProductItem;

