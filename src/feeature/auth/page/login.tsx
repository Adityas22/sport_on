import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasikan login berhasil
    localStorage.setItem("isAuthenticated", "true");
    navigate("/admin/products");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-xl overflow-hidden border-t-8 border-[#FF5733] p-10">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="  p-4 flex justify-center">
            {/* Berikan batas lebar maksimal yang besar */}
            <div className="w-full max-w-[300px]">
              <img
                src="/images/logo-admin.svg"
                alt="Logo"
                className="w-full h-auto object-contain block"
              />
            </div>
          </div>
          <p className="text-gray-400 text-xs">
            Enter your credentials to access the dashboard
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@store.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/10 focus:border-[#FF5733] transition-all placeholder:text-gray-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/10 focus:border-[#FF5733] transition-all placeholder:text-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF5733] text-white py-4 rounded-2xl font-bold hover:bg-[#e04a2b] transition-all shadow-lg shadow-red-100 active:scale-[0.98] mt-4"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
