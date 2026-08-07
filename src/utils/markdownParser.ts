import { ParsedSubmission } from '../types';

export function serializeSubmission(
  rollNumber: string,
  assignmentCode: string,
  assignmentTitle: string,
  code: { cpp: string; java: string; python: string }
): string {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

  return `# Comparative OOP Submission

- Roll Number: ${rollNumber.trim()}
- Assignment: ${assignmentCode} - ${assignmentTitle}
- Saved At: ${timestamp}

\`\`\`cpp
${code.cpp.trim()}
\`\`\`

\`\`\`java
${code.java.trim()}
\`\`\`

\`\`\`python
${code.python.trim()}
\`\`\`
`;
}

export function parseSubmission(content: string): ParsedSubmission {
  let rollNumber = '';
  let assignmentCode = 'A01';
  let assignmentTitle = 'Introduction to Classes';
  let savedAt = '';

  const rollMatch = content.match(/-\s*Roll Number:\s*(.+)/i);
  if (rollMatch) {
    rollNumber = rollMatch[1].trim();
  }

  const assignMatch = content.match(/-\s*Assignment:\s*([A-Z0-9]+)\s*-\s*(.+)/i);
  if (assignMatch) {
    assignmentCode = assignMatch[1].trim();
    assignmentTitle = assignMatch[2].trim();
  } else {
    // Alternative fallback regex
    const altMatch = content.match(/-\s*Assignment:\s*(.+)/i);
    if (altMatch) {
      const parts = altMatch[1].split('-');
      if (parts.length > 1) {
        assignmentCode = parts[0].trim();
        assignmentTitle = parts.slice(1).join('-').trim();
      } else {
        assignmentCode = altMatch[1].trim();
      }
    }
  }

  const savedAtMatch = content.match(/-\s*Saved At:\s*(.+)/i);
  if (savedAtMatch) {
    savedAt = savedAtMatch[1].trim();
  }

  // Extract code blocks
  const extractBlock = (lang: string): string => {
    // Regex looking for ```cpp ... ``` or ```c++ ... ```
    const regex = new RegExp(`\`\`\`(?:${lang}|c\\+\\+)?\\s*\\n([\\s\\S]*?)\`\`\``, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : '';
  };

  // Dedicated regex for C++, Java, and Python
  const cppRegex = /```(?:cpp|c\+\+)\s*\n([\s\S]*?)```/i;
  const javaRegex = /```java\s*\n([\s\S]*?)```/i;
  const pyRegex = /```python\s*\n([\s\S]*?)```/i;

  const cppMatch = content.match(cppRegex);
  const javaMatch = content.match(javaRegex);
  const pyMatch = content.match(pyRegex);

  return {
    rollNumber,
    assignmentCode,
    assignmentTitle,
    savedAt,
    code: {
      cpp: cppMatch ? cppMatch[1].trim() : '',
      java: javaMatch ? javaMatch[1].trim() : '',
      python: pyMatch ? pyMatch[1].trim() : '',
    },
  };
}
