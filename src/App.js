import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { LoginProvider } from "./Components/Context/LoginContext";
import Header from "./Components/Header/header";
import Footer from "./Components/Footer/footer";
import { UpdateStatusProvider } from './Components/Context/upDateStatusContext'; // Import the UpdateStatusProvider
import HomePage from "./Components/HomePage/homePage";
import UserSignUp from "./Components/UserSignUp/userSignUp";
import UserLogin from "./Components/UserLogin/userLogin";
import DashBoard from "./Components/DashBoard/dashBoard";
import ViewDicom from "./Components/ViewDicom/viewDicom";
import UploadDicom from "./Components/UploadDicom/uploadDicom";

function App() {
  const location = useLocation();

  // Check if the current route is /dashboard
  const isDashboardRoute = location.pathname === "/dashboard";

  return (
    <div className="App">
      <UpdateStatusProvider> 
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
      </UpdateStatusProvider>
    </div>
  );
}

export default App;
