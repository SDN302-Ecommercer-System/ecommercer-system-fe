import { useState } from "react";
import { Button, Input, Textarea, Radio, Group, Modal, Notification } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import MainLayout from "../MainLayout";
import { notifications } from "@mantine/notifications";

import '../../assets/css/checkout.css';



const Checkout = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [cartItems] = useState([
    { id: 1, name: "T-Shirt", price: 200000, quantity: 2, image: "https://path_to_image/t-shirt.jpg" },
    { id: 2, name: "Jeans", price: 500000, quantity: 1, image: "https://path_to_image/jeans.jpg" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmitOrder = () => {
    if (!name || !phone || !address) {
      notifications.show({
        title: "Vui lòng điền đầy đủ thông tin",
        message: "Bạn cần nhập họ tên, số điện thoại và địa chỉ giao hàng.",
        color: "red",
        position: "top-right",
      });
      return;
    }

    // Log đơn hàng gửi đi
    console.log({
      name,
      phone,
      address,
      notes,
      paymentMethod,
      cartItems,
      totalPrice: getTotalPrice(),
    });

    // Kiểm tra phương thức thanh toán và thực hiện hành động tương ứng
    if (paymentMethod === "COD") {
      // Nếu thanh toán COD, hiển thị modal thông báo
      setShowModal(true);

      // Chuyển hướng về trang chủ sau 3 giây
      setTimeout(() => {
        navigate("/"); // Điều hướng về trang chủ
      }, 3000); // Chờ 3 giây trước khi chuyển trang
    } else if (paymentMethod === "Momo") {
      // Nếu thanh toán bằng Momo, chuyển hướng đến trang thanh toán Momo sandbox
      window.location.href = "https://sandbox.momo.vn"; // Đây là URL giả lập, thay đổi khi có endpoint thật
    } else if (paymentMethod === "ZaloPay") {
      // Nếu thanh toán qua ZaloPay
      window.location.href = "https://sandbox.zalopay.vn"; // URL giả lập, thay đổi khi có endpoint thật
    } else {
      // Phương thức thanh toán không hợp lệ
      notifications.show({
        title: "Lỗi",
        message: "Phương thức thanh toán không hợp lệ.",
        color: "red",
        position: "top-right",
      });
    }
  };

  return (
    <MainLayout>
      <div className="checkout-container mx-auto p-6 max-w-4xl bg-white rounded-xl shadow-md flex gap-12">
        {/* Left Column - Giỏ hàng */}
        <div className="w-2/3">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Thông tin giao hàng</h1>

          {/* Form Inputs */}
          <div className="space-y-4">
            <InputField label="Họ và tên" value={name} onChange={setName} />
            <InputField label="Số điện thoại" value={phone} onChange={setPhone} />
            <InputField label="Địa chỉ giao hàng" value={address} onChange={setAddress} />
            <TextareaField label="Ghi chú (nếu có)" value={notes} onChange={setNotes} />

            {/* Payment Method - Radio Buttons */}
            <PaymentMethodOptions paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
          </div>
        </div>

        {/* Right Column - Tổng tiền và Xác nhận */}
        <div className="w-1/3 p-4 bg-gray-100 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Chi tiết đơn hàng</h2>
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center text-sm text-gray-700">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
                  <span>{item.name} x{item.quantity}</span>
                </div>
                <span>{(item.price * item.quantity).toLocaleString()}đ</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between mt-4 text-lg font-semibold text-gray-900">
            <span>Giá trị đơn hàng</span>
            <span>{getTotalPrice().toLocaleString()}đ</span>
          </div>

          {/* Confirm Order Button */}
          <div className="mt-6">
            <Button fullWidth onClick={handleSubmitOrder} color="blue" size="lg" className="rounded-lg shadow-md">
              Xác nhận đơn hàng
            </Button>
          </div>
        </div>
      </div>

      {/* Modal - Đặt hàng thành công */}
      <Modal
        opened={showModal}
        onClose={() => setShowModal(false)}
        centered
        size="xs"
        withCloseButton={false}
        overlayOpacity={0.3}
        overlayBlur={5}
      >
        <div className="flex flex-col items-center">
          <div className="text-5xl text-green-500 mb-4">✔</div>
          <h2 className="text-lg font-semibold text-gray-800">Đặt hàng thành công!</h2>
          <p className="text-sm text-gray-600">Cảm ơn bạn đã đặt hàng. Đơn hàng sẽ được giao sớm.</p>
        </div>
      </Modal>
    </MainLayout>
  );
};

// InputField component
const InputField = ({ label, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`Nhập ${label.toLowerCase()}`}
      size="md"
      required
      className="rounded-lg border-gray-300"
    />
  </div>
);

// TextareaField component
const TextareaField = ({ label, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`Nhập ${label.toLowerCase()}`}
      size="md"
      className="rounded-lg border-gray-300"
    />
  </div>
);

// PaymentMethodOptions component
const PaymentMethodOptions = ({ paymentMethod, setPaymentMethod }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700">Phương thức thanh toán</label>
    <Group direction="column" className="mt-2">
      <Radio
        value="COD"
        checked={paymentMethod === "COD"}
        onChange={(e) => setPaymentMethod(e.target.value)}
        label={
          <div className="flex items-center">
            <img
              src="https://example.com/cod-icon.png" // Replace with the actual COD image URL
              alt="COD"
              className="w-6 h-6 mr-2"
            />
            Thanh toán khi nhận hàng (COD)
          </div>
        }
      />
      <Radio
        value="ZaloPay"
        checked={paymentMethod === "ZaloPay"}
        onChange={(e) => setPaymentMethod(e.target.value)}
        label={
          <div className="flex items-center">
            <img
              src="https://example.com/zalopay-icon.png" // Replace with the actual ZaloPay image URL
              alt="ZaloPay"
              className="w-6 h-6 mr-2"
            />
            ZaloPay
          </div>
        }
      />
      <Radio
        value="Momo"
        checked={paymentMethod === "Momo"}
        onChange={(e) => setPaymentMethod(e.target.value)}
        label={
          <div className="flex items-center">
            <img
              src="https://example.com/momo-icon.png" // Replace with the actual Momo image URL
              alt="Momo"
              className="w-6 h-6 mr-2"
            />
            Momo
          </div>
        }
      />
    </Group>
  </div>
);


export default Checkout;
