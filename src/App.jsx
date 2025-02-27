import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import ProductDetail from "./components/pages/ProductDetail";
import NotFound from "./components/pages/NotFound";
import Checkout from "./components/pages/Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/checkout" element={<Checkout />} />
       
      </Routes>
    </Router>
  );
}

export default App;
