import React from 'react';
import { ViewMode, ThemeMode } from '../types';
import { 
  Code2, 
  Workflow, 
  BookOpen, 
  Compass, 
  Cpu, 
  Play, 
  Save, 
  Eye, 
  Printer, 
  Sun, 
  Moon, 
  GraduationCap 
} from 'lucide-react';

interface HeaderProps {
  assignmentTitle: string;
  assignmentCode: string;
  rollNumber: string;
  onRollNumberChange: (val: string) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onSaveSubmission: () => void;
  onExportPdf: () => void;
  onOpenPreview: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onRunCode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  assignmentTitle,
  assignmentCode,
  rollNumber,
  onRollNumberChange,
  theme,
  onToggleTheme,
  onSaveSubmission,
  onExportPdf,
  onOpenPreview,
  viewMode,
  onViewModeChange,
  onRunCode,
}) => {
  return (
    <header className="header-nav">
      {/* Brand Title */}
      <div className="brand-group">
        <div className="brand-icon-box">
          <GraduationCap size={24} className="icon-white" />
        </div>
        <div className="brand-titles">
          <h1 className="brand-name">Comparative OOP Studio</h1>
          <span className="brand-tagline">Learn Object-Oriented Programming from Scratch</span>
        </div>
      </div>

      {/* Mode View Switcher */}
      <div className="mode-tab-group">
        <button
          className={`mode-tab-btn ${viewMode === 'code' ? 'active' : ''}`}
          onClick={() => onViewModeChange('code')}
        >
          <Code2 size={16} />
          <span>Code View</span>
        </button>

        <button
          className={`mode-tab-btn ${viewMode === 'diagram' ? 'active' : ''}`}
          onClick={() => onViewModeChange('diagram')}
        >
          <Workflow size={16} />
          <span>Visual Diagram</span>
        </button>

        <button
          className={`mode-tab-btn ${viewMode === 'guide' ? 'active' : ''}`}
          onClick={() => onViewModeChange('guide')}
        >
          <BookOpen size={16} />
          <span>Concept Guide</span>
        </button>

        <button
          className={`mode-tab-btn ${viewMode === 'memory' ? 'active' : ''}`}
          onClick={() => onViewModeChange('memory')}
        >
          <Cpu size={16} />
          <span>Memory Layout</span>
        </button>

        <button
          className={`mode-tab-btn ${viewMode === 'roadmap' ? 'active' : ''}`}
          onClick={() => onViewModeChange('roadmap')}
        >
          <Compass size={16} />
          <span>6 Pillars Path</span>
        </button>
      </div>

      {/* Action Controls */}
      <div className="header-actions">
        {/* Roll Number Input */}
        <div className="roll-input-box">
          <label htmlFor="roll-input" className="roll-label">Roll / ID:</label>
          <input
            id="roll-input"
            type="text"
            className="roll-field"
            placeholder="e.g. 2026-CS-042"
            value={rollNumber}
            onChange={(e) => onRollNumberChange(e.target.value)}
          />
        </div>

        {/* Run & Compare Button */}
        <button className="btn-action btn-run" onClick={onRunCode} title="Execute & Compare Output">
          <Play size={16} fill="currentColor" />
          <span>Run Output</span>
        </button>

        {/* Export PDF Button */}
        <button className="btn-action btn-secondary" onClick={onExportPdf} title="Export PDF Lab Report">
          <Printer size={16} />
          <span>Export PDF</span>
        </button>

        {/* Preview Modal */}
        <button className="btn-action btn-secondary" onClick={onOpenPreview} title="Preview Submission">
          <Eye size={16} />
          <span>Preview</span>
        </button>

        {/* Save Submission */}
        <button className="btn-action btn-primary" onClick={onSaveSubmission} title="Save Submission (.md)">
          <Save size={16} />
          <span>Save</span>
        </button>

        {/* Theme Toggle */}
        <button className="theme-toggle-btn" onClick={onToggleTheme} title="Toggle Theme">
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
};
