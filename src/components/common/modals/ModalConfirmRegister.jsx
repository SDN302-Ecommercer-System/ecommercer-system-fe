import PropTypes from "prop-types";
import { Modal } from "@mantine/core";
import axiosInstance from "../../../config/axios.config";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import axios from "axios";

const HUNTER_API_KEY = import.meta.env.VITE_HUNTER_EMAIL_API_KEY;

const ModalConfirmRegister = ({ show, onClose, email, password }) => {
  const [isLoading, setLoading] = useState(false);

  const verifyEmail = async (email) => {
    try {
      const response = await axios.get("/hunter-api", {
        params: {
          email,
          api_key: HUNTER_API_KEY
        }
      });
  
      console.log("Hunter API Response:", response.data);
  
      return response.data.data.status === "valid";
    } catch (error) {
      console.error("Error verifying email:", error);
      return true; // Nếu lỗi xảy ra, vẫn cho phép tiếp tục
    }
  };
  

  const register = async () => {
    setLoading(true);
    try {
      // First verify the email
      const isValidEmail = await verifyEmail(email);
      
      if (!isValidEmail) {
        notifications.show({
          title: "Email này không tồn tại",
          message: "Vui lòng nhập lại email khác",
          position: "top-right",
          color: "red",
        });
        setLoading(false);
        return;
      }

      // If email is valid, proceed with registration
      const response = await axiosInstance.post("/user/register", {
        email,
        password,
      });

      const { status } = response.data;

      if (status === 200) {
        notifications.show({
          title: "Register Success",
          message: "Congratulations new user, enjoy shopping in longtdd shop",
          position: "top-right",
          color: "green",
        });
      } else {
        notifications.show({
          title: "Register Failed",
          message: "Please contact tranlong280403@gmail.com to know about the error",
          position: "top-right",
          color: "red",
        });
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "An error occurred during registration",
        position: "top-right",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={show}
      onClose={onClose}
      centered
      size="sm"
      title="Tài khoản chưa tồn tại"
      classNames={{ title: "text-center font-bold uppercase" }}
      zIndex={1000}
    >
      <div className="flex flex-col gap-4">
        <p className="text-center">
          Tài khoản với email <strong>{email}</strong> chưa được đăng ký. Bạn có
          muốn đăng ký tài khoản ngay bây giờ?
        </p>

        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={register}
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đăng ký ngay"}
          </button>

          <button
            className="px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={onClose}
            disabled={isLoading}
          >
            Nhập lại email
          </button>
        </div>
      </div>
    </Modal>
  );
};

// 🔥 Khai báo kiểu dữ liệu cho props
ModalConfirmRegister.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default ModalConfirmRegister;
