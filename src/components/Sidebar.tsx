import React from 'react';
import { CurriculumModule, SavedSubmissionMeta } from '../types';
import { 
  FolderOpen, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  CheckSquare, 
  BookOpen, 
  Award, 
  Code, 
  Plus, 
  RefreshCw 
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  workspacePath: string;
  onChooseWorkspace: () => void;
  modules: CurriculumModule[];
  selectedModuleCode: string;
  onSelectModule: (code: string) => void;
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
  modules,
  selectedModuleCode,
  onSelectModule,
  savedSubmissions,
  onSelectSubmission,
  onRefreshWorkspace,
  onNewAssignment,
  visibility,
  onToggleVisibility,
}) => {
  return (
    <aside className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Collapse Toggle */}
      <button className="sidebar-collapse-btn" onClick={onToggleCollapse} title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}>
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {!isCollapsed && (
        <div className="sidebar-content">
          {/* Workspace Folder Section */}
          <div className="sidebar-section">
            <div className="section-label">Workspace Directory</div>
            <div className="workspace-card" onClick={onChooseWorkspace}>
              <FolderOpen size={18} className="icon-burgundy" />
              <div className="workspace-info">
                <span className="workspace-path-text" title={workspacePath || 'No folder selected'}>
                  {workspacePath ? workspacePath.split('/').pop() || workspacePath : 'Select Workspace Folder...'}
                </span>
                <span className="workspace-subtext">{workspacePath ? 'Click to change folder' : 'Local folder for saving .md files'}</span>
              </div>
            </div>
          </div>

          {/* Code Panel Visibility Selector */}
          <div className="sidebar-section">
            <div className="section-label">Visible Language Panels</div>
            <div className="lang-toggle-pills">
              <button
                className={`lang-pill ${visibility.cpp ? 'active-cpp' : ''}`}
                onClick={() => onToggleVisibility('cpp')}
              >
                C++
              </button>
              <button
                className={`lang-pill ${visibility.java ? 'active-java' : ''}`}
                onClick={() => onToggleVisibility('java')}
              >
                Java
              </button>
              <button
                className={`lang-pill ${visibility.python ? 'active-python' : ''}`}
                onClick={() => onToggleVisibility('python')}
              >
                Python
              </button>
            </div>
          </div>

          {/* 6 Pillars Curriculum Modules Navigation */}
          <div className="sidebar-section nav-section">
            <div className="section-header-flex">
              <div className="section-label-group">
                <BookOpen size={16} className="icon-burgundy" />
                <span className="section-label">6 Pillars Learning Path</span>
              </div>
              <button className="icon-btn" onClick={onNewAssignment} title="Reset to Intro Module">
                <Plus size={14} />
              </button>
            </div>

            <div className="module-list">
              {modules.map((mod) => {
                const isSelected = mod.code === selectedModuleCode;
                return (
                  <button
                    key={mod.code}
                    className={`module-item-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => onSelectModule(mod.code)}
                  >
                    <div className="module-code-badge">{mod.code}</div>
                    <div className="module-text-group">
                      <span className="module-pillar-name">{mod.pillar}</span>
                      <span className="module-title-sub">{mod.title.split('(')[0]}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Saved Submissions List */}
          <div className="sidebar-section submissions-section">
            <div className="section-header-flex">
              <div className="section-label-group">
                <FileText size={16} className="icon-burgundy" />
                <span className="section-label">Saved Submissions ({savedSubmissions.length})</span>
              </div>
              <button className="icon-btn" onClick={onRefreshWorkspace} title="Refresh Files">
                <RefreshCw size={14} />
              </button>
            </div>

            <div className="submissions-list">
              {savedSubmissions.length === 0 ? (
                <div className="empty-submissions-text">No .md submission files in workspace folder yet.</div>
              ) : (
                savedSubmissions.map((sub) => (
                  <div
                    key={sub.fullPath}
                    className="submission-file-item"
                    onClick={() => onSelectSubmission(sub)}
                  >
                    <FileText size={14} className="icon-file" />
                    <span className="sub-filename">{sub.filename}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
