// src/service/api/auth.service.ts
import client from "./client";
import { LoginRequest, LoginResponse } from "../types/auth.types";

const authService = {
  login: (data: LoginRequest): Promise<LoginResponse> => {
    return client.post("/auth/signin", data).then((res) => res.data);
  },

  logout: (): void => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");

    // Hapus data user jika ada
    localStorage.removeItem("user");

    console.log("User logged out successfully");
  },
};

export default authService;
