import apiClient from "./client";
import { Category } from "../types/category.types";

export const categoryService = {
  // Ambil semua kategori
  getAll: async (): Promise<Category[]> => {
    try {
      const response = await apiClient.get("/categories");

      console.log("CATEGORY response.data:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Ambil kategori berdasarkan ID
  getById: async (id: string): Promise<Category> => {
    try {
      const response = await apiClient.get(`/categories/${id}`);
      console.log("CATEGORY BY ID data:", response.data);

      return response.data;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      throw error;
    }
  },
};
