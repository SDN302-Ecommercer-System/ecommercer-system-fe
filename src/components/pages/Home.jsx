import MainLayout from "../MainLayout";
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";
import CONSTANT_VALUE from "../../helpers/constants/constant";
import { useState } from "react";
import Product from "../common/Product";
import { Pagination } from "@mantine/core";


const Home = () => {
  const { t } = useTranslation();
  const [data] = useState([
    {
      imgUrls: [
        "https://2885706055.e.cdneverest.net/img/500/750/resize/5/b/5bp24w003-sa921-thumb.webp",
        "https://2885706055.e.cdneverest.net/img/500/750/resize/5/b/5bp24w003-se528-thumb.webp",
      ],
      colors: ["bg-red-500", "bg-amber-500"],
      title: "Quần nỉ unisex người lớn",
      price: 699.000,
      discount: 0,
      size: ['S', 'M', 'L']
    },

    {
      imgUrls: [
        "https://2885706055.e.cdneverest.net/img/500/750/resize/3/t/3tw24w001-sw011-thumb.webp",
        "https://2885706055.e.cdneverest.net/img/500/750/resize/3/t/3tw24w001-sa871-thumb.webp",
        "https://2885706055.e.cdneverest.net/img/500/750/resize/3/t/3tw24w001-sg649-thumb.webp",
        "https://2885706055.e.cdneverest.net/img/500/750/resize/3/t/3tw24w001-sp250-thumb.webp"
      ],
      colors: ["bg-slate-200", "bg-slate-400", "bg-slate-300", "bg-blue-400"],
      title: "Áo nỉ unisex trẻ em có hình in",
      price: 314.000,
      discount: 30,
      size: ['S', 'M', 'L']
    },

    {
      imgUrls: [
        "https://2885706055.e.cdneverest.net/img/500/750/resize/3/t/3tw24w001-sw011-thumb.webp",
        "https://2885706055.e.cdneverest.net/img/500/750/resize/3/t/3tw24w001-sa871-thumb.webp",
        "https://2885706055.e.cdneverest.net/img/500/750/resize/3/t/3tw24w001-sg649-thumb.webp",
        "https://2885706055.e.cdneverest.net/img/500/750/resize/3/t/3tw24w001-sp250-thumb.webp"
      ],
      colors: ["bg-slate-200", "bg-slate-400", "bg-slate-300", "bg-blue-400"],
      title: "Áo nỉ unisex trẻ em có hình in",
      price: 449.000,
      discount: 30,
      size: ['S', 'M', 'L', 'XL']
    },

    {
      imgUrls: [
        "https://2885706055.e.cdneverest.net/img/500/750/resize/3/t/3tw24w001-sw011-thumb.webp",
        "https://2885706055.e.cdneverest.net/img/500/750/resize/3/t/3tw24w001-sa871-thumb.webp",
        "https://2885706055.e.cdneverest.net/img/500/750/resize/3/t/3tw24w001-sg649-thumb.webp",
        "https://2885706055.e.cdneverest.net/img/500/750/resize/3/t/3tw24w001-sp250-thumb.webp"
      ],
      colors: ["bg-slate-200", "bg-slate-400", "bg-slate-300", "bg-blue-400"],
      title: "Áo nỉ unisex trẻ em có hình in",
      price: 314.000,
      discount: 30,
      size: ['S', 'M', 'L']
    },

    {
      imgUrls: [
        "https://2885706055.e.cdneverest.net/img/500/750/resize/3/t/3tw24w001-sw011-thumb.webp",
        "https://2885706055.e.cdneverest.net/img/500/750/resize/3/t/3tw24w001-sa871-thumb.webp",
        "https://2885706055.e.cdneverest.net/img/500/750/resize/3/t/3tw24w001-sg649-thumb.webp",
        "https://2885706055.e.cdneverest.net/img/500/750/resize/3/t/3tw24w001-sp250-thumb.webp"
      ],
      colors: ["bg-slate-200", "bg-slate-400", "bg-slate-300", "bg-blue-400"],
      title: "Áo nỉ unisex trẻ em có hình in",
      price: 314.000,
      discount: 30,
      size: ['S', 'M', 'L']
    },
  ]);

  /**
   * copy the value
   *
   * @param {*} voucher: voucher value from constant folder
   */
  const copyVoucher = (voucher) => {
    const successCallback = () => {
      notifications.show({
        title: "Copied",
        position: "bottom-right",
        color: "green",
      });
    };

    const failedCallback = () => {
      notifications.show({
        title: "Copied failed",
        position: "bottom-right",
        color: "red",
      });
    };

    navigator.clipboard
      .writeText(voucher)
      .then(successCallback)
      .catch(failedCallback);
  };

  return (
    <MainLayout>
      <div className="mb-10 bg-">
        <h3 className="mb-4 text-2xl font-bold">{t("voucher")}</h3>

        {/* grid col */}
        <div className="grid w-full grid-cols-2 gap-x-4">
          {/* voucher 50k */}
          <div className="flex w-full">
            <div className="flex items-center justify-start flex-1 min-h-full px-4 border rounded-tr-lg rounded-br-lg shadow-lg y-6 flex-2 border-slate-300 rounded-tl-md rounded-bl-md">
              <div className="py-2">
                <h3 className="text-lg font-bold">Voucher 50k</h3>
                <span className="inline-block p-2 my-2 text-xs italic bg-slate-200">
                  {CONSTANT_VALUE.voucher.voucherDiscount50k}
                </span>
                <p className="text-base font-thin">{t("voucherDesc")}</p>
              </div>
            </div>

            <div className="flex items-center justify-center min-h-full px-4 py-6 border rounded-tl-lg rounded-bl-lg shadow-lg border-slate-300 rounded-tr-md rounded-br-md">
              <button
                className="p-2 text-white bg-teal-500 hover:bg-teal-600 active:bg-teal-700"
                onClick={() =>
                  copyVoucher(CONSTANT_VALUE.voucher.voucherDiscount50k)
                }
              >
                {t("getVoucher")}
              </button>
            </div>
          </div>
          {/* end of voucher 50k */}

          {/* voucher 100k */}
          <div className="flex w-full">
            <div className="flex items-center justify-start flex-1 min-h-full px-4 border rounded-tr-lg rounded-br-lg shadow-lg y-6 flex-2 border-slate-300 rounded-tl-md rounded-bl-md">
              <div>
                <h3 className="text-lg font-bold">Voucher 100k</h3>
                <span className="inline-block p-2 my-2 text-xs italic bg-slate-200">
                  {CONSTANT_VALUE.voucher.voucherDiscount100k}
                </span>
                <p className="text-base font-thin">{t("voucherDesc100")}</p>
              </div>
            </div>

            <div className="flex items-center justify-center min-h-full px-4 py-6 border rounded-tl-lg rounded-bl-lg shadow-lg border-slate-300 rounded-tr-md rounded-br-md">
              <button
                className="p-2 text-white bg-teal-500 hover:bg-teal-600 active:bg-teal-700"
                onClick={() =>
                  copyVoucher(CONSTANT_VALUE.voucher.voucherDiscount100k)
                }
              >
                {t("getVoucher")}
              </button>
            </div>
          </div>
          {/* end of voucher 100k */}
        </div>
        {/* end of grid col */}
      </div>

      {/* product */}
      <h3 className="my-10 text-2xl font-bold">{t("newProduct")}</h3>

      <img src="/img/img-collection.png" alt="collection-image" />

      <div className="grid grid-cols-4 my-10 gap-x-6 gap-y-20">
        {data.map((item, index) => (
          <Product
            key={index}
            colors={item.colors}
            imageUrls={item.imgUrls}
            price={item.price}
            title={item.title}
            sizes={item.size}
            discount={item.discount}
          />
        ))}
      </div>

      <div className="flex items-center justify-center w-full">
        <Pagination total={10} />
      </div>
    </MainLayout>
  );
};

export default Home;
