import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus, Search } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const AdminHome = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = searchTerm
                    ? `https://ecommerce-web-nrat.vercel.app/products?search=${searchTerm}`
                    : "https://ecommerce-web-nrat.vercel.app/products";
                const response = await fetch(url);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        const delayDebounceFn = setTimeout(() => fetchProducts(), 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

   
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#000",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(
                        `https://ecommerce-web-nrat.vercel.app/products/${id}`,
                        {
                            method: "DELETE",
                        }
                    );

                    if (response.ok) {
                        setProducts(
                            products.filter((product) => product._id !== id)
                        );
                        Swal.fire(
                            "Deleted!",
                            "Product has been removed.",
                            "success"
                        );
                    } else {
                        Swal.fire("Error", "Failed to delete product", "error");
                    }
                } catch (error) {
                    Swal.fire("Error", "Server error occurred", "error");
                }
            }
        });
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Admin Dashboard
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Manage your inventory
                            </p>
                        </div>
                        <button
                            onClick={() => navigate("/adminaddproduct")}
                            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors"
                        >
                            <Plus className="w-5 h-5" /> Add New Product
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-sm text-gray-600 uppercase">
                                            Product
                                        </th>
                                        <th className="px-6 py-4 font-semibold text-sm text-gray-600 uppercase">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 font-semibold text-sm text-gray-600 uppercase">
                                            Price
                                        </th>
                                        <th className="px-6 py-4 font-semibold text-sm text-gray-600 uppercase">
                                            Stock
                                        </th>
                                        <th className="px-6 py-4 font-semibold text-sm text-right text-gray-600 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr
                                            key={product._id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded-md border border-gray-200 overflow-hidden bg-white p-1">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="h-full w-full object-contain"
                                                        />
                                                    </div>
                                                    <div className="font-medium text-gray-900">
                                                        {product.name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {product.category}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold">
                                                ₹{product.price}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {product.stock}
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium">
                                                {/* Navigate to Edit Page */}
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/edit/${product._id}`
                                                        )
                                                    }
                                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            product._id
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHome;
