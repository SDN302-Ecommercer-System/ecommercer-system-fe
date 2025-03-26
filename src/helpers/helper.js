import axiosInstance from "../config/axios.config";
import CONSTANT_VALUE from "./constants/constant";

const formatMoney = (price, locale) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const sendEmail = async (to, password) => {
  try {
    const { data } = await axiosInstance.post("/verify_otp", { to, password });

    if (data?.success) return CONSTANT_VALUE.loginNotificationResponse.SUCCESS;
    
  } catch (error) {
    if (error.response?.status === 404) {
      return CONSTANT_VALUE.loginNotificationResponse.NONE_REGISTER;
    }

    if (error.response?.status === 401) {
      return CONSTANT_VALUE.loginNotificationResponse.WRONG_PASSWORD;
    }
  }
  return CONSTANT_VALUE.loginNotificationResponse.ERROR_SERVER;
};



export { formatMoney, sendEmail };
