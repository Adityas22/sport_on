import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const UserLayout = () => (
  <div className="min-h-screen flex flex-col bg-gray-50 pt-15">
    <Navbar />
    <main className="flex-1">
      <Outlet /> {/* Ini tempat halaman user muncul */}
    </main>
    <Footer />
  </div>
);
export default UserLayout;
