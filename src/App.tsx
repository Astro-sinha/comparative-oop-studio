import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AssignmentOverview } from './components/AssignmentOverview';
import { EditorContainer } from './components/EditorContainer';
import { SubmissionPreviewModal } from './components/SubmissionPreviewModal';
import { Toast } from './components/Toast';

import { ASSIGNMENT_TEMPLATES } from './data/templates';
import { ThemeMode, SavedSubmissionMeta, ToastMessage } from './types';
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

export const App: React.FC = () => {
  // Theme state
  const [theme, setTheme] = useState<ThemeMode>(() => loadSavedTheme());

  // Workspace & Roll Number state
  const [workspacePath, setWorkspacePath] = useState<string>(() => loadSavedWorkspace());
  const [rollNumber, setRollNumber] = useState<string>(() => loadSavedRollNumber());

  // Active Assignment state
  const [selectedTemplateCode, setSelectedTemplateCode] = useState<string>('A01');
  const activeTemplate = ASSIGNMENT_TEMPLATES.find((t) => t.code === selectedTemplateCode) || ASSIGNMENT_TEMPLATES[0];

  // Code Panel states
  const [code, setCode] = useState<{ cpp: string; java: string; python: string }>({
    cpp: activeTemplate.starterCode.cpp,
    java: activeTemplate.starterCode.java,
    python: activeTemplate.starterCode.python,
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

  // Sync theme attribute to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveSavedTheme(theme);
  }, [theme]);

  // Save roll number on change
  const handleRollNumberChange = (val: string) => {
    setRollNumber(val);
    saveSavedRollNumber(val);
  };

  // Toast notification helper
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

  // Load draft or template on assignment change
  const handleSelectTemplate = (templateCode: string) => {
    setSelectedTemplateCode(templateCode);
    const tpl = ASSIGNMENT_TEMPLATES.find((t) => t.code === templateCode) || ASSIGNMENT_TEMPLATES[0];
    const draft = loadLocalDraft(templateCode);

    if (draft) {
      setCode(draft);
      addToast('info', `Loaded local draft for ${templateCode}`);
    } else {
      setCode({
        cpp: tpl.starterCode.cpp,
        java: tpl.starterCode.java,
        python: tpl.starterCode.python,
      });
    }
  };

  // Handle Code Change with Auto-Save draft debounce
  const handleCodeChange = (lang: 'cpp' | 'java' | 'python', newContent: string) => {
    setCode((prev) => {
      const nextCode = { ...prev, [lang]: newContent };
      // Save local draft
      saveLocalDraft(selectedTemplateCode, nextCode);
      return nextCode;
    });

    setAutoSaveStatus((prev) => ({ ...prev, [lang]: 'dirty' }));
    
    // Simulate auto-save completion indicator
    setTimeout(() => {
      setAutoSaveStatus((prev) => ({ ...prev, [lang]: 'saved' }));
    }, 1200);
  };

  // Reset single language code panel
  const handleResetCode = (lang: 'cpp' | 'java' | 'python') => {
    setCode((prev) => ({
      ...prev,
      [lang]: activeTemplate.starterCode[lang],
    }));
    addToast('info', `Reset ${lang.toUpperCase()} starter code`);
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
    const tpl = ASSIGNMENT_TEMPLATES[0];
    setSelectedTemplateCode(tpl.code);
    setCode({
      cpp: tpl.starterCode.cpp,
      java: tpl.starterCode.java,
      python: tpl.starterCode.python,
    });
    addToast('info', 'Started new assignment', `Loaded ${tpl.title}`);
  };

  // Save Submission Handler
  const handleSaveSubmission = async () => {
    // 1. Validation checks
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

    if (!code.cpp.trim() || !code.java.trim() || !code.python.trim()) {
      addToast('error', 'Incomplete Code Panels', 'All three code panels (C++, Java, Python) must contain code solutions before submitting.');
      return;
    }

    // 2. Generate submission markdown content & filename
    const filename = `${rollNumber.trim()}_${activeTemplate.code}.md`;
    const markdownContent = serializeSubmission(
      rollNumber,
      activeTemplate.code,
      activeTemplate.title,
      code
    );

    // 3. Write file to workspace
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
      const matchTpl = ASSIGNMENT_TEMPLATES.find((t) => t.code === parsed.assignmentCode);
      if (matchTpl) {
        setSelectedTemplateCode(matchTpl.code);
      }
    }
    setCode(parsed.code);
    addToast('success', 'Loaded Saved Submission', submission.filename);
  };

  // Toggle Task Checklist item
  const handleToggleTask = (taskIndex: number) => {
    const key = `${activeTemplate.code}_${taskIndex}`;
    setCheckedTasks((prev) => ({ ...prev, [key]: !prev[key] }));
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
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        handleChooseWorkspace();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        handleNewAssignment();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSaveSubmission, handleChooseWorkspace, handleNewAssignment]);

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header
        assignmentTitle={activeTemplate.title}
        assignmentCode={activeTemplate.code}
        rollNumber={rollNumber}
        onRollNumberChange={handleRollNumberChange}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        onSaveSubmission={handleSaveSubmission}
        onOpenPreview={() => setIsPreviewOpen(true)}
        completedRatio={{ completed: completedCount, total: 3 }}
      />

      {/* Main Body */}
      <div className="main-body">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          workspacePath={workspacePath}
          onChooseWorkspace={handleChooseWorkspace}
          templates={ASSIGNMENT_TEMPLATES}
          selectedTemplateCode={selectedTemplateCode}
          onSelectTemplate={handleSelectTemplate}
          savedSubmissions={savedSubmissions}
          onSelectSubmission={handleSelectSavedSubmission}
          onRefreshWorkspace={refreshWorkspaceSubmissions}
          onNewAssignment={handleNewAssignment}
          visibility={visibility}
          onToggleVisibility={(lang) =>
            setVisibility((prev) => ({ ...prev, [lang]: !prev[lang] }))
          }
        />

        {/* Main Content Area */}
        <main className="content-area">
          {/* Assignment Instructions Card */}
          <AssignmentOverview
            assignment={activeTemplate}
            checkedTasks={checkedTasks}
            onToggleTask={handleToggleTask}
          />

          {/* Resizable 3-Pane Code Editors */}
          <EditorContainer
            code={code}
            onCodeChange={handleCodeChange}
            onResetCode={handleResetCode}
            visibility={visibility}
            theme={theme}
            autoSaveStatus={autoSaveStatus}
          />
        </main>
      </div>

      {/* Submission Preview & Export Modal */}
      <SubmissionPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        rollNumber={rollNumber}
        assignmentCode={activeTemplate.code}
        assignmentTitle={activeTemplate.title}
        code={code}
        onSaveAndExport={handleSaveSubmission}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((item) => item.id !== id))} />
    </div>
  );
};

export default App;
