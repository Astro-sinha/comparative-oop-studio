import React from 'react';
import { 
  FolderOpen, 
  FileCode, 
  RefreshCw, 
  PlusCircle, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  CheckSquare, 
  Sliders,
  FolderCheck
} from 'lucide-react';
import { AssignmentTemplate, SavedSubmissionMeta } from '../types';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  workspacePath: string;
  onChooseWorkspace: () => void;
  templates: AssignmentTemplate[];
  selectedTemplateCode: string;
  onSelectTemplate: (templateCode: string) => void;
  savedSubmissions: SavedSubmissionMeta[];
  onSelectSubmission: (submission: SavedSubmissionMeta) => void;
  onRefreshWorkspace: () => void;
  onNewAssignment: () => void;
  visibility: { cpp: boolean; java: boolean; python: boolean };
  onToggleVisibility: (lang: 'cpp' | 'java' | 'python') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  workspacePath,
  onChooseWorkspace,
  templates,
  selectedTemplateCode,
  onSelectTemplate,
  savedSubmissions,
  onSelectSubmission,
  onRefreshWorkspace,
  onNewAssignment,
  visibility,
  onToggleVisibility,
}) => {
  const getFolderName = (pathStr: string) => {
    if (!pathStr) return 'No folder chosen';
    const parts = pathStr.split(/[/\\]/).filter(Boolean);
    return parts[parts.length - 1] || pathStr;
  };

  return (
    <aside className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header / Collapse Toggle */}
      <div className="sidebar-header">
        {!isCollapsed && <span className="sidebar-title">STUDIO EXPLORER</span>}
        <button 
          className="btn btn-ghost collapse-btn" 
          onClick={onToggleCollapse}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="sidebar-scroll-content">
          {/* Workspace Section */}
          <div className="sidebar-section">
            <div className="section-header">
              <FolderOpen size={15} className="section-icon" />
              <span>Workspace Folder</span>
            </div>
            
            <div className="workspace-box">
              {workspacePath ? (
                <div className="workspace-info" title={workspacePath}>
                  <FolderCheck size={16} className="folder-active-icon" />
                  <span className="folder-name">{getFolderName(workspacePath)}</span>
                </div>
              ) : (
                <div className="workspace-empty">No folder selected</div>
              )}
              <button 
                className="btn btn-secondary choose-workspace-btn"
                onClick={onChooseWorkspace}
                title="Select folder where submission .md files will be saved"
              >
                <FolderOpen size={14} />
                <span>{workspacePath ? 'Change Folder' : 'Choose Workspace'}</span>
              </button>
            </div>
          </div>

          {/* New Assignment Action */}
          <div className="action-row">
            <button 
              className="btn btn-secondary new-assignment-btn"
              onClick={onNewAssignment}
            >
              <PlusCircle size={15} />
              <span>New Assignment</span>
            </button>
          </div>

          {/* Assignment Templates */}
          <div className="sidebar-section">
            <div className="section-header">
              <FileCode size={15} className="section-icon" />
              <span>Assignment Templates</span>
            </div>

            <div className="templates-list">
              {templates.map((tpl) => {
                const isSelected = tpl.code === selectedTemplateCode;
                return (
                  <button
                    key={tpl.code}
                    className={`template-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => onSelectTemplate(tpl.code)}
                  >
                    <div className="tpl-code-badge">{tpl.code}</div>
                    <div className="tpl-info">
                      <div className="tpl-title">{tpl.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Saved Submissions Scan */}
          <div className="sidebar-section">
            <div className="section-header space-between">
              <div className="flex-align">
                <FileText size={15} className="section-icon" />
                <span>Saved Submissions ({savedSubmissions.length})</span>
              </div>
              <button 
                className="btn btn-ghost refresh-btn"
                onClick={onRefreshWorkspace}
                title="Rescan workspace folder for .md files"
              >
                <RefreshCw size={13} />
              </button>
            </div>

            <div className="submissions-list">
              {savedSubmissions.length === 0 ? (
                <div className="empty-submissions">
                  {workspacePath 
                    ? 'No .md submission files found in workspace' 
                    : 'Choose a workspace folder to view saved submissions'}
                </div>
              ) : (
                savedSubmissions.map((sub) => {
                  const dateStr = sub.modifiedTime 
                    ? new Date(sub.modifiedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : '';
                  return (
                    <button
                      key={sub.fullPath}
                      className="submission-item"
                      onClick={() => onSelectSubmission(sub)}
                      title={`Click to load ${sub.filename}`}
                    >
                      <FileText size={15} className="sub-file-icon" />
                      <div className="sub-details">
                        <span className="sub-filename">{sub.filename}</span>
                        {dateStr && <span className="sub-date">{dateStr}</span>}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Panel Visibility Toggles */}
          <div className="sidebar-section">
            <div className="section-header">
              <Sliders size={15} className="section-icon" />
              <span>Editor Visibility</span>
            </div>

            <div className="visibility-toggles">
              <label className={`toggle-chip ${visibility.cpp ? 'active' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={visibility.cpp} 
                  onChange={() => onToggleVisibility('cpp')}
                />
                <span className="lang-dot cpp-dot"></span>
                <span>C++ Editor</span>
              </label>

              <label className={`toggle-chip ${visibility.java ? 'active' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={visibility.java} 
                  onChange={() => onToggleVisibility('java')}
                />
                <span className="lang-dot java-dot"></span>
                <span>Java Editor</span>
              </label>

              <label className={`toggle-chip ${visibility.python ? 'active' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={visibility.python} 
                  onChange={() => onToggleVisibility('python')}
                />
                <span className="lang-dot py-dot"></span>
                <span>Python Editor</span>
              </label>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .sidebar-container {
          width: 280px;
          background-color: var(--bg-secondary);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          transition: width 0.2s ease;
          flex-shrink: 0;
          z-index: 5;
        }

        .sidebar-container.collapsed {
          width: 48px;
        }

        .sidebar-header {
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .sidebar-title {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }

        .collapse-btn {
          width: 30px;
          height: 30px;
          padding: 0;
        }

        .sidebar-scroll-content {
          flex: 1;
          overflow-y: auto;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sidebar-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .section-header.space-between {
          justify-content: space-between;
        }

        .flex-align {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .section-icon {
          color: var(--burgundy-primary);
        }

        .workspace-box {
          background-color: var(--bg-subtle);
          border: 1px dashed var(--border-color);
          border-radius: var(--radius-sm);
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .workspace-info {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .folder-active-icon {
          color: var(--accent-green);
        }

        .folder-name {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-main);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .workspace-empty {
          font-size: 0.78rem;
          color: var(--text-subtle);
          font-style: italic;
        }

        .choose-workspace-btn {
          width: 100%;
          font-size: 0.78rem;
          padding: 6px;
        }

        .action-row {
          display: flex;
        }

        .new-assignment-btn {
          width: 100%;
          font-size: 0.82rem;
        }

        .templates-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .template-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-subtle);
          background-color: var(--bg-card);
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }

        .template-item:hover {
          border-color: var(--border-color);
          background-color: var(--bg-hover);
        }

        .template-item.selected {
          border-color: var(--burgundy-primary);
          background-color: var(--burgundy-light);
        }

        .tpl-code-badge {
          background-color: var(--burgundy-primary);
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .tpl-info {
          display: flex;
          flex-direction: column;
        }

        .tpl-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .submissions-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-height: 180px;
          overflow-y: auto;
        }

        .empty-submissions {
          font-size: 0.75rem;
          color: var(--text-subtle);
          padding: 8px;
          text-align: center;
          background: var(--bg-subtle);
          border-radius: var(--radius-sm);
        }

        .submission-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid transparent;
          background-color: var(--bg-card);
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }

        .submission-item:hover {
          background-color: var(--bg-hover);
          border-color: var(--border-color);
        }

        .sub-file-icon {
          color: var(--accent-blue);
          flex-shrink: 0;
        }

        .sub-details {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .sub-filename {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-main);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sub-date {
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .refresh-btn {
          padding: 2px 4px;
          height: auto;
        }

        .visibility-toggles {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .toggle-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          background-color: var(--bg-subtle);
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid var(--border-subtle);
        }

        .toggle-chip input {
          cursor: pointer;
        }

        .toggle-chip.active {
          border-color: var(--border-color);
          background-color: var(--bg-card);
        }

        .lang-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .cpp-dot { background-color: #00599c; }
        .java-dot { background-color: #b07219; }
        .py-dot { background-color: #3572a5; }
      `}</style>
    </aside>
  );
};
