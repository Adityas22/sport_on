import apiClient from "./client";
import { Product } from "../types/product.types";

export const productService = {
  // Ambil semua produk
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await apiClient.get("/products");

      console.log("PRODUCT response.data:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Ambil produk berdasarkan ID
  getById: async (id: string): Promise<Product> => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      console.log("PRODUCT BY ID data:", response.data);

      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },
};
