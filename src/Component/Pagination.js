import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

/**
 * CustomPagination component to display pagination.
 *
 * @param {number} usersPerPage - The number of users to display per page.
 * @param {number} totalUsers - The total number of users.
 * @param {function} paginate - The function to handle page changes.
 * @param {number} currentPage - The current active page.
 */
const CustomPagination = ({
  usersPerPage,
  totalUsers,
  paginate,
  currentPage,
}) => {
  // Calculate the total number of pages
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  /**
   * Handles the page change event.
   * Calls the `paginate` function with the selected page.
   *
   * @param {object} event - The event object.
   * @param {number} value - The selected page value.
   */
  const handleChange = (event, value) => {
    paginate(value);
  };

  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        showFirstButton
        showLastButton
        size="large"
      />
    </Stack>
  );
};

export default CustomPagination;
