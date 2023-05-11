import { useState, useEffect } from "react";

interface Port {
  path?: string;
  manufacturer?: string;
  serialNumber?: string;
  pnpId?: string;
  locationId?: string;
  vendorId?: string;
  productId?: string;
}

function App() {
  const [devices, setDevices] = useState<Port[]>([]);

  useEffect(() => {
    (window as any).api.response("get-serial-port-list", (portList: Port[]) => {
      setDevices([...portList]);
    });

    console.log("[Renderer] get-serial-port-list");
    (window as any).api.request("get-serial-port-list");
  }, []);

  return (
    <div>
      <h1>Serialport list</h1>
      {devices.map((device, index) => {
        return (
          <section key={`${device.serialNumber}-${index}`}>
            <span>
              <b>manufacturer:</b> {device.manufacturer}{" "}
            </span>
            <span>
              <b>serialNumber:</b> {device.serialNumber}{" "}
            </span>
            <span>
              <b>productId:</b> {device.productId}
            </span>
          </section>
        );
      })}
    </div>
  );
}

export default App;
