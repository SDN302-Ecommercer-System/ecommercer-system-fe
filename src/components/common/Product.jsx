import PropTypes from "prop-types";
import { formatMoney } from "../../helpers/helper";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCartAsync } from "../../redux/slice/counterSlice";
import useAuth from "../../hooks/useAuth";
import { notifications } from "@mantine/notifications";

const Product = ({ id, colors, price, title, sizes, discount }) => {
  const [selectedImage, setSelectedImage] = useState({
    colorIndex: 0,
    imageIndex: 0,
  });

  const { isAuthenticated } = useAuth();

  const dispatch = useDispatch();

  let imageUrls = [];

  if (Array.isArray(colors)) {
    imageUrls = colors.map((item) => item.images?.[0]?.url).filter(Boolean);
  }

  const [isClickedAddToCart, setIsClickedAddToCart] = useState(false);

  const changeImage = (index) => {
    setSelectedImage({
      colorIndex: index,
      imageIndex: index,
    });
  };

  const addToCart = async (size) => {
    if (!isAuthenticated) {
      notifications.show({
        title: "You must be login first",
        message: "Please login to buy product",
        position: "top-right",
        color: "red",
      });
      return;
    }
    const priceDiscount =
      discount !== 0 ? price - price * (discount / 100) : price;

    const item = {
      productId: id,
      price: priceDiscount,
      quantity: 1,
      colorId: colors[selectedImage.colorIndex]._id,
      size: size.size,
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

  const ChooseSizeLayout = ({ sizes }) => {
    return (
      <div className="flex items-center justify-center p-4 bg-slate-300 bg-opacity-80">
        <div>
          <p className="font-mono font-bold text-center">Lựa chọn size</p>
          <div className="flex items-center gap-4">
            {Array.isArray(sizes) &&
              sizes.map((size, index) => (
                <span
                  className="flex items-center justify-center h-8 p-2 cursor-pointer min-w-8 text-slate-900 bg-slate-50"
                  key={index}
                  onClick={() => addToCart(size)}
                >
                  {size.size}
                </span>
              ))}
          </div>
        </div>
      </div>
    );
  };

  ChooseSizeLayout.propTypes = {
    sizes: PropTypes.arrayOf(
      PropTypes.shape({
        size: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  return (
    <div>
      <div
        className="relative group max-w-max max-h-max"
        onMouseLeave={() => setIsClickedAddToCart(false)}
      >
        <Link to={`product/${id}`}>
          <img
            className="object-cover w-full h-full cursor-pointer"
            src={imageUrls[selectedImage.imageIndex]}
            alt="image-product"
          />
        </Link>
        <div className="absolute bottom-0 left-0 right-0 hidden w-full p-2 group-hover:block">
          {isClickedAddToCart ? (
            <ChooseSizeLayout sizes={sizes} />
          ) : (
            <button
              onClick={() => setIsClickedAddToCart(true)}
              className="w-full p-2 font-mono font-bold duration-500 bg-slate-200 bg-opacity-80 text-slate-800 hover:bg-opacity-95"
            >
              Thêm vào giỏ hàng
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 my-4">
        {Array.isArray(colors) &&
          colors.map((color, _index) => (
            <div
              onClick={() => changeImage(_index)}
              key={_index}
              className={`cursor-pointer flex items-center justify-center border rounded-full w-7 h-7 ${
                _index === selectedImage.colorIndex
                  ? "border-slate-800"
                  : "border-slate-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full`}
                style={{ backgroundColor: color.hexCode }}
              ></div>
            </div>
          ))}
      </div>

      <Link to={`product/${id}`}>
        <h4 className="text-base">{title}</h4>
      </Link>
      <p className="text-base font-bold">
        {formatMoney(
          discount && discount !== 0 ? price - (discount / 100) * price : price,
          "vi-VN"
        )}
      </p>
      {discount !== 0 && (
        <div className="flex items-center gap-1">
          <p className="text-sm font-thin line-through">
            {formatMoney(price, "vi-VN")}
          </p>
          <span className="text-sm font-bold text-red-700">-{discount}%</span>
        </div>
      )}
    </div>
  );
};

Product.propTypes = {
  id: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      hexCode: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  sizes: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
  discount: PropTypes.number.isRequired,
};

export default Product;
