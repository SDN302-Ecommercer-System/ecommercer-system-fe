import { useTranslation } from "react-i18next";
import ShopIcon from "../../assets/icons/ShopIcon";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import AccountIcon from "../../assets/icons/AccountHeader";
import CartHeader from "../../assets/icons/CartHeader";
import { Modal, Select, Drawer, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { phoneRegex } from "../../helpers/regex";
import { notifications } from "@mantine/notifications";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [cartOpen, { open: openCart, close: closeCart }] = useDisclosure(false);
  const [disabled, setDisabled] = useState(true);
  const [phone, setPhone] = useState("");
  const [isContinue, setIsContinue] = useState(false);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "T-Shirt", price: 200000, quantity: 2, image: "https://2885706055.e.cdneverest.net/img/1517/2000/resize/1/t/1tl23w006-fb446-122-1-u.webp" },
    { id: 2, name: "Jeans", price: 500000, quantity: 1, image: "https://cdn.boo.vn/media/catalog/product/1/_/1.2.21.2.23.001.124.01.60600034_1__4.jpg" },
  ]);



  const handleInput = (e) => {
    const value = e.target.value;
    setPhone(value);
    setDisabled(!phoneRegex.test(value));
  };

  const handleSubmitPhone = () => {
    if (!phoneRegex.test(phone)) {
      notifications.show({
        title: t("error.phone_login.phone_format_err_title"),
        message: t("error.phone_login.phone_format_err_message"),
        position: "top-right",
        color: "red",
      });
      return;
    }
    setIsContinue(true);
  };

  const switchLanguage = (language) => {
    let lang = language === "Tiếng Việt" ? "vi" : "en";
    if (lang !== i18n.language) i18n.changeLanguage(lang);
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="h-[70px] shadow-lg">
      <div className="flex items-center w-5/6 h-full mx-auto gap-x-4">
        <div className="flex items-center h-full gap-x-4">
          <div
            className="flex items-center gap-2 p-2 duration-500 bg-red-600 rounded-md cursor-pointer max-w-max hover:bg-red-700"
            onClick={() => navigate("/")}
          >
            <ShopIcon />
            <span className="text-base font-bold text-white uppercase">
              {t("shop")}
            </span>
          </div>

          <div className="flex h-full gap-x-8">
            {["male", "female", "boy", "girl"].map((category) => (
              <Link
                key={category}
                to="/home"
                className="flex items-center justify-center min-h-full text-base font-semibold text-gray-800 uppercase hover:border-red-500 hover:border-b-2"
              >
                {t(category)}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between flex-1 cursor-pointer">
          <div className="flex-1">
            <SearchBar />
          </div>
          <div className="flex items-center gap-x-4">
            <div className="flex flex-col items-center text-sm hover:underline" onClick={open}>
              <AccountIcon />
              <span>{t("account")}</span>
            </div>

            {/* Giỏ hàng */}
            <div className="relative flex flex-col items-center text-sm hover:underline" onClick={openCart}>
              <CartHeader />
              <span>{t("cart")}</span>
              <span className="absolute top-0 right-0 w-5 h-5 text-xs text-white bg-red-500 rounded-full flex items-center justify-center">
                2
              </span>
            </div>

            <Select
              size="sm"
              className="w-[125px]"
              data={["Tiếng Việt", "English"]}
              defaultValue="English"
              onChange={switchLanguage}
              allowDeselect={false}
            />
          </div>
        </div>
      </div>

      {/* Drawer Giỏ hàng */}
      <Drawer opened={cartOpen} onClose={closeCart} position="right" size="md" title={t("cart")}>
        <div className="p-4">
          <p className="mb-4 text-gray-700">Giỏ hàng của bạn</p>

          {/* Display total quantity */}
          <div className="mb-4 text-sm text-gray-600">
            Tổng số lượng: {cartItems.reduce((total, item) => total + item.quantity, 0)} sản phẩm
          </div>

          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between py-2 border-b">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover mr-2" /> {/* Display image */}
                  <span>{item.name}</span>
                  <span className="ml-2 text-gray-500">x{item.quantity}</span>
                </div>
                <span>{(item.price * item.quantity).toLocaleString()}đ</span>
                <Button
                  color="red"
                  size="xs"
                  onClick={() => handleRemoveItem(item.id)}
                  className="ml-2"
                >
                  Xóa
                </Button>
              </li>
            ))}
          </ul>


          <div className="mt-4 text-lg font-bold text-right">
            Tổng: {getTotalPrice().toLocaleString()}đ
          </div>
          <div className="mt-4">
            <Button fullWidth onClick={() => navigate("/checkout")} color="red">
              Thanh toán
            </Button>
          </div>
        </div>
      </Drawer>

    </div>
  );
};

export default Header;
