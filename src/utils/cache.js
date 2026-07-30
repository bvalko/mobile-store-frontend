const ONE_HOUR_MS = 60 * 60 * 1000;

export function getCached(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const { value, expiresAt } = JSON.parse(raw);
    if (Date.now() > expiresAt) {
        localStorage.removeItem(key);
        return null;
    }

    return value;
}

export function setCached(key, value, ttlMs = ONE_HOUR_MS) {
    localStorage.setItem(key, JSON.stringify({ value, expiresAt: Date.now() + ttlMs }));
}
