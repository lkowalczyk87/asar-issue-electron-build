import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  request: (channel: string, data: any) => {
    // whitelist channels
    let validChannels = ["get-serial-port-list"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  //receive: (channel, func) => {
  response: (channel: string, func: (...arg0: any) => void) => {
    let validChannels = ["get-serial-port-list"];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});

export {};
