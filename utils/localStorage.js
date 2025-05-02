// utils/localStorage.js

const STORAGE_KEY = "newtonnator_guesses";

export function saveGuessSession(session) {
  const existing = getGuessHistory();
  const updated = [...existing, session];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getGuessHistory() {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function clearGuessHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
