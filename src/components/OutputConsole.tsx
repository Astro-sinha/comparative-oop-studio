import React from 'react';
import { ExecutionResult } from '../types';
import { Terminal, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

interface OutputConsoleProps {
  results: Record<'cpp' | 'java' | 'python', ExecutionResult | null>;
  visibility: { cpp: boolean; java: boolean; python: boolean };
}

export const OutputConsole: React.FC<OutputConsoleProps> = ({ results, visibility }) => {
  const visibleLangs = (['cpp', 'java', 'python'] as const).filter((lang) => visibility[lang]);

  return (
    <div className="output-console-card">
      <div className="console-header">
        <div className="console-title-group">
          <Terminal className="icon-green" size={18} />
          <h4 className="console-title">Live Execution Console & Output Comparison</h4>
        </div>
        <span className="console-live-badge">Live stdout</span>
      </div>

      <div className={`console-grid lang-count-${visibleLangs.length}`}>
        {visibleLangs.map((lang) => {
          const res = results[lang];
          const langName = lang === 'cpp' ? 'C++' : lang === 'java' ? 'Java' : 'Python';

          return (
            <div key={lang} className={`console-pane-box ${lang}`}>
              <div className="pane-header">
                <span className="lang-label">{langName} Output</span>
                {res && (
                  <div className="time-badge">
                    <Clock size={12} />
                    <span>{res.executionTimeMs}ms</span>
                  </div>
                )}
              </div>

              <div className="pane-body terminal-text">
                {!res ? (
                  <div className="terminal-placeholder">
                    Click <strong>▶ Run & Compare Output</strong> above to execute {langName} code.
                  </div>
                ) : res.status === 'error' ? (
                  <div className="terminal-error-text">{res.stderr || 'Execution failed.'}</div>
                ) : (
                  <pre className="terminal-output">{res.stdout}</pre>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
