import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Home from './dashboard/home';
import Business from './dashboard/business';
import UsersPage from './dashboard/users';
import Login from './auth/login';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
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
