// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

console.log("✅ PRELOAD RUNNING");

contextBridge.exposeInMainWorld("electronAPI", {
  fetchData: (token: string) => {
    console.log("✅ PRELOAD INVOKED");
    return ipcRenderer.invoke("fetch-data", token);
  },
  printPDF: (url: string) => ipcRenderer.send("print-pdf", url),
});