import React from 'react';
import { 
  Code2, 
  Sun, 
  Moon, 
  Save, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  GraduationCap,
  Layers
} from 'lucide-react';
import { ThemeMode } from '../types';

interface HeaderProps {
  assignmentTitle: string;
  assignmentCode: string;
  rollNumber: string;
  onRollNumberChange: (val: string) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onSaveSubmission: () => void;
  onOpenPreview: () => void;
  completedRatio: { completed: number; total: number };
}

export const Header: React.FC<HeaderProps> = ({
  assignmentTitle,
  assignmentCode,
  rollNumber,
  onRollNumberChange,
  theme,
  onToggleTheme,
  onSaveSubmission,
  onOpenPreview,
  completedRatio,
}) => {
  const isRollValid = rollNumber.trim().length > 0;
  const progressPercent = Math.round((completedRatio.completed / (completedRatio.total || 1)) * 100);

  return (
    <header className="header-container">
      {/* App Branding */}
      <div className="brand-section">
        <div className="logo-icon-wrapper">
          <Code2 size={22} className="logo-icon" />
        </div>
        <div className="brand-text">
          <div className="app-title">
            <span>Comparative OOP Studio</span>
            <span className="platform-tag">Desktop v1.0</span>
          </div>
          <div className="dept-subtitle">
            <GraduationCap size={13} />
            <span>Department of Robotics and AI</span>
          </div>
        </div>
      </div>

      {/* Assignment Progress Center */}
      <div className="assignment-center-section">
        <div className="assignment-badge">
          <Layers size={14} />
          <span>{assignmentCode}</span>
        </div>
        <span className="assignment-title-text">{assignmentTitle}</span>

        <div className="progress-wrapper">
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="progress-text">
            {completedRatio.completed}/{completedRatio.total} Code Panels Ready
          </span>
        </div>
      </div>

      {/* Action Controls Right */}
      <div className="actions-section">
        {/* Roll Number Input */}
        <div className="roll-number-container">
          <label htmlFor="rollNoInput" className="roll-number-label">
            Roll Number:
          </label>
          <div className="roll-input-wrapper">
            <input
              id="rollNoInput"
              type="text"
              className={`input roll-input ${!isRollValid ? 'invalid' : ''}`}
              placeholder="e.g. 45 or RA21101"
              value={rollNumber}
              onChange={(e) => onRollNumberChange(e.target.value)}
            />
            {isRollValid ? (
              <CheckCircle2 size={15} className="valid-icon" />
            ) : (
              <AlertCircle size={15} className="invalid-icon" />
            )}
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          className="btn btn-ghost theme-toggle-btn"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Preview / Export */}
        <button
          className="btn btn-secondary preview-btn"
          onClick={onOpenPreview}
          title="Preview rendered Markdown & Export options"
        >
          <Eye size={16} />
          <span>Preview</span>
        </button>

        {/* Save Submission */}
        <button
          className="btn btn-primary save-submission-btn"
          onClick={onSaveSubmission}
          title="Save submission markdown file to workspace (Cmd+S)"
        >
          <Save size={16} />
          <span>Save Submission</span>
        </button>
      </div>

      <style>{`
        .header-container {
          height: 64px;
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 18px;
          padding-left: 78px; /* Room for native macOS window controls */
          gap: 16px;
          z-index: 10;
          box-shadow: var(--shadow-sm);
        }

        .brand-section {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 260px;
        }

        .logo-icon-wrapper {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background-color: var(--burgundy-primary);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px var(--burgundy-glow);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .app-title {
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-main);
          display: flex;
          align-items: center;
          gap: 8px;
          line-height: 1.2;
        }

        .platform-tag {
          font-size: 0.65rem;
          font-weight: 600;
          padding: 1px 6px;
          background: var(--bg-hover);
          color: var(--text-muted);
          border-radius: 4px;
          border: 1px solid var(--border-color);
        }

        .dept-subtitle {
          font-size: 0.72rem;
          color: var(--burgundy-primary);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .assignment-center-section {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: var(--bg-primary);
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid var(--border-color);
        }

        .assignment-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--burgundy-primary);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 12px;
        }

        .assignment-title-text {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-main);
          max-width: 240px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .progress-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          border-left: 1px solid var(--border-color);
          padding-left: 10px;
        }

        .progress-bar-bg {
          width: 60px;
          height: 6px;
          background-color: var(--border-color);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background-color: var(--burgundy-primary);
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--text-muted);
          white-space: nowrap;
        }

        .actions-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .roll-number-container {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .roll-number-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .roll-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .roll-input {
          width: 130px;
          padding-right: 28px;
          height: 34px;
          font-weight: 600;
        }

        .roll-input.invalid {
          border-color: var(--accent-warning);
        }

        .valid-icon {
          position: absolute;
          right: 8px;
          color: var(--accent-green);
        }

        .invalid-icon {
          position: absolute;
          right: 8px;
          color: var(--accent-warning);
        }

        .theme-toggle-btn {
          width: 34px;
          height: 34px;
          padding: 0;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .preview-btn, .save-submission-btn {
          height: 34px;
        }
      `}</style>
    </header>
  );
};
