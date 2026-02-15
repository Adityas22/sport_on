import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Upload } from "lucide-react";
import { productService } from "../../../service/api/product.service";
import { categoryService } from "../../../service/api/category.service";
import { BASE_URL } from "../../../service/api/client";
import { Product } from "../../../service/types/product.types";
import { Category } from "../../../service/types/category.types";

const ProductManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // State untuk products dan categories
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // State untuk form input
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    stock: 0,
    price: 0,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Helper function untuk get full image URL
  const getImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${BASE_URL}/${imageUrl}`;
  };

  // Fetch products dan categories saat komponen dimount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Handle image selection
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

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" || name === "price" ? Number(value) : value,
    }));
  };

  // Fungsi untuk create product
  const handleCreateProduct = async () => {
    if (!formData.name.trim()) return alert("Product name is required");
    if (!formData.category) return alert("Category is required");
    if (formData.price <= 0) return alert("Price must be greater than 0");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("stock", formData.stock.toString());
      data.append("price", formData.price.toString());

      if (selectedImage) {
        data.append("image", selectedImage);
      }

      await productService.create(data);
      alert("Product created successfully!");

      await fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Failed to create product:", error);
      alert("Failed to create product");
    }
  };

  // Fungsi untuk update product
  const handleUpdateProduct = async () => {
    if (!formData.name.trim()) return alert("Product name is required");
    if (!formData.category) return alert("Category is required");
    if (!editingId) return;

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("stock", formData.stock.toString());
      data.append("price", formData.price.toString());

      if (selectedImage) {
        data.append("image", selectedImage);
      }

      await productService.update(editingId, data);
      alert("Product updated successfully!");

      await fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product");
    }
  };

  // Fungsi untuk delete product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await productService.delete(id);
      alert("Product deleted successfully!");
      await fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product");
    }
  };

  // Fungsi untuk open edit modal
  const handleEditClick = (product: Product) => {
    setIsEditMode(true);
    setEditingId(product._id);

    setFormData({
      name: product.name,
      description: product.description,
      category:
        typeof product.category === "string"
          ? product.category
          : product.category._id,
      stock: product.stock,
      price: product.price,
    });

    setImagePreview(getImageUrl(product.imageUrl) || null);
    setIsModalOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      stock: 0,
      price: 0,
    });
    setSelectedImage(null);
    setImagePreview(null);
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingId(null);
  };

  // Get category name from product
  const getCategoryName = (category: Category | string) => {
    if (typeof category === "string") return category;
    return category.name;
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
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-[#FF5733] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#e04a2b] transition-all shadow-sm"
        >
          <Plus size={20} strokeWidth={3} />
          Add Product
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
              {products.map((product) => {
                const fullImageUrl = getImageUrl(product.imageUrl);

                return (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-50 rounded-lg flex-shrink-0 border border-gray-100 overflow-hidden">
                          {fullImageUrl ? (
                            <img
                              src={fullImageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
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
                                  fallback.innerHTML = `<span class="text-gray-500 font-bold text-lg">${product.name.charAt(0).toUpperCase()}</span>`;
                                  parent.appendChild(fallback);
                                }
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                              <span className="text-gray-500 font-bold text-lg">
                                {product.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-gray-800">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                        {getCategoryName(product.category)}
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
                        <button
                          onClick={() => handleEditClick(product)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={20} />
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

      {/* --- MODAL ADD/EDIT PRODUCT --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-50">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditMode ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={resetForm}
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
                        <div className="p-3 bg-white rounded-xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                          <Upload size={24} className="text-[#FF5733]" />
                        </div>
                        <span className="text-sm font-semibold text-gray-600 text-center px-4">
                          Click to Upload
                        </span>
                      </>
                    )}
                  </label>
                </div>

                {/* Form Fields Side */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1.5">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Running Shoes"
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
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
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
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/10 focus:border-[#FF5733] transition-all placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1.5">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/10 focus:border-[#FF5733] transition-all bg-white"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
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
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Product Details..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/10 focus:border-[#FF5733] transition-all placeholder:text-gray-300 resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 pb-8 flex justify-end">
              <button
                onClick={isEditMode ? handleUpdateProduct : handleCreateProduct}
                className="w-full md:w-auto bg-[#FF5733] text-white px-10 py-3.5 rounded-2xl font-bold hover:bg-[#e04a2b] transition-all shadow-md active:scale-95"
              >
                {isEditMode ? "Update Product" : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
