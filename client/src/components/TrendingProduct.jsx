import React, { useState, useEffect } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext"; // 1. Import Cart Context

// Reusable Product Card Component
const ProductCard = ({ product }) => {
    const { addToCart } = useCart(); // 2. Get addToCart function

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 flex flex-col h-full">
            {/* Product Image */}
            <div className="h-48 flex items-center justify-center mb-4 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full object-contain"
                />
            </div>

            {/* Product Title */}
            <h3 className="font-bold text-base mb-2 line-clamp-1 text-gray-800">
                {product.name}
            </h3>

            

            {/* Product Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                {product.description}
            </p>

            {/* Price Section */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold">
                    ₹{Number(product.price).toLocaleString()}
                </span>
                {product.originalPrice > 0 && (
                    <span className="text-sm text-gray-400 line-through">
                        ₹{Number(product.originalPrice).toLocaleString()}
                    </span>
                )}
            </div>

            
        </div>
    );
};

// Main Trending Products Section
const TrendingProduct = () => {
    const [products, setProducts] = useState([]);

    // Fetch Products from Backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/products");
                const data = await response.json();

                // Simulate "Trending" by taking a slice, or reversing to show newest
                // taking first 8 items for the grid
                setProducts(data.slice(0, 8));
            } catch (error) {
                console.error("Error fetching trending products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
                    Trending Products
                </h2>

                {/* Product Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">
                        Loading trending items...
                    </p>
                )}
            </div>
        </section>
    );
};

export default TrendingProduct;
