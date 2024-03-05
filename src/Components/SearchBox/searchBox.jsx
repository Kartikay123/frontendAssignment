import React from "react";
import "./searchBox.css";
// import { FcSearch } from "react-icons/fc";

const FilterInput = ({ filterType, filterQuery, handleFilterChange, handleFilterTypeChange }) => {
  const handleClear = () => {
    // Clear both filter query and filter type
    handleFilterChange({ target: { value: "" } });
    handleFilterTypeChange(""); // Clear filter type directly
  };

  return (
    <div className="search-container">
      <select className="select-filter" value={filterType} onChange={(e) => handleFilterTypeChange(e.target.value)}>
        <option value="">Select Filter Type</option>
        <option value="name">Name</option>
        <option value="id">ID</option>
        <option value="email">Email</option>
        <option value="UploadDate">UploadDate</option>
        <option value="DicomStatus">DicomStatus</option>
      </select>
      <input
        className="filter-input"
        type="text"
        placeholder="Search..."
        value={filterQuery}
        onChange={handleFilterChange}
      />
      <button className="reset-button" onClick={handleClear}>Reset</button>
    </div>
  );
};

export default FilterInput;
