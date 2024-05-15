import { useState } from "react";
import BarcodeScanner from "../components/BarcodeScanner";

export default function IndexRoute() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  // const [setModalIsOpen] = useState<boolean>(false);
  // const [barcodeDataURL, setBarcodeDataURL] = useState<string | null>(null);

  const handleScan = (data: string) => {
    setScanResult(data);
  };

  const handleOpenScanner = () => {
    setIsScannerOpen(true);
  };

  const handleCloseScanner = () => {
    setIsScannerOpen(false);
  };

  // const handleOpenModal = () => {
  //   setModalIsOpen(true);
  // };

  // const handleCloseModal = (barcodeDataURL: string) => {
  //   setModalIsOpen(false);
  //   setBarcodeDataURL(barcodeDataURL);
  // };

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">Scanner</div>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex w-full mb-4 space-x-2">
          <input
            type="text"
            value={scanResult || ""}
            readOnly
            placeholder="Scanned result will appear here"
            className="flex-1 p-2 border border-orange-300 rounded"
          />
          <button
            onClick={handleOpenScanner}
            className="px-4 py-2 bg-orange-500 text-white rounded"
          >
            Scan
          </button>
          {/* <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Generate
          </button> */}
        </div>

        {/* {barcodeDataURL && (
          <div className="mt-4">
            <img src={barcodeDataURL} alt="Generated Barcode" />
          </div>
        )} */}

        {isScannerOpen && (
          <BarcodeScanner onScan={handleScan} onClose={handleCloseScanner} />
        )}

        {/* <BarcodeGenerator
          modalIsOpen={modalIsOpen}
          handleCloseModal={handleCloseModal}
        /> */}
      </div>
    </div>
  );
}
