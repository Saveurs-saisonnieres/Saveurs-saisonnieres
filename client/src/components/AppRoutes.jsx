import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import EditPasswordPage from "../pages/EditPasswordPage";
import AddProductForm from "./AddProductForm";
import ProductDetail from "./ShowProducts";
import ShowCart from "../pages/ShowCart";
import ShowProducts from "./ShowProducts";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/password/reset" element={<ResetPasswordPage />} />
      <Route path="/users/password/edit" element={<EditPasswordPage />} />
      <Route path="/products/add" element={<AddProductForm />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<ShowCart />} />
      <Route path="/products" element={<ShowProducts />} />
    </Routes>
  );
}

export default AppRoutes;
