import React, { createContext, useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // 1. Initialize State
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // 2. Save to LocalStorage
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // 3. Restore Cart from Database on Login
    useEffect(() => {
        const restoreCart = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user._id) {
                try {
                    const res = await fetch(
                        `http://localhost:5000/cart/${user._id}`
                    );
                    const data = await res.json();
                    if (data && Array.isArray(data)) {
                        setCartItems(data);
                    }
                } catch (error) {
                    console.error("Failed to sync cart", error);
                }
            }
        };
        restoreCart();
    }, []);

    // --- HELPER: Sync with DB ---
    const updateDbQuantity = async (productId, type) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user._id) {
            try {
                await fetch("http://localhost:5000/cart/update-quantity", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: user._id,
                        productId: productId,
                        type: type,
                    }),
                });
            } catch (error) {
                console.error("Failed to sync quantity", error);
            }
        }
    };

    // --- ACTIONS ---

    const addToCart = async (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) =>
                    item._id === product._id || item.productId === product._id
            );

            const productData = {
                ...product,
                productId: product._id,
                _id: product._id,
            };

            if (existingItem) {
                return prevItems.map((item) =>
                    item._id === product._id || item.productId === product._id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...productData, quantity: 1 }];
            }
        });

        Swal.fire({
            icon: "success",
            title: "Added!",
            showConfirmButton: false,
            timer: 1000,
        });

        // Sync Add with DB
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user._id) {
            try {
                await fetch("http://localhost:5000/cart/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user._id, product }),
                });
            } catch (error) {
                console.error("DB Sync Error:", error);
            }
        }
    };

    const decreaseQuantity = (productId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === productId || item.productId === productId
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            )
        );
        updateDbQuantity(productId, "decrement");
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter(
                (item) => item._id !== productId && item.productId !== productId
            )
        );
    };

    // --- NEW: Clear Cart Function ---
    const clearCart = () => {
        setCartItems([]); // Clear State
        localStorage.removeItem("cartItems"); // Clear Storage
    };

    // --- GETTERS ---
    const getCartCount = () => {
        return cartItems.reduce(
            (total, item) => total + (item.quantity || 1),
            0
        );
    };

    const getCartTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * (item.quantity || 1),
            0
        );
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                decreaseQuantity,
                removeFromCart,
                clearCart, // <--- THIS WAS MISSING
                getCartCount,
                getCartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
