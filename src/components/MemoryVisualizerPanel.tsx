import React from 'react';
import { CurriculumModule } from '../types';
import { Cpu, ArrowRight, Layers, Database, MemoryStick } from 'lucide-react';

interface MemoryVisualizerPanelProps {
  module: CurriculumModule;
}

export const MemoryVisualizerPanel: React.FC<MemoryVisualizerPanelProps> = ({ module }) => {
  return (
    <div className="memory-container-card">
      <div className="memory-header">
        <div className="memory-title-group">
          <Cpu className="icon-burgundy" size={22} />
          <div>
            <h3 className="memory-title">Stack vs. Heap Memory Layout Visualizer</h3>
            <p className="memory-subtitle">Understand where reference variables, pointers, and object data instances reside in RAM.</p>
          </div>
        </div>
        <span className="memory-badge">RAM Architecture</span>
      </div>

      {/* Memory Grid: Stack Frame vs Heap Allocation */}
      <div className="memory-architecture-grid">
        {/* Stack Memory Box */}
        <div className="memory-zone-box stack-zone">
          <div className="zone-header">
            <Layers className="icon-blue" size={18} />
            <h4 className="zone-title">Stack Memory (Execution Frame)</h4>
          </div>
          <p className="zone-desc">Fast, LIFO (Last-In First-Out) memory storing local variables, function calls, and object pointers/references.</p>

          <div className="stack-frames-list">
            <div className="stack-frame-card">
              <span className="frame-name">main() Stack Frame</span>
              
              <div className="stack-var-item">
                <span className="var-type">Pointer/Ref</span>
                <span className="var-name">s1</span>
                <span className="var-addr">0x7ffd98</span>
                <div className="pointer-arrow-badge">
                  <span>points to ──►</span>
                  <span className="heap-target-ref">0x0040A0</span>
                </div>
              </div>

              <div className="stack-var-item">
                <span className="var-type">Pointer/Ref</span>
                <span className="var-name">s2</span>
                <span className="var-addr">0x7ffd90</span>
                <div className="pointer-arrow-badge">
                  <span>points to ──►</span>
                  <span className="heap-target-ref">0x0040B8</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Heap Memory Box */}
        <div className="memory-zone-box heap-zone">
          <div className="zone-header">
            <Database className="icon-green" size={18} />
            <h4 className="zone-title">Heap Memory (Dynamic Object Pool)</h4>
          </div>
          <p className="zone-desc">Large, dynamic memory pool where actual object data, instance fields, and arrays are allocated.</p>

          <div className="heap-objects-grid">
            <div className="heap-object-card">
              <div className="heap-obj-header">
                <span className="heap-obj-addr">Addr: 0x0040A0</span>
                <span className="heap-obj-type">{module.code} Instance (s1)</span>
              </div>
              <div className="heap-fields-table">
                <div className="heap-field-row">
                  <span className="f-name">name:</span>
                  <span className="f-val">"Alice"</span>
                </div>
                <div className="heap-field-row">
                  <span className="f-name">rollNumber:</span>
                  <span className="f-val">101</span>
                </div>
              </div>
            </div>

            <div className="heap-object-card">
              <div className="heap-obj-header">
                <span className="heap-obj-addr">Addr: 0x0040B8</span>
                <span className="heap-obj-type">{module.code} Instance (s2)</span>
              </div>
              <div className="heap-fields-table">
                <div className="heap-field-row">
                  <span className="f-name">name:</span>
                  <span className="f-val">"Bob"</span>
                </div>
                <div className="heap-field-row">
                  <span className="f-name">rollNumber:</span>
                  <span className="f-val">102</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language Memory Management Differences */}
      <div className="memory-comparison-banner">
        <h4 className="banner-heading">Language Memory Management Breakdown:</h4>
        <div className="lang-mem-cards-grid">
          <div className="lang-mem-card cpp">
            <h5 className="l-title">C++ (Manual & Destructors)</h5>
            <p className="l-text">Direct control with pointers (`Student* s1 = new Student()`). Requires manual `delete s1` or smart pointers (`std::unique_ptr`) to avoid memory leaks.</p>
          </div>

          <div className="lang-mem-card java">
            <h5 className="l-title">Java (Garbage Collector)</h5>
            <p className="l-text">Objects allocated on Heap via `new`. The Automatic Garbage Collector (GC) frees unreferenced objects automatically when out of scope.</p>
          </div>

          <div className="lang-mem-card python">
            <h5 className="l-title">Python (Reference Counting)</h5>
            <p className="l-text">Everything is an object in Python! Memory is managed automatically via Reference Counting and a generational Garbage Collector.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
