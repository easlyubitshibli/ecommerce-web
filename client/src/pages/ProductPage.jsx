import React, { useState, useEffect } from "react";
import { Star, ShoppingCart, Filter, Search } from "lucide-react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";

const Product = () => {
    // 1. Data States
    const [products, setProducts] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // 2. Filter States
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Dynamic Data States
    const [dynamicCategories, setDynamicCategories] = useState([]);
    const [maxPrice, setMaxPrice] = useState(100000); // Dynamic Max
    const [priceRange, setPriceRange] = useState(100000); // Current Slider Value

    const { addToCart } = useCart();

    // --- FETCH DATA ---
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/products");
                const data = await response.json();

                setProducts(data);

                // A. Extract Categories
                const uniqueCategories = [
                    ...new Set(
                        data.map((item) => item.category).filter(Boolean)
                    ),
                ];
                setDynamicCategories(uniqueCategories);

                // B. Find Highest Price for Slider
                if (data.length > 0) {
                    const highestPrice = Math.max(
                        ...data.map((item) => item.price || 0)
                    );
                    setMaxPrice(highestPrice);
                    setPriceRange(highestPrice); // Set slider to max initially so all items show
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // --- DERIVED STATE (The Fix) ---
    const filteredProducts = products.filter((product) => {
        // 1. Search Logic
        const matchesSearch = product.name
            ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
            : false;

        // 2. Price Logic
        const matchesPrice = (product.price || 0) <= priceRange;

        // 3. Category Logic
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category);

        return matchesSearch && matchesPrice && matchesCategory;
    });

    // --- Handlers ---
    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <nav className="mb-12">
                <Header />
            </nav>

            <button
                className="md:hidden mb-4 flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <Filter className="w-4 h-4" /> Filters
            </button>

            <div className="flex flex-col md:flex-row gap-8">
                {/* --- LEFT SIDEBAR --- */}
                <aside
                    className={`w-full md:w-1/4 ${
                        isSidebarOpen ? "block" : "hidden md:block"
                    }`}
                >
                    {/* Search */}
                    <div className="mb-8">
                        <h3 className="font-bold text-lg mb-4">Search</h3>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search item..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        </div>
                    </div>

                    {/* Price Filter (Dynamic Max) */}
                    <div className="mb-8">
                        <h3 className="font-bold text-lg mb-4">Price</h3>
                        <input
                            type="range"
                            min="0"
                            max={maxPrice} // Use dynamic max
                            value={priceRange}
                            onChange={(e) =>
                                setPriceRange(Number(e.target.value))
                            }
                            className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-black"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                            <span>0</span>
                            <span>{priceRange.toLocaleString()}</span>
                        </div>
                    </div>

                    <hr className="border-gray-200 mb-8" />

                    {/* Categories */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Categories</h3>
                        <div className="flex flex-col gap-3">
                            {dynamicCategories.map((category, index) => (
                                <label
                                    key={index}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(
                                            category
                                        )}
                                        onChange={() =>
                                            handleCategoryChange(category)
                                        }
                                        className="w-4 h-4 border-gray-300 rounded accent-black"
                                    />
                                    <span className="text-gray-600 group-hover:text-black">
                                        {category}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* --- RIGHT CONTENT --- */}
                <main className="w-full md:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div
                                    key={product._id}
                                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all p-4 flex flex-col"
                                >
                                    <div className="h-56 mb-4 flex items-center justify-center relative overflow-hidden group">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <h3 className="font-bold text-sm text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
                                        {product.name}
                                    </h3>

                                  

                                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="mt-auto">
                                        <div className="flex items-baseline gap-2 mb-4">
                                            <span className="text-lg font-bold text-black">
                                                ₹
                                                {product.price.toLocaleString()}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="w-full bg-black hover:bg-gray-800 text-white text-xs font-bold py-3 rounded uppercase tracking-wider transition-colors"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                No products found. Max price is {maxPrice}.
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <footer className="mt-12">
                <Footer />
            </footer>
        </div>
    );
};

export default Product;
