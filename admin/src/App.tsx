import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Home from './dashboard/home';
import Business from './dashboard/business';
import UsersPage from './dashboard/users';
import Login from './auth/login';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchUserProfile } from "./redux/slice/userAuth";
import api from './api/axiosInstance'

const App = () => {
  const dispatch=useAppDispatch();
   useEffect(() => {
    // 1️⃣ Set token from localStorage on app load
    const token = localStorage.getItem("authToken");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch(fetchUserProfile()); // 2️⃣ fetch profile after token is set
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home/>}/>
            <Route path="/business" element={<Business />} />
            <Route path="/users" element={<UsersPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
