import { describe, expect, it } from 'vitest';

import { isValidPhone, normalizePhone } from './phone';

describe('normalizePhone', () => {
  it('removes non-digit characters', () => {
    expect(normalizePhone('+7 (900) 123-45-67')).toBe('79001234567');
  });

  it('converts Russian phone starting with 8 to 7', () => {
    expect(normalizePhone('8 900 123 45 67')).toBe('79001234567');
  });

  it('keeps a phone starting with 7 unchanged', () => {
    expect(normalizePhone('79001234567')).toBe('79001234567');
  });

  it('returns digits for an international phone number', () => {
    expect(normalizePhone('+49 151 12345678')).toBe('4915112345678');
  });

  it('returns an empty string when there are no digits', () => {
    expect(normalizePhone('+ ()-')).toBe('');
  });
});

describe('isValidPhone', () => {
  it('returns true for a phone with 10 digits', () => {
    expect(isValidPhone('1234567890')).toBe(true);
  });

  it('returns true for a phone with 15 digits', () => {
    expect(isValidPhone('123456789012345')).toBe(true);
  });

  it('returns false for a phone with less than 10 digits', () => {
    expect(isValidPhone('123456789')).toBe(false);
  });

  it('returns false for a phone with more than 15 digits', () => {
    expect(isValidPhone('1234567890123456')).toBe(false);
  });

  it('validates a formatted phone after normalization', () => {
    expect(isValidPhone('+7 (900) 123-45-67')).toBe(true);
  });
});
