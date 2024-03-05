import { Navigate } from "react-router-dom"; // Import Navigate
import "./dashBoard.css";
import { useAuth } from "../Context/authContext";
import React from "react";
import Table from "../Table/table";


const DashBoard = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/register" />;
  }

  return (
    <div className="dashboard-container">
    <Table/>
    </div>
  );
};

export default DashBoard;
