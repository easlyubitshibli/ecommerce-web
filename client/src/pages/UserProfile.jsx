import { Edit2, LogOut, MapPin, Package, Save, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/Header";

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);
    const [orders, setOrders] = useState([]); // State for Orders
    const navigate = useNavigate();

    // Initialize user state
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        _id: "",
    });

    // 1. Fetch User Data & Orders
    useEffect(() => {
        const fetchData = async () => {
            const storedUser = localStorage.getItem("user");

            if (storedUser) {
                const localData = JSON.parse(storedUser);
                const userId = localData._id;

                try {
                    // A. Fetch User Profile
                    const userResponse = await fetch(
                        `http://localhost:5000/users/${userId}`
                    );
                    const userData = await userResponse.json();
                    setUser((prev) => ({ ...prev, ...userData }));

                    // B. Fetch User Orders
                    const orderResponse = await fetch(
                        `http://localhost:5000/orders/${userId}`
                    );
                    const orderData = await orderResponse.json();
                    setOrders(orderData);
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                }
            } else {
                navigate("/login");
            }
        };

        fetchData();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSave = async () => {
        // ... (Keep your existing handleSave logic here) ...
        // For brevity, I'm assuming you kept the handleSave logic from the previous step
        // copying it here for completeness:
        if (!user._id) return;
        try {
            const response = await fetch(
                `http://localhost:5000/users/${user._id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        address: user.address,
                    }),
                }
            );
            const result = await response.json();
            if (response.ok && result.modifiedCount > 0) {
                localStorage.setItem("user", JSON.stringify(user));
                window.dispatchEvent(new Event("storage"));
                setIsEditing(false);
                Swal.fire("Success", "Profile Updated", "success");
            } else if (result.modifiedCount === 0) {
                setIsEditing(false);
            }
        } catch (error) {
            Swal.fire("Error", "Update Failed", "error");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("storage"));
        navigate("/login");
    };

    const getInitials = (name) => {
        if (!name) return "US";
        return name.slice(0, 2).toUpperCase();
    };

    // Helper to format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="container mx-auto max-w-5xl">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        My Account
                    </h1>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* --- LEFT SIDEBAR --- */}
                        <div className="w-full md:w-1/4">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6 text-center border-b border-gray-100 bg-gray-50">
                                    <div className="w-20 h-20 mx-auto rounded-full border-4 border-white shadow-md mb-3 bg-black flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white tracking-widest">
                                            {getInitials(user.name)}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 truncate px-2">
                                        {user.name || "User"}
                                    </h3>
                                    <p className="text-xs text-gray-500 truncate px-2">
                                        {user.email}
                                    </p>
                                </div>

                                <nav className="p-4 flex flex-col gap-2">
                                    <button
                                        onClick={() => setActiveTab("profile")}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                            activeTab === "profile"
                                                ? "bg-black text-white"
                                                : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                    >
                                        <User className="w-4 h-4" /> Personal
                                        Info
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("orders")}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                            activeTab === "orders"
                                                ? "bg-black text-white"
                                                : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                    >
                                        <Package className="w-4 h-4" /> My
                                        Orders
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-4"
                                    >
                                        <LogOut className="w-4 h-4" /> Logout
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* --- RIGHT CONTENT --- */}
                        <div className="w-full md:w-3/4">
                            {/* PROFILE TAB */}
                            {activeTab === "profile" && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold">
                                            Personal Information
                                        </h2>
                                        {!isEditing ? (
                                            <button
                                                onClick={() =>
                                                    setIsEditing(true)
                                                }
                                                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black"
                                            >
                                                <Edit2 className="w-4 h-4" />{" "}
                                                Edit
                                            </button>
                                        ) : (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        setIsEditing(false)
                                                    }
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={handleSave}
                                                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm"
                                                >
                                                    <Save className="w-4 h-4" />{" "}
                                                    Save
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={user.name}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className={`w-full px-4 py-2 rounded-lg border ${
                                                    isEditing
                                                        ? "border-gray-300"
                                                        : "border-transparent bg-gray-50"
                                                }`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={user.email}
                                                disabled
                                                className="w-full px-4 py-2 rounded-lg border border-transparent bg-gray-100 text-gray-500 cursor-not-allowed"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                                Phone
                                            </label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={user.phone}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className={`w-full px-4 py-2 rounded-lg border ${
                                                    isEditing
                                                        ? "border-gray-300"
                                                        : "border-transparent bg-gray-50"
                                                }`}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                                Address
                                            </label>
                                            <textarea
                                                name="address"
                                                value={user.address || ""}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                rows={isEditing ? 3 : 1}
                                                className={`w-full px-4 py-2 rounded-lg border ${
                                                    isEditing
                                                        ? "border-gray-300"
                                                        : "border-transparent bg-transparent resize-none"
                                                }`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ORDERS TAB (Real Data) */}
                            {activeTab === "orders" && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100">
                                        <h2 className="text-xl font-bold">
                                            Order History ({orders.length})
                                        </h2>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-gray-50 text-gray-500 text-sm">
                                                <tr>
                                                    <th className="px-6 py-4 font-medium">
                                                        Order ID
                                                    </th>
                                                    <th className="px-6 py-4 font-medium">
                                                        Date
                                                    </th>
                                                    <th className="px-6 py-4 font-medium">
                                                        Items
                                                    </th>
                                                    <th className="px-6 py-4 font-medium">
                                                        Total
                                                    </th>
                                                    <th className="px-6 py-4 font-medium">
                                                        Pay Status
                                                    </th>
                                                    <th className="px-6 py-4 font-medium">
                                                        Order Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {orders.length > 0 ? (
                                                    orders.map((order) => (
                                                        <tr
                                                            key={order._id}
                                                            className="hover:bg-gray-50 transition-colors"
                                                        >
                                                            <td className="px-6 py-4 font-bold text-sm text-gray-900">
                                                                #
                                                                {order.transactionId
                                                                    ? order.transactionId
                                                                          .slice(
                                                                              -6
                                                                          )
                                                                          .toUpperCase()
                                                                    : order._id
                                                                          .slice(
                                                                              -6
                                                                          )
                                                                          .toUpperCase()}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                                {formatDate(
                                                                    order.createdAt
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                                <div className="flex flex-col">
                                                                    {order.items.map(
                                                                        (
                                                                            item,
                                                                            i
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className="text-xs line-clamp-1"
                                                                            >
                                                                                •{" "}
                                                                                {
                                                                                    item.name
                                                                                }{" "}
                                                                                (x
                                                                                {
                                                                                    item.quantity
                                                                                }

                                                                                )
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 font-bold text-sm">
                                                                ₹
                                                                {order.totalAmount.toLocaleString()}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span
                                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                        order.paymentStatus ===
                                                                        "Paid"
                                                                            ? "bg-green-100 text-green-800"
                                                                            : "bg-yellow-100 text-yellow-800"
                                                                    }`}
                                                                >
                                                                    {
                                                                        order.paymentStatus
                                                                    }
                                                                </span>
                                                            </td>

                                                            <td className="px-6 py-4">
                                                                <span
                                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                        order.status ===
                                                                        "Delivered"
                                                                            ? "bg-green-100 text-green-800"
                                                                            : order.status ===
                                                                              "Cancelled"
                                                                            ? "bg-red-100 text-red-800"
                                                                            : "bg-blue-100 text-blue-800" // For Pending/Processing
                                                                    }`}
                                                                >
                                                                    {
                                                                        order.status
                                                                    }
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan="5"
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
