// Importing necessary dependencies and styles
import React, { useState } from "react";
import ProductCard from "./ProductsCard";
import { ProductData } from "../../data.js";
import "./Products.css";

// Products component to display and filter product data
export default function Products() {
  // Extracting unique categories from the product data
  const uniqueCategories = [
    ...new Set(ProductData.map((product) => product.category)),
  ];

  // States to keep track of selected categories and search input
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Function to handle checkbox change for category filtering
  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      // Category is already selected, remove it
      setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
    } else {
      // Category is not selected, add it
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Rendering the Products component
  return (
    <>
      <div className="search">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="products-container">
        <div className="filter-section">
          <h3>Filter </h3>
          <label>
            {/* Checkbox for each unique category */}
            {uniqueCategories.map((category) => (
              <div key={category} className="category">
                <div>{category}</div>
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCheckboxChange(category)}
                />
              </div>
            ))}
          </label>
        </div>
        <div className="products-list">
          {/* Mapping through filtered products and rendering ProductCard component */}
          {ProductData.filter(
            (product) =>
              // Filter products based on selected categories and search input
              (selectedCategories.length === 0 ||
                selectedCategories.includes(product.category)) &&
              product.name.toLowerCase().includes(searchInput.toLowerCase())
          ).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
