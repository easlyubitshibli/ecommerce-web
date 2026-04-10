import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductPage from "../pages/ProductPage";
import Contact from "../pages/Contact";
import About from "../pages/About";
import AdminHome from "../pages/AdminHome";
import AdminAddProduct from "../pages/AdminAddProduct";
import AdminUser from "../pages/AdminUser";
import UserProfile from "../pages/UserProfile";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import AdminEditProduct from "../pages/AdminEditProduct";
import Cart from "../pages/Cart";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFail from "../pages/PaymentFail";
import AdminOrders from "../pages/AdminOrders";
import AdminRoute from "../components/AdminRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/product",
        element: <ProductPage />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/profile",
        element: <UserProfile />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/payment/fail/:tranId",
        element: <PaymentFail />,
    },
    {
        path: "/payment/success/:tranId",
        element: <PaymentSuccess />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/cart",
        element: <Cart />,
    },
    {
        path: "/adminhome",
        element: <AdminRoute><AdminHome /></AdminRoute>,
    },
    {
        path: "/adminaddproduct",
        element: <AdminRoute><AdminAddProduct /></AdminRoute>,
    },
    {
        path: "/adminuser",
        element: <AdminRoute><AdminUser /></AdminRoute>,
    },
    {
        path: "/adminorders",
        element: <AdminRoute><AdminOrders /></AdminRoute>,
    },
    {
        path: "/admin/edit/:id",
        element: <AdminRoute><AdminEditProduct /></AdminRoute>,
    },
]);

// 3. Export at the end
export default router;
