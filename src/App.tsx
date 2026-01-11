import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import ini
import Footer from "./component/footer";
import Navbar from "./component/navbar";
import Home from "./component/home";
import ProductDetail from "./component/productDetail";
import Checkout from "./component/checkout";
import Payment from "./component/payment";
import OrderStatus from "./component/orderStatus";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 pt-15">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-status" element={<OrderStatus />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
