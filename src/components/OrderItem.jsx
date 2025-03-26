import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCircleX } from "@tabler/icons-react";
import PropTypes from "prop-types";
import axiosInstance from "../config/axios.config";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

const OrderItem = ({ order }) => {
  const { shippingAddress, items, finalPrice, paymentStatus } = order;
  const [orderStatus, setOrderStatus] = useState(order.orderStatus); // Thêm state cục bộ

  const [opened, { open, close }] = useDisclosure(false);

  const maskString = (str) => {
    if (!str || str.length <= 3) return str;
    return `${str.slice(0, 3)}${"*".repeat(str.length - 3)}`;
  };

  const widthCalc = () => {
    let widthResult = "0%";

    switch (orderStatus) {
      case "processing":
        widthResult = "50%";
        break;
      case "shipped":
        widthResult = "75%";
        break;
      case "delivered":
        widthResult = "100%";
        break;
    }

    return {
      width: widthResult,
    };
  };

  const changeStatusOrder = async () => {
    try {
      const response = await axiosInstance.put(`/order/${order._id}`, {
        status: "cancelled",
      });

      if (response && response.status === 200) {
        setOrderStatus("cancelled"); // Cập nhật trạng thái để re-render
        notifications.show({
          title: "Thay đổi trạng thái thành công",
          message: "bạn đã hủy thành công đơn hàng",
          position: "top-right",
          color: "green",
        });
        close();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-white border shadow-sm rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="my-4 text-xl font-bold">
          Order <span className="text-red-500">#{maskString(order._id)}</span>
        </h1>

        <IconCircleX
          onClick={open}
          className={`text-red-500 cursor-pointer hover:text-red-600 active:text-red-700 ${orderStatus !== 'processing' ? 'hidden' : ''}`}
          size={30}
        />
      </div>

      <Modal opened={opened} onClose={close} centered>
        <h1 className="my-4 font-bold text-center">
          Bạn có muốn hủy order này không ?
        </h1>
        <div className="flex items-center justify-center gap-x-4">
          <button
            onClick={changeStatusOrder}
            className="px-10 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 active:bg-red-700"
          >
            Có
          </button>
          <button
            onClick={close}
            className="px-10 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 active:bg-red-700"
          >
            Không
          </button>
        </div>
      </Modal>

      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="w-full space-y-4 overflow-y-auto md:w-1/2 md:max-h-[calc(100vh-100px)]">
          {items.map((item) => (
            <div key={item._id} className="flex space-x-4">
              <img
                src={item.color.images[0]?.url}
                alt={item.product.name}
                className="object-cover w-32 h-full rounded-lg"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-gray-500">
                  Price: {item.price.toLocaleString()}₫
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between flex-1 pb-20 px-14">
          <div>
            <div className="mt-4 mb-12 md:mt-0">
              <h3 className="mb-4 font-semibold">Delivery Address</h3>
              <p className="text-sm">
                <span className="font-semibold">Name:</span>{" "}
                {shippingAddress.fullName}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Address: </span>
                {shippingAddress.address}, {shippingAddress.ward},{" "}
                {shippingAddress.district}, {shippingAddress.province}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Phone:</span>{" "}
                {maskString(shippingAddress.phone)}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <h3 className="mb-4 font-semibold">Order Summary</h3>
              <p className="text-sm">
                <span className="font-semibold">Total:</span>{" "}
                {finalPrice.toLocaleString()}₫
              </p>
              <p className="text-sm">
                <span className="font-semibold">Payment Status:</span>{" "}
                <span className="text-sm uppercase">{paymentStatus}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold">Order Status:</span>{" "}
                <span className="text-sm uppercase">{orderStatus}</span>
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-red-600 h-2.5 rounded-full"
                style={widthCalc()}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span
                className={`font-medium ${
                  orderStatus === "cancelled" ? "text-red-600" : ""
                }`}
              >
                Cancelled
              </span>
              <span
                className={`font-medium ${
                  orderStatus === "processing" ? "text-red-600" : ""
                }`}
              >
                Processing
              </span>
              <span
                className={`font-medium ${
                  orderStatus === "shipped" ? "text-red-600" : ""
                }`}
              >
                Shipped
              </span>
              <span
                className={`font-medium ${
                  orderStatus === "delivered" ? "text-red-600" : ""
                }`}
              >
                Delivered
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    orderStatus: PropTypes.string.isRequired,
    paymentStatus: PropTypes.string.isRequired,
    finalPrice: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    shippingAddress: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      province: PropTypes.string.isRequired,
      district: PropTypes.string.isRequired,
      ward: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        size: PropTypes.string.isRequired,
        product: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
        color: PropTypes.shape({
          name: PropTypes.string.isRequired,
          images: PropTypes.arrayOf(
            PropTypes.shape({
              url: PropTypes.string.isRequired,
            })
          ).isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default OrderItem;
