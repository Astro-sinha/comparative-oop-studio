import React, { useState } from 'react';
import { X, Copy, Download, Check, FileText } from 'lucide-react';
import { serializeSubmission } from '../utils/markdownParser';

interface SubmissionPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  rollNumber: string;
  assignmentCode: string;
  assignmentTitle: string;
  code: { cpp: string; java: string; python: string };
  onSaveAndExport: () => void;
}

export const SubmissionPreviewModal: React.FC<SubmissionPreviewModalProps> = ({
  isOpen,
  onClose,
  rollNumber,
  assignmentCode,
  assignmentTitle,
  code,
  onSaveAndExport,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const markdownContent = serializeSubmission(
    rollNumber || '[RollNumber]',
    assignmentCode,
    assignmentTitle,
    code
  );

  const filename = `${rollNumber ? rollNumber.trim() : 'RollNumber'}_${assignmentCode}.md`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content preview-modal-container">
        {/* Modal Header */}
        <div className="preview-modal-header">
          <div className="modal-title-group">
            <FileText size={20} className="preview-icon" />
            <div>
              <h3 className="modal-title">Submission File Preview</h3>
              <span className="filename-badge">{filename}</span>
            </div>
          </div>

          <button className="btn btn-ghost close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Code Content Preview */}
        <div className="preview-modal-body">
          <pre className="markdown-preview-block">
            <code>{markdownContent}</code>
          </pre>
        </div>

        {/* Modal Footer Controls */}
        <div className="preview-modal-footer">
          <button className="btn btn-secondary" onClick={handleCopyMarkdown}>
            {copied ? <Check size={16} className="success-icon" /> : <Copy size={16} />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Markdown'}</span>
          </button>

          <div className="footer-right">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                onSaveAndExport();
                onClose();
              }}
            >
              <Download size={16} />
              <span>Save & Export (.md)</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .preview-modal-container {
          width: 90%;
          max-width: 860px;
          height: 80vh;
        }

        .preview-modal-header {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-subtle);
        }

        .modal-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .preview-icon {
          color: var(--burgundy-primary);
        }

        .modal-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .filename-badge {
          font-size: 0.75rem;
          font-family: 'Fira Code', monospace;
          background-color: var(--burgundy-light);
          color: var(--burgundy-primary);
          padding: 2px 8px;
          border-radius: 4px;
          border: 1px solid var(--burgundy-border);
          font-weight: 600;
        }

        .close-btn {
          width: 32px;
          height: 32px;
          padding: 0;
        }

        .preview-modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          background-color: var(--bg-primary);
        }

        .markdown-preview-block {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 16px;
          font-family: 'Fira Code', Consolas, Monaco, monospace;
          font-size: 0.85rem;
          color: var(--text-main);
          white-space: pre-wrap;
          word-break: break-word;
          line-height: 1.6;
        }

        .preview-modal-footer {
          padding: 14px 20px;
          border-top: 1px solid var(--border-color);
          background-color: var(--bg-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
      `}</style>
    </div>
  );
};
