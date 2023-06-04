import React from "react";

/**
 * Search component to display a search bar.
 *
 * @param {string} searchTerm - The current search term.
 * @param {function} setSearchTerm - The function to update the search term.
 */
function Search({ searchTerm, setSearchTerm }) {
  /**
   * Handles the change event of the search input.
   * Updates the search term with the entered value.
   *
   * @param {object} e - The event object.
   */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          width: "50%",
          height: 40,
          padding: "10px",
          borderRadius: 20,
          border: "1px solid #ccc",
          fontSize: 14,
          outline: "none",
          marginTop: "20px",
        }}
      />
    </div>
  );
}

export default Search;
