import React from 'react';
import { CurriculumModule } from '../types';
import { Compass, CheckCircle, ArrowRight, Award, Lock, BookOpen } from 'lucide-react';

interface PillarsRoadmapProps {
  modules: CurriculumModule[];
  selectedCode: string;
  onSelectModule: (code: string) => void;
}

export const PillarsRoadmap: React.FC<PillarsRoadmapProps> = ({
  modules,
  selectedCode,
  onSelectModule,
}) => {
  return (
    <div className="roadmap-container-card">
      <div className="roadmap-header">
        <div className="roadmap-title-group">
          <Compass className="icon-burgundy" size={24} />
          <div>
            <h3 className="roadmap-title">The 6 Pillars of OOP Learning Path</h3>
            <p className="roadmap-subtitle">Master Object-Oriented Programming step-by-step from zero to advanced architecture.</p>
          </div>
        </div>
        <div className="roadmap-badge-progress">
          <Award size={18} />
          <span>7 Structured Modules</span>
        </div>
      </div>

      {/* Roadmap Steps */}
      <div className="roadmap-timeline">
        {modules.map((mod, index) => {
          const isActive = mod.code === selectedCode;
          return (
            <div
              key={mod.code}
              className={`timeline-step-card ${isActive ? 'active-step' : ''}`}
              onClick={() => onSelectModule(mod.code)}
            >
              <div className="step-number-badge">
                {index + 1}
              </div>

              <div className="step-content">
                <div className="step-top-row">
                  <span className="step-pillar-tag">{mod.pillar}</span>
                  <span className="step-code">{mod.code}</span>
                </div>
                <h4 className="step-title">{mod.title}</h4>
                <p className="step-desc">{mod.subtitle}</p>
              </div>

              <div className="step-action-arrow">
                <ArrowRight size={18} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
