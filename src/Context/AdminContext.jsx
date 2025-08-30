import { createContext, useContext, useState, useEffect } from "react";
import {
    getAllUsersRequest,
    getAllServicesRequest,
    getAllBookingsRequest,
    blockUserRequest,
    unblockUserRequest,
    registerAdminRequest,
    loginAdminRequest ,
    verifyAdminTokenRequest
} from "../api/admin.auth";

export const AdminContext = createContext();

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }
    return context;
};

export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loadingAdmin, setLoadingAdmin] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [allServices, setAllServices] = useState([]);
    const [allBookings, setAllBookings] = useState([]);

    const getAllUsers = async () => {
        try {
            const res = await getAllUsersRequest();
            setAllUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const getAllServices = async () => {
        try {
            const res = await getAllServicesRequest();
            setAllServices(res.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const getAllBookings = async () => {
        try {
            const res = await getAllBookingsRequest();
            setAllBookings(res.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const blockUser = async (userId) => {
        try {
            const res = await blockUserRequest(userId);
            if (res.status === 200) {
                setAllUsers(prevUsers =>
                    prevUsers.map(user =>
                        user._id === userId ? { ...user, blocked: true } : user
                    )
                );
            }
        } catch (error) {
            console.error("Error blocking user:", error);
        }
    };

    const unblockUser = async (userId) => {
        try {
            const res = await unblockUserRequest(userId);
            if (res.status === 200) {
                setAllUsers(prevUsers =>
                    prevUsers.map(user =>
                        user._id === userId ? { ...user, blocked: false } : user
                    )
                );
            }
        } catch (error) {
            console.error("Error unblocking user:", error);
        }
    };
    const signup = async (adminData) => {
        try {
            const res = await registerAdminRequest(adminData);
            const token = res.data;
            localStorage.setItem("admin_token", token);
            setAdmin(res.data);
            setIsAuthenticatedAdmin(true);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    };

    const signin = async (adminData) => {
        try {
            const res = await loginAdminRequest(adminData);
            const token = res.data;
            localStorage.setItem("admin_token", token);
            const resAdmin = await verifyAdminTokenRequest({ token });
            setAdmin(resAdmin);
            setIsAuthenticatedAdmin(true);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    };

    const logout = () => {
        localStorage.removeItem("admin_token");
        setAdmin(null);
        setIsAuthenticatedAdmin(false);
    };

    // Manejo de errores siguiendo el patrón establecido  
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <AdminContext.Provider value={{
            admin,
            isAuthenticatedAdmin,
            loadingAdmin,
            errors,
            allUsers,
            allServices,
            allBookings,
            getAllUsers,
            getAllServices,
            getAllBookings,
            blockUser,
            unblockUser,
            signup,
            signin,
            logout
        }}>
            {children}
        </AdminContext.Provider>
    );
};