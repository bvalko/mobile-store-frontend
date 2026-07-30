import { beforeEach, describe, expect, it, vi } from 'vitest';

import { addToCart, getProductById, getProducts } from './products';

function mockFetchOnce({ ok, json }) {
    globalThis.fetch = vi.fn().mockResolvedValue({
        ok,
        json: () => Promise.resolve(json),
    });
}

describe('products API', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    describe('getProducts', () => {
        it('returns the normalized list on a successful response', async () => {
            mockFetchOnce({
                ok: true,
                json: [{ id: '1', brand: 'Acer', model: 'Iconia', price: '170', imgUrl: 'a.jpg' }],
            });

            const products = await getProducts();

            expect(products).toEqual([
                expect.objectContaining({ id: '1', brand: 'Acer', price: 170, image: 'a.jpg' }),
            ]);
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        it('throws when the endpoint responds with a non-ok status', async () => {
            mockFetchOnce({ ok: false, json: [] });

            await expect(getProducts()).rejects.toThrow('Failed to fetch products');
        });

        it('propagates a network failure instead of swallowing it', async () => {
            globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network down'));

            await expect(getProducts()).rejects.toThrow('Network down');
        });

        it('serves the second call from the cache without hitting fetch again', async () => {
            mockFetchOnce({
                ok: true,
                json: [{ id: '1', brand: 'Acer', model: 'Iconia', price: '170', imgUrl: 'a.jpg' }],
            });

            await getProducts();
            await getProducts();

            expect(fetch).toHaveBeenCalledTimes(1);
        });
    });

    describe('getProductById', () => {
        it('returns the normalized product on a successful response', async () => {
            mockFetchOnce({
                ok: true,
                json: { id: '1', brand: 'Acer', model: 'Iconia', price: '170', imgUrl: 'a.jpg' },
            });

            const product = await getProductById('1');

            expect(product).toEqual(expect.objectContaining({ id: '1', brand: 'Acer' }));
        });

        it('throws when the product is not found', async () => {
            mockFetchOnce({ ok: false, json: {} });

            await expect(getProductById('missing')).rejects.toThrow('Failed to fetch product');
        });

        it('caches per product id, so different ids each trigger their own fetch', async () => {
            globalThis.fetch = vi
                .fn()
                .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ id: '1', brand: 'Acer' }) })
                .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ id: '2', brand: 'Samsung' }) });

            await getProductById('1');
            await getProductById('2');

            expect(fetch).toHaveBeenCalledTimes(2);
        });
    });

    describe('addToCart', () => {
        it('posts the id, colorCode and storageCode and returns the cart count', async () => {
            mockFetchOnce({ ok: true, json: { count: 3 } });

            const result = await addToCart({ id: '1', colorCode: '1000', storageCode: '2000' });

            expect(result).toEqual({ count: 3 });
            expect(fetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify({ id: '1', colorCode: '1000', storageCode: '2000' }),
                })
            );
        });

        it('throws when the cart endpoint rejects the request', async () => {
            mockFetchOnce({ ok: false, json: {} });

            await expect(
                addToCart({ id: '1', colorCode: '1000', storageCode: '2000' })
            ).rejects.toThrow('Failed to add product to cart');
        });
    });
});
