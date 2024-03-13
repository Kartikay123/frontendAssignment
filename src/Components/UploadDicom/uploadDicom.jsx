import React, { useEffect, useState } from 'react';
import './uploadDicom.css'; // Import the CSS file
import { useParams,useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import { IoClose } from 'react-icons/io5'; // Import your preferred close icon
import axiosInstance from '../Context/axiosInstance';

// Define a custom close button component
const CustomCloseButton = ({ closeToast }) => (
  <IoClose
    onClick={closeToast}
    style={{ color: 'white', backgroundColor: 'none', cursor: 'pointer' }} 
  />
);




const UploadDicom = () => {
  const [file, setFile] = useState(null);
  const [user,setUser]= useState([]);
  const {id} =useParams();
  const Navigate= useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await axiosInstance.get(`/patient/${id}`);
        setUser(result.data);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('p_id', id);
      const response = await axiosInstance.get(`/upload/${id}`);
      console.log(response.data);
      if (response.data) {
        // File exists, make a PUT request to update
        await axiosInstance.put(`/update/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // File doesn't exist, make a POST request to upload
        await axiosInstance.post(`/upload/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
  
      // Update the user object to set dicomAttached to true
      const updatedUser = { ...user, dicomAttached: true };
  
      // Update the dicomStatus of the patient
      await axiosInstance.put(`/patient/${id}`, updatedUser);
  
      // Update the user state to reflect the changes
      setUser(updatedUser);
  
      setFile(null);
      toast.success("File Uploaded Successfully", {
        position: "top-right",
        theme: "colored",
        closeButton: CustomCloseButton // Pass the custom close button component
      });
      setTimeout(() => {
        Navigate('/dashboard');
      }, 3000);
  
    } catch (error) {
      toast.error('Error uploading file:');
    }
  };
  
  

  return (
    <div className="upload-container">
    <ToastContainer/>
    <h2>Upload .dcm File</h2>
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} accept=".dcm" />
      <button type="submit" disabled={!file}>Upload</button>
    </form>
  </div>
  
  );
};

export default UploadDicom;
