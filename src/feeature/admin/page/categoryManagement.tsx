import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Upload } from "lucide-react";
import { categoryService } from "../../../service/api/category.service";
import { BASE_URL } from "../../../service/api/client"; // Import BASE_URL
import { Category } from "../../../service/types/category.types";

const CategoryManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Helper function untuk get full image URL
  const getImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return null;
    // Jika sudah full URL (http/https), return as is
    if (imageUrl.startsWith("http")) return imageUrl;
    // Jika path relatif, gabungkan dengan BASE_URL
    return `${BASE_URL}/${imageUrl}`;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateCategory = async () => {
    if (!newName.trim()) return alert("Name is required");

    try {
      const formData = new FormData();
      formData.append("name", newName);
      formData.append("description", newDescription);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await categoryService.create(formData);
      alert("Category created successfully!");

      await fetchCategories();
      resetForm();
    } catch (error) {
      console.error("Failed to create category:", error);
      alert("Failed to create category");
    }
  };

  const handleUpdateCategory = async () => {
    if (!newName.trim()) return alert("Name is required");
    if (!editingId) return;

    try {
      const formData = new FormData();
      formData.append("name", newName);
      formData.append("description", newDescription);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await categoryService.update(editingId, formData);
      alert("Category updated successfully!");

      await fetchCategories();
      resetForm();
    } catch (error) {
      console.error("Failed to update category:", error);
      alert("Failed to update category");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await categoryService.delete(id);
      alert("Category deleted successfully!");
      await fetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert("Failed to delete category");
    }
  };

  const handleEditClick = (category: Category) => {
    setIsEditMode(true);
    setEditingId(category._id);
    setNewName(category.name);
    setNewDescription(category.description);
    // Set preview dengan full URL
    setImagePreview(getImageUrl(category.imageUrl) || null);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setNewName("");
    setNewDescription("");
    setSelectedImage(null);
    setImagePreview(null);
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingId(null);
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
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-[#FF5733] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#e04a2b] transition-all shadow-sm"
        >
          <Plus size={20} strokeWidth={3} />
          Add Category
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : (
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
              {categories.map((cat) => {
                const fullImageUrl = getImageUrl(cat.imageUrl);

                return (
                  <tr
                    key={cat._id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center border border-gray-200 overflow-hidden">
                          {fullImageUrl ? (
                            <img
                              src={fullImageUrl}
                              alt={cat.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Hide image on error dan tampilkan fallback
                                e.currentTarget.style.display = "none";
                                const parent = e.currentTarget.parentElement;
                                if (
                                  parent &&
                                  !parent.querySelector(".fallback-icon")
                                ) {
                                  const fallback =
                                    document.createElement("div");
                                  fallback.className =
                                    "fallback-icon w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200";
                                  fallback.innerHTML = `<span class="text-gray-500 font-bold text-lg">${cat.name.charAt(0).toUpperCase()}</span>`;
                                  parent.appendChild(fallback);
                                }
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                              <span className="text-gray-500 font-bold text-lg">
                                {cat.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
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
                        <button
                          onClick={() => handleEditClick(cat)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* --- MODAL ADD/EDIT CATEGORY --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                {isEditMode ? "Edit Category" : "Add New Category"}
              </h2>
              <button
                onClick={resetForm}
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
                <label className="border-2 border-dashed border-red-200 rounded-2xl aspect-square flex flex-col items-center justify-center bg-red-50/30 hover:bg-red-50 transition-colors cursor-pointer group overflow-hidden">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <div className="p-4 bg-white rounded-xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                        <Upload size={28} className="text-[#FF5733]" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        Click to Upload
                      </span>
                    </>
                  )}
                </label>
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
                    placeholder="e.g. Running Shoes"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] transition-all placeholder:text-gray-300 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="px-8 pb-8 flex justify-end">
              <button
                onClick={
                  isEditMode ? handleUpdateCategory : handleCreateCategory
                }
                className="bg-[#FF5733] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#e04a2b] transition-all shadow-md active:scale-95"
              >
                {isEditMode ? "Update Category" : "Create Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
