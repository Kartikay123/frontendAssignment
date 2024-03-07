import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../Context/axiosInstance";

const EditPatient = ({ open, handleClose, userId ,loadUsers}) => {
  const [editedUserData, setEditedUserData] = useState(null);
  console.log(userId);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await axiosInstance.get(`/patient/${userId}`);
        setEditedUserData(result.data);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Make PUT request to update user data
      await axiosInstance.put(`/patient/${userId}`, editedUserData);
      toast.success("Update Successfully");
      handleClose();
      loadUsers();
      
    } catch (error) {
      toast.error("Error updating patient data:", error);
      // Handle error as needed
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Patient Details</DialogTitle>
      <DialogContent>
        {/* Check if editedUserData exists before rendering the fields */}
        {editedUserData && (
          <>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={editedUserData.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={editedUserData.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="gender"
              name="gender"
              label="Gender"
              type="text"
              fullWidth
              value={editedUserData.gender}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="dateOfBirth"
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              fullWidth
              value={editedUserData.dateOfBirth}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
      <ToastContainer />
    </Dialog>
  );
};

export default EditPatient;
