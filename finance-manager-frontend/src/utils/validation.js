// Common form validation helpers
export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isRequired(value) {
  return value !== undefined && value !== null && value !== '';
}

export function minLength(value, min) {
  return value && value.length >= min;
}

export function maxLength(value, max) {
  return value && value.length <= max;
}
