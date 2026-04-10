import React, { useEffect, useState } from "react";
import { Check, X, Search, Eye, ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const response = await fetch("https://ecommerce-web-nrat.vercel.app/admin/orders");
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        const result = await Swal.fire({
            title: `Mark as ${newStatus}?`,
            text: `You are about to set this order to ${newStatus}.`,
            icon: newStatus === "Delivered" ? "question" : "warning",
            showCancelButton: true,
            confirmButtonColor:
                newStatus === "Delivered" ? "#10B981" : "#EF4444",
            cancelButtonColor: "#000",
            confirmButtonText: `Yes, ${newStatus} it!`,
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(
                    `https://ecommerce-web-nrat.vercel.app/admin/orders/${id}/status`,
                    {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status: newStatus }),
                    }
                );

                if (response.ok) {
                    Swal.fire(
                        "Updated!",
                        `Order marked as ${newStatus}.`,
                        "success"
                    );
                    fetchOrders(); 
                } else {
                    Swal.fire("Error", "Failed to update status", "error");
                }
            } catch (error) {
                console.error(error);
                Swal.fire("Error", "Server error", "error");
            }
        }
    };

    const filteredOrders = orders.filter(
        (order) =>
            (order.transactionId || order._id)
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            (order.customerName || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-green-100 text-green-800";
            case "Cancelled":
                return "bg-red-100 text-red-800";
            case "Processing":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-yellow-100 text-yellow-800"; 
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="container mx-auto max-w-7xl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/adminhome")}
                                className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Order Management
                                </h1>
                                <p className="text-gray-500 mt-1">
                                    Manage customer orders and deliveries
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex items-center gap-4">
                        <Search className="text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by Order ID or Customer Name..."
                            className="w-full outline-none text-gray-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">Order ID</th>
                                        <th className="px-6 py-4">Customer</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Payment</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                                    {filteredOrders.map((order) => (
                                        <tr
                                            key={order._id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 font-mono font-medium">
                                                #
                                                {order.transactionId
                                                    ? order.transactionId
                                                          .slice(-6)
                                                          .toUpperCase()
                                                    : order._id
                                                          .slice(-6)
                                                          .toUpperCase()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-gray-900">
                                                    {order.customerName ||
                                                        "Guest"}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {order.customerEmail}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 font-bold">
                                                ₹
                                                {order.totalAmount.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 py-1 rounded text-xs font-bold ${
                                                        order.paymentStatus ===
                                                        "Paid"
                                                            ? "text-green-600 bg-green-50"
                                                            : "text-orange-600 bg-orange-50"
                                                    }`}
                                                >
                                                    {order.paymentStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                                        order.status
                                                    )}`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {/* Only show actions if Pending or Processing */}
                                                    {(order.status ===
                                                        "Pending" ||
                                                        order.status ===
                                                            "Processing") && (
                                                        <>
                                                            <button
                                                                onClick={() =>
                                                                    handleStatusUpdate(
                                                                        order._id,
                                                                        "Delivered"
                                                                    )
                                                                }
                                                                className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                                                title="Accept & Deliver"
                                                            >
                                                                <Check className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleStatusUpdate(
                                                                        order._id,
                                                                        "Cancelled"
                                                                    )
                                                                }
                                                                className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                                                title="Reject Order"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                    {/* View Details Button (Optional placeholder) */}
                                                    <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredOrders.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="px-6 py-12 text-center text-gray-500"
                                            >
                                                No orders found.
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

export default AdminOrders;
