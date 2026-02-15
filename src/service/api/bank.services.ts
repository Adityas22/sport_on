import apiClient from "./client";
import {
  Bank,
  CreateBankPayload,
  UpdateBankPayload,
} from "../types/bank.types";

export const bankService = {
  // Get all banks
  async getAll(): Promise<Bank[]> {
    try {
      const response = await apiClient.get("/banks");
      console.log("All banks:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching banks:", error);
      throw error;
    }
  },

  // Get bank by ID
  async getById(id: string): Promise<Bank> {
    try {
      const response = await apiClient.get(`/banks/${id}`);
      console.log("Bank fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching bank ${id}:`, error);
      throw error;
    }
  },

  // Create new bank
  async create(payload: CreateBankPayload): Promise<Bank> {
    try {
      const response = await apiClient.post("/banks", payload);
      console.log("Bank created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating bank:", error);
      throw error;
    }
  },

  // Update bank
  async update(id: string, payload: UpdateBankPayload): Promise<Bank> {
    try {
      const response = await apiClient.put(`/banks/${id}`, payload);
      console.log("Bank updated:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating bank ${id}:`, error);
      throw error;
    }
  },

  // Delete bank
  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/banks/${id}`);
      console.log(`Bank ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting bank ${id}:`, error);
      throw error;
    }
  },
};
