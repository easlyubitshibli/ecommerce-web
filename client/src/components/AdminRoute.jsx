import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const AdminRoute = ({ children }) => {
    const location = useLocation();

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user.status !== "admin") {
        Swal.fire({
            icon: "error",
            title: "Access Denied",
            text: "You do not have permission to view this page.",
            timer: 2000,
            showConfirmButton: false,
        });
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
