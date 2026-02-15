import React, { useState } from "react";
import { Eye, X, Check, XCircle } from "lucide-react";
import { BASE_URL } from "../../../service/api/client";
import { Transaction } from "../../../service/types/transaction.types";
import { transactionService } from "../../../service/api/transaction.service";
import { useEffect } from "react";

const TransactionManagement: React.FC = () => {
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function untuk get full image URL
  const getImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${BASE_URL}/${imageUrl}`;
  };

  // Fetch transactions saat komponen dimount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      alert("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  // Handle approve transaction
  const handleApprove = async (id: string) => {
    try {
      await transactionService.updateStatus(id, "paid");
      alert("Transaction approved successfully!");
      setSelectedTxn(null);
      await fetchTransactions();
    } catch (error) {
      console.error("Failed to approve transaction:", error);
      alert("Failed to approve transaction");
    }
  };

  // Handle reject transaction
  const handleReject = async (id: string) => {
    if (!confirm("Are you sure you want to reject this transaction?")) return;

    try {
      await transactionService.updateStatus(id, "rejected");
      alert("Transaction rejected successfully!");
      setSelectedTxn(null);
      await fetchTransactions();
    } catch (error) {
      console.error("Failed to reject transaction:", error);
      alert("Failed to reject transaction");
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "bg-yellow-50 text-yellow-500 border-yellow-100";
      case "PAID":
        return "bg-green-50 text-green-500 border-green-100";
      case "REJECTED":
        return "bg-red-50 text-red-400 border-red-100";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-500 text-sm mt-1">
          Verify incoming payments and manage orders.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-5 text-sm font-bold text-gray-800">
                  Date
                </th>
                <th className="px-6 py-5 text-sm font-bold text-gray-800">
                  Customer
                </th>
                <th className="px-6 py-5 text-sm font-bold text-gray-800">
                  Contact
                </th>
                <th className="px-6 py-5 text-sm font-bold text-gray-800">
                  Total
                </th>
                <th className="px-6 py-5 text-sm font-bold text-gray-800">
                  Status
                </th>
                <th className="px-6 py-5 text-sm font-bold text-gray-800 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((txn) => (
                <tr
                  key={txn._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-5 text-sm text-gray-900">
                    {formatDate(txn.createdAt)}
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-gray-800">
                    {txn.customerName}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {txn.customerContact}
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-900">
                    Rp. {txn.totalPayment.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 text-[10px] font-bold rounded-lg border uppercase ${getStatusStyle(txn.status)}`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end">
                      <button
                        onClick={() => setSelectedTxn(txn)}
                        className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:opacity-70 transition-opacity"
                      >
                        <Eye size={18} strokeWidth={2.5} />
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* --- MODAL VERIFY TRANSACTIONS --- */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-50">
              <h2 className="text-xl font-bold text-gray-900">
                Verify Transaction
              </h2>
              <button
                onClick={() => setSelectedTxn(null)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left: Payment Proof */}
              <div>
                <p className="text-sm font-bold text-gray-800 mb-3">
                  Payment Proof
                </p>
                <div className="rounded-2xl border border-gray-100 overflow-hidden bg-gray-50">
                  <img
                    src={getImageUrl(selectedTxn.paymentProof) || ""}
                    alt="Payment Proof"
                    className="w-full h-[400px] object-contain p-2"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>

              {/* Right: Details */}
              <div className="space-y-6">
                {/* Order Details */}
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-3">
                    Order Details
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date</span>
                      <span className="font-semibold text-gray-800">
                        {formatDate(selectedTxn.createdAt)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Customer</span>
                      <span className="font-semibold text-gray-800">
                        {selectedTxn.customerName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Contact</span>
                      <span className="font-semibold text-gray-800">
                        {selectedTxn.customerContact}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-400 shrink-0">
                        Shipping Address
                      </span>
                      <span className="font-semibold text-gray-800 text-right">
                        {selectedTxn.customerAddress}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status</span>
                      <span
                        className={`px-3 py-1 text-[10px] font-bold rounded-lg border uppercase ${getStatusStyle(selectedTxn.status)}`}
                      >
                        {selectedTxn.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items Purchased */}
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-3">
                    Items Purchased
                  </p>
                  <div className="space-y-2">
                    {selectedTxn.purchasedItems.map((item, idx) => {
                      // Cast untuk menghindari TypeScript error
                      const product = item.productId as any;
                      const isObject =
                        product && typeof product === "object" && product._id;

                      const productId = isObject
                        ? product._id
                        : String(product);
                      const productName = isObject
                        ? product.name
                        : "Unknown Product";
                      const productImage = isObject ? product.imageUrl : null;

                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 border border-gray-100 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            {productImage && (
                              <div className="w-10 h-10 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
                                <img
                                  src={getImageUrl(productImage) || ""}
                                  alt={productName}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                  }}
                                />
                              </div>
                            )}
                            <div>
                              <span className="text-xs font-bold text-gray-800 block">
                                {productName}
                              </span>
                              <span className="text-[10px] text-gray-400">
                                ID: {productId}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-gray-500">
                            {item.qty} units
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-sm font-bold text-gray-800">
                    Total Payment
                  </span>
                  <span className="text-lg font-bold text-[#FF5733]">
                    Rp. {selectedTxn.totalPayment.toLocaleString("id-ID")}
                  </span>
                </div>

                {/* Action Buttons - Only show for PENDING status */}
                {selectedTxn.status.toLowerCase() === "pending" && (
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => handleReject(selectedTxn._id)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-50 text-red-500 rounded-xl font-bold hover:bg-red-100 transition-colors"
                    >
                      <XCircle size={18} /> Reject
                    </button>
                    <button
                      onClick={() => handleApprove(selectedTxn._id)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all shadow-md shadow-green-200"
                    >
                      <Check size={18} /> Approve
                    </button>
                  </div>
                )}

                {/* Status message for non-pending transactions */}
                {selectedTxn.status.toLowerCase() !== "pending" && (
                  <div className="pt-4">
                    <div
                      className={`p-4 rounded-xl text-center font-semibold ${
                        selectedTxn.status.toLowerCase() === "paid"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      This transaction has been{" "}
                      {selectedTxn.status.toLowerCase()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionManagement;
