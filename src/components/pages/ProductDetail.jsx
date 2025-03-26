import { useParams } from "react-router-dom";
import MainLayout from "../MainLayout";
import axiosInstance from "../../config/axios.config";
import { useEffect, useState } from "react";
import { formatMoney } from "../../helpers/helper";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { addToCartAsync } from "../../redux/slice/counterSlice";
import { notifications } from "@mantine/notifications";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [indexShow, setIndexShow] = useState({
    mainImage: 0,
    subImage: 0,
    sizeIndex: 0,
  });

  const getHighResImage = (url) => {
    if (!url) return "";
    if (url.includes("/500/750/")) {
      return url.replace("/500/750/", "/1517/2000/");
    }
    return url;
  }

  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const response = await axiosInstance.get(`/product/${id}`);
        if (response?.data?.success) {
          setProduct(response.data.data);
        } else {
          console.error("Lỗi khi lấy dữ liệu:", response?.data?.message);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    getProductDetail();
  }, [id]);

  const addToCart = () => {
    if (!isAuthenticated) {
      notifications.show({
        title: "Bạn cần đăng nhập",
        message: "Vui lòng đăng nhập để mua hàng",
        position: "top-right",
        color: "red",
      });
      return;
    }

    const priceDiscount =
      discount && discount !== 0 ? price - (discount / 100) * price : price;

    const item = {
      productId: id,
      price: priceDiscount,
      quantity: 1,
      colorId: colors[indexShow.mainImage]._id,
      size: sizes[indexShow.sizeIndex].size,
    };

    dispatch(addToCartAsync(item)).then(() => {
      notifications.show({
        title: "Thêm vào giỏ hàng thành công",
        message: "Vào giỏ hàng để có thể xem",
        position: "top-right",
        color: "green",
      });
    });
  };

  if (!product) return <p>Loading...</p>;

  const { name, price, discount, colors, sizes, description } = product;
  const discountedPrice =
    discount && discount !== 0 ? price - (discount / 100) * price : price;

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="w-[550px] max-h-max overflow-hidden">
          <img
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-150"
            src={
              getHighResImage(colors?.[indexShow.mainImage]?.images?.[indexShow.subImage]?.url || "")
            }
            alt={name}
          />
        </div>

        <div className="flex items-center justify-start w-full gap-4 md:ml-4 lg:flex-col">
          {colors?.[indexShow.mainImage]?.images?.map((img, index) => (
            <div
              key={index}
              className={`cursor-pointer border ${
                index === indexShow.subImage ? "border-slate-500" : ""
              }`}
              onClick={() => {
                setIndexShow({ ...indexShow, subImage: index });
              }}
            >
              <img
                className="object-cover w-24"
                src={img.url}
                alt={`sub_img_${index}`}
              />
            </div>
          ))}
        </div>

        <div>
          <h3 className="mb-4 text-xl">{name}</h3>
          <h4 className="text-2xl font-bold">{formatMoney(discountedPrice, "vi-VN")}</h4>
          {discount !== 0 && (
            <div className="flex items-center gap-1">
              <span className="mr-2 text-base line-through">
                {formatMoney(price, "vi-VN")}
              </span>
              <span className="text-red-500">-{discount}%</span>
            </div>
          )}
          <div className="mt-4 mb-2">
            <h3 className="text-base font-bold">Màu sắc</h3>
            <div className="flex gap-2">
              {colors?.map((color, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center w-10 h-10 border cursor-pointer ${
                    index === indexShow.mainImage ? "border-slate-600" : ""
                  }`}
                  onClick={() => {
                    setIndexShow({
                      ...indexShow,
                      mainImage: index,
                      subImage: 0,
                    });
                  }}
                >
                  <div
                    className="w-5/6 rounded-full h-5/6"
                    style={{ backgroundColor: color.hexCode }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mt-4 mb-2 text-base font-bold">Size</h3>
            <div className="flex items-center max-w-full overflow-auto gap-x-2">
              {sizes?.map((size, index) => (
                <div
                  key={size._id}
                  onClick={() => {
                    setIndexShow({ ...indexShow, sizeIndex: index });
                  }}
                  className={`flex items-center justify-center w-10 h-10 cursor-pointer bg-slate-200 border ${
                    index === indexShow.sizeIndex ? "border-slate-600" : ""
                  }`}
                >
                  <div className="font-bold rounded-full">{size.size}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full py-3 my-4 text-white bg-red-500 rounded-md hover:bg-red-600 active:bg-red-700"
            onClick={addToCart}
          >
            Thêm vào giỏ
          </button>

          <div>
            <h3 className="mt-4 mb-2 text-base font-bold">Mô tả</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;