import React, { useState } from "react";
import "./App.css";
import BarcodeGenerator from "./components/BarcodeGenerator";
import BarcodeScanner from "./components/BarcodeScanner";

const App: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [isGeneratorChecked, setIsGeneratorChecked] = useState<boolean>(false);

  const handleScan = (data: string) => {
    setScanResult(data);
  };

  const handleOpenScanner = () => {
    setIsScannerOpen(true);
  };

  const handleCloseScanner = () => {
    setIsScannerOpen(false);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsGeneratorChecked(event.target.checked);
  };

  return (
    <div className="App">
      <h1>Barcode Scanner and Generator</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          type="text"
          value={scanResult || ""}
          readOnly
          placeholder="Scanned result will appear here"
          style={{ width: "100%" }}
        />
        <button onClick={handleOpenScanner}>Scan</button>
        {isScannerOpen && (
          <BarcodeScanner onScan={handleScan} onClose={handleCloseScanner} />
        )}
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isGeneratorChecked}
            onChange={handleCheckboxChange}
          />
          Show Barcode Generator
        </label>
        {isGeneratorChecked && <BarcodeGenerator />}
      </div>
    </div>
  );
};

export default App;
