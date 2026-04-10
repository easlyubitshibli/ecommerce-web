import { ArrowLeft, Save, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminAddProduct = () => {
    const navigate = useNavigate();

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        originalPrice: "",
        stock: "",
        description: "",
        image: "",
    });

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Basic Validation
        if (!formData.name || !formData.price || !formData.category) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in all required fields!",
                confirmButtonColor: "#000",
            });
            return;
        }

        try {
            // 2. Send POST Request to Backend
            const response = await fetch("http://localhost:5000/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            // 3. Handle Response
            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "Product has been added successfully.",
                    icon: "success",
                    confirmButtonColor: "#000",
                }).then(() => {
                    navigate("/adminhome"); // Redirect to Admin Home
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to add product. Please try again.",
                    confirmButtonColor: "#000",
                });
            }
        } catch (error) {
            console.error("Error adding product:", error);
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Could not connect to the server.",
                confirmButtonColor: "#000",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="container mx-auto max-w-4xl">
                {/* --- Header --- */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Add New Product
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Create a new item for your inventory
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate("/admin")}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                    >
                        Cancel
                    </button>
                </div>

                {/* --- Form Container --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* LEFT COLUMN: Basic Info */}
                            <div className="space-y-6">
                                {/* Product Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. English Willow Bat"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                {/* Category (Changed to Text Input) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        placeholder="e.g. Cricket Bats"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                {/* Pricing Row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Price (₹){" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Original Price (₹)
                                        </label>
                                        <input
                                            type="number"
                                            name="originalPrice"
                                            value={formData.originalPrice}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Stock */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Stock Quantity
                                    </label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        placeholder="e.g. 10"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Description & Image */}
                            <div className="space-y-6">
                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Enter product details..."
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
                                    ></textarea>
                                </div>

                                {/* Image URL Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Image URL
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            placeholder="https://..."
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="my-8 border-gray-100" />

                        {/* --- Action Buttons --- */}
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => navigate("/admin")}
                                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                            >
                                <X className="w-5 h-5" />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-3 rounded-lg bg-black text-white font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
                            >
                                <Save className="w-5 h-5" />
                                Save Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminAddProduct;
