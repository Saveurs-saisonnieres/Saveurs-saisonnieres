import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import EditPasswordPage from "../pages/EditPasswordPage";
import ShowCart from "../pages/ShowCart";
import ShowProduct from "./ShowProduct";
import AdminPage from "../pages/AdminPage";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";
import LegumesPage from "../pages/LegumesPage";
import FruitsPage from "../pages/FruitsPage";
import IndexProducts from "./IndexProducts";
import SuccessPayment from "../pages/SuccessPayment";
import NotFoundPage from "../pages/NotFoundPage";
import NavBar from "./NavBar";
import Footer from "./Footer";
import UserPage from "../pages/UserPage";
function AppRoutes() {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const [hideNav, setHideNav] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);
  const location = useLocation();
  console.log(isAdmin);

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/") {
      setHideNav(true);
      setHideFooter(true);
    } else if (currentPath === "/register" || currentPath === "/login") {
      setHideNav(true);
      setHideFooter(true);
    } else {
      setHideNav(false);
      setHideFooter(false);
    }
  }, [location]);

  return (
    <>
      {!hideNav && <NavBar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage />
              {hideFooter && <Footer />}
            </>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/password/reset" element={<ResetPasswordPage />} />
        <Route path="/users/password/edit" element={<EditPasswordPage />} />
        <Route path="/cart" element={<ShowCart />} />
        <Route path="/product/:id" element={<ShowProduct />} />
        <Route path="/products" element={<IndexProducts />} />
        {isAdmin && (
          <>
            <Route path="/admin/page" element={<AdminPage />} />
            <Route path="/admin/products/add" element={<AddProductForm />} />
            <Route
              path="/admin/products/edit/:productId"
              element={<EditProductForm />}
            />
          </>
        )}
        <Route path="/legumes" element={<LegumesPage />} />
        <Route path="/fruits" element={<FruitsPage />} />
        <Route path="/payment/success" element={<SuccessPayment />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/profil" element={<UserPage />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

export default AppRoutes;
