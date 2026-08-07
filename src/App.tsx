import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AssignmentOverview } from './components/AssignmentOverview';
import { EditorContainer } from './components/EditorContainer';
import { SubmissionPreviewModal } from './components/SubmissionPreviewModal';
import { VisualDiagramPanel } from './components/VisualDiagramPanel';
import { ConceptGuidePanel } from './components/ConceptGuidePanel';
import { PillarsRoadmap } from './components/PillarsRoadmap';
import { OutputConsole } from './components/OutputConsole';
import { Toast } from './components/Toast';

import { CURRICULUM_MODULES } from './data/curriculum';
import { ThemeMode, ViewMode, SavedSubmissionMeta, ToastMessage, ExecutionResult } from './types';
import { 
  saveLocalDraft, 
  loadLocalDraft, 
  saveSavedRollNumber, 
  loadSavedRollNumber, 
  saveSavedWorkspace, 
  loadSavedWorkspace, 
  saveSavedTheme, 
  loadSavedTheme 
} from './utils/storage';
import { 
  pickWorkspaceFolder, 
  scanWorkspaceSubmissions, 
  readSubmissionFile, 
  writeSubmissionFile 
} from './utils/fileSystem';
import { serializeSubmission, parseSubmission } from './utils/markdownParser';
import { runCodeSnippet } from './utils/codeRunner';

