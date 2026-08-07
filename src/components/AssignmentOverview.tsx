import React, { useState } from 'react';
import { 
  BookOpen, 
  Target, 
  ListChecks, 
  CheckSquare, 
  Square, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { AssignmentTemplate } from '../types';

interface AssignmentOverviewProps {
  assignment: AssignmentTemplate;
  checkedTasks: Record<string, boolean>;
  onToggleTask: (taskIndex: number) => void;
}

export const AssignmentOverview: React.FC<AssignmentOverviewProps> = ({
  assignment,
  checkedTasks,
  onToggleTask,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="card overview-card">
      <div className="overview-header">
        <div className="title-area">
          <div className="badge badge-burgundy">{assignment.code}</div>
          <div className="title-text-group">
            <h2 className="assignment-title">{assignment.title}</h2>
            <p className="assignment-subtitle">{assignment.subtitle}</p>
          </div>
        </div>

        <button
          className="btn btn-ghost collapse-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Show Assignment Details' : 'Hide Assignment Details'}
        >
          <span>{isCollapsed ? 'Show Instructions' : 'Hide Instructions'}</span>
          {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="overview-body">
          <div className="overview-grid">
            {/* Learning Objectives */}
            <div className="overview-section">
              <div className="section-title">
                <Target size={16} className="title-icon" />
                <span>Learning Objectives</span>
              </div>
              <ul className="bullet-list">
                {assignment.learningObjectives.map((obj, idx) => (
                  <li key={idx}>{obj}</li>
                ))}
              </ul>
            </div>

            {/* Task Instructions */}
            <div className="overview-section">
              <div className="section-title">
                <BookOpen size={16} className="title-icon" />
                <span>Task Instructions</span>
              </div>
              <ol className="ordered-list">
                {assignment.instructions.map((inst, idx) => (
                  <li key={idx}>{inst}</li>
                ))}
              </ol>
            </div>

            {/* Interactive Submission Checklist */}
            <div className="overview-section">
              <div className="section-title">
                <ListChecks size={16} className="title-icon" />
                <span>Submission Checklist</span>
              </div>
              <div className="checklist">
                {assignment.submissionChecklist.map((item, idx) => {
                  const isChecked = Boolean(checkedTasks[`${assignment.code}_${idx}`]);
                  return (
                    <div
                      key={idx}
                      className={`checklist-item ${isChecked ? 'completed' : ''}`}
                      onClick={() => onToggleTask(idx)}
                    >
                      {isChecked ? (
                        <CheckSquare size={16} className="checkbox-icon checked" />
                      ) : (
                        <Square size={16} className="checkbox-icon" />
                      )}
                      <span className="checklist-text">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .overview-card {
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background-color: var(--bg-card);
        }

        .overview-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .title-area {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .title-text-group {
          display: flex;
          flex-direction: column;
        }

        .assignment-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-main);
          line-height: 1.2;
        }

        .assignment-subtitle {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .collapse-toggle {
          font-size: 0.8rem;
          height: 32px;
          padding: 0 10px;
        }

        .overview-body {
          border-top: 1px solid var(--border-subtle);
          padding-top: 12px;
        }

        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }

        .overview-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background-color: var(--bg-subtle);
          padding: 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-subtle);
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--burgundy-primary);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .title-icon {
          color: var(--burgundy-primary);
        }

        .bullet-list, .ordered-list {
          font-size: 0.8rem;
          color: var(--text-main);
          padding-left: 18px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .checklist {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .checklist-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--text-main);
          cursor: pointer;
          padding: 4px 6px;
          border-radius: 4px;
          transition: background-color 0.15s ease;
        }

        .checklist-item:hover {
          background-color: var(--bg-hover);
        }

        .checklist-item.completed {
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .checkbox-icon {
          color: var(--text-subtle);
          margin-top: 2px;
          flex-shrink: 0;
        }

        .checkbox-icon.checked {
          color: var(--accent-green);
        }
      `}</style>
    </div>
  );
};
