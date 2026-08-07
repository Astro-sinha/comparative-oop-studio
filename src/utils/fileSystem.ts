import { SavedSubmissionMeta } from '../types';

export const isElectron = typeof window !== 'undefined' && Boolean(window.electronAPI);

export async function pickWorkspaceFolder(): Promise<string | null> {
  if (isElectron && window.electronAPI) {
    return await window.electronAPI.openFolder();
  }
  // Web fallback: prompt for workspace path / name
  const input = prompt('Enter absolute workspace folder path (e.g. /Users/student/OOP_Assignments):', '/Users/student/OOP_Assignments');
  return input && input.trim() ? input.trim() : null;
}

export async function scanWorkspaceSubmissions(folderPath: string): Promise<SavedSubmissionMeta[]> {
  if (!folderPath) return [];

  if (isElectron && window.electronAPI) {
    return await window.electronAPI.scanWorkspace(folderPath);
  }

  // Web fallback simulation / localStorage stored submissions index
  try {
    const raw = localStorage.getItem(`web_fs_index_${folderPath}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error(e);
  }
  return [];
}

export async function readSubmissionFile(filePath: string): Promise<string | null> {
  if (!filePath) return null;

  if (isElectron && window.electronAPI) {
    return await window.electronAPI.readFile(filePath);
  }

  // Web fallback
  try {
    const key = `web_fs_file_${filePath}`;
    return localStorage.getItem(key) || null;
  } catch (e) {
    return null;
  }
}

export async function writeSubmissionFile(
  folderPath: string,
  filename: string,
  content: string
): Promise<{ success: boolean; fullPath?: string; modifiedTime?: number; error?: string }> {
  if (isElectron && window.electronAPI) {
    return await window.electronAPI.saveSubmission(folderPath, filename, content);
  }

  // Web fallback
  try {
    const fullPath = `${folderPath}/${filename}`;
    const modifiedTime = Date.now();
    localStorage.setItem(`web_fs_file_${fullPath}`, content);

    // Update web FS index
    const indexKey = `web_fs_index_${folderPath}`;
    const rawIndex = localStorage.getItem(indexKey);
    let index: SavedSubmissionMeta[] = rawIndex ? JSON.parse(rawIndex) : [];
    index = index.filter(item => item.filename !== filename);
    index.unshift({ filename, fullPath, modifiedTime });
    localStorage.setItem(indexKey, JSON.stringify(index));

    return { success: true, fullPath, modifiedTime };
  } catch (err: any) {
    return { success: false, error: err.message || 'Storage error' };
  }
}
