import React, { useState } from "react";
import { User, Mail, Phone, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/Header";

const Signup = () => {
    const navigate = useNavigate();

    // State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Added loading state

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Basic Validation
        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please fill in all required fields.");
            return;
        }

        // 2. Password Match Check
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // 3. Password Length Check
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            // --- CONNECT TO BACKEND HERE ---
            const response = await fetch("https://ecommerce-web-nrat.vercel.app/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    // Note: confirmPassword is usually not sent to backend
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // SUCCESS: User Registered
                Swal.fire({
                    icon: "success",
                    title: "Account Created!",
                    text: "Welcome to ShopSmart. Please login to continue.",
                    confirmButtonColor: "#000",
                }).then(() => {
                    navigate("/login");
                });
            } else {
                // ERROR: Email likely exists
                setError(
                    data.message || "Registration failed. Please try again."
                );
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: data.message || "Registration failed.",
                    confirmButtonColor: "#000",
                });
            }
        } catch (err) {
            console.error("Signup Error:", err);
            setError("Server error. Is the backend running?");
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Could not connect to the server.",
                confirmButtonColor: "#000",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                {/* Main Card Container */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row-reverse w-full max-w-4xl h-auto md:h-[700px]">
                    {/* --- RIGHT SIDE: Image/Banner (Reversed for visual variety) --- */}
                    <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-black text-white p-12 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-40">
                            <img
                                src="https://images.unsplash.com/photo-1593341646782-e0b495cffd32?q=80&w=1974&auto=format&fit=crop"
                                alt="Signup Banner"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="relative z-10 text-center">
                            <h2 className="text-4xl font-extrabold italic mb-4">
                                SS
                            </h2>
                            <h3 className="text-3xl font-bold mb-4">
                                Join the Team
                            </h3>
                            <p className="text-gray-300">
                                Create an account to get exclusive offers, track
                                orders, and faster checkout.
                            </p>
                        </div>
                    </div>

                    {/* --- LEFT SIDE: Signup Form --- */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                        <div className="mb-6 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Create Account
                            </h2>
                            <p className="text-gray-500 text-sm">
                                Enter your details to get started.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors outline-none"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>

                            {/* Phone (Optional) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors outline-none"
                                        placeholder="+880 1..."
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors outline-none"
                                        placeholder="Create a password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors outline-none"
                                        placeholder="Repeat password"
                                    />
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded border border-red-100">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-all transform hover:scale-[1.02] mt-4 disabled:opacity-50"
                            >
                                {loading ? (
                                    "Creating Account..."
                                ) : (
                                    <>
                                        Sign Up{" "}
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer / Login Link */}
                        <div className="mt-6 text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-bold text-black hover:underline"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
