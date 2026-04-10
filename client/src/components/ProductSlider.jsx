import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper modules
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom"; // To make cards clickable

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const ProductSlider = () => {
    const [products, setProducts] = useState([]);

    // Fetch Products from Backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://ecommerce-web-nrat.vercel.app/products");
                const data = await response.json();
                // We can slice the data if we only want to show a few in the slider (e.g., first 10)
                setProducts(data.slice(0, 10));
            } catch (error) {
                console.error("Error fetching slider products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                {/* Section Heading */}
                <h2 className="text-3xl font-bold text-center mb-8">
                    Featured Products
                </h2>

                {products.length > 0 ? (
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            768: { slidesPerView: 3, spaceBetween: 30 },
                            1024: { slidesPerView: 4, spaceBetween: 30 },
                        }}
                        className="pb-12"
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product._id}>
                                {/* Wrap card in Link to go to product details if needed */}
                                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col items-center h-[400px]">
                                    {/* Product Title */}
                                    <h3 className="text-sm font-semibold text-center text-gray-800 mb-4 line-clamp-2 h-10">
                                        {product.name}
                                    </h3>

                                    {/* Image Container */}
                                    <div className="w-full h-48 mb-4 flex items-center justify-center">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>

                                    {/* Price Section */}
                                    <div className="mt-auto flex flex-col items-center">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-extrabold text-black">
                                                ₹
                                                {Number(
                                                    product.price
                                                ).toLocaleString()}
                                            </span>
                                            {product.originalPrice > 0 && (
                                                <span className="text-sm text-gray-400 line-through decoration-gray-400">
                                                    ₹
                                                    {Number(
                                                        product.originalPrice
                                                    ).toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p className="text-center text-gray-500">
                        Loading products...
                    </p>
                )}
            </div>
        </section>
    );
};

export default ProductSlider;
