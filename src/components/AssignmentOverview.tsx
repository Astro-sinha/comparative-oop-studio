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
import { CurriculumModule } from '../types';

interface AssignmentOverviewProps {
  assignment: CurriculumModule;
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
            {/* Key Takeaways */}
            <div className="overview-section">
              <div className="section-title">
                <Target size={16} className="title-icon" />
                <span>Learning Objectives</span>
              </div>
              <ul className="bullet-list">
                {assignment.keyTakeaways.map((obj: string, idx: number) => (
                  <li key={idx}>{obj}</li>
                ))}
              </ul>
            </div>

            {/* Core Concept Summary */}
            <div className="overview-section">
              <div className="section-title">
                <BookOpen size={16} className="title-icon" />
                <span>Concept Overview</span>
              </div>
              <p className="concept-overview-text">{assignment.summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
