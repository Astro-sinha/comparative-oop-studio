import React, { useState, useRef, useEffect } from 'react';
import { CodeEditorPanel } from './CodeEditorPanel';
import { ThemeMode } from '../types';

interface EditorContainerProps {
  code: { cpp: string; java: string; python: string };
  onCodeChange: (lang: 'cpp' | 'java' | 'python', value: string) => void;
  onResetCode: (lang: 'cpp' | 'java' | 'python') => void;
  visibility: { cpp: boolean; java: boolean; python: boolean };
  theme: ThemeMode;
  autoSaveStatus: { cpp: 'saved' | 'saving' | 'dirty'; java: 'saved' | 'saving' | 'dirty'; python: 'saved' | 'saving' | 'dirty' };
}

export const EditorContainer: React.FC<EditorContainerProps> = ({
  code,
  onCodeChange,
  onResetCode,
  visibility,
  theme,
  autoSaveStatus,
}) => {
  const [expandedLang, setExpandedLang] = useState<'cpp' | 'java' | 'python' | null>(null);
  const [activeTab, setActiveTab] = useState<'cpp' | 'java' | 'python'>('cpp');
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Panel widths percentages (default equal split)
  const [widths, setWidths] = useState({ cpp: 33.33, java: 33.33, python: 33.34 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<'cpp-java' | 'java-python' | null>(null);

  // Detect small window width for tabbed/stacked fallback
  useEffect(() => {
    const checkSize = () => {
      if (containerRef.current) {
        setIsSmallScreen(containerRef.current.clientWidth < 900);
      }
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Mouse drag handling for panel resizing
  const handleMouseDown = (divider: 'cpp-java' | 'java-python') => {
    isDraggingRef.current = divider;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const totalWidth = rect.width;
      const percent = (relativeX / totalWidth) * 100;

      if (isDraggingRef.current === 'cpp-java') {
        const newCpp = Math.max(15, Math.min(percent, 70));
        const remaining = 100 - newCpp;
        const ratio = widths.java / (widths.java + widths.python || 1);
        setWidths({
          cpp: newCpp,
          java: remaining * ratio,
          python: remaining * (1 - ratio),
        });
      } else if (isDraggingRef.current === 'java-python') {
        const cppWidth = widths.cpp;
        const newJava = Math.max(15, Math.min(percent - cppWidth, 100 - cppWidth - 15));
        const newPy = 100 - cppWidth - newJava;
        setWidths({
          cpp: cppWidth,
          java: newJava,
          python: newPy,
        });
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = null;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const visibleLangs = (['cpp', 'java', 'python'] as const).filter((lang) => visibility[lang]);

  return (
    <div className="editor-container-root" ref={containerRef}>
      {/* Tabbed Navigation Bar for small screen mode */}
      {isSmallScreen && (
        <div className="tab-nav-bar">
          {visibility.cpp && (
            <button
              className={`tab-btn ${activeTab === 'cpp' ? 'active' : ''}`}
              onClick={() => setActiveTab('cpp')}
            >
              C++ Editor
            </button>
          )}
          {visibility.java && (
            <button
              className={`tab-btn ${activeTab === 'java' ? 'active' : ''}`}
              onClick={() => setActiveTab('java')}
            >
              Java Editor
            </button>
          )}
          {visibility.python && (
            <button
              className={`tab-btn ${activeTab === 'python' ? 'active' : ''}`}
              onClick={() => setActiveTab('python')}
            >
              Python Editor
            </button>
          )}
        </div>
      )}

      {/* Main Multi-Pane View */}
      <div className={`panes-layout ${isSmallScreen ? 'small-screen-tabs' : ''}`}>
        {/* C++ Panel */}
        {visibility.cpp && (!isSmallScreen || activeTab === 'cpp') && (
          <div
            className="pane-wrapper"
            style={{ width: !isSmallScreen && visibleLangs.length > 1 ? `${widths.cpp}%` : '100%' }}
          >
            <CodeEditorPanel
              language="cpp"
              displayName="C++"
              badgeColorClass="badge-blue"
              code={code.cpp}
              onChange={(val) => onCodeChange('cpp', val)}
              onReset={() => onResetCode('cpp')}
              theme={theme}
              isExpanded={expandedLang === 'cpp'}
              onToggleExpand={() => setExpandedLang(expandedLang === 'cpp' ? null : 'cpp')}
              autoSaveStatus={autoSaveStatus.cpp}
            />
          </div>
        )}

        {/* Resizer Divider 1 */}
        {!isSmallScreen && visibility.cpp && visibility.java && (
          <div
            className="pane-resizer"
            onMouseDown={() => handleMouseDown('cpp-java')}
            title="Drag to resize panel"
          />
        )}

        {/* Java Panel */}
        {visibility.java && (!isSmallScreen || activeTab === 'java') && (
          <div
            className="pane-wrapper"
            style={{ width: !isSmallScreen && visibleLangs.length > 1 ? `${widths.java}%` : '100%' }}
          >
            <CodeEditorPanel
              language="java"
              displayName="Java"
              badgeColorClass="badge-orange"
              code={code.java}
              onChange={(val) => onCodeChange('java', val)}
              onReset={() => onResetCode('java')}
              theme={theme}
              isExpanded={expandedLang === 'java'}
              onToggleExpand={() => setExpandedLang(expandedLang === 'java' ? null : 'java')}
              autoSaveStatus={autoSaveStatus.java}
            />
          </div>
        )}

        {/* Resizer Divider 2 */}
        {!isSmallScreen && visibility.java && visibility.python && (
          <div
            className="pane-resizer"
            onMouseDown={() => handleMouseDown('java-python')}
            title="Drag to resize panel"
          />
        )}

        {/* Python Panel */}
        {visibility.python && (!isSmallScreen || activeTab === 'python') && (
          <div
            className="pane-wrapper"
            style={{ width: !isSmallScreen && visibleLangs.length > 1 ? `${widths.python}%` : '100%' }}
          >
            <CodeEditorPanel
              language="python"
              displayName="Python"
              badgeColorClass="badge-green"
              code={code.python}
              onChange={(val) => onCodeChange('python', val)}
              onReset={() => onResetCode('python')}
              theme={theme}
              isExpanded={expandedLang === 'python'}
              onToggleExpand={() => setExpandedLang(expandedLang === 'python' ? null : 'python')}
              autoSaveStatus={autoSaveStatus.python}
            />
          </div>
        )}
      </div>

      <style>{`
        .editor-container-root {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 480px;
          position: relative;
        }

        .tab-nav-bar {
          display: flex;
          gap: 6px;
          margin-bottom: 8px;
          background-color: var(--bg-card);
          padding: 6px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
        }

        .tab-btn {
          flex: 1;
          padding: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          border: 1px solid transparent;
          border-radius: 4px;
          background-color: var(--bg-subtle);
          color: var(--text-muted);
          cursor: pointer;
        }

        .tab-btn.active {
          background-color: var(--burgundy-primary);
          color: #ffffff;
        }

        .panes-layout {
          flex: 1;
          display: flex;
          gap: 0;
          overflow: hidden;
        }

        .pane-wrapper {
          height: 100%;
          min-width: 200px;
          display: flex;
          flex-direction: column;
        }

        .pane-resizer {
          width: 8px;
          background-color: transparent;
          cursor: col-resize;
          position: relative;
          z-index: 2;
          transition: background-color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pane-resizer::after {
          content: '';
          width: 2px;
          height: 36px;
          background-color: var(--border-color);
          border-radius: 1px;
          transition: background-color 0.2s ease;
        }

        .pane-resizer:hover::after,
        .pane-resizer:active::after {
          background-color: var(--burgundy-primary);
          width: 4px;
        }
      `}</style>
    </div>
  );
};
