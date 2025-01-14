 import React from "react"
 import './footer.css'
 import logoCongthuong from '../../assets/image/BoCongThuong.png'
 import logoFacebook from '../../assets/image/Facebook_Logo_(2019).png.webp'
 import logoYoutube from '../../assets/image/logo-youtube-vector-4.jpg'
 import logoZalo from '../../assets/image/logo-zalo-02.jpg'
 
function Footer()
{
    return( 
        <footer> 
        <div className="d-none d-md-flex footer">
            <div className="footer-collum">
                <h4>Hỗ trợ khách hàng</h4>
                    <p>Hotline: 1900-6035</p>
                    <p>(1000 đ/phút, 8-21h kể cả T7, CN)</p>
                    <p>Các câu hỏi thường gặp</p>
                    <p>Gửi yêu cầu hỗ trợ</p>
                    <p>Hướng dẫn đặt hàng</p>
                    <p>Phương thức vận chuyển</p>
                    <p>Chính sách đổi trả</p>
                    <p>Hướng dẫn trả góp</p>
                    <p>Chính sách hàng nhập khẩu</p>
                    <p>Hỗ trợ khách hàng: hotro@tiki.vn</p>
                    <p>Báo lỗi bảo mật: security@tiki.vn</p>
            </div>
            <div className="footer-collum">
                <h4>Về Tiki</h4>
                    <p>Giới thiệu Tiki</p>
                    <p>Tiki Blog</p>
                    <p>Tuyển dụng</p>
                    <p>Chính sách bảo mật và thanh toán</p>
                    <p>Chính sách bảo mật thông tin cá nhân</p>
                    <p>Chính sách giải quyết khiếu nại</p>
                    <p>Điều khoản sử dụng</p>
                    <p>Giới thiệu Tiki xu</p>
                    <p>Gói hội viên vip</p>
                    <p>Tiếp thị liên kết cùng Tiki</p>
                    <p>Bán hàng doanh nghiệp</p>
                    <p>Điều kiện vận chuyển</p>
            </div>
            <div className="footer-collum">
                <h4>Hợp tác và liên kết</h4>
                    <p>Quy chế hoạt động sàn GDTMĐT</p>
                    <p>Bán hàng cùng Tiki</p>
                <h4>Chứng nhận bởi</h4>
                <img className="cretificate-image" src={logoCongthuong} alt="Chung nhan bo cong thuong"/>
            </div>
            <div className="footer-collum">
                <h4>Phương thức thanh toán</h4>
                <h5>Dịch vụ giao hàng</h5>
            </div>
            <div className="footer-collum">
                <h4>Kết nối với chúng tôi</h4>
                <div className="social-media">
                    <img className="cretificate-image-MXH" src={logoFacebook} alt="link facebook"/>
                    <img className="cretificate-image-MXH" src={logoYoutube} alt="link youtube"/>
                    <img className="cretificate-image-MXH" src={logoZalo} alt="link zalo"/>
                </div>
                <h4>Tải ứng dụng trên điện thoại</h4>
            </div>
            </div>
            <div className="footer-bottom">
                <hr className="footer-divider"/>
                <div className="footer-into">
                    <h4>Công ty TNHH TIKI</h4>
                        <p>Địa chỉ trụ sở: Tòa nhà Viettel, Số 285, Đường Cách Mạng Tháng 8, Phường 12, Quận 10, Thành phố Hồ Chí Minh</p>
                        <p>Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch và Đầu Tư Thành phố Hồ Chí Minh cấp lần đầu vào ngày 06/01/2010.</p>
                        <p>Hotline: 1900 6035</p>
                </div>
                <hr className="footer-divider"/>
            </div>
        </footer>
    );
}

export default Footer;