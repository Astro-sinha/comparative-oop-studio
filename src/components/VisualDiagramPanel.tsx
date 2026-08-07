import React from 'react';
import { UmlDiagramData, UmlClassNode } from '../types';
import { Layers, ArrowRight, ShieldCheck, Box, Workflow } from 'lucide-react';

interface VisualDiagramPanelProps {
  diagram: UmlDiagramData;
}

export const VisualDiagramPanel: React.FC<VisualDiagramPanelProps> = ({ diagram }) => {
  return (
    <div className="diagram-container-card">
      <div className="diagram-header">
        <div className="diagram-title-group">
          <Workflow className="icon-burgundy" size={20} />
          <h3 className="diagram-title">{diagram.title}</h3>
        </div>
        <span className="diagram-badge">Visual Architecture</span>
      </div>

      <div className="diagram-viewport">
        {/* UML Class Cards Grid */}
        <div className="uml-nodes-grid">
          {diagram.nodes.map((node, index) => (
            <div key={node.id} className="uml-class-card" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Header Box */}
              <div className={`uml-card-header ${node.stereotype || 'class'}`}>
                <span className="uml-stereotype">&lt;&lt;{node.stereotype || 'class'}&gt;&gt;</span>
                <h4 className="uml-class-name">{node.name}</h4>
              </div>

              {/* Attributes Section */}
              <div className="uml-section">
                <div className="uml-section-label">Attributes (State)</div>
                {node.attributes.length === 0 ? (
                  <div className="uml-empty-text">No attributes declared</div>
                ) : (
                  node.attributes.map((attr, idx) => (
                    <div key={idx} className="uml-item attribute-item">
                      <span className={`visibility-badge ${attr.visibility === '+' ? 'vis-public' : attr.visibility === '-' ? 'vis-private' : 'vis-protected'}`}>
                        {attr.visibility}
                      </span>
                      <span className="uml-item-name">{attr.name}</span>
                      <span className="uml-item-type">: {attr.type}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Divider */}
              <div className="uml-divider" />

              {/* Methods Section */}
              <div className="uml-section">
                <div className="uml-section-label">Methods (Behavior)</div>
                {node.methods.length === 0 ? (
                  <div className="uml-empty-text">No methods declared</div>
                ) : (
                  node.methods.map((method, idx) => (
                    <div key={idx} className="uml-item method-item">
                      <span className={`visibility-badge ${method.visibility === '+' ? 'vis-public' : method.visibility === '-' ? 'vis-private' : 'vis-protected'}`}>
                        {method.visibility}
                      </span>
                      <span className={`uml-item-name ${method.isAbstract ? 'italic-abstract' : ''}`}>
                        {method.name}
                      </span>
                      <span className="uml-item-type">: {method.returnType}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Relationships Legend & Flow Cards */}
        {diagram.relationships.length > 0 && (
          <div className="uml-relationships-bar">
            <h4 className="rel-bar-title">Class Connections & Object Relationships:</h4>
            <div className="rel-items-list">
              {diagram.relationships.map((rel) => {
                const source = diagram.nodes.find((n) => n.id === rel.sourceId)?.name || rel.sourceId;
                const target = diagram.nodes.find((n) => n.id === rel.targetId)?.name || rel.targetId;
                return (
                  <div key={rel.id} className="rel-tag">
                    <span className="rel-class-bold">{source}</span>
                    <span className={`rel-arrow-indicator ${rel.type}`}>
                      {rel.type === 'inheritance' ? '──► (Inherits From)' : rel.type === 'composition' ? '──◆ (Composition Has-A)' : '──► (Implements)'}
                    </span>
                    <span className="rel-class-bold">{target}</span>
                    {rel.label && <span className="rel-label-text">({rel.label})</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
