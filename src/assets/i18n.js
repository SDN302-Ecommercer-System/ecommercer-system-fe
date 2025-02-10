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
    },
  },
  vi: {
    translation: {
      shop: "Cửa Hàng",
      searchPlaceHolder: "Tìm kiếm sản phẩm",
      search: "Tìm kiếm",
      account: "Tài khoản",
      cart: "Giỏ hàng",
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
