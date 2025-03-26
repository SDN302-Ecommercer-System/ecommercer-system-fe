import { useEffect, useState, useMemo } from "react";
import axiosInstance from "../config/axios.config";
import CONSTANT_VALUE from "../helpers/constants/constant";

const useAuth = () => {
  const [authState, setAuthState] = useState({
    token: null,
    userInformation: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const verifyToken = async () => {
    try {
      const response = await axiosInstance.post("/verify_token");
      if (response.status === 200) {
        const userInformation = localStorage.getItem(CONSTANT_VALUE.localStorageKey.USER_INFORMATION);
        const parsedUserInfo = userInformation ? JSON.parse(userInformation) : null;

        setAuthState({
          token: localStorage.getItem(CONSTANT_VALUE.localStorageKey.ACCESS_TOKEN),
          userInformation: parsedUserInfo,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        clearAuthState();
      }
    } catch (error) {
      clearAuthState();
    }
  };

  const clearAuthState = () => {
    localStorage.removeItem(CONSTANT_VALUE.localStorageKey.ACCESS_TOKEN);
    localStorage.removeItem(CONSTANT_VALUE.localStorageKey.USER_INFORMATION);
    setAuthState({
      token: null,
      userInformation: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  useEffect(() => {
    verifyToken();

    const handleAuthChange = () => {
      verifyToken();
    };

    window.addEventListener("authChanged", handleAuthChange);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  return useMemo(() => authState, [authState]);
};

export default useAuth;
