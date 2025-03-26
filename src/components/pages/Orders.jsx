import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import MainLayout from "../MainLayout";
import OrderItem from "../OrderItem";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Chỉ khi isLoading xong mới check isAuthenticated
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/order/list");

      if (response && response.data) {
        console.log(response);
        
        setOrders(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <MainLayout>
      <h1 className="my-4 text-2xl font-bold">Các đơn hàng bạn đã đặt</h1>
      <div className="py-6 space-y-6 overflow-auto">
        {orders.map((order) => (
          <OrderItem key={order._id} order={order} />
        ))}
      </div>
    </MainLayout>
  );
};

export default Orders;
