import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import EditPasswordPage from "../pages/EditPasswordPage";
import ShowCart from "../pages/ShowCart";
import ShowProduct from "./ShowProduct";
import AdminProduct from "../pages/AdminProduct";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";
import LegumesPage from "../pages/LegumesPage";
import FruitsPage from "../pages/FruitsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/password/reset" element={<ResetPasswordPage />} />
      <Route path="/users/password/edit" element={<EditPasswordPage />} />
      <Route path="/cart" element={<ShowCart />} />
      <Route path="/products/:id" element={<ShowProduct />} />
      <Route path="/products" element={<ShowProduct />} />
      <Route path="/admin/products" element={<AdminProduct />} />
      <Route path="/admin/products/add" element={<AddProductForm />} />
      <Route
        path="/admin/products/edit/:productId"
        element={<EditProductForm />}
      />
      <Route path="/legumes" element={<LegumesPage />} />
      <Route path="/fruits" element={<FruitsPage />} />
    </Routes>
  );
}

export default AppRoutes;
