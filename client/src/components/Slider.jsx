import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2070&auto=format&fit=crop",
        subTitle: "Next Gen Performance",
        title: "Experience the Future: The All-New iPhone 15 Pro",
        buttonText: "BUY NOW",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2015&auto=format&fit=crop",
        subTitle: "Unleash Creativity",
        title: "Powerful Tablets for Pros & Creators - Up to 20% Off",
        buttonText: "DISCOVER TABLETS",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=2070&auto=format&fit=crop",
        subTitle: "Immersive Sound",
        title: "True Wireless Noise Cancelling Earbuds",
        buttonText: "SHOP AUDIO",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop",
        subTitle: "Stay Connected",
        title: "Smartwatches that Track Your Life & Fitness",
        buttonText: "VIEW WEARABLES",
    },
];

const Slider = () => {
    return (
        <section className="w-full h-[60vh] md:h-[80vh] bg-neutral-900">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect={"fade"}
                spaceBetween={0}
                slidesPerView={1}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                className="h-full w-full [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-pagination-bullet-active]:bg-white"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative">
                        {/* --- 1. Background Image & Overlay --- */}
                        <div className="absolute inset-0">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Polished: Gradient overlay creates depth and readability */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>
                        </div>

                        {/* --- 2. Text Content --- */}
                        {/* Polished: Added 'items-center' and 'text-center' to center everything */}
                        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
                            {/* Subtitle */}
                            <p className="text-sm md:text-lg font-semibold mb-4 tracking-[0.2em] uppercase text-gray-200 drop-shadow-md">
                                {slide.subTitle}
                            </p>

                            {/* Main Title */}
                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-8 max-w-4xl drop-shadow-xl">
                                {slide.title}
                            </h2>

                            {/* Button */}
                            <Link to="/product">
                                <button className="bg-white text-black border-2 border-white font-bold text-sm py-4 px-10 hover:bg-transparent hover:text-white transition-all duration-300 uppercase tracking-widest shadow-lg rounded-sm">
                                    {slide.buttonText}
                                </button>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Slider;
