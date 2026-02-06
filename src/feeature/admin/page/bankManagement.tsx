import React, { useState } from "react";
import { Plus, CreditCard, Edit, Trash2, X } from "lucide-react";

const BankManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State untuk form input baru
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  const [banks, setBanks] = useState([
    {
      id: 1,
      bankName: "Mandiri",
      method: "Bank Transfer",
      accountNumber: "1234567890",
      holderName: "PT SportsOn Digital",
    },
    {
      id: 2,
      bankName: "BCA",
      method: "Bank Transfer",
      accountNumber: "0123123123123",
      holderName: "PT SportsOn Digital",
    },
  ]);

  const handleAddBank = () => {
    if (!bankName || !accountNumber || !accountHolder)
      return alert("Please fill all fields");

    const newBank = {
      id: Date.now(),
      bankName: bankName,
      method: "Bank Transfer",
      accountNumber: accountNumber,
      holderName: accountHolder,
    };

    setBanks([...banks, newBank]);

    // Reset & Close
    setBankName("");
    setAccountNumber("");
    setAccountHolder("");
    setIsModalOpen(false);
  };

  return (
    <div className="animate-in fade-in duration-500 relative">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bank Information</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage destination accounts for customer transfers.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#FF5733] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#e04a2b] transition-all shadow-sm"
        >
          <Plus size={20} strokeWidth={3} />
          Add Bank Account
        </button>
      </div>

      {/* Grid Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl">
        {banks.map((bank) => (
          <div
            key={bank.id}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md"
          >
            <div className="p-6 flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">
                    {bank.bankName}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">
                    {bank.method}
                  </p>
                </div>
              </div>

              <div className="flex gap-1">
                <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                  <Edit size={18} />
                </button>
                <button
                  onClick={() =>
                    setBanks(banks.filter((b) => b.id !== bank.id))
                  }
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="px-6 pb-6">
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">
                Account Number
              </p>
              <p className="text-xl font-bold text-gray-800 tracking-wider">
                {bank.accountNumber}
              </p>
            </div>

            <div className="mt-auto px-6 py-4 bg-gray-50/50 border-t border-gray-50">
              <p className="text-[10px] text-gray-400 font-medium">
                Holder :{" "}
                <span className="text-gray-600 font-bold ml-1">
                  {bank.holderName}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL ADD BANK ACCOUNT --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-50">
              <h2 className="text-xl font-bold text-gray-900">
                Add Bank Account
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="e. g. Mandiri, BCA, BRI"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/10 focus:border-[#FF5733] transition-all placeholder:text-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="123124344234234"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/10 focus:border-[#FF5733] transition-all placeholder:text-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Account Holder
                </label>
                <input
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  placeholder="Holder Name as registered on the account"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/10 focus:border-[#FF5733] transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 pb-8">
              <button
                onClick={handleAddBank}
                className="w-full bg-[#FF5733] text-white py-4 rounded-2xl font-bold hover:bg-[#e04a2b] transition-all shadow-md active:scale-[0.98]"
              >
                Add Bank Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankManagement;
