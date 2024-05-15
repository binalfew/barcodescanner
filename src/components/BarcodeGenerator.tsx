import JsBarcode from "jsbarcode";
import React, { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";

const BarcodeGenerator: React.FC<{
  modalIsOpen: boolean;
  handleCloseModal: (barcodeDataURL: string) => void;
}> = ({ modalIsOpen, handleCloseModal }) => {
  const [input, setInput] = useState<string>("");
  const barcodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (barcodeRef.current && input.trim() !== "") {
      JsBarcode(barcodeRef.current, input, {
        format: "code128",
        displayValue: false,
      });
    }
  }, [input]);

  const getBarcodeDataURL = () => {
    if (barcodeRef.current) {
      const svgString = new XMLSerializer().serializeToString(
        barcodeRef.current
      );
      const encodedBarcode = `data:image/svg+xml;base64,${window.btoa(
        svgString
      )}`;
      return encodedBarcode;
    }
    return "";
  };

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={() => handleCloseModal(getBarcodeDataURL())}
      contentLabel="Barcode Generator"
      className="flex flex-col items-center justify-center p-4 bg-white rounded shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      appElement={document.getElementById("root") as HTMLElement}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Generator</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to generate barcode"
          style={{ display: "flex", width: "100%", padding: "0.5rem" }}
        />
        <svg ref={barcodeRef}></svg>
      </div>
      <button
        onClick={() => handleCloseModal(getBarcodeDataURL())}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Close
      </button>
    </ReactModal>
  );
};

export default BarcodeGenerator;
