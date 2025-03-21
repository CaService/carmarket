import { useState, useEffect } from "react";
import { FileIcon } from "@radix-ui/react-icons";
import Papa from "papaparse";

const AdminCard = ({ onDataParsed }) => {
  const [files, setFiles] = useState([]);

  // Carica i dati dal localStorage all'avvio
  useEffect(() => {
    const savedData = localStorage.getItem("cardAuctionData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFiles(parsedData.files || []);
      onDataParsed(parsedData.vehicles || []);
    }
  }, []);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files).filter(
      (file) => file.type === "text/csv" || file.name.endsWith(".csv")
    );

    if (newFiles.length !== event.target.files.length) {
      alert("Only CSV files are allowed.");
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // Parse the CSV file
    newFiles.forEach((file) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          // Salva sia i file che i dati parsati nel localStorage
          const dataToSave = {
            files: [...files, { name: file.name }],
            vehicles: results.data,
          };
          localStorage.setItem("cardAuctionData", JSON.stringify(dataToSave));
          onDataParsed(results.data);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    });
  };

  return (
    <div className="max-w-2xl min-h-48 mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        File Upload
      </h2>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Pick a file</legend>
        <input
          type="file"
          className="file-input"
          onChange={handleFileChange}
          accept=".csv"
        />
        <label className="fieldset-label">Max size 2MB</label>
      </fieldset>
      <ul className="list-disc-none pl-5">
        {files.map((file, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700">
            <FileIcon className="w-4 h-4" />
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCard;
