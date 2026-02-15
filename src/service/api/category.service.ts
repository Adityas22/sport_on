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

  // Buat kategori baru
  create: async (formData: FormData): Promise<Category> => {
    try {
      const response = await apiClient.post("/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("CREATE CATEGORY response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  // Update kategori
  update: async (id: string, formData: FormData): Promise<Category> => {
    try {
      const response = await apiClient.put(`/categories/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("UPDATE CATEGORY response:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating category ${id}:`, error);
      throw error;
    }
  },

  // Hapus kategori
  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/categories/${id}`);
      console.log(`Category ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      throw error;
    }
  },
};
