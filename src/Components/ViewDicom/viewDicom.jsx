import React, { useEffect, useState } from "react";
import "./viewDicom.css";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { initialiseCornerstone } from "./CornerStoneStart";
import CornerStoneImple from "../CornerStone/CornerStone";
import axiosInstance from "../Context/axiosInstance";

function ViewDicom() {

  
  const { id } = useParams();
  const [user, setUser] = useState(null);
  // Changed from array to single user object
  const [intialize, setintialize] = useState(false);

  const initialisingCornerStone = async () => {
    await initialiseCornerstone();
    setintialize(true);
  };

  useEffect(() => {
    initialisingCornerStone();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await axiosInstance.get(`/view/details/${id}`);
        setUser(result.data); // Update user state with fetched data
      } catch (error) {
        toast.error("Error loading user:", error);
      }
    };

    loadData();
  }, [id]); // Fetch data when ID changes

  // const calculateAge = (dob) => {
  //   // Split the dob string into year, month, and day components
  //   const dobComponents = dob.split("-");
  //   const dobYear = parseInt(dobComponents[0]);
  //   const dobMonth = parseInt(dobComponents[1]) - 1; // Months are 0-based in JavaScript Date object
  //   const dobDay = parseInt(dobComponents[2]);

  //   // Create a new Date object using the components
  //   const dobDate = new Date(dobYear, dobMonth, dobDay);

  //   // Get the current date
  //   const currentDate = new Date();

  //   // Calculate the age
  //   let age = currentDate.getFullYear() - dobDate.getFullYear();
  //   const monthDiff = currentDate.getMonth() - dobDate.getMonth();

  //   // Adjust age if the current month is before the birth month
  //   if (
  //     monthDiff < 0 ||
  //     (monthDiff === 0 && currentDate.getDate() < dobDate.getDate())
  //   ) {
  //     age--;
  //   }

  //   return age;
  // };

  return (
    <div className="modalBackground">
      <ToastContainer />
      <div className="view-container">
        <div className="corner">
          {intialize && id !== -1 && <CornerStoneImple id={id} />}
        </div>
       

        {user && (
          <div className="user-card">
            <h2>Patient Details</h2>
            <p>
              <strong>Sex:</strong> {user[4]}
            </p>
            <p>
              <strong>Patient ID:</strong> {user[0]}
            </p>
            <p>
              <strong>Name:</strong> {user[1]}
            </p>
            <p>
              <strong>Age:</strong> {user[3]} 
            </p>
            
            <p>
              <strong>Date of Birth:</strong> {user[5]}
            </p>
            <p>
              <strong>Study Upload Date:</strong> {user[2]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewDicom;
