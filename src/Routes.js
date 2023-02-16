import { Route, Routes } from "react-router-dom";
import { isUserAdmin, ProtectedRoute } from "./application";
import { HomePage, LoginPage, ProductFormPage, RegisterPage } from "./pages";
import { useUserInfo } from "./redux";

export const RoutesComponent = () => {
    const userInfo = useUserInfo();
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/products/new"
                element={
                    <ProtectedRoute hasAccess={isUserAdmin(userInfo)}>
                        <ProductFormPage />
                    </ProtectedRoute>
                } />
        </Routes>
    );
};