import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getCached, setCached } from './cache';

describe('cache', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('returns null when nothing stored for a key', () => {
        expect(getCached('missing')).toBeNull();
    });

    it('returns the stored value while it has not expired', () => {
        setCached('products', [{ id: '1' }]);

        expect(getCached('products')).toEqual([{ id: '1' }]);
    });

    it('returns null and clears the entry once the TTL has passed', () => {
        vi.useFakeTimers();
        vi.setSystemTime(0);

        setCached('products', [{ id: '1' }], 60 * 60 * 1000);

        vi.setSystemTime(60 * 60 * 1000 + 1);

        expect(getCached('products')).toBeNull();
        expect(localStorage.getItem('products')).toBeNull();

        vi.useRealTimers();
    });

    it('still returns the value one millisecond before it expires', () => {
        vi.useFakeTimers();
        vi.setSystemTime(0);

        setCached('products', 'value', 1000);

        vi.setSystemTime(999);

        expect(getCached('products')).toBe('value');

        vi.useRealTimers();
    });
});
