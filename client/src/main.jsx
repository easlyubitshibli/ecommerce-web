import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import './index.css'
import App from './App.jsx'
import router from './router/router.jsx'
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <CartProvider>
            <RouterProvider router={router} />,
        </CartProvider>
    </StrictMode>
);
