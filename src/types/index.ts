export interface AssignmentTemplate {
  code: string; // e.g. "A01", "A02", "A03", "A04"
  title: string;
  subtitle: string;
  learningObjectives: string[];
  instructions: string[];
  submissionChecklist: string[];
  starterCode: {
    cpp: string;
    java: string;
    python: string;
  };
}

export interface SavedSubmissionMeta {
  filename: string;
  fullPath: string;
  modifiedTime: number;
  rollNumber?: string;
  assignmentCode?: string;
}

export interface ParsedSubmission {
  rollNumber: string;
  assignmentCode: string;
  assignmentTitle?: string;
  savedAt?: string;
  code: {
    cpp: string;
    java: string;
    python: string;
  };
}

export type ThemeMode = 'light' | 'dark';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

declare global {
  interface Window {
    electronAPI?: {
      openFolder: () => Promise<string | null>;
      openFile: () => Promise<string | null>;
      scanWorkspace: (folderPath: string) => Promise<Array<{ filename: string; fullPath: string; modifiedTime: number }>>;
      readFile: (filePath: string) => Promise<string | null>;
      saveSubmission: (folderPath: string, filename: string, content: string) => Promise<{ success: boolean; fullPath?: string; modifiedTime?: number; error?: string }>;
    };
  }
}
