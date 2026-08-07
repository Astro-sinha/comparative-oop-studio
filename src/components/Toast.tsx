import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast-card toast-${t.type}`}>
          <div className="toast-icon">
            {t.type === 'success' && <CheckCircle2 size={18} className="icon-success" />}
            {t.type === 'error' && <AlertCircle size={18} className="icon-error" />}
            {t.type === 'info' && <Info size={18} className="icon-info" />}
          </div>

          <div className="toast-text">
            <div className="toast-title">{t.title}</div>
            {t.description && <div className="toast-desc">{t.description}</div>}
          </div>

          <button className="toast-dismiss-btn" onClick={() => onDismiss(t.id)}>
            <X size={14} />
          </button>
        </div>
      ))}

      <style>{`
        .toast-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 2000;
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 360px;
        }

        .toast-card {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          border-radius: var(--radius-md);
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-lg);
          animation: slideUp 0.2s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .toast-success {
          border-left: 4px solid var(--accent-green);
        }

        .toast-error {
          border-left: 4px solid var(--accent-danger);
        }

        .toast-info {
          border-left: 4px solid var(--burgundy-primary);
        }

        .toast-text {
          flex: 1;
        }

        .toast-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .toast-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .icon-success { color: var(--accent-green); }
        .icon-error { color: var(--accent-danger); }
        .icon-info { color: var(--burgundy-primary); }

        .toast-dismiss-btn {
          background: transparent;
          border: none;
          color: var(--text-subtle);
          cursor: pointer;
          padding: 2px;
        }

        .toast-dismiss-btn:hover {
          color: var(--text-main);
        }
      `}</style>
    </div>
  );
};
