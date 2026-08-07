export function exportSubmissionToPdf(
  rollNumber: string,
  assignmentCode: string,
  assignmentTitle: string,
  code: { cpp: string; java: string; python: string }
) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const timestamp = new Date().toLocaleString();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Submission_${rollNumber}_${assignmentCode}</title>
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            padding: 24px;
            color: #0f172a;
            line-height: 1.5;
          }
          .header-box {
            border-bottom: 2px solid #800020;
            padding-bottom: 12px;
            margin-bottom: 20px;
          }
          .title {
            font-size: 20px;
            font-weight: bold;
            color: #800020;
            margin: 0;
          }
          .subtitle {
            font-size: 14px;
            color: #64748b;
            margin-top: 4px;
          }
          .meta-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 10px 16px;
            border-radius: 8px;
            margin-bottom: 24px;
            font-size: 13px;
          }
          .code-section {
            margin-bottom: 24px;
          }
          .lang-heading {
            font-size: 14px;
            font-weight: bold;
            color: #800020;
            margin-bottom: 6px;
          }
          pre {
            background: #0b0d14;
            color: #f1f5f9;
            padding: 12px;
            border-radius: 6px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 12px;
            white-space: pre-wrap;
            overflow-x: auto;
          }
        </style>
      </head>
      <body>
        <div class="header-box">
          <h1 class="title">Comparative OOP Studio - Laboratory Submission</h1>
          <div class="subtitle">Object-Oriented Programming Comparative Analysis</div>
        </div>

        <div class="meta-grid">
          <div><strong>Roll / ID:</strong> ${rollNumber || 'N/A'}</div>
          <div><strong>Module:</strong> ${assignmentCode} - ${assignmentTitle}</div>
          <div><strong>Submitted At:</strong> ${timestamp}</div>
        </div>

        <div class="code-section">
          <div class="lang-heading">C++ Solution</div>
          <pre><code>${escapeHtml(code.cpp)}</code></pre>
        </div>

        <div class="code-section">
          <div class="lang-heading">Java Solution</div>
          <pre><code>${escapeHtml(code.java)}</code></pre>
        </div>

        <div class="code-section">
          <div class="lang-heading">Python Solution</div>
          <pre><code>${escapeHtml(code.python)}</code></pre>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
