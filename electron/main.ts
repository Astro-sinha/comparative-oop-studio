import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    titleBarStyle: 'hiddenInset', // Native look on macOS
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    show: true, // Open window immediately
  });

  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

  if (isDev) {
    const devUrl = 'http://localhost:5173';
    mainWindow.loadURL(devUrl).catch((err) => {
      console.log('Retrying URL load...', err);
      setTimeout(() => {
        mainWindow?.loadURL(devUrl);
      }, 1500);
    });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Handle load failure gracefully
  mainWindow.webContents.on('did-fail-load', () => {
    if (isDev) {
      setTimeout(() => {
        mainWindow?.loadURL('http://localhost:5173');
      }, 1000);
    }
  });

  mainWindow.focus();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC Handlers
ipcMain.handle('dialog:openFolder', async () => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory', 'createDirectory'],
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  return result.filePaths[0];
});

ipcMain.handle('dialog:openFile', async () => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Markdown Submissions', extensions: ['md'] }],
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  return result.filePaths[0];
});

ipcMain.handle('fs:scanWorkspace', async (_event, folderPath: string) => {
  try {
    if (!folderPath || !fs.existsSync(folderPath)) return [];
    const files = fs.readdirSync(folderPath);
    const mdFiles = files.filter(f => f.toLowerCase().endsWith('.md'));
    
    return mdFiles.map(filename => {
      const fullPath = path.join(folderPath, filename);
      const stat = fs.statSync(fullPath);
      return {
        filename,
        fullPath,
        modifiedTime: stat.mtimeMs,
      };
    }).sort((a, b) => b.modifiedTime - a.modifiedTime);
  } catch (err) {
    console.error('Error scanning workspace:', err);
    return [];
  }
});

ipcMain.handle('fs:readFile', async (_event, filePath: string) => {
  try {
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    console.error('Error reading file:', err);
    return null;
  }
});

ipcMain.handle('fs:saveSubmission', async (_event, folderPath: string, filename: string, content: string) => {
  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    const fullPath = path.join(folderPath, filename);
    fs.writeFileSync(fullPath, content, 'utf-8');
    const stat = fs.statSync(fullPath);
    return { success: true, fullPath, modifiedTime: stat.mtimeMs };
  } catch (err: any) {
    console.error('Error saving submission:', err);
    return { success: false, error: err.message || String(err) };
  }
});
