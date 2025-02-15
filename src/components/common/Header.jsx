import { useTranslation } from "react-i18next";
import ShopIcon from "../../assets/icons/ShopIcon";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import AccountIcon from "../../assets/icons/AccountHeader";
import CartHeader from "../../assets/icons/CartHeader";
import { Modal, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { phoneRegex } from "../../helpers/regex";
import { notifications } from '@mantine/notifications';


const Header = () => {
  const { t, i18n } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [disabled, setDisabled] = useState(true);
  const [phone, setPhone] = useState("");
  const [isContinue, setIsContinue] = useState(false);

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
      setPhone(value);
      return;
    }
    setDisabled(true);
    setPhone("");
  };

  const handleSubmitPhone = () => {
    if (!phoneRegex.test(phone)) {
      notifications.show({
        title: t("error.phone_login.phone_format_err_title"),
        message: t("error.phone_login.phone_format_err_message"),
        position: 'top-right',
        color: 'red',
      });
      return;
    }
    setIsContinue(true);
  };

  const handleSendOtp = () => {};

  const switchLanguage = (language) => {
    let lang;
    switch (language) {
      case "Tiếng Việt":
        lang = "vi";
        break;
      case "English":
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
    <div className="h-[70px] shadow-lg">
      <div className="flex items-center w-5/6 h-full mx-auto gap-x-4">
        <div className="flex items-center h-full gap-x-4">
          {/* icon */}
          <div className="flex items-center gap-2 p-2 duration-500 bg-red-600 rounded-md cursor-pointer max-w-max hover:bg-red-700">
            <ShopIcon />
            <span className="text-base font-bold text-white uppercase">
              {t("shop")}
            </span>
          </div>

          {/* navbar content */}
          <div className="flex h-full gap-x-8">
            <Link
              to="/home"
              className="flex items-center justify-center min-h-full text-base font-semibold text-gray-800 uppercase hover:border-red-500 hover:border-b-2"
            >
              {t("male")}
            </Link>

            <Link
              to="/home"
              className="flex items-center justify-center min-h-full text-base font-semibold text-gray-800 uppercase hover:border-red-500 hover:border-b-2"
            >
              {t("female")}
            </Link>

            <Link
              to="/home"
              className="flex items-center justify-center min-h-full text-base font-semibold text-gray-800 uppercase hover:border-red-500 hover:border-b-2"
            >
              {t("boy")}
            </Link>

            <Link
              to="/home"
              className="flex items-center justify-center min-h-full text-base font-semibold text-gray-800 uppercase hover:border-red-500 hover:border-b-2"
            >
              {t("girl")}
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
              onClick={open}
            >
              <AccountIcon />
              <span>{t("account")}</span>
            </div>

            <div className="flex flex-col items-center text-sm hover:underline">
              <CartHeader />
              <span>{t("cart")}</span>
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
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold capitalize">
              {t("choose_verify_phone_method")}
            </h3>
            <div className="flex items-center gap-4 p-4 cursor-pointer bg-slate-200 hover:bg-slate-300 active:bg-slate-400">
              <img
                className="object-cover w-10 h-10"
                src="https://canifa.com/assets/images/verification-zalo.png"
                alt="zalo"
              />
              <span className="text-base text-slate-500">Zalo</span>
            </div>

            <div
              className="flex items-center gap-4 p-4 cursor-pointer bg-slate-200 hover:bg-slate-300 active:bg-slate-400"
              onClick={handleSendOtp}
            >
              <img
                className="object-cover w-10 h-10"
                src="https://canifa.com/assets/images/verification-sms.png"
                alt="sms"
              />
              <span className="text-base text-slate-500">
                {t("sms_verify")}
              </span>
            </div>

            <button
              className="w-full p-4 text-base border border-slate-500"
              onClick={() => {
                setIsContinue(false);
              }}
            >
              {t("cancel")}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <img
              src="https://media.canifa.com/system/banner/default/Slide55-web_desktop.png"
              alt=""
            />

            <h3 className="text-2xl font-bold">{t("login")}</h3>

            <p className="px-1 text-sm text-slate-500">{t("label_login")}</p>

            <div className="relative">
              <input
                value={phone}
                onChange={handleInput}
                className="w-full p-4 border border-black outline-none pr-14"
                type="text"
                name="phone"
                placeholder={t("please_input_phone")}
                id=""
              />
              <span
                onClick={() => {
                  setPhone("");
                  setDisabled(true);
                }}
                className="absolute top-0 bottom-0 right-0 text-xs capitalize transform -translate-x-3 translate-y-5 cursor-pointer hover:text-red-500"
              >
                {t("clear")}
              </span>
            </div>
            <button
              onClick={handleSubmitPhone}
              className="w-full p-4 text-base font-bold text-white bg-red-500 border border-red-500 cursor-pointer hover:bg-red-600 active:bg-red-700 disabled:border-black disabled:bg-slate-200 disabled:text-slate-500"
              disabled={disabled}
            >
              {t("continue")}
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Header;
