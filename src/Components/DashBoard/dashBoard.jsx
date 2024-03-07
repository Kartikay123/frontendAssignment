import { Navigate } from "react-router-dom"; // Import Navigate
import "./dashBoard.css";
// import { useAuth } from "../Context/authContext";
import React from "react";
import Table from "../Table/table";
import { useContext } from "react";
import { LoginContext } from "../Context/LoginContext";


const DashBoard = () => {
  
  const { isLoggedIn } = useContext(LoginContext);

  if (!isLoggedIn) {
    return <Navigate to="/register" />;
  }

  return (
    <div className="dashboard-container">
    <Table/>
    </div>
  );
};

export default DashBoard;
