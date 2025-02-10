import { useTranslation } from "react-i18next";
import ShopIcon from "../../assets/icons/ShopIcon";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import AccountIcon from "../../assets/icons/AccountHeader";
import CartHeader from "../../assets/icons/CartHeader"

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="h-[90px] shadow-lg">
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
              Nam
            </Link>

            <Link
              to="/home"
              className="flex items-center justify-center min-h-full text-base font-semibold text-gray-800 uppercase hover:border-red-500 hover:border-b-2"
            >
              Nữ
            </Link>

            <Link
              to="/home"
              className="flex items-center justify-center min-h-full text-base font-semibold text-gray-800 uppercase hover:border-red-500 hover:border-b-2"
            >
              bé trai
            </Link>

            <Link
              to="/home"
              className="flex items-center justify-center min-h-full text-base font-semibold text-gray-800 uppercase hover:border-red-500 hover:border-b-2"
            >
              bé gái
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between flex-1 cursor-pointer">
          <div className="flex-1">
            <SearchBar />
          </div>
          <div className="flex items-center gap-x-4">
            <div className="flex flex-col items-center text-sm hover:underline">
              <AccountIcon />
              <span>{t("account")}</span>
            </div>

            <div className="flex flex-col items-center text-sm hover:underline">
              <CartHeader />
              <span>{t("cart")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
