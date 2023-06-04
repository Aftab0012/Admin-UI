import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditOffRoundedIcon from "@mui/icons-material/EditOffRounded";
import SaveIcon from "@mui/icons-material/Save";
import "./Table.css";

/**
 * Displays a table with data for each user, including the option to edit and delete each user.
 * @param {Object} props - Component properties.
 * @param {Array} props.data - Array of user objects to display in the table.
 * @param {number} props.edit - The ID of the user that is currently being edited.
 * @param {function} props.setEdit - Function to set the ID of the user that is being edited.
 * @param {function} props.deleteData - Function to delete a user from the table.
 * @param {function} props.saved - Function to save changes made to a user's information.
 * @param {function} props.handleSelectAll - Function to handle select all checkbox event.
 * @param {function} props.handleCheckboxChange - Function to handle individual checkbox change event.
 * @param {function} props.deleteSelectedCheckBox - Function to delete selected checkboxes.
 */

function TableData(props) {
  const [selectedRows, setSelectedRows] = useState([]);

  // Handles the select all checkbox event
  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setSelectedRows(checked ? props.data.map((details) => details.id) : []);
    props.setEdit(null);
    props.handleSelectAll(checked);
  };

  // Handles individual checkbox change event
  const handleCheckboxChange = (event, id) => {
    const checked = event.target.checked;
    const updatedSelectedRows = checked
      ? [...selectedRows, id]
      : selectedRows.filter((rowId) => rowId !== id);
    setSelectedRows(updatedSelectedRows);
    props.setEdit(null);
    props.handleCheckboxChange(id, checked);
  };

  // Handles the delete button click event
  const handleDelete = () => {
    props.deleteSelectedCheckBox(selectedRows);
  };

  return (
    <div>
      <table className="table">
        <tbody>
          <tr className="tableHeader" style={{ fontWeight: 500 }}>
            <td>
              <input
                type="checkbox"
                checked={selectedRows.length === props.data.length}
                onChange={handleSelectAll}
              />
            </td>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>

          {/* Iterates over the data array and adds the rows with desired data */}
          {props.data.map((details) => {
            const { id, name, email, role } = details;
            const isSelected = selectedRows.includes(id);
            const rowClassName = isSelected ? "selectedRow" : "";

            return (
              <tr key={id} className={rowClassName} id={`row-${id}`}>
                <td className="tableBody">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => handleCheckboxChange(e, id)}
                  />
                </td>

                {/* Conditionally renders an input field or the user's name, depending on whether the user is being edited */}
                <td className="tableBody">
                  {props.edit === id ? (
                    <input
                      className="inputFieldCss"
                      id={`name${id}`}
                      defaultValue={name}
                      type="text"
                    />
                  ) : (
                    name
                  )}
                </td>

                {/* Conditionally renders an input field or the user's email, depending on whether the user is being edited */}
                <td className="tableBody">
                  {props.edit === id ? (
                    <input
                      className="inputFieldCss"
                      id={`email${id}`}
                      defaultValue={email}
                      type="text"
                    />
                  ) : (
                    email
                  )}
                </td>

                {/* Conditionally renders an input field or the user's role, depending on whether the user is being edited */}
                <td className="tableBody">
                  {props.edit === id ? (
                    <input
                      className="inputFieldCss"
                      id={`role${id}`}
                      defaultValue={role}
                      type="text"
                    />
                  ) : (
                    role
                  )}
                </td>

                {/* Conditionally renders an "Edit" button or a "Save" button, depending on whether the user is being edited */}
                <td className="tableBody">
                  {props.edit === id ? (
                    <IconButton
                      key={props.id}
                      style={{ padding: 20 }}
                      aria-label="edit"
                      onClick={() =>
                        props.saved(
                          id,
                          document.querySelector(`#name${id}`).value,
                          document.querySelector(`#email${id}`).value,
                          document.querySelector(`#role${id}`).value
                        )
                      }
                    >
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      key={id}
                      style={{ padding: 20 }}
                      aria-label="edit"
                      onClick={() => props.setEdit(id)}
                    >
                      <EditOffRoundedIcon />
                    </IconButton>
                  )}
                </td>

                {/* Button in this column triggers delete function to remove row from the list */}
                <td className="tableBody">
                  <IconButton
                    style={{ padding: 20 }}
                    aria-label="delete"
                    onClick={() => props.deleteData(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Delete button for deleting selected rows */}
      <IconButton
        style={{
          padding: 8,
          backgroundColor: "#ff0000",
          color: "#ffffff",
          borderRadius: 5,
          marginBottom: 15,
          marginTop: 15,
        }}
        aria-label="delete"
        onClick={handleDelete}
        disabled={selectedRows.length === 0} // Update the disabled prop based on selectedRows length
      >
        <DeleteIcon />
        <span style={{ marginLeft: 5, fontWeight: "bold", fontSize: 12 }}>
          Delete Selected
        </span>
      </IconButton>
    </div>
  );
}

export default TableData;
