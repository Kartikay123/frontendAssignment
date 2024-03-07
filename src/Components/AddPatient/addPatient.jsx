import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Button,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "./addPatient.css";
import axiosInstance from '../Context/axiosInstance';

const AddPatient = ({loadUsers}) => {
  const initialFormData = {
    name: "",
    gender: "",
    dateOfBirth: "",
    contactNumber: "",
    email: "",
    symptoms: {
      temperature: "",
      spo2Level: "",
    },
  };

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialFormData); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSymptomsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      symptoms: {
        ...prevState.symptoms,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { temperature, spo2Level } = formData.symptoms;
  
    // Validate if temperature and SpO2 are integers and less than or equal to 100
    if (isNaN(temperature) || isNaN(spo2Level) || temperature > 100 || spo2Level > 100) {
      toast.error("Temperature and SpO2 Level must be integer values equal to or less than 100");
      return;
    }
  
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();
  
    const uploadDate = yyyy + "-" + mm + "-" + dd;
  
    const updatedFormData = {
      ...formData,
      todayDate: uploadDate,
    };
    const { name, gender, dateOfBirth, email } = updatedFormData;
    const user = { name, gender, dateOfBirth, uploadDate, email };
  
   // Validate contact number
if (!/^\d{10}$/.test(updatedFormData.contactNumber)) {
  toast.error("Mobile Number must be a 10-digit integer");
  return;
}

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid Email Address");
      return;
    }
  
    setFormData(updatedFormData);
    console.log(user);
    try {
      await axiosInstance.post("/patient", user);
      toast.success("Patient details submitted successfully");
      loadUsers();
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
      toast.error("Error submitting patient details");
    }
    handleClose();
  };
  

  return (
    <div>
      <ToastContainer /> 
      <div className="custom-button" onClick={handleOpen}>
        Add Patient
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle style={{ textAlign: "center", marginBottom: "20px" }}>
          Patient Details
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="Patient Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    inputProps={{ id: "gender-select-placeholder" }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      <span style={{ fontWeight: 'lighter' }}>Select Gender</span>
                    </MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="Contact Number"
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="Temperature in Celsius"
                  name="temperature"
                  value={formData.symptoms.temperature}
                  onChange={handleSymptomsChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  placeholder="SPO2 Level"
                  name="spo2Level"
                  value={formData.symptoms.spo2Level}
                  onChange={handleSymptomsChange}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <DialogActions
              style={{ justifyContent: "center", margin: "20px 0" }}
            >
              <div className="cancel-button">
                <Button onClick={handleClose}>CANCEL</Button>
              </div>
              <div className="submit-button">
                <Button type="submit">Submit</Button>
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPatient;
