import React from "react";
import {
    Award,
    Users,
    ThumbsUp,
    Truck,
    ShieldCheck,
    Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            <nav className="mb-12">
                <Header/>
            </nav>
            {/* --- 1. Hero Section --- */}
            <div className="relative h-[400px] flex items-center justify-center bg-black overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop"
                        alt="About Us Background"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
                        Driven by Passion.
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                        We are more than just a store. We are a community of
                        sports enthusiasts dedicated to equipping you with the
                        finest gear to elevate your game.
                    </p>
                </div>
            </div>

            {/* --- 2. Our Story Section --- */}
            <div className="container mx-auto px-4 py-20">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Image Side */}
                    <div className="w-full md:w-1/2">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1589487391730-58f20eb2c308?q=80&w=2074&auto=format&fit=crop"
                                alt="Our Story"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full md:w-1/2">
                        <h4 className="text-red-600 font-bold uppercase tracking-widest mb-2">
                            Our Story
                        </h4>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                            Empowering Athletes Since 2015
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            It started with a simple idea: professional-grade
                            cricket gear shouldn't be inaccessible. What began
                            as a small garage operation in Rajshahi has grown
                            into one of the most trusted names in sports retail.
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            At{" "}
                            <span className="font-bold text-black">
                                ShopSmart
                            </span>
                            , we carefully curate every bat, ball, and kit. We
                            don't just sell products; we sell the confidence you
                            need to step onto the pitch and perform your best.
                        </p>

                        <div className="flex gap-4">
                            <div className="border-l-4 border-red-600 pl-4">
                                <h3 className="font-bold text-2xl">10k+</h3>
                                <p className="text-sm text-gray-500">
                                    Happy Customers
                                </p>
                            </div>
                            <div className="border-l-4 border-red-600 pl-4">
                                <h3 className="font-bold text-2xl">500+</h3>
                                <p className="text-sm text-gray-500">
                                    Premium Products
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- 3. Values / Features Grid --- */}
            <div className="bg-gray-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">
                            Why Choose Us?
                        </h2>
                        <p className="text-gray-600">
                            We adhere to the highest standards of quality and
                            service.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group">
                            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                <Award className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-3">
                                Authentic Gear
                            </h3>
                            <p className="text-gray-500 text-sm">
                                We source directly from manufacturers to ensure
                                100% original products with warranty.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group">
                            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                <Truck className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-3">
                                Express Shipping
                            </h3>
                            <p className="text-gray-500 text-sm">
                                We know you want your gear fast. That's why we
                                ship 90% of orders within 24 hours.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group">
                            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-3">
                                Secure Payment
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Your data is safe with us. We use
                                industry-standard encryption for all
                                transactions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- 4. Team Section (Optional) --- */}
            <div className="container mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Meet The Team
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Team Member 1 */}
                    <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                                alt="CEO"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="font-bold text-lg">John Doe</h3>
                        <p className="text-red-600 text-sm font-medium">
                            Founder & CEO
                        </p>
                    </div>

                    {/* Team Member 2 */}
                    <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                                alt="Manager"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="font-bold text-lg">Jane Smith</h3>
                        <p className="text-red-600 text-sm font-medium">
                            Product Manager
                        </p>
                    </div>

                    {/* Team Member 3 */}
                    <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop"
                                alt="Support"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="font-bold text-lg">Mike Ross</h3>
                        <p className="text-red-600 text-sm font-medium">
                            Customer Support
                        </p>
                    </div>

                    {/* Team Member 4 */}
                    <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
                                alt="Logistics"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="font-bold text-lg">Sarah Lee</h3>
                        <p className="text-red-600 text-sm font-medium">
                            Logistics Head
                        </p>
                    </div>
                </div>
            </div>

            {/* --- 5. CTA Banner --- */}
            <div className="bg-black text-white py-16 text-center px-4">
                <h2 className="text-3xl font-bold mb-4">
                    Ready to upgrade your game?
                </h2>
                <p className="text-gray-400 mb-8">
                    Browse our exclusive collection of premium cricket gear
                    today.
                </p>
                <Link
                    to="/product"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
                >
                    View Products
                </Link>
            </div>
        </div>
    );
};

export default About;
