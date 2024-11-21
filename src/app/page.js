"use client";

import { useState } from "react";
import axios from "axios";
import InputForm from "./components/InputForm";
import MultiFilterDropdown from "./components/MultiFilterDropdown";
import FilteredResponse from "./components/FilteredResponse";

export default function Home() {
  const [jsonInput, setJsonInput] = useState(""); // JSON input
  const [responseData, setResponseData] = useState([]); // API response
  const [filter, setFilter] = useState([]); // Selected filters
  const [filteredData, setFilteredData] = useState([]); // Filtered response

  const handleSubmit = async () => {
  try {
    const payload = JSON.parse(jsonInput); // Validate JSON
    const response = await axios.post("http://localhost:3001/api/bhfl", payload);

    console.log("API Response:", response.data);

    // Extract relevant fields from the response
    const { numbers, alphabets, highest_lowercase_alphabet } = response.data;

    // Combine the data into one array for filtering
    const combinedData = [
      ...numbers,
      ...alphabets,
      ...(highest_lowercase_alphabet ? [highest_lowercase_alphabet] : []),
    ];

    console.log("Combined Data for Filtering:", combinedData);

    setResponseData(combinedData); // Store combined data
    setFilteredData(combinedData); // Initialize with full data
  } catch (error) {
    console.error("Invalid JSON or API Error:", error.message);
  }
};


  const handleFilterChange = (selectedOptions) => {
  setFilter(selectedOptions);

  const filters = selectedOptions.map((option) => option.value);

  const filtered = responseData.filter((item) => {
    if (filters.includes("alphabets") && /^[A-Za-z]+$/.test(item)) return true;
    if (filters.includes("numbers") && /^[0-9]+$/.test(item)) return true;
    if (filters.includes("highest-lowercase")) {
      const lowercaseAlphabets = responseData.filter((i) => /^[a-z]+$/.test(i));
      return item === Math.max(...lowercaseAlphabets);
    }
    return false;
  });

  setFilteredData(filtered);
};


  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">JSON Filter App</h1>
      <InputForm jsonInput={jsonInput} setJsonInput={setJsonInput} onSubmit={handleSubmit} />
      {console.log(responseData.length)}
      {responseData.length > 0 && (
        <>
        {console.log("Hello World")}
          <MultiFilterDropdown filter={filter} onChange={handleFilterChange} />
          <FilteredResponse data={filteredData} />
        </>
      )}
    </div>
  );
}
