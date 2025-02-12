import { useTranslation } from "react-i18next";

const Footer = () => {
  const {t} = useTranslation();
  return (
    <div className="grid grid-cols-5 py-8 mt-20 gap-x-12">
      <div className="col-span-2">
        <h3 className="mb-4 text-base font-bold uppercase">
          {t("company.name")}
        </h3>
        <ul className="flex flex-col gap-2 text-base/6">
          <li>{t("company.business_registration_number")}</li>
          <li>
            {t("company.issuing_authority")}
          </li>
          <li>
            {t("company.contact_address")}
          </li>
          <li>{t("company.phone")}</li>
          <li>{t("company.email")}</li>
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-base font-bold uppercase">{t("brand.brand_name")}</h3>
        <ul className="flex flex-col gap-4 text-base/6">
          <li className="cursor-pointer hover:text-red-500">{t("brand.about")}</li>
          <li className="cursor-pointer hover:text-red-500">{t("brand.news")}</li>
          <li className="cursor-pointer hover:text-red-500">{t("brand.recruit")}</li>
          <li className="cursor-pointer hover:text-red-500">{t("brand.community")}</li>
          <li className="cursor-pointer hover:text-red-500">{t("brand.contact")}</li>
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-base font-bold uppercase">{t("support.support_name")}</h3>
        <ul className="flex flex-col gap-4 text-base/6">
          <li className="cursor-pointer hover:text-red-500">{t("support.faq")}</li>
          <li className="cursor-pointer hover:text-red-500">{t("support.loyalty_policy")}</li>
          <li className="cursor-pointer hover:text-red-500">
          {t("support.loyalty_terms_conditions")}
          </li>
          <li className="cursor-pointer hover:text-red-500">
          {t("support.order_tracking")}
          </li>
          <li className="cursor-pointer hover:text-red-500">{t("support.size_guide")}</li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="mb-4 text-base font-bold uppercase">{t("download.title")}</h3>
          <div className="flex items-center gap-x-2">
            <img className="object-cover w-20 h-20" src="https://canifa.com/assets/images/bancode.png" alt="qr-code" />
            <div className="flex flex-col items-center w-full h-full gap-2">
              <img className="object-cover w-15" src="https://canifa.com/assets/images/googleplay.png" alt="gg-play" />
              <img className="object-cover w-15" src="https://canifa.com/assets/images/appstore.png" alt="app-store" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-base font-bold uppercase">{t("download.payment_method")}</h3>
          <div>
              <img src="https://canifa.com/assets/images/pay.svg" alt="vnpay" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
