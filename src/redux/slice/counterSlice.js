import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios.config";

// Gọi API lấy giỏ hàng từ backend
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/cart");
      return response.data.cart; // Lấy trực tiếp cart từ response
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thêm sản phẩm vào giỏ hàng
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/cart", item);
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const updateQuantityAsync = createAsyncThunk(
  "cart/updateQuantity",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/cart/${id}`, { quantity });
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Xoá sản phẩm khỏi giỏ hàng
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/cart/${id}`);
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    list: [], // Danh sách items trong giỏ hàng
    totalPrice: 0, // Tổng giá của giỏ hàng
    status: "idle",
    error: null,
  },
  reducers: {
    // Xoá toàn bộ giỏ hàng (local state)
    clearCart: (state) => {
      state.list = [];
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handle addToCart
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.list = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })

      // Handle updateQuantity
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        state.list = action.payload.items;
        console.log(state.list);
        state.totalPrice = action.payload.totalPrice;
      })

      // Handle removeFromCart
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.list = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
