import { Scanner, useDeviceList } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";

interface Device {
  deviceId: string;
  label: string;
}

interface BarcodeScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onClose }) => {
  const state = useDeviceList();
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");

  useEffect(() => {
    const getDevices = async () => {
      const videoDevices = state
        .filter((device) => device.kind === "videoinput")
        .map((device) => ({
          deviceId: device.deviceId,
          label: device.label || `Camera ${device.deviceId}`,
        }));

      setDevices(videoDevices);

      if (videoDevices.length > 0) {
        setSelectedDevice(videoDevices[0].deviceId);
      }
    };

    getDevices();
  }, [state]);

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(event.target.value);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg">
      <select
        onChange={handleDeviceChange}
        value={selectedDevice}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>

      <div className="relative w-full overflow-hidden border-2 border-red-500 mb-4">
        <Scanner
          onResult={(text, result) => {
            console.log(text, result);
            onScan(text);
          }}
          onError={(error) => console.log(error?.message)}
          options={{
            deviceId: selectedDevice,
            constraints: {
              facingMode: "environment",
            },
          }}
          styles={{
            container: { width: "100%", margin: "auto" },
            video: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }}
          components={{
            tracker: true,
            audio: true,
            torch: true,
            count: true,
            onOff: true,
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full border-1 border-red-500 pointer-events-none"></div>
      </div>

      <button
        onClick={onClose}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Close Scanner
      </button>
    </div>
  );
};

export default BarcodeScanner;
