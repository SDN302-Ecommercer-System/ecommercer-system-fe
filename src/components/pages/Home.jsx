import MainLayout from "../MainLayout";
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";
import CONSTANT_VALUE from "../../helpers/constants/constant";
import { useEffect, useState } from "react";
import Product from "../common/Product";
import { Pagination } from "@mantine/core";
import axiosInstance from "../../config/axios.config";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [metadata, setMetadata] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  });

  const getData = async (page = 1) => {
    try {
      const category = searchParams.get("category") || "";
      const search = searchParams.get("search") || "";
      const response = await axiosInstance.get(`/product?page=${page}&category=${category}&search=${search}`);

      if (response?.data?.success) {
        setData(response.data.data);
        setMetadata(response.data.metadata);
      } else {
        console.error("Error fetching data:", response?.data?.message);
      }
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  // Watch for category and search changes
  useEffect(() => {
    const currentPage = parseInt(searchParams.get("page")) || 1;
    getData(currentPage);
  }, [searchParams]);

  // Handle page changes
  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    window.location.href = `?${params.toString()}`;
  };

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
        {data.map((item, index) => {
          return (
            <Product
              key={index}
              id={item?._id}
              colors={item?.colors ?? []}
              price={item?.price ?? 0}
              title={item?.name ?? "Không có tên"}
              sizes={item?.sizes ?? []}
              discount={item?.discount ?? 0}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-center w-full mb-10">
        <Pagination 
          color="red"
          total={metadata.totalPages} 
          value={metadata.currentPage}
          onChange={handlePageChange}
        />
      </div>
    </MainLayout>
  );
};

export default Home;
