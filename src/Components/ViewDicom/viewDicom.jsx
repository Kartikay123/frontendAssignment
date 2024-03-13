import React, { useEffect, useState } from "react";
import "./viewDicom.css";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { initialiseCornerstone } from "./CornerStoneStart";
import CornerStoneImple from "../CornerStone/CornerStone";
import axiosInstance from "../Context/axiosInstance";
import { useUpdateStatus } from "../Context/upDateStatusContext"; // Import the useUpdateStatus hook from your context

function ViewDicom() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const {updateStatus, setUpdateStatus} =useUpdateStatus();

  const initialisingCornerStone = async () => {
    await initialiseCornerstone();
    setInitialized(true);
  };

  useEffect(() => {
    initialisingCornerStone();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await axiosInstance.get(`/view/details/${id}`);
        setUser(result.data);
      } catch (error) {
        toast.error("Error loading user:", error);
      }
    };

    loadData();
  }, [id]);

  const reloadPage = () => {
    setUpdateStatus(false);
    window.location.reload();
  };

  // Call reloadPage function if reloadRequested is true
  if (updateStatus) {
    reloadPage();
  }
  return (
    <div className="modalBackground">
      <ToastContainer />
      <div className="view-container">
        <div className="corner">
          {initialized && id !== -1 && <CornerStoneImple id={id} />}
        </div>
        <Link className="btn-primary-upload-view" to={`/uploadicom/${id}`}
        onClick={() => setUpdateStatus(true)}>
          Update
        </Link>

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
