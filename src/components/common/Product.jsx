import PropTypes from "prop-types";
import { formatMoney } from "../../helpers/helper";
import { useState } from "react";

const Product = ({ imageUrls, colors, price, title, sizes, discount }) => {
  const [selectedImage, setSelectedImage] = useState({
    colorIndex: 0,
    imageIndex: 0,
  });

  const [isClickedAddToCart, setIsClickedAddToCart] = useState(false);

  const changeImage = (index) => {
    setSelectedImage({
      colorIndex: index,
      imageIndex: index,
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
                >
                  {size}
                </span>
              ))}
          </div>
        </div>
      </div>
    );
  };

  ChooseSizeLayout.propTypes = {
    sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  return (
    <div>
      <div
        className="relative group max-w-max max-h-max"
        onMouseLeave={() => setIsClickedAddToCart(false)}
      >
        <img
          className="object-cover w-full h-full cursor-pointer "
          src={Array.isArray(imageUrls) && imageUrls[selectedImage.imageIndex]}
          alt="image-product"
        />
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
              <div className={`w-5 h-5 rounded-full ${color}`}></div>
            </div>
          ))}
      </div>

      <h4 className="text-base">{title}</h4>
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
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  discount: PropTypes.number.isRequired,
};

export default Product;
