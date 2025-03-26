import { useEffect, useRef, useState } from "react";
import { Image, Input, Modal, Select } from "@mantine/core";
import {
  IconMapPin,
  IconTruckDelivery,
  IconCreditCardPay,
} from "@tabler/icons-react";
import MainLayout from "../MainLayout";
import { v4 as uuidv4 } from "uuid";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { formatMoney } from "../../helpers/helper";
import CONSTANT_VALUE from "../../helpers/constants/constant";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import axiosInstance from "../../config/axios.config";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  // form information
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [voucher, setVoucher] = useState("");

  //check verify
  const [isPaymentVerified, setIsVerify] = useState(false);
  const uuidRef = useRef(uuidv4().replace(/-/g, ""));
  const UUID = uuidRef.current;

  //total
  const [discountAmount, setDiscountAmount] = useState(0);

  const [openedQRcode, { open, close }] = useDisclosure(false);
  const totalOrigin = useSelector((state) => state.cart.totalPrice);
  const cart = useSelector((state) => state.cart.list);
  const total = totalOrigin - discountAmount;

  // api
  const apiVerifyPaymentToken = import.meta.env.VITE_API_TOKEN_PAYMENT;

  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Chỉ khi isLoading xong mới check isAuthenticated
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  //fetch data province
  useEffect(() => {
    fetch("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((res) => res.json())
      .then((data) => setProvinces(data.data));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.data));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
        .then((res) => res.json())
        .then((data) => setWards(data.data));
    }
  }, [selectedDistrict]);

  const createOrder = async (orderPayload) => {
    try {
      const response = await axiosInstance.post("/order", orderPayload);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * verify payment
   *
   * @returns true if user payment success, otherwise false
   */
  const verifyPayment = async () => {
    try {
      const response = await axios.get("/api/transactions/list?limit=20", {
        headers: {
          Authorization: `Bearer ${apiVerifyPaymentToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response && response.data) {
        const transactions = response.data.transactions;
        if (transactions && Array.isArray(transactions)) {
          return transactions.some((bill) => {
            const billContent = bill.transaction_content?.split(" ")[0];
            const billAmount = bill.amount_in && parseInt(bill.amount_in);

            return billContent === UUID && billAmount === total;
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateOrder = () => {
    if (total <= 0) {
      notifications.show({
        title: "Bạn cần chọn thêm món hànghàng",
        message: "Trong giỏ hàng không có sản phẩm",
        position: "top-right",
        color: "red",
      });
      return false;
    }

    if (!name.trim()) {
      notifications.show({
        title: "Lỗi thông tin",
        message: "Vui lòng nhập họ tên.",
        position: "top-right",
        color: "red",
      });
      return false;
    }

    if (!phone || phone.length < 10) {
      notifications.show({
        title: "Lỗi thông tin",
        message: "Số điện thoại không hợp lệ. Vui lòng nhập đủ 10 số.",
        position: "top-right",
        color: "red",
      });
      return false;
    }

    if (!selectedProvince || !selectedDistrict || !selectedWard) {
      notifications.show({
        title: "Lỗi thông tin",
        message:
          "Vui lòng chọn đầy đủ Tỉnh/Thành phố, Quận/Huyện và Phường/Xã.",
        position: "top-right",
        color: "red",
      });
      return false;
    }

    if (!address.trim()) {
      notifications.show({
        title: "Lỗi thông tin",
        message: "Vui lòng nhập địa chỉ chi tiết.",
        position: "top-right",
        color: "red",
      });
      return false;
    }

    return true; // Trả về true nếu mọi thứ hợp lệ
  };

  const handleOrder = async () => {
    if (isPaymentVerified) {
      notifications.show({
        title: "Bạn đã chuyển khoản",
        message: "Thành công chuyển khoản, bạn không cần phải xác thực thêm",
        position: "top-right",
        color: "green",
      });
      return;
    }

    const isPaidOrder = await verifyPayment();

    if (isPaidOrder) {
      const orderInfo = {
        items: cart,
        totalPrice: total,
        discount: discountAmount,
        finalPrice: total - discountAmount,
        shippingAddress: {
          phone,
          fullName: name,
          province: provinces.find((p) => p.id === selectedProvince)?.name,
          district: districts.find((d) => d.id === selectedDistrict)?.name,
          ward: wards.find((w) => w.id === selectedWard)?.name,
          address,
        },
        paymentMethod: "qr_code",
        paymentStatus: "paid",
        orderStatus: "processing",
      };

      console.log("Thông tin đơn hàng:", orderInfo);

      const response = await createOrder(orderInfo);

      setIsVerify(true);

      // Hiển thị thông báo thành công
      notifications.show({
        title: "Thành công",
        message: "Thông tin đơn hàng đã được xác nhận!",
        position: "top-right",
        color: "green",
      });

      close();
      return;
    }

    setIsVerify(false);

    notifications.show({
      title: "Bạn chưa thanh toán tiền",
      message: "Vui lòng thực hiện lại thanh toán với QR Code",
      position: "top-right",
      color: "red",
    });
  };

  const handleUseVoucher = () => {
    const MIN_TOTAL_ORDER_VOUCHER_50k = 500000;
    const MIN_TOTAL_ORDER_VOUCHER_100k = 1000000;

    switch (voucher) {
      case CONSTANT_VALUE.voucher.voucherDiscount50k:
        if (total < MIN_TOTAL_ORDER_VOUCHER_50k) {
          notifications.show({
            title: "Bạn phải mua đơn hàng giá trị bằng hoặc hơn 500k",
            message: "Hãy dùng voucher khác hoặc mua thêm hàng",
            position: "top-right",
            color: "red",
          });
          setDiscountAmount(0);
        } else {
          setDiscountAmount(50000);
        }

        break;
      case CONSTANT_VALUE.voucher.voucherDiscount100k:
        if (total < MIN_TOTAL_ORDER_VOUCHER_100k) {
          notifications.show({
            title: "Bạn phải mua đơn hàng giá trị bằng hoặc hơn 1M",
            message: "Hãy dùng voucher khác hoặc mua thêm hàng",
            position: "top-right",
            color: "red",
          });
          setDiscountAmount(0);
        } else {
          setDiscountAmount(100000);
        }
        break;
      default:
        notifications.show({
          title: "Voucher không tồn tại",
          message: "Hãy dùng voucher khác !!!",
          position: "top-right",
          color: "red",
        });
        setDiscountAmount(0);
        break;
    }
  };

  if (provinces.length === 0) {
    return <h1>loading...</h1>;
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-3 gap-x-12">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <IconMapPin size={20} />
            <h3 className="text-base font-bold">Tùy chọn giao hàng</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input.Wrapper
              label="Họ tên"
              classNames={{
                label: "text-base font-bold text-gray-700",
              }}
            >
              <Input
                placeholder="Nhập họ tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Input.Wrapper>

            <Input.Wrapper
              label="Số điện thoại"
              classNames={{
                label: "text-base font-bold text-gray-700",
              }}
            >
              <Input
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => {
                  const input = e.target.value;
                  // Chỉ cho phép số và tối đa 10 ký tự
                  if (/^\d{0,10}$/.test(input)) {
                    setPhone(input);
                  }
                }}
                maxLength={10}
              />
            </Input.Wrapper>

            <div className="grid grid-cols-3 col-span-2 gap-4">
              <Input.Wrapper
                label="Tỉnh/Thành phố"
                classNames={{ label: "text-base font-bold text-gray-700" }}
              >
                <Select
                  placeholder="Chọn tỉnh/thành phố"
                  data={provinces.map((p) => ({ value: p.id, label: p.name }))}
                  value={selectedProvince} // Gán giá trị để đảm bảo cập nhật UI
                  onChange={(value) => {
                    setSelectedProvince(value);

                    // Reset quận/huyện và phường/xã khi tỉnh bị bỏ chọn
                    setSelectedDistrict(null);
                    setSelectedWard(null);
                    setDistricts([]);
                    setWards([]);
                  }}
                />
              </Input.Wrapper>

              <Input.Wrapper
                label="Quận/Huyện"
                classNames={{ label: "text-base font-bold text-gray-700" }}
              >
                <Select
                  placeholder="Chọn quận/huyện"
                  data={districts.map((d) => ({ value: d.id, label: d.name }))}
                  value={selectedDistrict} // Gán giá trị để UI cập nhật đúng
                  onChange={(value) => {
                    setSelectedDistrict(value);
                    setSelectedWard(null);
                    setWards([]);
                  }}
                  disabled={!selectedProvince}
                />
              </Input.Wrapper>

              <Input.Wrapper
                label="Phường/Xã"
                classNames={{ label: "text-base font-bold text-gray-700" }}
              >
                <Select
                  placeholder="Chọn phường/xã"
                  data={wards.map((w) => ({ value: w.id, label: w.name }))}
                  value={selectedWard} // Gán giá trị để UI cập nhật đúng
                  onChange={setSelectedWard} // Cập nhật khi chọn phường/xã
                  disabled={!selectedDistrict}
                />
              </Input.Wrapper>
            </div>

            <div className="col-span-2">
              <Input.Wrapper
                label="Địa chỉ"
                classNames={{
                  label: "text-base font-bold text-gray-700",
                }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Input.Wrapper>
            </div>
          </div>

          <div className="py-10 mt-4 border-y border-y-slate-300">
            <div className="flex items-center gap-2">
              <IconTruckDelivery size={20} />
              <h3 className="text-base font-bold">Tùy chọn giao hàng</h3>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Chúng tôi sẽ giao hàng với các đơn vị vận chuyển hợp tác với nhóm
              chúng tôi
            </p>
          </div>

          <div className="py-10 mt-4 border-b border-b-slate-300">
            <div className="flex items-center gap-2">
              <IconCreditCardPay size={20} />
              <h3 className="text-base font-bold">Phương thức thanh toán</h3>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Chúng tôi chỉ chấp nhận thanh toán qua{" "}
              <span className="font-bold text-red-500">QR code</span>, vui lòng
              thanh toán trước
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between gap-3 pb-4 border-b border-slate-300">
            <div className="flex-1">
              <Input.Wrapper
                label="Mã giảm giá"
                classNames={{
                  label: "text-base font-bold text-gray-700",
                }}
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
              >
                <Input placeholder="Voucher" />
              </Input.Wrapper>
            </div>

            <button
              className="px-4 py-2 bg-red-500 rounded-md text-slate-100 hover:bg-red-600 active:bg-red-700"
              onClick={handleUseVoucher}
            >
              Sử dụng
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold">Đơn hàng chi tiết</h3>
            <table className="w-full border-collapse">
              <tbody className="space-y-4">
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Giá trị đơn hàng</td>
                  <td className="py-2 font-medium text-right">
                    {formatMoney(total, "vi-VN")}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-2 text-gray-600">Ưu đãi chương trình</td>
                  <td className="py-2 text-right text-red-500">
                    {formatMoney(discountAmount, "vi-VN")}
                  </td>
                </tr>
                <tr className="text-lg font-semibold border-t">
                  <td className="pt-10 text-gray-800">Tổng tiền thanh toán</td>
                  <td className="pt-10 text-right text-slate-700">
                    {formatMoney(total - discountAmount, "vi-VN")}
                  </td>
                </tr>
                <tr className="text-lg font-semibold">
                  <td className="text-xs font-light capitalize text-slate-500">
                    (đã bao gồm thuế VAT)
                  </td>
                </tr>
                <tr>
                  <td className="pt-4" colSpan={2}>
                    <button
                      onClick={() => {
                        if (validateOrder()) {
                          open();
                        }
                      }}
                      className="w-full px-4 py-2 uppercase bg-red-500 rounded-md text-slate-100 hover:bg-red-600 active:bg-red-700"
                    >
                      Thanh toán
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <Modal
              opened={openedQRcode}
              onClose={close}
              transitionProps={{ transition: "slide-left", duration: 200 }}
              centered
            >
              <Image
                className="object-cover w-full"
                src={`https://qr.sepay.vn/img?acc=96247LONGTDD2804&bank=BIDV&amount=${total}&des=${UUID}&template=compact`}
              />
              <button
                onClick={handleOrder}
                className="w-full px-4 py-2 mt-4 uppercase bg-red-500 rounded-md text-slate-100 hover:bg-red-600 active:bg-red-700"
              >
                Xác nhận đã chuyển khoản
              </button>
            </Modal>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
