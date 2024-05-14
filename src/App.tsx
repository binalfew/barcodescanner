import { Scanner, useDeviceList } from "@yudiel/react-qr-scanner";

import { useEffect, useState } from "react";
import "./App.css";

interface Device {
  deviceId: string;
  label: string;
}

function App() {
  const state = useDeviceList();
  const [data, setData] = useState<string>("");
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
    <div>
      <h1>React QR Scanner</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a QR code"
          value={data}
          onChange={() => {}}
        />
      </div>

      <div>
        <select onChange={handleDeviceChange} value={selectedDevice}>
          {devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label}
            </option>
          ))}
        </select>
      </div>
      <Scanner
        onResult={(text, result) => {
          console.log(text, result);
          setData(text);
        }}
        onError={(error) => console.log(error?.message)}
        options={{
          deviceId: selectedDevice,
          constraints: {
            width: { min: 640 },
            height: { min: 480 },
            facingMode: "environment",
          },
        }}
        styles={{
          container: { width: 400, margin: "auto" },
        }}
        components={{
          tracker: true,
          audio: true,
          torch: true,
          count: true,
          onOff: true,
        }}
      />
    </div>
  );
}

export default App;
