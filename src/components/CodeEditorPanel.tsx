import React, { useState, useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { 
  Copy, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Check, 
  Undo, 
  Redo, 
  AlertTriangle,
  FileCode2
} from 'lucide-react';
import { ThemeMode } from '../types';

interface CodeEditorPanelProps {
  language: 'cpp' | 'java' | 'python';
  displayName: string;
  badgeColorClass: string;
  code: string;
  onChange: (value: string) => void;
  onReset: () => void;
  theme: ThemeMode;
  isExpanded: boolean;
  onToggleExpand: () => void;
  autoSaveStatus: 'saved' | 'saving' | 'dirty';
}

export const CodeEditorPanel: React.FC<CodeEditorPanelProps> = ({
  language,
  displayName,
  badgeColorClass,
  code,
  onChange,
  onReset,
  theme,
  isExpanded,
  onToggleExpand,
  autoSaveStatus,
}) => {
  const [copied, setCopied] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const editorRef = useRef<any>(null);

  const monacoLanguage = language === 'cpp' ? 'cpp' : language === 'java' ? 'java' : 'python';

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleUndo = () => {
    if (editorRef.current) {
      editorRef.current.trigger('toolbar', 'undo', null);
    }
  };

  const handleRedo = () => {
    if (editorRef.current) {
      editorRef.current.trigger('toolbar', 'redo', null);
    }
  };

  const lineCount = code.split('\n').length;
  const charCount = code.length;

  return (
    <div className={`editor-panel-card ${isExpanded ? 'fullscreen-mode' : ''}`}>
      {/* Panel Toolbar Header */}
      <div className="editor-panel-header">
        <div className="panel-left">
          <FileCode2 size={16} className="lang-icon" />
          <span className={`badge ${badgeColorClass}`}>{displayName}</span>
          
          <div className="stats-pill">
            <span>{lineCount} L</span>
            <span className="dot">•</span>
            <span>{charCount} C</span>
          </div>

          <span className={`autosave-indicator ${autoSaveStatus}`}>
            {autoSaveStatus === 'saved' ? 'Draft saved' : autoSaveStatus === 'saving' ? 'Saving draft...' : 'Editing...'}
          </span>
        </div>

        <div className="panel-controls">
          <button 
            className="panel-btn" 
            onClick={handleUndo} 
            title="Undo (Ctrl+Z)"
          >
            <Undo size={14} />
          </button>

          <button 
            className="panel-btn" 
            onClick={handleRedo} 
            title="Redo (Ctrl+Y)"
          >
            <Redo size={14} />
          </button>

          <button 
            className="panel-btn" 
            onClick={handleCopy} 
            title="Copy code to clipboard"
          >
            {copied ? <Check size={14} className="success-icon" /> : <Copy size={14} />}
          </button>

          <button 
            className="panel-btn danger-btn" 
            onClick={() => setShowResetConfirm(true)} 
            title="Reset code to starter template"
          >
            <RotateCcw size={14} />
          </button>

          <button 
            className="panel-btn" 
            onClick={onToggleExpand} 
            title={isExpanded ? 'Exit Focus Mode' : 'Expand / Focus Mode'}
          >
            {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Monaco Editor Container */}
      <div className="monaco-wrapper">
        <Editor
          height="100%"
          language={monacoLanguage}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          value={code}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 13,
            fontFamily: "'Fira Code', Consolas, Monaco, monospace",
            fontLigatures: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            lineNumbers: 'on',
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            padding: { top: 10, bottom: 10 },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            renderLineHighlight: 'all',
          }}
        />
      </div>

      {/* Confirmation Modal for Reset */}
      {showResetConfirm && (
        <div className="modal-backdrop">
          <div className="modal-content reset-modal">
            <div className="modal-header">
              <AlertTriangle size={20} className="warning-icon" />
              <h3>Reset {displayName} Code?</h3>
            </div>
            <p className="modal-desc">
              This will replace all your current edits in the <strong>{displayName}</strong> panel with the starter template. This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => {
                  onReset();
                  setShowResetConfirm(false);
                }}
              >
                Yes, Reset Code
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .editor-panel-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          position: relative;
        }

        .editor-panel-card.fullscreen-mode {
          position: fixed;
          inset: 12px;
          z-index: 999;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
          border-color: var(--burgundy-primary);
        }

        .editor-panel-header {
          height: 40px;
          background-color: var(--bg-subtle);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          gap: 8px;
        }

        .panel-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .lang-icon {
          color: var(--burgundy-primary);
        }

        .stats-pill {
          font-size: 0.7rem;
          font-family: 'Fira Code', monospace;
          color: var(--text-muted);
          background-color: var(--bg-secondary);
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .dot {
          opacity: 0.5;
        }

        .autosave-indicator {
          font-size: 0.68rem;
          font-weight: 500;
          padding: 1px 6px;
          border-radius: 4px;
        }

        .autosave-indicator.saved {
          color: var(--accent-green);
        }

        .autosave-indicator.saving, .autosave-indicator.dirty {
          color: var(--accent-warning);
        }

        .panel-controls {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .panel-btn {
          width: 26px;
          height: 26px;
          border-radius: 4px;
          border: 1px solid var(--border-subtle);
          background-color: var(--bg-secondary);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .panel-btn:hover {
          background-color: var(--bg-hover);
          color: var(--text-main);
          border-color: var(--border-color);
        }

        .panel-btn.danger-btn:hover {
          color: var(--accent-danger);
          border-color: var(--accent-danger);
        }

        .success-icon {
          color: var(--accent-green);
        }

        .monaco-wrapper {
          flex: 1;
          position: relative;
          min-height: 280px;
        }

        .reset-modal {
          max-width: 420px;
          padding: 20px;
          gap: 14px;
        }

        .modal-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .warning-icon {
          color: var(--accent-warning);
        }

        .modal-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
};
