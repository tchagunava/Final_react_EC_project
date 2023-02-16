import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./application";
import { HomePage, LoginPage, ProductFormPage, RegisterPage } from "./pages";

export const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/products/new"
                element={
                    <ProtectedRoute>
                        <ProductFormPage />
                    </ProtectedRoute>
                } />
        </Routes>
    );
};