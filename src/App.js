import React, { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { LoginProvider } from "./Components/Context/LoginContext";
import Header from "./Components/Header/header";
import Footer from "./Components/Footer/footer";

const HomePage = lazy(() => import("./Components/HomePage/homePage"));
const UserSignUp = lazy(() => import("./Components/UserSignUp/userSignUp"));
const UserLogin = lazy(() => import("./Components/UserLogin/userLogin"));
const DashBoard = lazy(() => import("./Components/DashBoard/dashBoard"));
const ViewDicom = lazy(() => import("./Components/ViewDicom/viewDicom"));
const UploadDicom = lazy(() => import("./Components/UploadDicom/uploadDicom"));

function App() {
  const location = useLocation();

  // Check if the current route is /dashboard
  const isDashboardRoute = location.pathname === "/dashboard";

  return (
    <div className="App">
      <LoginProvider>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/register" element={<UserSignUp />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/viewdicom/:id" element={<ViewDicom />} />
            <Route path="/uploadicom/:id" element={<UploadDicom />} />
          </Routes>
        </Suspense>
        {!isDashboardRoute && <Footer />} {/* Render footer if not in /dashboard route */}
      </LoginProvider>
    </div>
  );
}

export default App;
