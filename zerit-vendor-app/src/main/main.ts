import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { registerPrintHandler } from './ipc/printHandler';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  console.log(path.join(__dirname, 'preload.js'))
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};


console.log("MAIN PROCESS STARTED");

ipcMain.handle("fetch-data", async (_, token) => {
  console.log("✅ IPC HANDLER CALLED", token);
  return await fetchFromBackend(token);
});


ipcMain.on("print-pdf", (_, url: string) => {
  printPDF(url);
});

async function fetchFromBackend(token: string) {
  const response = await fetch(`http://localhost:8000/api/fetch-order/${token}`);
  return response.json();
}


function printPDF(url: string) {
  const printWindow = new BrowserWindow({
    show: false, // keep visible for debugging
    webPreferences: { plugins: true }
  });

  printWindow.loadURL(url);

  printWindow.webContents.on("did-finish-load", async () => {
    console.log("PDF loaded");

    const printers = await printWindow.webContents.getPrintersAsync();

    setTimeout(() => {
      console.log("Triggering print");

      printWindow.webContents.print({
        silent: true,
        printBackground: true,
      }, (success, failureReason) => {
        if (!success) console.log(failureReason)
        printWindow.destroy() // Clean up

      });
    }, 1500);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(()=>{
  createWindow(),
  registerPrintHandler();
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
