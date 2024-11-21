const MultiFilterDropdown = ({ filter, onChange }) => {
  const options = [
    { label: "Alphabets", value: "alphabets" },
    { label: "Numbers", value: "numbers" },
    { label: "Highest Lowercase Alphabet", value: "highest-lowercase" },
  ];

  const handleSelection = (e) => {
    // Get selected options
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => ({
      label: option.label,
      value: option.value,
    }));

    // Pass selected options to the parent
    onChange(selectedOptions);
  };

  return (
    <div className="mb-5">
      <label className="block mb-2 font-semibold">Multi Filter</label>
      <select
        multiple
        value={filter.map((f) => f.value)} // Map selected filters to values
        onChange={handleSelection} // Handle change
        className="border px-3 py-2 rounded w-full text-black"

      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="border-2 border-solid border-violet-400 mb-2 p-1">
            {option.label}
          </option>
        ))}
      </select>
      <p className="text-sm text-gray-500 mt-2">
        Hold <kbd>Ctrl</kbd> (or <kbd>Cmd</kbd> on Mac) to select multiple filters.
      </p>
    </div>
  );
};

export default MultiFilterDropdown;
