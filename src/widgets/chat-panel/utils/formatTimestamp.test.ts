import { describe, expect, it } from 'vitest';

import { toMilliseconds } from './formatTimestamp';

describe('toMilliseconds', () => {
  it('converts seconds to milliseconds', () => {
    expect(toMilliseconds(1_700_000_000)).toBe(1_700_000_000_000);
  });

  it('keeps milliseconds unchanged', () => {
    expect(toMilliseconds(1_700_000_000_000)).toBe(1_700_000_000_000);
  });
});
