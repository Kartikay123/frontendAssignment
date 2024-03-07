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
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
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
    const sorted = users
      .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
      .sort((a, b) => (a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1));
    setUsers([
      ...users.slice(0, (currentPage - 1) * rowsPerPage),
      ...sorted,
      ...users.slice(currentPage * rowsPerPage),
    ]);
  };

  const sortingdes = (col) => {
    const sorted = users
      .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
      .sort((a, b) => (a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1));
    setUsers([
      ...users.slice(0, (currentPage - 1) * rowsPerPage),
      ...sorted,
      ...users.slice(currentPage * rowsPerPage),
    ]);
  };

  const sortingascid = () => {
    const sorted = users
      .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
      .sort((a, b) => a.id - b.id);
    setUsers([
      ...users.slice(0, (currentPage - 1) * rowsPerPage),
      ...sorted,
      ...users.slice(currentPage * rowsPerPage),
    ]);
  };

  const sortingdesid = () => {
    const sorted = users
      .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
      .sort((a, b) => b.id - a.id);
    setUsers([
      ...users.slice(0, (currentPage - 1) * rowsPerPage),
      ...sorted,
      ...users.slice(currentPage * rowsPerPage),
    ]);
  };

  const sortingascdate = () => {
    const sorted = users
      .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
      .sort((a, b) => {
        const [dayA, monthA, yearA] = a.uploadDate.split("-").map(Number);
        const [dayB, monthB, yearB] = b.uploadDate.split("-").map(Number);
        return (
          new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB)
        );
      });
    setUsers([
      ...users.slice(0, (currentPage - 1) * rowsPerPage),
      ...sorted,
      ...users.slice(currentPage * rowsPerPage),
    ]);
  };

  const sortingdesdate = () => {
    const sorted = users
      .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
      .sort((a, b) => {
        const [dayA, monthA, yearA] = a.uploadDate.split("-").map(Number);
        const [dayB, monthB, yearB] = b.uploadDate.split("-").map(Number);
        return (
          new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA)
        );
      });
    setUsers([
      ...users.slice(0, (currentPage - 1) * rowsPerPage),
      ...sorted,
      ...users.slice(currentPage * rowsPerPage),
    ]);
  };

  return (
    <div style={{ height: "100%", overflowY: "scroll" }}>
      <div className="operation-line">
        <AddPatient  loadUsers={loadUsers}/>

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
                <FaArrowAltCircleLeft
                  onClick={sortingascid}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
                ID
                <FaArrowAltCircleRight
                  onClick={sortingdesid}
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                />
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                <FaArrowAltCircleLeft
                  onClick={() => sortingasc("name")}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
                Name
                <FaArrowAltCircleRight
                  onClick={() => sortingdes("name")}
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                />
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                <FaArrowAltCircleLeft
                  onClick={sortingascdate}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
                Upload Date
                <FaArrowAltCircleRight
                  onClick={sortingdesdate}
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                />
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Email
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Gender
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Date Of Birth
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
                  <TableCell align="center">{row.dateOfBirth}</TableCell>
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
