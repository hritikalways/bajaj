export default function InputForm({ jsonInput, setJsonInput, onSubmit }) {
  return (
    <div className="mb-5">
      <label className="block mb-2 text-lg font-medium">API Input</label>
      <textarea
        className="w-full p-2 border rounded text-black"
        rows="4"
        placeholder='Enter JSON like 
        { "data": ["A", "1", "z"] } or 
        {
            "data": [“M”,”1”,”334”,”4”,”B”,”Z”,”a”,
            ”7”],
            “file_b64”:”BASE_64_STRING”
        }
        '
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button
        className="mt-3 bg-blue-600 text-white py-2 px-4 rounded"
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
}
