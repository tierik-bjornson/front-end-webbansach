import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./ItemDetail.css";
import { GlobalContext } from "../contex/GlobalState";
import { getBookById, getBookImages, addToCart } from "../../api/bookApi";

function ItemDetail() {
  const [itemDetails, setItemDetails] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const { id } = useParams(); 
  const [errorMessage, setErrorMessage] = useState("");

  
  const handleAddtoBag = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setErrorMessage("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }

    const userId = user.id;

    const cartItems = [
        {
          book: {
            idBook: parseInt(itemDetails.id_book, 10), 
          },
          quantity: 1
        }]
      ;

    console.log("Request data:", cartItems); 

    try {
      const addedItems = await addToCart(userId, cartItems);
      setIsAdded(true);
      setErrorMessage(""); 
    } catch (error) {
      console.error("Lỗi khi thêm sách vào giỏ hàng:", error);
      setErrorMessage("Không thể thêm vào giỏ hàng. Vui lòng thử lại!");
    }
};

  const SpecItem = ({ name, value }) => (
    <div>
      <span className="spec-name">{name}</span>
      <span className="spec-value">{value}</span>
    </div>
  );

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const fetchedDetails = await getBookById(id);
        setItemDetails(fetchedDetails);

      
        const images = await getBookImages(id);

    
        const thumbnail = images.find((image) => image.is_thumbnail);

     
        if (thumbnail) {
          setThumbnailImage(
            thumbnail.url_image || `data:image/jpeg;base64,${thumbnail.data_image}`
          );
        }
      } catch (error) {
        console.error("Error fetching book details or images", error);
      }
    };

    fetchItem();
  }, [id]);


  useEffect(() => {
    if (itemDetails && JSON.parse(localStorage.getItem("cart"))?.some((cartItem) => cartItem.id_book === itemDetails.id_book)) {
      setIsAdded(true); 
    }
  }, [itemDetails]);

  if (!itemDetails) {
    return <div>Loading item details...</div>;
  }

  return (
    <div className="item-detail-container">
      <Link to="/">&#8592; Back</Link>
      <div className="item-detail">
        <div className="row">
          <div className="col-md-4 box-shadow h-100">
            <div className="item-detail-image">
              {/* Hiển thị hình ảnh thumbnail từ API */}
              {thumbnailImage ? (
                <img src={thumbnailImage} alt="Book Thumbnail" style={{ width: "100%" }} />
              ) : (
                <div>Không có hình ảnh</div>
              )}
              <div>Ảnh bìa</div>
            </div>
          </div>
          <div className="col-md-4 h-100">
            <div className="col box-shadow h-100 d-flex flex-column justify-content-center">
              <div className="item-detail-info">
                <div className="ProductItem-name">{itemDetails.name_book}</div>
                <div className="ProductItem-rating">{itemDetails.avg_rating}&#9733;</div>
                <div className="ProductItem-sold">Đã bán {itemDetails.sold_quantity}</div>
                <div className="ProductItem-price">{itemDetails.list_price} VND</div>
                {itemDetails.specifications && (
                  <div className="item-special">
                    <h4>Thông tin chi tiết</h4>
                    <ul>
                      {itemDetails.specifications[0].attributes.map((spec) => (
                        <li key={spec.code}>
                          <SpecItem name={spec.name} value={spec.value} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="col box-shadow h-100">
              <div className="item-detail-info">
                <div className="item-description">
                  <h2>Mô tả sản phẩm</h2>
                  <div>{itemDetails.description.replace(/<\/?p>/g, "")}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 box-shadow h-100">
            <div className="item-detail-info">
              <div className="ProductItem-price">{itemDetails.list_price} VND</div>
              <button
                className="ProducItem-btn"
                disabled={isAdded}
                onClick={handleAddtoBag}>
                {isAdded ? "Added to Cart" : "Add to Bag"}
              </button>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              {isAdded && (
                <Link to="/cart">
                  <button className="ProducItem-btn">Go to cart</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
