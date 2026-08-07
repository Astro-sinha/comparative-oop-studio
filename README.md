# Comparative OOP Studio

**Comparative OOP Studio** is a desktop application built for Object-Oriented Programming (OOP) education in the Department of Robotics and AI. It provides a side-by-side comparative coding environment for **C++**, **Java**, and **Python**, auto-saves student drafts, and exports standardized Markdown submission files (`{rollNumber}_{assignmentCode}.md`).

---

## 🌟 Key Features

- **Side-by-Side Tri-Language Monaco Editors**: Independent code panels for C++, Java, and Python with line numbers, tab indentation, syntax highlighting, undo/redo, copy, and reset confirmation modals.
- **Dynamic Resizable Layout**: Drag divider handles between editors or toggle individual panel visibility (C++, Java, Python). Falls back to tabbed view on smaller windows.
- **Focus / Expand Mode**: Maximizes any single code panel to fullscreen for distraction-free coding.
- **Roll Number & Folder Workspace Management**: Scans workspace folders for `.md` submissions and displays filename + save date/time. Clicking any submission loads it directly back into the editors.
- **Starter Templates (A01 - A04)**: Includes realistic starter code and instructions for:
  - `A01`: Introduction to Classes
  - `A02`: Constructors and Methods
  - `A03`: Classes, Objects, and Encapsulation
  - `A04`: Inheritance and Polymorphism
- **Interactive Submission Checklist**: Check off requirements as you complete your solution.
- **Light / Dark Mode**: Polished academic light mode with deep burgundy (#800020) accents and sleek dark mode.
- **Keyboard Shortcuts**:
  - `Cmd/Ctrl + S`: Save submission `.md` file to workspace
  - `Cmd/Ctrl + O`: Choose workspace folder / open file
  - `Cmd/Ctrl + N`: Reset to new assignment template

---

## 🛠️ Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

## 🚀 Setup & Development

### 1. Installation
Clone or navigate to the project directory and install dependencies:

```bash
cd comparative-oop-studio
npm install
```

### 2. Web Development Mode
To run the React application in your default browser:

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Native Electron Desktop Development Mode
To run the full native desktop app with Electron main process and native dialogs:

```bash
npm run dev:electron
```

---

## 📦 Building & Packaging Desktop Applications

To compile TypeScript and produce desktop installers/executables for macOS and Windows using `electron-builder`:

### Build Web & Electron Distributables
```bash
npm run build:electron
```

### Package for macOS (Produces `.dmg` and `.zip` in `dist-package/`)
```bash
npm run package:mac
```

### Package for Windows (Produces `.exe` NSIS installer and portable executable in `dist-package/`)
```bash
npm run package:win
```

---

## 📝 Submission File Pattern

Submissions are saved as single formatted Markdown files named `{rollNumber}_{assignmentCode}.md` (e.g. `45_A03.md`).

### File Format Standard:

```markdown
# Comparative OOP Submission

- Roll Number: 45
- Assignment: A03 - Classes, Objects, and Encapsulation
- Saved At: 2026-08-06 15:42:00

```cpp
[C++ code here]
```

```java
[Java code here]
```

```python
[Python code here]
```
```

---

## 📁 Project Architecture

```
comparative-oop-studio/
├── electron/
│   ├── main.ts              # Native IPC main process (dialogs, fs handlers)
│   └── preload.ts           # Safe context bridge window.electronAPI
├── src/
│   ├── components/
│   │   ├── Header.tsx       # Branding, Roll No, progress bar, dark mode, save
│   │   ├── Sidebar.tsx      # Workspace picker, templates, saved submissions list
│   │   ├── AssignmentOverview.tsx # Assignment card & submission checklist
│   │   ├── CodeEditorPanel.tsx    # Monaco editor instance & panel toolbar
│   │   ├── EditorContainer.tsx    # 3-pane resizable horizontal container
│   │   ├── SubmissionPreviewModal.tsx # Formatted markdown preview & export
│   │   └── Toast.tsx        # Toast notification system
│   ├── data/
│   │   └── templates.ts     # A01-A04 templates & starter code
│   ├── utils/
│   │   ├── markdownParser.ts# Submission serializer & parser
│   │   ├── fileSystem.ts    # Native IPC & web fallback file manager
│   │   └── storage.ts       # Auto-save local draft manager
│   ├── types/
│   │   └── index.ts         # TypeScript definitions
│   ├── App.tsx              # Main state coordinator & keyboard listeners
│   ├── index.css            # Design tokens (Burgundy #800020, dark mode)
│   └── main.tsx             # React entrypoint
├── package.json
├── electron-builder.json    # macOS & Windows packaging config
└── README.md
```

---

*Department of Robotics and AI — Educational Software Suite*
