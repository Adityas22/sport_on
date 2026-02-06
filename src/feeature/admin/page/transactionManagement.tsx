import React, { useState } from "react";
import { Eye, X, Check, XCircle } from "lucide-react";

const TransactionManagement: React.FC = () => {
  const [selectedTxn, setSelectedTxn] = useState<any>(null);

  const transactions = [
    {
      id: 1,
      date: "23/02/2026 19:32",
      customer: "John Doe",
      contact: "08123456789",
      address: "Merdeka Street, Jakarta, Indonesia, 332122",
      total: 1000000,
      status: "PENDING",
      items: [
        {
          name: "SportsOn Hyperfast Shoes",
          qty: 3,
          image: "/images/products/product-1.png",
        },
      ],
      proof:
        "https://tse3.mm.bing.net/th/id/OIP.A6NoyN643gRgBIdDFoXwAAHaPp?w=606&h=1280&rs=1&pid=ImgDetMain&o=7&rm=3", // Ganti dengan path image bukti transfer
    },
    {
      id: 2,
      date: "23/02/2026 13:32",
      customer: "Delon Marx",
      contact: "08823291231",
      address: "Mawar Street, Bandung, 40123",
      total: 753000,
      status: "PAID",
      items: [
        {
          name: "SportsOn Hyperfast Shoes",
          qty: 2,
          image: "/images/products/product-2.png",
        },
      ],
      proof:
        "https://tse3.mm.bing.net/th/id/OIP.A6NoyN643gRgBIdDFoXwAAHaPp?w=606&h=1280&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 3,
      date: "23/02/2026 13:32",
      customer: "Delon Marx",
      contact: "08823291231",
      address: "Mawar Street, Bandung, 40123",
      total: 753000,
      status: "REJECTED",
      items: [
        {
          name: "SportsOn Hyperfast Shoes",
          qty: 2,
          image: "/images/products/product-3.png",
        },
      ],
      proof:
        "https://tse3.mm.bing.net/th/id/OIP.A6NoyN643gRgBIdDFoXwAAHaPp?w=606&h=1280&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
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

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-500 text-sm mt-1">
          Verify incoming payments and manage orders.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
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
                key={txn.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-5 text-sm text-gray-900">{txn.date}</td>
                <td className="px-6 py-5 text-sm font-semibold text-gray-800">
                  {txn.customer}
                </td>
                <td className="px-6 py-5 text-sm text-gray-500">
                  {txn.contact}
                </td>
                <td className="px-6 py-5 text-sm font-bold text-gray-900">
                  Rp. {txn.total.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg border ${getStatusStyle(txn.status)}`}
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
      </div>

      {/* --- MODAL VERIFY TRANSACTIONS --- */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-50">
              <h2 className="text-xl font-bold text-gray-900">
                Verify Transactions
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
                    src={selectedTxn.proof}
                    alt="Proof"
                    className="w-full h-[400px] object-contain p-2"
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
                        {selectedTxn.date}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Customer</span>
                      <span className="font-semibold text-gray-800">
                        {selectedTxn.customer}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Contact</span>
                      <span className="font-semibold text-gray-800">
                        {selectedTxn.contact}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-400 shrink-0">
                        Shipping Address
                      </span>
                      <span className="font-semibold text-gray-800 text-right">
                        {selectedTxn.address}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items Purchased */}
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-3">
                    Items Purchased
                  </p>
                  {selectedTxn.items.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 border border-gray-100 rounded-xl mb-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-800">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-gray-500">
                        {item.qty} units
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-bold text-gray-800">Total</span>
                  <span className="text-lg font-bold text-[#FF5733]">
                    Rp. {selectedTxn.total.toLocaleString("id-ID")}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setSelectedTxn(null)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-50 text-red-500 rounded-xl font-bold hover:bg-red-100 transition-colors"
                  >
                    <XCircle size={18} /> Reject
                  </button>
                  <button
                    onClick={() => setSelectedTxn(null)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all shadow-md shadow-green-200"
                  >
                    <Check size={18} /> Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionManagement;
