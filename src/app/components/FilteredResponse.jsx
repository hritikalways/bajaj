const FilteredResponse = ({ data }) => {
  return (
    <div className="mt-5">
      <h3 className="text-xl font-semibold mb-3">Filtered Response</h3>
      {data.length > 0 ? (
        <ul className="list-disc ml-5">
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
};

export default FilteredResponse;
