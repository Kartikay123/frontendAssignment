import React, { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./Components/Context/authContext";
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

  const isDashboardPage = location.pathname === "/dashboard";

  return (
    <AuthProvider>
      <div className="App">
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
        {!isDashboardPage && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;
