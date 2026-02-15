import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../service/api/auth.service"; // Sesuaikan path folder Anda

const Login = () => {
  const navigate = useNavigate();

  // 1. State untuk form dan UI
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      // 2. Panggil service login
      const response = await authService.login({ email, password });

      // 3. Simpan data ke localStorage (Token & Status)
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("isAuthenticated", "true");

      // 4. Redirect ke dashboard
      navigate("/admin/products");
    } catch (error: any) {
      // 5. Tangani error dari server (400, 401, 500, dsb)
      const message =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-xl overflow-hidden border-t-8 border-[#FF5733] p-10">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="p-4 flex justify-center">
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

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@store.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/10 focus:border-[#FF5733] transition-all placeholder:text-gray-300"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/10 focus:border-[#FF5733] transition-all placeholder:text-gray-300"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#FF5733] text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-red-100 active:scale-[0.98] mt-4 ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#e04a2b]"
            }`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
