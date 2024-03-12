import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import ResetPassword from '../pages/ResetPassword'
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/password/reset" element={<ResetPassword />} />
    </Routes>
  )
}
export default AppRoutes