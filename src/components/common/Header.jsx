import { useTranslation } from "react-i18next";
import ShopIcon from "../../assets/icons/ShopIcon";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import AccountIcon from "../../assets/icons/AccountHeader";
import { Select } from "@mantine/core";

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const switchLanguage = (language) => {
    let lang = language === "Tiếng Việt" ? "vi" : "en";
    if (lang !== i18n.language) i18n.changeLanguage(lang);
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
            <div className="flex flex-col items-center text-sm hover:underline">
              <AccountIcon />
              <span>{t("account")}</span>
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
    </div>
  );
};

export default Header;
