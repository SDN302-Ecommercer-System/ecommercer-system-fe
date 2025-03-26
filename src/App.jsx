import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import ProductDetail from "./components/pages/ProductDetail";
import NotFound from "./components/pages/NotFound";
import Checkout from "./components/pages/Checkout";
import Orders from "./components/pages/Orders";
import UserProfile from "./components/pages/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
