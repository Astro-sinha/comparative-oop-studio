export type ThemeMode = 'light' | 'dark';

export type ViewMode = 'code' | 'diagram' | 'guide' | 'roadmap';

export interface UmlAttribute {
  name: string;
  type: string;
  visibility: '+' | '-' | '#'; // + public, - private, # protected
}

export interface UmlMethod {
  name: string;
  parameters: string;
  returnType: string;
  visibility: '+' | '-' | '#';
  isAbstract?: boolean;
}

export interface UmlClassNode {
  id: string;
  name: string;
  stereotype?: 'class' | 'abstract' | 'interface';
  attributes: UmlAttribute[];
  methods: UmlMethod[];
}

export interface UmlRelationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: 'inheritance' | 'realization' | 'association' | 'composition' | 'aggregation';
  label?: string;
}

export interface UmlDiagramData {
  title: string;
  nodes: UmlClassNode[];
  relationships: UmlRelationship[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CurriculumModule {
  code: string;
  pillar: string; // e.g. "Basics", "Encapsulation", "Abstraction", "Inheritance", "Polymorphism", "Association", "Interfaces"
  title: string;
  subtitle: string;
  analogy: string;
  summary: string;
  keyTakeaways: string[];
  starterCode: {
    cpp: string;
    java: string;
    python: string;
  };
  expectedOutput: {
    cpp: string;
    java: string;
    python: string;
  };
  diagram: UmlDiagramData;
  quiz: QuizQuestion[];
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

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

export interface ExecutionResult {
  lang: 'cpp' | 'java' | 'python';
  stdout: string;
  stderr?: string;
  executionTimeMs: number;
  status: 'success' | 'error';
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
