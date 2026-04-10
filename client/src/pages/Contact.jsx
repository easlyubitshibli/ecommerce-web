import React from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Globe } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <nav className="mb-12"><Header/></nav>
            {/* --- Page Header --- */}
            <div className="bg-black text-white py-16 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">
                    Get in Touch
                </h1>
                <p className="text-gray-400 max-w-xl mx-auto px-4">
                    We are here to help you with your order, product questions,
                    or any other inquiries. Reach out to us via phone, email, or
                    visit our store.
                </p>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                {/* --- Contact Info Cards --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Card 1: Customer Support */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border-b-4 border-red-600 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-6">
                            <Phone className="w-6 h-6 text-red-600" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">
                            Customer Support
                        </h3>
                        <p className="text-gray-500 mb-4 text-sm">
                            Available Mon-Sat, 9:00 AM - 6:00 PM
                        </p>
                        <p className="font-bold text-lg text-gray-900">
                            +91 98765 43210
                        </p>
                        <p className="font-bold text-lg text-gray-900">
                            +91 11223 34455
                        </p>
                    </div>

                    {/* Card 2: Email Inquiries */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border-b-4 border-red-600 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-6">
                            <Mail className="w-6 h-6 text-red-600" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">Email Us</h3>
                        <p className="text-gray-500 mb-4 text-sm">
                            Send us an email and we'll reply within 24 hours.
                        </p>
                        <a
                            href="mailto:support@cricketweapon.com"
                            className="font-bold text-lg text-gray-900 hover:text-red-600 transition-colors"
                        >
                            support@shop.com
                        </a>
                        <a
                            href="mailto:sales@cricketweapon.com"
                            className="font-bold text-lg text-gray-900 hover:text-red-600 transition-colors"
                        >
                            sales@shop.com
                        </a>
                    </div>

                    {/* Card 3: Head Office */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border-b-4 border-red-600 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-6">
                            <MapPin className="w-6 h-6 text-red-600" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">
                            Store Location
                        </h3>
                        <p className="text-gray-500 mb-4 text-sm">
                            Come visit us for a hands-on experience.
                        </p>
                        <p className="font-medium text-gray-900 px-8">
                            123 Cricket Avenue, Sports City Complex,
                            <br />
                            Mumbai, Maharashtra - 400001
                        </p>
                    </div>
                </div>

                {/* --- Map & Additional Info Section --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Google Map Embed */}
                    {/* Google Map Embed pointing to RUET */}
                    <div className="bg-white p-2 rounded-xl shadow-md h-[400px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.365314774843!2d88.6258079760777!3d24.363573264789542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefd0a55ea957%3A0x2f9cac3357d62617!2sRajshahi%20University%20of%20Engineering%20%26%20Technology(RUET)!5e0!3m2!1sen!2sbd!4v1709200000000!5m2!1sen!2sbd"
                            width="100%"
                            height="100%"
                            style={{ border: 0, borderRadius: "0.5rem" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="RUET Location Map"
                        ></iframe>
                    </div>

                    {/* Additional Help Section */}
                    <div className="flex flex-col gap-6">
                        {/* Box 1: Operating Hours */}
                        <div className="bg-white p-8 rounded-xl shadow-md flex-1">
                            <div className="flex items-center gap-4 mb-6">
                                <Clock className="w-6 h-6 text-black" />
                                <h3 className="font-bold text-2xl">
                                    Operating Hours
                                </h3>
                            </div>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex justify-between border-b border-gray-100 pb-2">
                                    <span>Monday - Friday</span>
                                    <span className="font-bold text-black">
                                        9:00 AM - 8:00 PM
                                    </span>
                                </li>
                                <li className="flex justify-between border-b border-gray-100 pb-2">
                                    <span>Saturday</span>
                                    <span className="font-bold text-black">
                                        10:00 AM - 6:00 PM
                                    </span>
                                </li>
                                <li className="flex justify-between pb-2">
                                    <span>Sunday</span>
                                    <span className="font-bold text-red-600">
                                        Closed
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Box 2: Quick Links */}
                        <div className="bg-white p-8 rounded-xl shadow-md flex-1 flex flex-col justify-center">
                            <h3 className="font-bold text-xl mb-4">
                                Need Immediate Help?
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Check our Frequently Asked Questions for quick
                                answers about shipping, returns, and warranties.
                            </p>
                            <button className="bg-black text-white py-3 px-6 rounded font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                <MessageCircle className="w-4 h-4" />
                                Visit Help Center
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <footer><Footer/></footer>
            </div>
    );
};

export default Contact;
