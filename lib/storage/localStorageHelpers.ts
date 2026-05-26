import { BriefingData } from "../schemas/briefingSchema";

export const STORAGE_KEY = "mug-briefing-draft";

/**
 * Retrieves the currently saved draft from local storage.
 * Safe for Server-Side Rendering (SSR).
 */
export function getDraft(): Partial<BriefingData> | null {
  if (typeof window === "undefined") return null;
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return null;
    return JSON.parse(rawData) as Partial<BriefingData>;
  } catch (error) {
    console.error("Failed to read draft from localStorage", error);
    return null;
  }
}

/**
 * Saves draft briefing data to local storage.
 * Safe for Server-Side Rendering (SSR).
 */
export function saveDraft(data: Partial<BriefingData>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save draft to localStorage", error);
  }
}

/**
 * Clears draft briefing data from local storage.
 * Safe for Server-Side Rendering (SSR).
 */
export function clearDraft(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear draft from localStorage", error);
  }
}
