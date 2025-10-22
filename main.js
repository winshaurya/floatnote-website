const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

// Detect dev vs production without relying on environment variables.
// If a built index.html exists in the `build` folder, assume production.
// Otherwise assume a development server (localhost:3000) should be used.
const buildIndex = path.join(__dirname, 'build', 'index.html');
const isDev = !fs.existsSync(buildIndex);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'public/assets/logo.ico'), // Assuming you have an icon
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  if (isDev) {
    // Development: expect a local dev server on port 3000
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
  } else {
    // Production: load the pre-built files from the build folder
    win.loadFile(path.join(__dirname, 'build', 'index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
