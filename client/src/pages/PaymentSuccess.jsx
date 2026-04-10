import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const PaymentSuccess = () => {
    const { tranId } = useParams();
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
            <div className="bg-green-100 p-6 rounded-full mb-4">
                <svg
                    className="w-16 h-16 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                    ></path>
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">Transaction ID: {tranId}</p>
            <Link
                to="/"
                className="bg-black text-white px-6 py-3 rounded-lg font-bold"
            >
                Continue Shopping
            </Link>
        </div>
    );
};

export default PaymentSuccess;
