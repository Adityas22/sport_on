import React, { useState } from "react";
import { Plus, Edit, Trash2, X, Upload } from "lucide-react";

const ProductManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data produk menggunakan state agar bisa diupdate
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "SportsOn Hyperfast Shoes",
      category: "Running",
      price: 289000,
      stock: 2,
      image: "/images/products/product-1.png",
    },
    {
      id: 2,
      name: "SportsOn Hyperfast Shoes",
      category: "Running",
      price: 289000,
      stock: 2,
      image: "/images/products/product-2.png",
    },
  ]);

  // Handler untuk menghapus produk
  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="relative min-h-screen space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your inventory, prices and stock.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#FF5733] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#e04a2b] transition-all shadow-sm"
        >
          <Plus size={20} strokeWidth={3} />
          Add Product
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="border-b border-gray-100 bg-white">
            <tr>
              <th className="px-6 py-5 text-sm font-bold text-gray-800">
                Product
              </th>
              <th className="px-6 py-5 text-sm font-bold text-gray-800">
                Category
              </th>
              <th className="px-6 py-5 text-sm font-bold text-gray-800">
                Price
              </th>
              <th className="px-6 py-5 text-sm font-bold text-gray-800">
                Stock
              </th>
              <th className="px-6 py-5 text-sm font-bold text-gray-800 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-lg flex-shrink-0 border border-gray-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/150";
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                  Rp. {product.price.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {product.stock} units
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-3">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL ADD NEW PRODUCT --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-50">
              <h2 className="text-xl font-bold text-gray-900">
                Add New Product
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image Upload */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Product Image
                  </label>
                  <div className="border-2 border-dashed border-red-200 rounded-2xl aspect-square flex flex-col items-center justify-center bg-red-50/30 hover:bg-red-50 transition-colors cursor-pointer group">
                    <div className="p-3 bg-white rounded-xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                      <Upload size={24} className="text-[#FF5733]" />
                    </div>
                    <span className="text-sm font-semibold text-gray-600 text-center px-4">
                      Click to Upload
                    </span>
                  </div>
                </div>

                {/* Form Fields Side */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1.5">
                      Product Name
                    </label>
                    <input
                      type="text"
                      placeholder="e. g. Running Shoes"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/10 focus:border-[#FF5733] transition-all placeholder:text-gray-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-1.5">
                        Price (IDR)
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/10 focus:border-[#FF5733] transition-all placeholder:text-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-1.5">
                        Stock
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/10 focus:border-[#FF5733] transition-all placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1.5">
                      Category
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/10 focus:border-[#FF5733] transition-all bg-white">
                      <option>Running</option>
                      <option>Football</option>
                      <option>Basketball</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Full Width Description */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Product Details..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/10 focus:border-[#FF5733] transition-all placeholder:text-gray-300 resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 pb-8 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full md:w-auto bg-[#FF5733] text-white px-10 py-3.5 rounded-2xl font-bold hover:bg-[#e04a2b] transition-all shadow-md active:scale-95"
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
