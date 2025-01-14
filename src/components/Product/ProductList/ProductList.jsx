import React, { useEffect, useState } from "react";
import ProductItem from "../productItem/ProductItem";
import "./ProductList.css";
import { getBooks, getBookImages} from "../../../api/bookApi"; // Import hàm lấy sách từ API

function ProductList() {
  const [data, setData] = useState([]); // Khởi tạo state để lưu trữ dữ liệu sách
  const [loading, setLoading] = useState(true); // Khởi tạo trạng thái loading
  const [error, setError] = useState(null); // Khởi tạo trạng thái lỗi

  // Thêm các tham số phân trang, tìm kiếm, v.v.
  const pageNo = 1;
  const pageSize = 12;
  const keyword = ""; // Có thể thay đổi tùy vào nhu cầu tìm kiếm
  const idCategory = ""; // Có thể thay đổi nếu cần lọc theo thể loại
  const sort = ""; // Có thể thay đổi nếu cần sắp xếp kết quả

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching books data...");
      try {
        // Gọi hàm lấy sách từ API
        const result = await getBooks(pageNo, pageSize, keyword, idCategory, sort);
        console.log("Books data fetched successfully:", result); // Log dữ liệu nhận được từ API
        const booksWithImages = await Promise.all(
          result.results.map(async (book) => {
            const images = await getBookImages(book.id_book); // Lấy hình ảnh từ API cho mỗi sách
            // Lọc hình ảnh thumbnail hoặc sử dụng hình ảnh đầu tiên trong danh sách
            const thumbnail = images.find(image => image.is_thumbnail) || images[0];
            return {
              ...book,
              thumbnail: thumbnail ? thumbnail.url_image || `data:image/jpeg;base64,${thumbnail.data_image}` : ""
            };
          })
        );
        setData(booksWithImages); // Cập nhật dữ liệu vào state
        setLoading(false); // Đặt trạng thái loading là false khi có dữ liệu
      } catch (error) {
        console.error("Error fetching books data:", error); // Log lỗi nếu có
        setError(error); // Nếu có lỗi, lưu lỗi vào trạng thái
        setLoading(false); // Đặt trạng thái loading là false khi có lỗi
      }
    };

    fetchData(); // Gọi hàm fetchData khi component mount
  }, []); // Mảng phụ thuộc rỗng, chỉ gọi 1 lần khi component mount

  // Nếu đang tải, hiển thị "Loading..."
  if (loading) {
    console.log("Loading data...");
    return <div>Loading...</div>;
  }

  // Nếu có lỗi, hiển thị thông báo lỗi
  if (error) {
    console.error("Error state encountered:", error);
    return <div>Error: {error.message}</div>;
  }

  console.log("Final books data to render:", data);

  return (
    <div className="row d-flex flex-wrap">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((productitem) => (
          <div className="col-sm-6 col-md-4 col-lg-3 p-1" key={productitem.id_book}>
            <ProductItem
              id={productitem.id_book}
              name={productitem.name_book}
              rating={productitem.avg_rating}
              price={productitem.list_price}
              image={productitem.thumbnail} // Sử dụng thumbnail từ API
              sold={productitem.sold_quantity}
            />
          </div>
        ))
      ) : (
        <div>No products available</div> // Hiển thị thông báo khi không có sản phẩm
      )}
    </div>
  );
}

export default ProductList;
