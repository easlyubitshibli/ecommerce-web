import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom"; 
import Swal from "sweetalert2";
import Header from "../components/Header";

const AdminEditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        originalPrice: "",
        stock: "",
        description: "",
        image: "",
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `https://ecommerce-web-nrat.vercel.app/products/${id}`
                );
                const data = await response.json();
                
                setFormData({
                    name: data.name || "",
                    category: data.category || "",
                    price: data.price || "",
                    originalPrice: data.originalPrice || "",
                    stock: data.stock || "",
                    description: data.description || "",
                    image: data.image || "",
                });
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `https://ecommerce-web-nrat.vercel.app/products/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                Swal.fire({
                    title: "Updated!",
                    text: "Product details updated successfully.",
                    icon: "success",
                    confirmButtonColor: "#000",
                }).then(() => navigate("/adminhome"));
            } else {
                Swal.fire("Error", "Failed to update product.", "error");
            }
        } catch (error) {
            Swal.fire("Error", "Server error occurred.", "error");
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Edit Product
                            </h1>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category
                                        </label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Price (₹)
                                            </label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Stock
                                            </label>
                                            <input
                                                type="number"
                                                name="stock"
                                                value={formData.stock}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none resize-none"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Image URL
                                        </label>
                                        <input
                                            type="text"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-8">
                                <button
                                    type="button"
                                    onClick={() => navigate("/admin")}
                                    className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <X className="w-5 h-5" /> Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 rounded-lg bg-black text-white hover:bg-gray-800 flex items-center gap-2"
                                >
                                    <Save className="w-5 h-5" /> Update Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminEditProduct;
