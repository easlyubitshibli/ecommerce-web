import React, { useState, useEffect } from "react";
import {
    Search,
    ShoppingCart,
    User,
    ChevronDown,
    LogOut,
    UserCircle,
    X,
    LayoutDashboard, 
    Users,
    Package,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    useEffect(() => {
        const checkUser = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        };

        checkUser();

        window.addEventListener("storage", checkUser);
        return () => window.removeEventListener("storage", checkUser);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/product?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setIsDropdownOpen(false);
        navigate("/login");
    };

    return (
        <header className="w-full bg-white border-b border-gray-100 relative z-50">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between relative bg-white z-20">
                {/* Left Side: Logo */}
                <div className="flex-shrink-0">
                    <Link
                        to="/"
                        className="text-3xl font-extrabold tracking-tighter flex items-center gap-1"
                    >
                        <span className="italic">SS</span>
                    </Link>
                </div>

                {/* Center: Navigation Links */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        to="/"
                        className="text-gray-900 hover:text-black font-medium text-sm transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        to="/product"
                        className="text-gray-900 hover:text-black font-medium text-sm transition-colors"
                    >
                        Product
                    </Link>

                    {/* --- ADMIN LINKS (Only visible if status is 'admin') --- */}
                    {user?.status === "admin" ? (
                        <>
                            <div className="w-px h-6 bg-gray-300 mx-2"></div>{" "}
                            {/* Divider */}
                            <Link
                                to="/adminhome"
                                className="flex items-center gap-1 text-red-600 hover:text-red-800 font-bold text-sm transition-colors"
                            >
                                <LayoutDashboard className="w-4 h-4" /> Admin
                                Home
                            </Link>
                            <Link
                                to="/adminorders"
                                className="flex items-center gap-1 text-red-600 hover:text-red-800 font-bold text-sm transition-colors"
                            >
                                <Package className="w-4 h-4" /> Orders
                            </Link>
                            <Link
                                to="/adminuser"
                                className="flex items-center gap-1 text-red-600 hover:text-red-800 font-bold text-sm transition-colors"
                            >
                                <Users className="w-4 h-4" /> Users
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/contact"
                                className="text-gray-900 hover:text-black font-medium text-sm transition-colors"
                            >
                                Contact
                            </Link>
                            <Link
                                to="/about"
                                className="text-gray-900 hover:text-black font-medium text-sm transition-colors"
                            >
                                About
                            </Link>
                        </>
                    )}
                </nav>

                {/* Right Side: Icons & Auth */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="text-black hover:text-gray-600 transition-colors"
                    >
                        {isSearchOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Search className="w-6 h-6" />
                        )}
                    </button>

                    <Link
                        to="/cart"
                        className="relative text-black hover:text-gray-600 transition-colors"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full animate-bounce">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                className="flex items-center gap-1 text-black hover:text-gray-600 transition-colors focus:outline-none"
                            >
                                <User className="w-6 h-6" />
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                        isDropdownOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-1 overflow-hidden z-50">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-xs text-gray-500">
                                            Signed in as
                                        </p>
                                        <p className="text-sm font-bold truncate">
                                            {user.name}
                                        </p>
                                        {/* Badge showing they are Admin */}
                                        {user.status === "admin" && (
                                            <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded-full">
                                                ADMIN
                                            </span>
                                        )}
                                    </div>
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                                    >
                                        <UserCircle className="w-4 h-4" />{" "}
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                                    >
                                        <LogOut className="w-4 h-4" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                to="/login"
                                className="text-sm font-bold hover:text-gray-600 transition-colors hidden sm:block"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-black text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Search Bar (Hidden/Visible logic) */}
            {isSearchOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 py-4 px-4 shadow-md z-10 animate-in slide-in-from-top-2">
                    <div className="container mx-auto">
                        <form
                            onSubmit={handleSearch}
                            className="relative flex items-center max-w-2xl mx-auto"
                        >
                            <Search className="absolute left-4 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for products..."
                                className="w-full bg-gray-50 text-black pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-black"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="absolute right-2 bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
