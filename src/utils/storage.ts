const DRAFT_KEY_PREFIX = 'oop_studio_draft_';
const WORKSPACE_KEY = 'oop_studio_workspace';
const ROLL_NO_KEY = 'oop_studio_roll_number';
const THEME_KEY = 'oop_studio_theme';

export function saveLocalDraft(assignmentCode: string, code: { cpp: string; java: string; python: string }) {
  try {
    localStorage.setItem(`${DRAFT_KEY_PREFIX}${assignmentCode}`, JSON.stringify({
      code,
      savedAt: Date.now()
    }));
  } catch (e) {
    console.warn('Failed to save local draft', e);
  }
}

export function loadLocalDraft(assignmentCode: string): { cpp: string; java: string; python: string } | null {
  try {
    const raw = localStorage.getItem(`${DRAFT_KEY_PREFIX}${assignmentCode}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed.code || null;
  } catch (e) {
    return null;
  }
}

export function saveSavedRollNumber(roll: string) {
  localStorage.setItem(ROLL_NO_KEY, roll);
}

export function loadSavedRollNumber(): string {
  return localStorage.getItem(ROLL_NO_KEY) || '';
}

export function saveSavedWorkspace(path: string) {
  localStorage.setItem(WORKSPACE_KEY, path);
}

export function loadSavedWorkspace(): string {
  return localStorage.getItem(WORKSPACE_KEY) || '';
}

export function saveSavedTheme(theme: 'light' | 'dark') {
  localStorage.setItem(THEME_KEY, theme);
}

export function loadSavedTheme(): 'light' | 'dark' {
  return (localStorage.getItem(THEME_KEY) as 'light' | 'dark') || 'light';
}
