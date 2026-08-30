/**
 * Phase template + progress utilities.
 *
 * Separation of concerns:
 *  - template: phase structure from the role (fetched from API, cached in localStorage)
 *  - progress: per-user mutable state (task statuses, current phase index)
 *  - merged phases: the single source of truth for the UI
 *
 * localStorage keys:
 *  - 'onboardme_phaseTemplate' : last-fetched phase template (from API)
 *  - 'onboardme_phaseProgress' : current user progress { currentPhaseIndex, taskStatuses }
 */

const TEMPLATE_KEY = 'onboardme_phaseTemplate';
const PROGRESS_KEY = 'onboardme_phaseProgress';

// ── Template (structure from API) ──────────────────────────────────────────

export function getCachedTemplate() {
  try {
    const raw = localStorage.getItem(TEMPLATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCachedTemplate(template) {
  try {
    localStorage.setItem(TEMPLATE_KEY, JSON.stringify(template));
  } catch (e) {
    console.warn('Failed to cache phase template:', e);
  }
}

export async function fetchTemplate(token) {
  const url = `${import.meta.env.VITE_API_URL}/api/users/profile`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Template fetch failed: ${res.status}`);
  const json = await res.json();
  const template = json.user?.phaseTemplate;
  if (Array.isArray(template)) {
    setCachedTemplate(template);
  }
  return template;
}

// ── Progress (mutable per-user state) ─────────────────────────────────────

export function getProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setProgress(progress) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('Failed to persist phase progress:', e);
  }
}

/**
 * Extract the current progress snapshot from a merged phases array.
 * Returns { currentPhaseIndex, taskStatuses }.
 */
export function extractProgress(phases) {
  const currentPhaseIndex = phases.findIndex((p) => p.status === 'current');
  const taskStatuses = {};
  phases.forEach((phase, pi) => {
    phase.tasks.forEach((task, ti) => {
      taskStatuses[`${pi}_${ti}`] = task.status;
    });
  });
  return { currentPhaseIndex, taskStatuses };
}

/**
 * Persist the current progress to localStorage (and optionally to backend).
 * Safe to call on every state change; backend write is best-effort.
 */
export function persistProgress(phases, token, userId) {
  const progress = extractProgress(phases);
  setProgress(progress);

  if (token && userId) {
    const url = `${import.meta.env.VITE_API_URL}/api/users/${userId}/progress`;
    fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(progress),
    }).catch((e) => console.warn('Backend progress sync failed:', e));
  }
}

// ── Merge ──────────────────────────────────────────────────────────────────

const DEFAULT_TASK_STATUS = 'upcoming';
const DEFAULT_PHASE_STATUS = 'pending';

/**
 * Merge a phase template with stored progress into a UI-ready phases array.
 *
 * Rules:
 *  - If no template is available, return [] (UI should show empty state).
 *  - progress.currentPhaseIndex marks which phase is "current"; earlier ones
 *    are "complete", later ones are "pending".
 *  - taskStatuses from progress overlay the template's task statuses.
 *  - Task indices not present in the template are ignored (orphaned progress).
 *  - Task indices in the template not present in progress get DEFAULT_TASK_STATUS.
 */
export function mergePhases(template, progress) {
  if (!Array.isArray(template) || template.length === 0) return [];

  const currentPhaseIndex = Number(progress?.currentPhaseIndex) || 0;

  return template.map((phase, pi) => {
    const status =
      pi < currentPhaseIndex ? 'complete'
        : pi === currentPhaseIndex ? 'current'
        : DEFAULT_PHASE_STATUS;

    const taskStatuses = progress?.taskStatuses || {};
    const tasks = phase.tasks.map((task, ti) => ({
      ...task,
      status: taskStatuses[`${pi}_${ti}`] || DEFAULT_TASK_STATUS,
    }));

    return { ...phase, status, tasks };
  });
}

/**
 * Full initialization: fetch fresh template from API if token is available,
 * fall back to cached template, then merge with stored progress.
 *
 * Returns { phases, token, userId } where phases is the merged array ready
 * for the UI, or null if there's no template and no cached template.
 */
export async function initializePhases(token, userId) {
  let template;
  if (token) {
    try {
      template = await fetchTemplate(token);
    } catch (e) {
      console.warn('API template fetch failed, using cache:', e);
      template = getCachedTemplate();
    }
  } else {
    template = getCachedTemplate();
  }

  if (!template || template.length === 0) return null;

  const progress = getProgress();
  const phases = mergePhases(template, progress);
  return { phases, token, userId };
}

export { PROGRESS_KEY }
