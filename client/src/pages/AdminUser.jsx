import React, { useState, useEffect } from "react";
import {
    Trash2,
    User,
    Mail,
    Shield,
    Search,
    UserCheck,
    ArrowLeft,
} from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // 1. Fetch Users from Database
    const fetchUsers = async () => {
        try {
            const response = await fetch("https://ecommerce-web-nrat.vercel.app/users");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
            Swal.fire("Error", "Failed to fetch users", "error");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // 2. Handle Delete User (Backend Integration)
    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete this user?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#000",
            confirmButtonText: "Yes, delete user!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(
                        `https://ecommerce-web-nrat.vercel.app/users/${id}`,
                        {
                            method: "DELETE",
                        }
                    );
                    const data = await response.json();

                    if (data.deletedCount > 0) {
                        Swal.fire(
                            "Deleted!",
                            "User has been removed.",
                            "success"
                        );
                        // Refresh the list locally without reloading
                        setUsers(users.filter((user) => user._id !== id));
                    } else {
                        Swal.fire("Error", "Failed to delete user", "error");
                    }
                } catch (error) {
                    console.error("Delete error:", error);
                    Swal.fire("Error", "Server error occurred", "error");
                }
            }
        });
    };

    // Filter Users
    const filteredUsers = users.filter(
        (user) =>
            (user.name || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            (user.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="container mx-auto max-w-6xl">
                    {/* --- Header --- */}
                    <div className="flex items-center gap-4 mb-8">
                        <button
                            onClick={() => navigate("/adminhome")}
                            className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                User Management
                            </h1>
                            <p className="text-gray-500 mt-1">
                                View and manage platform users
                            </p>
                        </div>
                    </div>

                    {/* --- Stats Cards --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Total Users
                                </p>
                                <h3 className="text-2xl font-bold">
                                    {users.length}
                                </h3>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-full">
                                <UserCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Active Users
                                </p>
                                {/* Assuming if user exists, they are active unless status field says otherwise */}
                                <h3 className="text-2xl font-bold">
                                    {
                                        users.filter(
                                            (u) => u.status !== "Inactive"
                                        ).length
                                    }
                                </h3>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Admins</p>
                                <h3 className="text-2xl font-bold">
                                    {
                                        users.filter(
                                            (u) => u.status === "admin"
                                        ).length
                                    }
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* --- Search Bar --- */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* --- Users Table --- */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 font-semibold text-sm text-right text-gray-600 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user) => (
                                            <tr
                                                key={user._id}
                                                className="hover:bg-gray-50 transition-colors"
                                            >
                                                {/* Name & Email */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold uppercase">
                                                            {(
                                                                user.name || "U"
                                                            ).charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">
                                                                {user.name ||
                                                                    "Unknown"}
                                                            </div>
                                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                                <Mail className="w-3 h-3" />{" "}
                                                                {user.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Role Badge (Based on status field) */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                                            user.status ===
                                                            "admin"
                                                                ? "bg-purple-100 text-purple-800 border-purple-200"
                                                                : "bg-gray-100 text-gray-800 border-gray-200"
                                                        }`}
                                                    >
                                                        {user.status ===
                                                            "admin" && (
                                                            <Shield className="w-3 h-3 mr-1" />
                                                        )}
                                                        {user.status === "admin"
                                                            ? "Admin"
                                                            : "Customer"}
                                                    </span>
                                                </td>

                                                {/* Status Badge */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                                                        Active
                                                    </span>
                                                </td>

                                                {/* Delete Button */}
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                user._id
                                                            )
                                                        }
                                                        className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-6 py-12 text-center text-gray-500"
                                            >
                                                No users found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminUser;
