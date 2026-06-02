const KEY = "sas.session";

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function signIn() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch (_error) {
    // Session storage can be unavailable in private or restricted browser contexts.
  }
}

export function signOut() {
  try {
    sessionStorage.removeItem(KEY);
  } catch (_error) {
    // Session storage can be unavailable in private or restricted browser contexts.
  }
}
