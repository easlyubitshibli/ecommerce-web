import React, { useState } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert for error messages
import Header from "../components/Header";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Send Request to Backend
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                // 2. Save User to LocalStorage
                localStorage.setItem("user", JSON.stringify(data.user));

                // 3. Force Header Update (Quick fix) & Redirect
                window.dispatchEvent(new Event("storage"));
                navigate("/");
                window.location.reload();
            } else {
                // Show Error Alert
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: data.message || "Invalid email or password",
                    confirmButtonColor: "#000",
                });
            }
        } catch (error) {
            console.error("Login Error:", error);
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Something went wrong. Is the server running?",
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
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl h-[600px]">
                    {/* Left Side: Banner */}
                    <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-black text-white p-12 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-50">
                            <img
                                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2067&auto=format&fit=crop"
                                alt="Banner"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="relative z-10 text-center">
                            <h2 className="text-4xl font-extrabold italic mb-4">
                                SS
                            </h2>
                            <h3 className="text-3xl font-bold mb-4">
                                Welcome Back!
                            </h3>
                            <p className="text-gray-300">
                                Sign in to access your exclusive cricket gear.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Sign In
                            </h2>
                            <p className="text-gray-500 text-sm">
                                Please enter your details to continue.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                        required
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:border-black outline-none"
                                        placeholder="name@example.com"
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
                                        required
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:border-black outline-none"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-all disabled:opacity-50"
                            >
                                {loading ? (
                                    "Signing In..."
                                ) : (
                                    <>
                                        Sign In{" "}
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-bold text-black hover:underline"
                            >
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
