import React, { useState } from "react";
import { Plus, Edit, Trash2, X, Upload } from "lucide-react";

const CategoryManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State untuk menyimpan daftar kategori
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Running",
      description: "All Running Items, Shoes, Shirts",
      image: "/images/categories/category-running.png",
    },
    {
      id: 2,
      name: "Football",
      description: "Football boots, jerseys, and accessories",
      image: "/images/categories/category-football.png",
    },
  ]);

  // State untuk form input baru
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Fungsi untuk menambah kategori baru
  const handleCreateCategory = () => {
    if (!newName.trim()) return alert("Name is required");

    const newCategory = {
      id: Date.now(), // ID unik sementara
      name: newName,
      description: newDescription,
      image: "/images/categories/default.png", // Placeholder
    };

    setCategories([...categories, newCategory]);

    // Reset form dan tutup modal
    setNewName("");
    setNewDescription("");
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen p-6 bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Category Management
          </h1>
          <p className="text-gray-500 text-sm">
            Organize your products into categories.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#FF5733] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#e04a2b] transition-all shadow-sm"
        >
          <Plus size={20} strokeWidth={3} />
          Add Category
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="border-b border-gray-100 bg-white">
            <tr>
              <th className="px-6 py-5 text-sm font-bold text-gray-800">
                Category
              </th>
              <th className="px-6 py-5 text-sm font-bold text-gray-800">
                Description
              </th>
              <th className="px-6 py-5 text-sm font-bold text-gray-800 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center border border-gray-100">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/40";
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {cat.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                  {cat.description}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-3">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() =>
                        setCategories(categories.filter((c) => c.id !== cat.id))
                      }
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL ADD NEW CATEGORY --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                Add New Category
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  Category Image
                </label>
                <div className="border-2 border-dashed border-red-200 rounded-2xl aspect-square flex flex-col items-center justify-center bg-red-50/30 hover:bg-red-50 transition-colors cursor-pointer group">
                  <div className="p-4 bg-white rounded-xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <Upload size={28} className="text-[#FF5733]" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    Click to Upload
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e. g. Running Shoes"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] transition-all placeholder:text-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Product Details..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-300 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="px-8 pb-8 flex justify-end">
              <button
                onClick={handleCreateCategory}
                className="bg-[#FF5733] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#e04a2b] transition-all shadow-md active:scale-95"
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
