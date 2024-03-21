import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import { MdCheck, MdClose } from "react-icons/md";
import EditPatient from "../EditPatient/editPatient";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";
import SearchBoxFilter from "../SearchBox/searchBox";
import AddPatient from "../AddPatient/addPatient";
import axiosInstance from "../Context/axiosInstance";
export default function PatientTable() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedUserId, setEditedUserId] = useState(null);
  const [filterQuery, setFilterQuery] = useState(""); // State to hold filter query
  const [filterType, setFilterType] = useState("");
  const [sortingArrow, setSortingArrow] = useState({
    id: "",
    name: "",
    uploadDate: "",
    dateOfBirth: ""
  });
  const [active, setActive] = useState({
    id: { upArrow: false, downArrow: false },
    name: { upArrow: false, downArrow: false },
    uploadDate: { upArrow: false, downArrow: false },
    dateOfBirth: { upArrow: false, downArrow: false }
  });

  useEffect(() => {
    loadUsers();
  }, [currentPage, rowsPerPage, filterQuery, filterType]); // Reload users when filter query or type changes

  const loadUsers = async () => {
    try {
      let endpoint = `/patient?page=${currentPage}&limit=${rowsPerPage}`;
      // Append filter parameters if filterQuery and filterType are set
      if (filterQuery && filterType) {
        // Determine which endpoint to call based on filterType
        if (filterType === "name") {
          endpoint = `/patient/SearchByName?query=${filterQuery}`;
        } else if (filterType === "id") {
          endpoint = `/patient/SearchByID?query=${filterQuery}`;
        } else if (filterType === "email") {
          endpoint = `/patient/SearchByEmail?query=${filterQuery}`;
        } else if (filterType === "UploadDate") {
          endpoint = `/patient/SearchByUploadDate?query=${filterQuery}`;
        } else if (filterType === "DicomStatus") {
          if (filterQuery.toLowerCase() === "view") {
            endpoint = `/patient/SearchByDicomStatus?query=true`;
          } else if (filterQuery.toLowerCase() === "upload") {
            endpoint = `/patient/SearchByDicomStatus?query=false`;
          }
        }
      }

      const result = await axiosInstance.get(endpoint);
      setUsers(result.data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axiosInstance.delete(`/patient/${id}`);
      toast.success("Deleted Successfully");
      loadUsers();
    } catch (error) {
      toast.error("Error deleting user:", error);
    } finally {
      setUserIdToDelete(null);
      setShowConfirmation(false);
    }
  };

  const handleDeleteUserClick = (id) => {
    setActive({
      id: { upArrow: false, downArrow: false },
      name: { upArrow: false, downArrow: false },
      uploadDate: { upArrow: false, downArrow: false },
      dateOfBirth: { upArrow: false, downArrow: false }
    });
    sortByIdasc();
    setUserIdToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmationYes = () => {
    deleteUser(userIdToDelete);
  };

  const handleConfirmationNo = () => {
    setUserIdToDelete(null);
    setShowConfirmation(false);
  };

  const handleOpenEditDialog = (userId) => {
    setActive({
      id: { upArrow: false, downArrow: false },
      name: { upArrow: false, downArrow: false },
      uploadDate: { upArrow: false, downArrow: false },
      dateOfBirth: { upArrow: false, downArrow: false }
    });
    sortByIdasc();
    setEditedUserId(userId);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleFilterChange = (event) => {
    setFilterQuery(event.target.value);
  };

  // Function to handle filter type change
  const handleFilterTypeChange = (type) => {
    setFilterType(type);
  };

  const sortingasc = (col) => {
    const isDownArrowActive = active[col].downArrow;
  
    // Toggle the downArrow state
    setActive((prevState) => ({
      ...prevState,
      id: { upArrow: false, downArrow: false },
      name: { upArrow: false, downArrow: false },
      uploadDate: { upArrow: false, downArrow: false },
      dateOfBirth: { upArrow: false, downArrow: false },
      [col]: { upArrow: false, downArrow: !isDownArrowActive }
    }));
  
    // If downArrow is currently active, remove sorting and set color to black
    if (isDownArrowActive) {
      sortByIdasc(col);
    } else {
      // If downArrow is not active, apply sorting and set color to blue
      const sorted = users
        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
        .sort((a, b) => (a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1));
      setUsers([
        ...users.slice(0, (currentPage - 1) * rowsPerPage),
        ...sorted,
        ...users.slice(currentPage * rowsPerPage),
      ]);
      setSortingArrow(prevState => ({
        ...prevState,
        [col]: "asc"
      }));
    }
  };
  
  const sortingdes = (col) => {
    const isUpArrowActive = active[col].upArrow;
  
    // Toggle the upArrow state
    setActive((prevState) => ({
      ...prevState,
      id: { upArrow: false, downArrow: false },
      name: { upArrow: false, downArrow: false },
      uploadDate: { upArrow: false, downArrow: false },
      dateOfBirth: { upArrow: false, downArrow: false },
      [col]: { upArrow: !isUpArrowActive, downArrow: false }
    }));
  
    // If upArrow is currently active, remove sorting and set color to black
    if (isUpArrowActive) {
      sortByIdasc(col);
    } else {
      // If upArrow is not active, apply sorting and set color to blue
      const sorted = users
        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
        .sort((a, b) => (a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1));
      setUsers([
        ...users.slice(0, (currentPage - 1) * rowsPerPage),
        ...sorted,
        ...users.slice(currentPage * rowsPerPage),
      ]);
      setSortingArrow(prevState => ({
        ...prevState,
        [col]: "des"
      }));
    }
  };
  const sortingascid = () => {
    const isDownArrowActive = active.id.downArrow;

  // Toggle the downArrow state
  setActive((prevState) => ({
    ...prevState,
    id: { upArrow: false, downArrow: !isDownArrowActive },
    name: { upArrow: false, downArrow: false },
    uploadDate: { upArrow: false, downArrow: false },
    dateOfBirth: { upArrow: false, downArrow: false }
  }));

  // If downArrow is currently active, remove sorting and set color to black
  if (isDownArrowActive) {
    sortByIdasc();
  } else {
    // If downArrow is not active, apply sorting and set color to blue
    const sorted = users
      .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
      .sort((a, b) => a.id - b.id);
    setUsers([
      ...users.slice(0, (currentPage - 1) * rowsPerPage),
      ...sorted,
      ...users.slice(currentPage * rowsPerPage),
    ]);
    setSortingArrow(prevState => ({
      ...prevState,
      id: "asc"
    }));
  }
  };

  const sortingdesid = () => {
    const isUpArrowActive = active.id.upArrow;
  
    // Toggle the upArrow state
    setActive((prevState) => ({
      ...prevState,
      id: { upArrow: !isUpArrowActive, downArrow: false },
      name: { upArrow: false, downArrow: false },
      uploadDate: { upArrow: false, downArrow: false },
      dateOfBirth: { upArrow: false, downArrow: false }
    }));
  
    // If upArrow is currently active, remove sorting and set color to black
    if (isUpArrowActive) {
      sortByIdasc();
    } else {
      // If upArrow is not active, apply sorting and set color to blue
      const sorted = users
        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
        .sort((a, b) => b.id - a.id);
      setUsers([
        ...users.slice(0, (currentPage - 1) * rowsPerPage),
        ...sorted,
        ...users.slice(currentPage * rowsPerPage),
      ]);
      setSortingArrow(prevState => ({
        ...prevState,
        id: "des"
      }));
    }
  };
  const sortingascdateofBirth = () => {
    const isDownArrowActive = active.dateOfBirth.downArrow;
  
    // Toggle the downArrow state
    setActive((prevState) => ({
      ...prevState,
      id: { upArrow: false, downArrow: false },
      name: { upArrow: false, downArrow: false },
      uploadDate: { upArrow: false, downArrow: false },
      dateOfBirth: { upArrow: false, downArrow: !isDownArrowActive }
    }));
  
    // If downArrow is currently active, remove sorting and set color to black
    if (isDownArrowActive) {
      sortByIdasc();
    } else {
      // If downArrow is not active, apply sorting and set color to blue
      const sorted = users
        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
        .sort((a, b) => {
          const [yearA, monthA, dayA] = a.dateOfBirth.split("-").map(Number);
          const [yearB, monthB, dayB] = b.dateOfBirth.split("-").map(Number);
          return (
            new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB)
          );
        });
      setUsers([
        ...users.slice(0, (currentPage - 1) * rowsPerPage),
        ...sorted,
        ...users.slice(currentPage * rowsPerPage),
      ]);
      setSortingArrow(prevState => ({
        ...prevState,
        dateOfBirth: "asc"
      }));
    }
  };
  
  const sortingdesdateofBirth = () => {
    const isUpArrowActive = active.dateOfBirth.upArrow;
  
    // Toggle the upArrow state
    setActive((prevState) => ({
      ...prevState,
      id: { upArrow: false, downArrow: false },
      name: { upArrow: false, downArrow: false },
      uploadDate: { upArrow: false, downArrow: false },
      dateOfBirth: { upArrow: !isUpArrowActive, downArrow: false }
    }));
  
    // If upArrow is currently active, remove sorting and set color to black
    if (isUpArrowActive) {
      sortByIdasc();
    } else {
      // If upArrow is not active, apply sorting and set color to blue
      const sorted = users
        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
        .sort((a, b) => {
          const [yearA, monthA, dayA] = a.dateOfBirth.split("-").map(Number);
          const [yearB, monthB, dayB] = b.dateOfBirth.split("-").map(Number);
          return (
            new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA)
          );
        });
      setUsers([
        ...users.slice(0, (currentPage - 1) * rowsPerPage),
        ...sorted,
        ...users.slice(currentPage * rowsPerPage),
      ]);
      setSortingArrow(prevState => ({
        ...prevState,
        dateOfBirth: "des"
      }));
    }
  };
  
  const sortingascUploadDate = () => {
    const isDownArrowActive = active.uploadDate.downArrow;
  
    // Toggle the downArrow state
    setActive((prevState) => ({
      ...prevState,
      id: { upArrow: false, downArrow: false },
      name: { upArrow: false, downArrow: false },
      uploadDate: { upArrow: false, downArrow: !isDownArrowActive },
      dateOfBirth: { upArrow: false, downArrow: false }
    }));
  
    // If downArrow is currently active, remove sorting and set color to black
    if (isDownArrowActive) {
      sortByIdasc();
    } else {
      // If downArrow is not active, apply sorting and set color to blue
      const sorted = users
        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
        .sort((a, b) => {
          return (
            new Date(a.uploadDate) - new Date(b.uploadDate)
          );
        });
      setUsers([
        ...users.slice(0, (currentPage - 1) * rowsPerPage),
        ...sorted,
        ...users.slice(currentPage * rowsPerPage),
      ]);
      setSortingArrow(prevState => ({
        ...prevState,
        uploadDate: "asc"
      }));
    }
  };
  
  const sortingdesUploadDate = () => {
    const isUpArrowActive = active.uploadDate.upArrow;
  
    // Toggle the upArrow state
    setActive((prevState) => ({
      ...prevState,
      id: { upArrow: false, downArrow: false },
      name: { upArrow: false, downArrow: false },
      uploadDate: { upArrow: !isUpArrowActive, downArrow: false },
      dateOfBirth: { upArrow: false, downArrow: false }
    }));
  
    // If upArrow is currently active, remove sorting and set color to black
    if (isUpArrowActive) {
      sortByIdasc();
    } else {
      // If upArrow is not active, apply sorting and set color to blue
      const sorted = users
        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
        .sort((a, b) => {
          return (
            new Date(b.uploadDate) - new Date(a.uploadDate)
          );
        });
      setUsers([
        ...users.slice(0, (currentPage - 1) * rowsPerPage),
        ...sorted,
        ...users.slice(currentPage * rowsPerPage),
      ]);
      setSortingArrow(prevState => ({
        ...prevState,
        uploadDate: "des"
      }));
    }
  };

  const convertDateFormat = (dateString) => {
    // Split the date string into year, month, and day
    const [year, month, day] = dateString.split('-');
  
    // Return the date in dd-mm-yyyy format
    return `${day}-${month}-${year}`;
  };


  const sortByIdasc = () => {
   
    const sorted = users
      .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
      .sort((a, b) => a.id - b.id);
    setUsers([
      ...users.slice(0, (currentPage - 1) * rowsPerPage),
      ...sorted,
      ...users.slice(currentPage * rowsPerPage),
    ]);
    setSortingArrow(prevState => ({
      ...prevState,
      id: "asc"
    }));
  };

  return (
    <div style={{ height: "100%", overflowY: "scroll" }}>
      <div className="operation-line">
        <AddPatient  loadUsers={loadUsers}/>

       
        <SearchBoxFilter
          filterType={filterType}
          filterQuery={filterQuery}
          handleFilterChange={handleFilterChange}
          handleFilterTypeChange={handleFilterTypeChange}
        />
      </div>

      <TableContainer component={Paper}>
        <ToastContainer />
        <Table
          sx={{ minWidth: 650, border: "1px solid black" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                <FaArrowAltCircleDown
                  onClick={sortingascid}
                  style={{ marginRight: "10px", cursor: "pointer", color: active.id.downArrow ? "blue" : "black" }}
                />
                ID
                <FaArrowAltCircleUp
                  onClick={sortingdesid}
                  style={{ marginLeft: "10px", cursor: "pointer", color: active.id.upArrow ? "blue" : "black" }}
                />
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                <FaArrowAltCircleDown
                  onClick={() => sortingasc("name")}
                  style={{ marginRight: "10px", cursor: "pointer", color: active.name.downArrow ? "blue" : "black"  }}
                />
                Name
                <FaArrowAltCircleUp
                  onClick={() => sortingdes("name")}
                  style={{ marginLeft: "10px", cursor: "pointer", color: active.name.upArrow ? "blue" : "black" }}
                />
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                <FaArrowAltCircleDown
                  onClick={sortingascUploadDate}
                  style={{ marginRight: "10px", cursor: "pointer", color: active.uploadDate.downArrow ? "blue" : "black"  }}
                />
                Upload Date
                <FaArrowAltCircleUp
                  onClick={sortingdesUploadDate}
                  style={{ marginLeft: "10px", cursor: "pointer", color: active.uploadDate.upArrow ? "blue" : "black" }}
                />
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Email
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Gender
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
              <FaArrowAltCircleDown
                  onClick={sortingascdateofBirth}
                  style={{ marginLeft: "10px",marginRight:"8px", cursor: "pointer", color: active.dateOfBirth.downArrow ? "blue" : "black"  }}
                />
                Date of Birth
                <FaArrowAltCircleUp
                  onClick={sortingdesdateofBirth}
                  style={{ marginLeft: "10px", cursor: "pointer", color: active.dateOfBirth.upArrow ? "blue" : "black"  }}
                />
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                DICOM Status
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
              .map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.uploadDate}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.gender}</TableCell>
                  <TableCell align="center">{convertDateFormat(row.dateOfBirth)}</TableCell>
                  <TableCell align="center">
                    {row.dicomAttached ? (
                      <>
                        <MdCheck
                          style={{ color: "green", fontSize: "1.3em" }}
                        />
                        <Link
                          className="btn-primary"
                          to={`/viewdicom/${row.id}`}
                        >
                          View
                        </Link>
                      </>
                    ) : (
                      <>
                        <MdClose style={{ color: "red", fontSize: "1.3em" }} />
                        <Link
                          className="btn-primary-upload"
                          to={`/uploadicom/${row.id}`}
                        >
                          Upload
                        </Link>
                      </>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <button
                      className="btn-outline-primary"
                      onClick={() => handleOpenEditDialog(row.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDeleteUserClick(row.id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination-container">
          <span className="rows-per-page">Rows per page:</span>
          <input
            type="number"
            min="1"
            className="rows-per-page"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
          />
          <span>Page:</span>
          {Array.from(
            { length: Math.ceil(users.length / rowsPerPage) },
            (_, i) => (
              <button
                key={i}
                className={`page-button ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            )
          )}
        </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="confirmation-dialog">
        <div className="delete-dialog">
        <p>Are you sure?</p>
          <div>
            <button className="btn-primary" onClick={handleConfirmationYes}>
              Yes
            </button>
            <button className="btn-danger" onClick={handleConfirmationNo}>
              No
            </button>
          </div>
        </div>
         
        </div>
      )}

      {/* Edit Patient Dialog */}
      {editDialogOpen && (
        <EditPatient
          open={editDialogOpen}
          handleClose={handleCloseEditDialog}
          userId={editedUserId}
          loadUsers={loadUsers}
        />
      )}
    </div>
  );
}
