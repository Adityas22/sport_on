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

  // Buat produk baru
  create: async (formData: FormData): Promise<Product> => {
    try {
      const response = await apiClient.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("CREATE PRODUCT response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  // Update produk
  update: async (id: string, formData: FormData): Promise<Product> => {
    try {
      const response = await apiClient.put(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("UPDATE PRODUCT response:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },

  // Hapus produk
  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/products/${id}`);
      console.log(`Product ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  },
};
