import React from "react";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";
import Header from "../components/Header";

const Cart = () => {
    const {
        cartItems,
        addToCart,
        removeFromCart,
        getCartTotal,
        decreaseQuantity,
    } = useCart();
    const navigate = useNavigate();

    const subtotal = getCartTotal();
    const shipping = subtotal > 5000 ? 0 : 150; 
    const total = subtotal + shipping;

    const handleRemove = (id) => {
        Swal.fire({
            title: "Remove Item?",
            text: "Are you sure you want to remove this item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#000",
            confirmButtonText: "Yes, remove it!",
        }).then((result) => {
            if (result.isConfirmed) {
                removeFromCart(id);
                Swal.fire("Removed!", "Item has been removed.", "success");
            }
        });
    };


    const handleCheckout = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            Swal.fire("Please login first");
            navigate("/login");
            return;
        }

        const { value: address } = await Swal.fire({
            title: "Enter Delivery Address",
            input: "text",
            inputPlaceholder: "Dhaka, Bangladesh",
            showCancelButton: true,
        });

        if (!address) return;

        try {
            const response = await fetch(
                "https://ecommerce-web-nrat.vercel.app/create-ssl-payment",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: user._id,
                        items: cartItems,
                        totalAmount: total,
                        address: address,
                    }),
                }
            );

            const data = await response.json();

            if (data.url) {
                window.location.replace(data.url);
            } else {
                Swal.fire("Payment initiation failed");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Server Error");
        }
    };

    if (cartItems.length === 0) {
        return (
            <>
                <Header />
                <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 p-4">
                    <div className="bg-white p-8 rounded-full shadow-sm mb-6">
                        <ShoppingBag className="w-16 h-16 text-gray-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Your Cart is Empty
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Looks like you haven't added anything yet.
                    </p>
                    <Link
                        to="/product"
                        className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        Start Shopping <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Shopping Cart ({cartItems.length})
                    </h1>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* --- LEFT: Cart Items List --- */}
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                {/* Table Header (Hidden on Mobile) */}
                                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
                                    <div className="col-span-6">Product</div>
                                    <div className="col-span-2 text-center">
                                        Price
                                    </div>
                                    <div className="col-span-2 text-center">
                                        Quantity
                                    </div>
                                    <div className="col-span-2 text-right">
                                        Total
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="divide-y divide-gray-100">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item._id || item.productId}
                                            className="p-4 md:p-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-center"
                                        >
                                            {/* Product Details */}
                                            <div className="col-span-6 flex items-center gap-4 w-full">
                                                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 line-clamp-1">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {item.category}
                                                    </p>
                                                    <button
                                                        onClick={() =>
                                                            handleRemove(
                                                                item._id ||
                                                                    item.productId
                                                            )
                                                        }
                                                        className="text-red-500 text-xs font-medium mt-2 flex items-center gap-1 hover:text-red-700 md:hidden"
                                                    >
                                                        <Trash2 className="w-3 h-3" />{" "}
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="col-span-2 text-center hidden md:block font-medium">
                                                ₹{item.price.toLocaleString()}
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="col-span-2 flex justify-center w-full md:w-auto">
                                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                                    <button
                                                        onClick={() =>
                                                            decreaseQuantity(
                                                                item._id ||
                                                                    item.productId
                                                            )
                                                        }
                                                        className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                                                        disabled={
                                                            item.quantity <= 1
                                                        }
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="px-3 py-1 font-semibold text-sm min-w-[30px] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            addToCart(item)
                                                        }
                                                        className="p-2 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Subtotal & Delete (Desktop) */}
                                            <div className="col-span-2 flex items-center justify-between w-full md:justify-end gap-4">
                                                <span className="font-bold text-lg md:text-base">
                                                    ₹
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toLocaleString()}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleRemove(
                                                            item._id ||
                                                                item.productId
                                                        )
                                                    }
                                                    className="hidden md:block text-gray-400 hover:text-red-500 transition-colors p-2"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* --- RIGHT: Order Summary --- */}
                        <div className="lg:w-1/3 w-full">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
                                <h2 className="text-xl font-bold mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>
                                            ₹{subtotal.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping Estimate</span>
                                        {shipping === 0 ? (
                                            <span className="text-green-600 font-medium">
                                                Free
                                            </span>
                                        ) : (
                                            <span>₹{shipping}</span>
                                        )}
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax Estimate</span>
                                        <span>₹0</span>
                                    </div>
                                </div>

                                <hr className="border-gray-100 mb-6" />

                                <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                                    <span>Order Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-black text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                                >
                                    Checkout <ArrowRight className="w-5 h-5" />
                                </button>

                                <p className="text-xs text-gray-400 text-center mt-4">
                                    Secure Checkout - SSL Encrypted
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
