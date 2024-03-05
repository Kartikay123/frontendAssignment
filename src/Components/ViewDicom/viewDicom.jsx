import React, { useEffect, useState } from "react";
import "./viewDicom.css";
import { useParams,Link } from "react-router-dom";
import CornerstoneElement from "../CornerStone/CornerStone";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { initialiseCornerstone } from "./CornerStoneStart";

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
        const result = await axios.get(`http://localhost:8080/patient/${id}`);
        setUser(result.data); // Update user state with fetched data
      } catch (error) {
        toast.error("Error loading user:", error);
      }
    };

    loadData();
  }, [id]); // Fetch data when ID changes

  const calculateAge = (dob) => {
    // Split the dob string into year, month, and day components
    const dobComponents = dob.split("-");
    const dobYear = parseInt(dobComponents[0]);
    const dobMonth = parseInt(dobComponents[1]) - 1; // Months are 0-based in JavaScript Date object
    const dobDay = parseInt(dobComponents[2]);

    // Create a new Date object using the components
    const dobDate = new Date(dobYear, dobMonth, dobDay);

    // Get the current date
    const currentDate = new Date();

    // Calculate the age
    let age = currentDate.getFullYear() - dobDate.getFullYear();
    const monthDiff = currentDate.getMonth() - dobDate.getMonth();

    // Adjust age if the current month is before the birth month
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < dobDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div className="modalBackground">
      <ToastContainer />
      <div className="view-container">
        <div className="corner">
          {intialize && id !== -1 && <CornerstoneElement id={id} />}
        </div>
        <Link className="btn-primary-upload-here" to={`/uploadicom/${id}`}>
          Update Dicom
        </Link>

        {user && (
          <div className="user-card">
            <h2>Patient Details</h2>
            <p>
              <strong>Patient ID:</strong> {user.id}
            </p>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Age:</strong> {calculateAge(user.dateOfBirth)} years
            </p>
            <p>
              <strong>Sex:</strong> {user.gender}
            </p>
            <p>
              <strong>Date of Birth:</strong> {user.dateOfBirth}
            </p>
            <p>
              <strong>Study Upload Date:</strong> {user.uploadDate}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewDicom;
