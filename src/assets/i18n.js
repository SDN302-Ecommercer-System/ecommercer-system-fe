import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      shop: "Shop",
      searchPlaceHolder: "Search for products",
      search: "Search",
      account: "Account",
      cart: "Cart",
      login: "Login",
      please_input_phone: "Please input your phone number",
      continue: "Continue",
      choose_verify_phone_method:
        "Choose a method to receive the verification code",
      sms_verify: "SMS",
      cancel: "Cancel",
      male: "MALE",
      female: "FEMALE",
      boy: "BOY",
      girl: "GIRL",
      voucher: "Hot Voucher",
      voucherDesc: "50k Off Orders From 999k",
      voucherDesc100: "100k Off Orders From 2000k",
      getVoucher: "Save Voucher",
      newProduct: "New Product",
      brand: {
        brand_name: "Brand",
        news: "News",
        contact: "Contact",
        about: "About",
        community: "Community",
        recruit: "Recruit",
      },
      support: {
        support_name: "Support",
        faq: "FAQ",
        loyalty_policy: "Loyalty Policy",
        loyalty_terms_conditions: "Loyalty Terms and Conditions",
        order_tracking: "Order Tracking",
        size_guide: "Size Guide",
      },
      label_login:
        "Sign up for free to become a loyal customer and receive exclusive offers from GROUP 2 SHOP.",
      download: {
        title: "Download app",
        payment_method: "Payment method",
      },
      clear: "Clear",
      company: {
        name: "SDN302 Joint Stock Company",
        business_registration_number:
          "Business Registration Number: 0107574310, Date of Issue: 12/02/2025",
        issuing_authority: "Source: FPT University Hanoi",
        contact_address:
          "Contact Address: FPT University Hanoi, located in Hoa Lac Hi-Tech Park, Km29 Thang Long Boulevard, Thach That District, Hanoi – approximately 30km from the city center",
        phone: "Phone: 0965186137",
        email: "Email: longtddhe173574@fpt.com",
      },
      error: {
        phone_login: {
          phone_format_err_title: "Invalid password format",
          phone_format_err_message: "Please try input password again",
        },
      },
    },
  },
  vi: {
    translation: {
      shop: "Cửa Hàng",
      searchPlaceHolder: "Tìm kiếm sản phẩm",
      search: "Tìm kiếm",
      account: "Tài khoản",
      cart: "Giỏ hàng",
      login: "Đăng nhập",
      please_input_phone: "Vui lòng nhập số điện thoại của bạn",
      continue: "Tiếp tục",
      choose_verify_phone_method: "Chọn phương thức nhận mã xác thực",
      sms_verify: "Tin nhắn SMS",
      cancel: "Hủy",
      male: "NAM",
      female: "NỮ",
      boy: "Bé Trai",
      girl: "Bé Gái",
      voucher: "Ưu đãi nóng",
      voucherDesc: "Giảm 50k cho đơn từ 999k",
      voucherDesc100: "Giảm 100k cho đơn từ 2000k",
      getVoucher: "Lưu mã giảm giá",
      newProduct: "Sản Phẩm Mới",
      brand: {
        brand_name: "Thương hiệu",
        news: "Tin tức",
        contact: "Liên hệ",
        about: "Giới thiệu",
        community: "Với cộng đồng",
        recruit: "Tuyển dụng",
      },
      support: {
        support_name: "Hỗ trợ",
        faq: "Hỏi đáp",
        loyalty_policy: "Chính sách KHTT",
        loyalty_terms_conditions: "Điều kiện - Điều khoản chính sách KHTT",
        order_tracking: "Kiểm tra đơn hàng",
        size_guide: "Gợi ý tìm size",
      },
      label_login:
        "Đăng nhập miễn phí để trở thành Khách hàng thân thiết và nhận ưu đãi độc quyền từ GROUP 2 SHOP",
      download: {
        title: "Tải ứng dụng",
        payment_method: "Phương thức thanh toán",
      },
      clear: "Xóa",
      company: {
        name: "Công ty Cổ phần SDN302",
        business_registration_number:
          "Số ĐKKD: 0107574310, ngày cấp: 12/02/2025",
        issuing_authority: "Nơi cấp: Đại học FPT Hà Nội",
        contact_address:
          "Địa chỉ liên hệ: Đại học FPT Hà Nội, tọa lạc tại Khu Công nghệ cao Hòa Lạc, Km29 Đại lộ Thăng Long, huyện Thạch Thất, Hà Nội – cách trung tâm thành phố khoảng 30km",
        phone: "Điện thoại 0965186137",
        email: "Email: longtddhe173574@fpt.com",
      },
      error: {
        phone_login: {
          phone_format_err_title: "Mật khẩu sai định dạng",
          phone_format_err_message: "Vui lòng nhập lại mật khẩu",
        },
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already protects against XSS
  },
});

export default i18n;
