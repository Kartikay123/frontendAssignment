import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../Context/axiosInstance";
import './editPatient.css';

const EditPatient = ({ open, handleClose, userId, loadUsers }) => {
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
      // Check if any of the required fields are empty
      if (
        !editedUserData.name ||
        !editedUserData.email ||
        !editedUserData.gender ||
        !editedUserData.dateOfBirth
      ) {
        toast.error("All fields are required");
        return;
      }
      if (editedUserData.name.length > 255) {
        toast.error("Size should be less than 255");
        return;
      }
      if (!validateEmail(editedUserData.email)) {
        toast.error("Invalid Email Address");
        return;
      }
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

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Patient Details</DialogTitle>
      <DialogContent>
        {/* Check if editedUserData exists before rendering the fields */}
        {editedUserData && (
          <>
           <InputLabel id="name" style={{ color: 'black', marginTop: '10px',marginBottom: '-7px' }}>Name *</InputLabel>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              type="text"
              fullWidth
              req
              value={editedUserData.name}
              onChange={handleInputChange}
              inputProps={{ maxLength: 50 }}
            />
             <InputLabel id="email" style={{ color: 'black', marginTop: '10px',marginBottom: '-7px' }}>Email *</InputLabel>
            <TextField
              margin="dense"
              id="email"
              name="email"
              type="email"
              fullWidth
              required
              value={editedUserData.email}
              onChange={handleInputChange}
            />
            <InputLabel id="gender-label" style={{ color: 'black', marginTop: '10px',marginBottom: '0px' }}>Gender *</InputLabel>
            <Select
              margin="dense"
              id="gender"
              name="gender"
              labelId="gender-label" // Associate the input label with the select component
              fullWidth
              value={editedUserData.gender}
              onChange={handleInputChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>

            <InputLabel htmlFor="dateOfBirth" style={{ color: 'black', marginTop: '10px',marginBottom: '-8px' }}>Date of Birth *</InputLabel>
            <TextField
              margin="dense"
              id="dateOfBirth"
              name="dateOfBirth"
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
        <div className="btn-danger-edit">
          <Button onClick={handleClose} style={{ color: 'white' }}>Cancel</Button>
        </div>
        <div className="btn-outline-primary-edit">
          <Button onClick={handleSubmit} style={{ color: 'black' }}>Save</Button>
        </div>
      </DialogActions>
      <ToastContainer />
    </Dialog>
  );
};

export default EditPatient;
