import { useTranslation } from "react-i18next";
import ShopIcon from "../../assets/icons/ShopIcon";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import AccountIcon from "../../assets/icons/AccountHeader";
import CartHeader from "../../assets/icons/CartHeader";
import { Modal, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { notifications } from "@mantine/notifications";
import CartItem from "../CartItem";
import { emailRegex } from "../../helpers/regex/phone-regex";
import { formatMoney, sendEmail } from "../../helpers/helper";
import { IconLoader2, IconCubeSend } from "@tabler/icons-react";
import CONSTANT_VALUE from "../../helpers/constants/constant";
import ModalConfirmRegister from "./modals/ModalConfirmRegister";
import axiosInstance from "../../config/axios.config";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/slice/counterSlice";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedCart, { open: openCart, close: closeCart }] =
    useDisclosure(false);

  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isContinue, setIsContinue] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const navigate = useNavigate();

  //otp code
  const [code, setCode] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);

  //check authenticate
  const { token, userInformation, isAuthenticated } = useAuth();

  //carts
  const cart = useSelector((state) => state.cart.list);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  //handle input otp
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Chỉ cho phép nhập số
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  /**
   * handle input phone
   *
   * @param {*} e
   * @returns
   */
  const handleInput = (e) => {
    const value = e.target.value;
    if (value && typeof value === "string" && value.length > 0) {
      setDisabled(false);
      setEmail(value);
      return;
    }
    setDisabled(true);
    setEmail("");
  };

  /**
   * handle input password
   *
   * @param {*} e
   * @returns
   */
  const handleInputPassword = (e) => {
    const value = e.target.value;
    if (value && typeof value === "string" && value.length > 0) {
      setDisabled(false);
      setPassword(value);
      return;
    }
    setDisabled(true);
    setPassword("");
  };

  const handleSubmit = async () => {
    if (!emailRegex.test(email)) {
      notifications.show({
        title: "Invalid email format",
        message: "Please input again",
        position: "top-right",
        color: "red",
      });
      return;
    }
    setLoading(true);

    //disable button
    setDisabled(true);

    //call api send email to send an otp
    const isSent = await sendEmail(email, password);

    switch (isSent) {
      case CONSTANT_VALUE.loginNotificationResponse.SUCCESS:
        setIsContinue(true);
        notifications.show({
          title: "Send OTP success",
          message: "Please open your email and type OTP",
          position: "top-right",
          color: "green",
        });
        break;

      case CONSTANT_VALUE.loginNotificationResponse.NONE_REGISTER:
        notifications.show({
          title: "Your account not existed",
          message: "Please input again",
          position: "top-right",
          color: "red",
        });
        setShowRegisterModal(true);
        break;

      case CONSTANT_VALUE.loginNotificationResponse.ERROR_SERVER:
        notifications.show({
          title: "Server error",
          message: "Please input again",
          position: "top-right",
          color: "red",
        });
        break;

      case CONSTANT_VALUE.loginNotificationResponse.WRONG_PASSWORD:
        notifications.show({
          title: "Wrong password",
          message: "Please input again",
          position: "top-right",
          color: "red",
        });
        break;
    }

    setLoading(false);
  };

  const handleSendOtp = async () => {
    const CODE_SEPARATOR = "";
    const otp = code.join(CODE_SEPARATOR);

    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        otp,
      });

      if (response.data) {
        localStorage.setItem(
          CONSTANT_VALUE.localStorageKey.ACCESS_TOKEN,
          response.data.data.token
        );
        localStorage.setItem(
          CONSTANT_VALUE.localStorageKey.USER_INFORMATION,
          JSON.stringify(response.data.data.userInformation)
        );

        localStorage.setItem("authChanged", Date.now());
        window.dispatchEvent(new Event("authChanged"));

        notifications.show({
          title: "login success",
          message: `welcome ${email}`,
          position: "top-right",
          color: "green",
        });

        close();
      }
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "wrong OTP",
        message: `please input again OTP`,
        position: "top-right",
        color: "red",
      });
    }
  };

  const switchLanguage = (language) => {
    let lang;
    switch (language) {
      case CONSTANT_VALUE.lang.VIETNAMESE:
        lang = "vi";
        break;
      case CONSTANT_VALUE.lang.ENGLISH:
        lang = "en";
        break;
      default:
        lang = "en";
        break;
    }
    if (lang === i18n.language) return;
    i18n.changeLanguage(lang);
  };

  return (
    <div className="h-[70px] shadow-lg sticky top-0 z-50 bg-white">
      <div className="flex items-center w-5/6 h-full mx-auto gap-x-4">
        <div className="flex items-center h-full gap-x-4">
          {/* icon */}
          <div
            className="flex items-center gap-2 p-2 duration-500 bg-red-600 rounded-md cursor-pointer max-w-max hover:bg-red-700"
            onClick={() => {
              navigate("/");
            }}
          >
            <ShopIcon />
            <span className="text-base font-bold text-white uppercase">
              {t("shop")}
            </span>
          </div>

          {/* navbar content */}
          <div className="flex h-full gap-x-8">
            <Link
              to="/?category=male"
              className="flex items-center justify-center min-h-full text-base font-semibold text-gray-800 uppercase hover:border-red-500 hover:border-b-2"
            >
              {t("male")}
            </Link>

            <Link
              to="/?category=female"
              className="flex items-center justify-center min-h-full text-base font-semibold text-gray-800 uppercase hover:border-red-500 hover:border-b-2"
            >
              {t("female")}
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between flex-1 cursor-pointer">
          <div className="flex-1">
            <SearchBar />
          </div>
          <div className="flex items-center gap-x-4">
            <div
              className="flex flex-col items-center text-sm hover:underline"
              onClick={() => {
                if (token && userInformation) {
                  navigate("/profile");
                } else {
                  open(); // Mở modal đăng nhập
                }
              }}
            >
              {token && userInformation ? (
                <img
                  className="object-cover w-auto h-auto rounded-full max-w-7 max-h-7"
                  src={`${userInformation.avatar || "/img/avatar.png"}`}
                  alt="avatar"
                />
              ) : (
                <AccountIcon />
              )}
              <span>{t("account")}</span>
            </div>

            <div
              className={`flex flex-col items-center text-sm hover:underline ${
                !isAuthenticated ? "hidden" : ""
              }`}
              onClick={openCart}
            >
              <CartHeader />
              <span>{t("cart")}</span>
            </div>

            <div
              className={`flex flex-col items-center text-sm hover:underline ${
                !isAuthenticated ? "hidden" : ""
              }`}
              onClick={() => {
                navigate("/orders");
              }}
            >
              <IconCubeSend size={25} stroke={1.5} color="black" />
              <span>Orders</span>
            </div>

            <Select
              size="sm"
              className="w-[125px]"
              data={["Tiếng Việt", "English"]}
              defaultValue="English"
              onChange={(value) => switchLanguage(value)}
              allowDeselect={false}
            />
          </div>
        </div>
      </div>

      {/* modal register */}
      <ModalConfirmRegister
        email={email}
        onClose={() => setShowRegisterModal(false)}
        show={showRegisterModal}
        password={password}
      />

      {/* modal verify otp */}
      <Modal
        opened={opened}
        onClose={() => {
          setIsContinue(false);
          close();
        }}
        centered
        size={"lg"}
      >
        {/* Modal content */}
        {isContinue ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <h3 className="text-base font-bold capitalize">
              Xác minh mã OTP gửi qua email
            </h3>

            <div className="flex items-center gap-4">
              {code.map((num, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={num}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-lg font-bold text-center border border-slate-300"
                />
              ))}
            </div>

            <button
              className="w-full p-4 text-base font-bold text-white uppercase bg-red-500 hover:bg-red-600 active:bg-red-700"
              onClick={handleSendOtp}
            >
              Gửi
            </button>
          </div>
        ) : (
          // modal login
          <div className="flex flex-col gap-4">
            <img
              src="https://media.canifa.com/system/banner/default/Slide55-web_desktop.png"
              alt=""
            />

            <h3 className="text-2xl font-bold">{t("login")}</h3>

            <p className="px-1 text-sm text-slate-500">{t("label_login")}</p>

            <div className="relative">
              <input
                value={email}
                onChange={handleInput}
                className="w-full p-4 mb-4 border border-black outline-none pr-14"
                type="text"
                name="phone"
                placeholder={"Input your email"}
                id="phone"
              />

              <input
                value={password}
                onChange={handleInputPassword}
                className="w-full p-4 border border-black outline-none pr-14"
                type="password"
                name="password"
                placeholder={t("please_input_password")}
                id="password"
              />
              <span
                onClick={() => {
                  setEmail("");
                  setDisabled(true);
                }}
                className="absolute top-0 bottom-0 right-0 text-xs capitalize transform -translate-x-3 translate-y-5 cursor-pointer hover:text-red-500"
              >
                {t("clear")}
              </span>
            </div>
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center w-full p-4 text-base font-bold text-white bg-red-500 border border-red-500 cursor-pointer hover:bg-red-600 active:bg-red-700 disabled:border-black disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed"
              disabled={disabled}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <h1>Loading</h1>
                  <IconLoader2 className="animate-spin" stroke={2} size={20} />
                </div>
              ) : (
                t("continue")
              )}
            </button>
          </div>
        )}
      </Modal>

      <Modal
        opened={openedCart}
        onClose={closeCart}
        transitionProps={{ transition: "slide-left", duration: 200 }}
        classNames={{
          content:
            "fixed top-0 right-0 min-h-screen overflow-hidden w-[500px] !rounded-none",
          body: "!p-0 h-screen",
          title: "font-bold text-xl",
        }}
        title={`Giỏ hàng (${cart.length})`}
      >
        <div className="flex flex-col justify-between h-[90%]">
          <div className="flex flex-col items-center gap-y-4 max-h-[80%] overflow-y-auto">
            {cart.map((item, index) => (
              <CartItem itemId={item._id} key={index} />
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between px-4 py-6 border-t border-slate-300">
              <span className="text-base font-bold">Tổng cộng:</span>
              <span className="text-base font-bold">
                {formatMoney(
                  totalPrice,
                  // format code
                  "vi-VN"
                )}
              </span>
            </div>

            <div className="flex items-center justify-between px-4 py-6 border-t border-slate-300">
              <Link to={"../checkout"} className="w-full">
                <button className="w-full p-2 text-white bg-red-500 rounded-md hover:bg-red-600 active:bg-red-700">
                  Thanh toán
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
