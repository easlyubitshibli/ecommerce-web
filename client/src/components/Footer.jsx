import React from "react";
import {
    Truck,
    ShieldCheck,
    Tag,
    CreditCard,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Smartphone,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="w-full bg-black text-white pt-10">
            {/* --- Top Section: Features Banner --- */}
            <div className="container mx-auto px-4 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Feature 1 */}
                    <div className="bg-[#1a1a1a] p-6 rounded-lg flex items-center gap-4">
                        <Truck className="w-10 h-10 text-red-600 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg">
                                Express Delivery
                            </h4>
                            <p className="text-gray-400 text-sm">
                                Ships in 24 Hours
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-[#1a1a1a] p-6 rounded-lg flex items-center gap-4">
                        <ShieldCheck className="w-10 h-10 text-red-600 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg">
                                Brand Warranty
                            </h4>
                            <p className="text-gray-400 text-sm">
                                100% Original products
                            </p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-[#1a1a1a] p-6 rounded-lg flex items-center gap-4">
                        <Tag className="w-10 h-10 text-red-600 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg">
                                Exciting Deals
                            </h4>
                            <p className="text-gray-400 text-sm">
                                On all prepaid orders
                            </p>
                        </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-[#1a1a1a] p-6 rounded-lg flex items-center gap-4">
                        <CreditCard className="w-10 h-10 text-red-600 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg">
                                Secure Payments
                            </h4>
                            <p className="text-gray-400 text-sm">
                                SSL / Secure certificate
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Main Footer Content --- */}
            <div className="container mx-auto px-4 pb-12 border-b border-gray-800">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Column 1: Branding & Newsletter (Takes up 2 cols space on large screens) */}
                    <div className="lg:col-span-2 pr-0 lg:pr-8">
                        {/* Logo Area */}
                        <div className="mb-6">
                            <h2 className="text-3xl font-extrabold text-red-600 italic tracking-tighter">
                                ShopSmart
                            </h2>
                        </div>

                        <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Email Address*"
                                className="w-full bg-[#1a1a1a] text-white px-4 py-3 rounded border border-gray-700 focus:outline-none focus:border-red-600 transition-colors"
                            />
                            <p className="text-xs text-gray-500">
                                By submitting your email address you agree to
                                the{" "}
                                <span className="text-white font-semibold cursor-pointer">
                                    Terms & Conditions
                                </span>
                            </p>
                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors w-full sm:w-auto">
                                SUBSCRIBE
                            </button>
                        </div>
                    </div>

                    {/* Column 2: Help */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Help</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-red-600 transition-colors"
                                >
                                    Track Order
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-red-600 transition-colors"
                                >
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-red-600 transition-colors"
                                >
                                    Cancel Order
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-red-600 transition-colors"
                                >
                                    Return Order
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-red-600 transition-colors"
                                >
                                    Warranty Info
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Policies & Company */}
                    <div className="flex flex-col gap-8">
                        {/* Policies */}
                        <div>
                            <h3 className="text-lg font-bold mb-6">Policies</h3>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-red-600 transition-colors"
                                    >
                                        Return Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-red-600 transition-colors"
                                    >
                                        Security
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-red-600 transition-colors"
                                    >
                                        Sitemap
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-red-600 transition-colors"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-red-600 transition-colors"
                                    >
                                        T&C
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 4: Company (Merged conceptually for layout balance or separate column) */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Company</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-red-600 transition-colors"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-red-600 transition-colors"
                                >
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-red-600 transition-colors"
                                >
                                    Service Centres
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-red-600 transition-colors"
                                >
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-red-600 transition-colors"
                                >
                                    Affiliates
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* --- Socials & App Download (Positioned absolutely or in grid flow) --- */}
                <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Download App */}
                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-sm mb-2">
                            Download app
                        </span>
                        <div className="flex gap-3">
                            {/* Mock Google Play Button */}
                            <button className="bg-black border border-gray-600 rounded px-4 py-2 flex items-center gap-2 hover:border-white transition-colors">
                                <Smartphone className="w-5 h-5" />
                                <div className="text-left leading-none">
                                    <div className="text-[10px] uppercase">
                                        Get it on
                                    </div>
                                    <div className="text-sm font-bold">
                                        Google Play
                                    </div>
                                </div>
                            </button>
                            {/* Mock App Store Button */}
                            <button className="bg-black border border-gray-600 rounded px-4 py-2 flex items-center gap-2 hover:border-white transition-colors">
                                <Smartphone className="w-5 h-5" />
                                <div className="text-left leading-none">
                                    <div className="text-[10px] uppercase">
                                        Download on the
                                    </div>
                                    <div className="text-sm font-bold">
                                        App Store
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="bg-white text-black p-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                        >
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="bg-white text-black p-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                        >
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="bg-white text-black p-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="bg-white text-black p-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* --- Bottom Copyright Bar --- */}
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm font-bold uppercase tracking-wider">
                    <a
                        href="#"
                        className="hover:text-red-600 transition-colors"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                        className="hover:text-red-600 transition-colors"
                    >
                        Terms & Conditions
                    </a>
                    <a
                        href="#"
                        className="hover:text-red-600 transition-colors"
                    >
                        Terms of Use
                    </a>
                </div>
                <div className="text-center text-gray-500 text-xs mt-4">
                    © 2026 ShopSmart. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
