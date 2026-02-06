import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./component/userLayout";
import AdminLayout from "./feeature/admin/component/adminLayout";
// Import Pages User
import Home from "./component/home";
import ProductDetail from "./component/productDetail";
import Checkout from "./component/checkout";
import Payment from "./component/payment";
import OrderStatus from "./component/orderStatus";
// Import Pages Admin
import ProductManagement from "./feeature/admin/page/productManagement";
import CategoryManagement from "./feeature/admin/page/categoryManagement";
import TransactionManagement from "./feeature/admin/page/transactionManagement";
import BankManagement from "./feeature/admin/page/bankManagement";

import Login from "./feeature/auth/page/login";

function App() {
  return (
    <Router>
      <Routes>
        {/* GROUP 1: CUSTOMER ROUTES (Pake Navbar & Footer) */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-status" element={<OrderStatus />} />
        </Route>

        {/* GROUP 2: ADMIN ROUTES (Pake Sidebar, Tanpa Footer) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<ProductManagement />} />{" "}
          <Route path="products" element={<ProductManagement />} />{" "}
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="transactions" element={<TransactionManagement />} />
          <Route path="bank" element={<BankManagement />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
