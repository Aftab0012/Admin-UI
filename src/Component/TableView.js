import * as React from "react";
import "./Table.css";
import { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./UserList";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

/**
 * Displays a table of users with the ability to edit and delete users.
 */
export default function Table() {
  // State variables to store userData and search-related data
  const [data, setData] = useState([]); // Array of userData fetched
  const [edit, setEdit] = useState(null); // User currently being edited
  const [searchTerm, setSearchTerm] = useState(""); // Search term entered by the user
  const [searchData, setSearchData] = useState([]); // Filtered search results
  const [currentPage, setCurrentPage] = useState(1); // Current page number for pagination
  const usersPerPage = 10; // Number of users to display per page

  /**
   * Fetches userData from the provided link.
   */
  const getData = async () => {
    try {
      const response = await axios.get(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
      const data = response.data;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch userData only once when the component mounts
  useEffect(() => {
    getData();
  }, []);

  // Perform search whenever the search term changes
  useEffect(() => {
    performSearch(searchTerm);
  }, [searchTerm]);

  /**
   * Performs a search on userData based on the search term.
   * @param {string} searchTerm - The term entered by the user for searching.
   */
  const performSearch = (searchTerm) => {
    if (searchTerm.length === 0) {
      setSearchData([]);
      return;
    }

    const searchPattern = new RegExp(searchTerm, "i");

    const filteredData = data.filter((user) => {
      return (
        user.name.search(searchPattern) !== -1 ||
        user.email.search(searchPattern) !== -1 ||
        user.role.search(searchPattern) !== -1
      );
    });

    setSearchData(filteredData);
    console.log(filteredData);
  };

  /**
   * Saves the updated content for a user.
   * @param {number} id - The ID of the user being edited.
   * @param {string} updatedName - The updated name for the user.
   * @param {string} updatedEmail - The updated email for the user.
   * @param {string} updatedRole - The updated role for the user.
   */
  const saveContent = (id, updatedName, updatedEmail, updatedRole) => {
    // Find the user with the specified id in the data array
    const userIndex = data.findIndex((user) => user.id === id);

    // If the user is found
    if (userIndex !== -1) {
      // Create a new user object with the updated information
      const updatedUser = {
        ...data[userIndex],
        name: updatedName,
        email: updatedEmail,
        role: updatedRole,
      };

      // Create a new data array with the updated user object
      const newData = [...data];
      newData[userIndex] = updatedUser;

      // Update the data state with the new data array
      setData(newData);

      // Clear the edit state, indicating that no user is being edited
      setEdit(null);
      console.log("saved");
    }
  };

  /**
   * Deletes a user from the table.
   * @param {number} id - The ID of the user to be deleted.
   */
  const deleteData = (id) => {
    const newData = data.filter((data) => data.id !== id);
    setData(newData);
  };

  /**
   * Handles the select all checkbox event.
   * @param {boolean} checked - Indicates whether the select all checkbox is checked.
   */
  const handleSelectAll = (checked) => {
    const updatedData = data.map((item) => {
      return { ...item, selected: checked };
    });
    setData(updatedData);
  };

  /**
   * Handles the individual checkbox change event.
   * @param {number} id - The ID of the user associated with the checkbox.
   * @param {boolean} checked - Indicates whether the checkbox is checked.
   */
  const handleCheckboxChange = (id, checked) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, selected: checked };
      }
      return item;
    });
    setData(updatedData);
  };

  /**
   * Deletes the selected checkboxes from the table.
   * @param {number[]} selectedIds - An array of IDs of the selected checkboxes.
   */
  const deleteSelectedCheckBox = (selectedIds) => {
    const updatedData = data.filter((item) => !selectedIds.includes(item.id));
    setData(updatedData);
  };

  /**
   * Handles pagination by setting the current page number.
   * @param {number} pageNumber - The selected page number.
   */
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers =
    searchTerm.length === 0
      ? data.slice(indexOfFirstUser, indexOfLastUser)
      : searchData.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* Search bar component */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* UserList component */}
        <UserList
          data={searchTerm.length === 0 ? currentUsers : searchData}
          edit={edit}
          setEdit={setEdit}
          saved={saveContent}
          deleteData={(id) => deleteData(id)}
          handleSelectAll={handleSelectAll}
          handleCheckboxChange={handleCheckboxChange}
          deleteSelectedCheckBox={deleteSelectedCheckBox}
        />
      </div>

      {/* Pagination component */}
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={searchTerm.length === 0 ? data.length : searchData.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
