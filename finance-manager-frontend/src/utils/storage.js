// LocalStorage/sessionStorage helpers
export function setStorage(key, value, session = false) {
  const storage = session ? window.sessionStorage : window.localStorage;
  storage.setItem(key, JSON.stringify(value));
}

export function getStorage(key, session = false) {
  const storage = session ? window.sessionStorage : window.localStorage;
  const item = storage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function removeStorage(key, session = false) {
  const storage = session ? window.sessionStorage : window.localStorage;
  storage.removeItem(key);
}