export const App: React.FC = () => {
  // Theme state
  const [theme, setTheme] = useState<ThemeMode>(() => loadSavedTheme());

  // Workspace & Roll Number state
  const [workspacePath, setWorkspacePath] = useState<string>(() => loadSavedWorkspace());
  const [rollNumber, setRollNumber] = useState<string>(() => loadSavedRollNumber());

  // Active View Mode (Code, Diagram, Guide, Roadmap)
  const [viewMode, setViewMode] = useState<ViewMode>('code');

  // Active Module state
  const [selectedModuleCode, setSelectedModuleCode] = useState<string>('M01');
  const activeModule = CURRICULUM_MODULES.find((m) => m.code === selectedModuleCode) || CURRICULUM_MODULES[0];

  // Code Panel states
  const [code, setCode] = useState<{ cpp: string; java: string; python: string }>({
    cpp: activeModule.starterCode.cpp,
    java: activeModule.starterCode.java,
    python: activeModule.starterCode.python,
  });

  // Code Execution Results
  const [executionResults, setExecutionResults] = useState<Record<'cpp' | 'java' | 'python', ExecutionResult | null>>({
    cpp: null,
    java: null,
    python: null,
  });

  // Task Checklist state
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});

  // Editor Visibility & Sidebar collapse
  const [visibility, setVisibility] = useState({ cpp: true, java: true, python: true });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Submissions list
  const [savedSubmissions, setSavedSubmissions] = useState<SavedSubmissionMeta[]>([]);

  // Preview Modal & Toast notifications
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Auto-save draft status
  const [autoSaveStatus, setAutoSaveStatus] = useState<{
    cpp: 'saved' | 'saving' | 'dirty';
    java: 'saved' | 'saving' | 'dirty';
    python: 'saved' | 'saving' | 'dirty';
  }>({ cpp: 'saved', java: 'saved', python: 'saved' });

  // Sync theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveSavedTheme(theme);
  }, [theme]);

  // Save roll number on change
  const handleRollNumberChange = (val: string) => {
    setRollNumber(val);
    saveSavedRollNumber(val);
  };

  // Toast helper
  const addToast = (type: 'success' | 'error' | 'info', title: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // Scan workspace for submissions
  const refreshWorkspaceSubmissions = useCallback(async () => {
    if (!workspacePath) {
      setSavedSubmissions([]);
      return;
    }
    const files = await scanWorkspaceSubmissions(workspacePath);
    setSavedSubmissions(files);
  }, [workspacePath]);

  useEffect(() => {
    refreshWorkspaceSubmissions();
  }, [workspacePath, refreshWorkspaceSubmissions]);

  // Load draft or template on module change
  const handleSelectModule = (moduleCode: string) => {
    setSelectedModuleCode(moduleCode);
    const mod = CURRICULUM_MODULES.find((m) => m.code === moduleCode) || CURRICULUM_MODULES[0];
    const draft = loadLocalDraft(moduleCode);

    if (draft) {
      setCode(draft);
      addToast('info', `Loaded local draft for ${moduleCode}`);
    } else {
      setCode({
        cpp: mod.starterCode.cpp,
        java: mod.starterCode.java,
        python: mod.starterCode.python,
      });
    }

    // Reset execution outputs
    setExecutionResults({ cpp: null, java: null, python: null });
  };

  // Handle Code Change with Auto-Save
  const handleCodeChange = (lang: 'cpp' | 'java' | 'python', newContent: string) => {
    setCode((prev) => {
      const nextCode = { ...prev, [lang]: newContent };
      saveLocalDraft(selectedModuleCode, nextCode);
      return nextCode;
    });

    setAutoSaveStatus((prev) => ({ ...prev, [lang]: 'dirty' }));
    setTimeout(() => {
      setAutoSaveStatus((prev) => ({ ...prev, [lang]: 'saved' }));
    }, 1200);
  };

  // Reset single language code panel
  const handleResetCode = (lang: 'cpp' | 'java' | 'python') => {
    setCode((prev) => ({
      ...prev,
      [lang]: activeModule.starterCode[lang],
    }));
    addToast('info', `Reset ${lang.toUpperCase()} starter code`);
  };

  // Run Code Execution Handler
  const handleRunCode = () => {
    const cppRes = runCodeSnippet('cpp', code.cpp, activeModule.expectedOutput.cpp);
    const javaRes = runCodeSnippet('java', code.java, activeModule.expectedOutput.java);
    const pyRes = runCodeSnippet('python', code.python, activeModule.expectedOutput.python);

    setExecutionResults({
      cpp: cppRes,
      java: javaRes,
      python: pyRes,
    });

    addToast('success', 'Executed C++, Java & Python code', 'Outputs displayed below in execution console.');
  };

  // Choose Workspace folder
  const handleChooseWorkspace = async () => {
    const chosen = await pickWorkspaceFolder();
    if (chosen) {
      setWorkspacePath(chosen);
      saveSavedWorkspace(chosen);
      addToast('success', 'Workspace folder set', chosen);
    }
  };

  // Reset assignment to fresh state
  const handleNewAssignment = () => {
    const mod = CURRICULUM_MODULES[0];
    setSelectedModuleCode(mod.code);
    setCode({
      cpp: mod.starterCode.cpp,
      java: mod.starterCode.java,
      python: mod.starterCode.python,
    });
    setExecutionResults({ cpp: null, java: null, python: null });
    addToast('info', 'Started Intro Module', `Loaded ${mod.title}`);
  };

  // Save Submission Handler
  const handleSaveSubmission = async () => {
    if (!rollNumber.trim()) {
      addToast('error', 'Roll Number Required', 'Please enter your roll number in the top header before saving.');
      return;
    }

    let currentWorkspace = workspacePath;
    if (!currentWorkspace) {
      currentWorkspace = await pickWorkspaceFolder() || '';
      if (!currentWorkspace) {
        addToast('error', 'Workspace Required', 'Please select a workspace folder to save your submission.');
        return;
      }
      setWorkspacePath(currentWorkspace);
      saveSavedWorkspace(currentWorkspace);
    }

    const filename = `${rollNumber.trim()}_${activeModule.code}.md`;
    const markdownContent = serializeSubmission(
      rollNumber,
      activeModule.code,
      activeModule.title,
      code
    );

    const res = await writeSubmissionFile(currentWorkspace, filename, markdownContent);

    if (res.success) {
      addToast('success', 'Submission Saved Successfully!', `File: ${filename}`);
      refreshWorkspaceSubmissions();
    } else {
      addToast('error', 'Save Failed', res.error || 'Failed to write file to disk.');
    }
  };

  // Load Saved Submission from Sidebar click
  const handleSelectSavedSubmission = async (submission: SavedSubmissionMeta) => {
    const content = await readSubmissionFile(submission.fullPath);
    if (!content) {
      addToast('error', 'File Read Error', `Unable to read ${submission.filename}`);
      return;
    }

    const parsed = parseSubmission(content);
    if (parsed.rollNumber) {
      handleRollNumberChange(parsed.rollNumber);
    }
    if (parsed.assignmentCode) {
      const matchMod = CURRICULUM_MODULES.find((m) => m.code === parsed.assignmentCode);
      if (matchMod) {
        setSelectedModuleCode(matchMod.code);
      }
    }
    setCode(parsed.code);
    addToast('success', 'Loaded Saved Submission', submission.filename);
  };

  // Calculate completion ratio
  const completedCount = ['cpp', 'java', 'python'].filter(
    (lang) => code[lang as 'cpp' | 'java' | 'python'].trim().length > 0
  ).length;

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSaveSubmission();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSaveSubmission, handleRunCode]);

  return (
    <div className="app-container">
      {/* Top Navigation Header */}
      <Header
        assignmentTitle={activeModule.title}
        assignmentCode={activeModule.code}
        rollNumber={rollNumber}
        onRollNumberChange={handleRollNumberChange}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        onSaveSubmission={handleSaveSubmission}
        onOpenPreview={() => setIsPreviewOpen(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onRunCode={handleRunCode}
      />

      {/* Main App Body */}
      <div className="main-body">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          workspacePath={workspacePath}
          onChooseWorkspace={handleChooseWorkspace}
          modules={CURRICULUM_MODULES}
          selectedModuleCode={selectedModuleCode}
          onSelectModule={handleSelectModule}
          savedSubmissions={savedSubmissions}
          onSelectSubmission={handleSelectSavedSubmission}
          onRefreshWorkspace={refreshWorkspaceSubmissions}
          onNewAssignment={handleNewAssignment}
          visibility={visibility}
          onToggleVisibility={(lang) =>
            setVisibility((prev) => ({ ...prev, [lang]: !prev[lang] }))
          }
        />

        {/* Dynamic View Content Area */}
        <main className="content-area">
          {viewMode === 'code' && (
            <>
              {/* Module Banner */}
              <div className="module-banner-card">
                <div className="banner-top-row">
                  <span className="banner-pillar-badge">{activeModule.pillar}</span>
                  <span className="banner-code">{activeModule.code}</span>
                </div>
                <h2 className="banner-title">{activeModule.title}</h2>
                <p className="banner-subtitle">{activeModule.subtitle}</p>
              </div>

              {/* Side-by-Side 3-Pane Code Editors */}
              <EditorContainer
                code={code}
                onCodeChange={handleCodeChange}
                onResetCode={handleResetCode}
                visibility={visibility}
                theme={theme}
                autoSaveStatus={autoSaveStatus}
              />

              {/* Live Execution Console Panel */}
              <OutputConsole results={executionResults} visibility={visibility} />
            </>
          )}

          {viewMode === 'diagram' && (
            <VisualDiagramPanel diagram={activeModule.diagram} />
          )}

          {viewMode === 'guide' && (
            <ConceptGuidePanel module={activeModule} />
          )}

          {viewMode === 'roadmap' && (
            <PillarsRoadmap
              modules={CURRICULUM_MODULES}
              selectedCode={selectedModuleCode}
              onSelectModule={(code) => {
                handleSelectModule(code);
                setViewMode('code');
              }}
            />
          )}
        </main>
      </div>

      {/* Submission Preview Modal */}
      <SubmissionPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        rollNumber={rollNumber}
        assignmentCode={activeModule.code}
        assignmentTitle={activeModule.title}
        code={code}
        onSaveAndExport={handleSaveSubmission}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((item) => item.id !== id))} />
    </div>
  );
};

export default App;
