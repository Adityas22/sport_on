// src/service/api/transaction.service.ts
import apiClient from "./client";
import {
  CreateTransactionPayload,
  Transaction,
  //   TransactionItem,
} from "../types/transaction.types";

export const transactionService = {
  // Create new transaction
  async create(payload: CreateTransactionPayload): Promise<Transaction> {
    try {
      const formData = new FormData();

      // Sesuaikan key "paymentProof" menjadi "image" jika Swagger meminta key "image"
      // Di Swagger Anda tertulis 'image string($binary)'
      formData.append("image", payload.paymentProof);

      formData.append("purchasedItems", JSON.stringify(payload.purchasedItems));
      formData.append("totalPayment", payload.totalPayment.toString());
      formData.append("customerName", payload.customerName);
      formData.append("customerContact", payload.customerContact);
      formData.append("customerAddress", payload.customerAddress);

      // 1. Ambil token dari localStorage (sesuaikan dengan cara Anda menyimpan token)
      const token = localStorage.getItem("token");

      // 2. Ubah endpoint ke /transactions/checkout sesuai Swagger
      const response = await apiClient.post(
        "/transactions/checkout",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // 3. Tambahkan Authorization header agar tidak 401
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Transaction created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  },

  // Get all transactions
  async getAll(): Promise<Transaction[]> {
    try {
      const response = await apiClient.get("/transactions");
      console.log("All transactions:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  },

  // Get transaction by ID
  async getById(id: string): Promise<Transaction> {
    try {
      console.log("Fetching transaction:", id);
      const response = await apiClient.get(`/transactions/${id}`);
      console.log("Transaction fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching transaction ${id}:`, error);
      throw error;
    }
  },
};
