import { contextBridge, ipcRenderer } from 'electron';

export interface ElectronAPI {
  openFolder: () => Promise<string | null>;
  openFile: () => Promise<string | null>;
  scanWorkspace: (folderPath: string) => Promise<Array<{ filename: string; fullPath: string; modifiedTime: number }>>;
  readFile: (filePath: string) => Promise<string | null>;
  saveSubmission: (folderPath: string, filename: string, content: string) => Promise<{ success: boolean; fullPath?: string; modifiedTime?: number; error?: string }>;
}

const electronAPI: ElectronAPI = {
  openFolder: () => ipcRenderer.invoke('dialog:openFolder'),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  scanWorkspace: (folderPath) => ipcRenderer.invoke('fs:scanWorkspace', folderPath),
  readFile: (filePath) => ipcRenderer.invoke('fs:readFile', filePath),
  saveSubmission: (folderPath, filename, content) => ipcRenderer.invoke('fs:saveSubmission', folderPath, filename, content),
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
