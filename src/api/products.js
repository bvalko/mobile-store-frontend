import { API_ENDPOINTS } from '../config/api';
import { getCached, setCached } from '../utils/cache';
import { normalizeProduct } from './normalizeProduct';

export async function getProducts() {
    const cacheKey = 'products';
    const cached = getCached(cacheKey);
    if (cached) return cached;

    const response = await fetch(API_ENDPOINTS.products);
    if (!response.ok) throw new Error('Failed to fetch products');

    const data = await response.json();
    const products = data.map(normalizeProduct);

    setCached(cacheKey, products);
    return products;
}

export async function getProductById(id) {
    const cacheKey = `product:${id}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    const response = await fetch(API_ENDPOINTS.productById(id));
    if (!response.ok) throw new Error('Failed to fetch product');

    const data = await response.json();
    const product = normalizeProduct(data);

    setCached(cacheKey, product);
    return product;
}

export async function addToCart({ id, colorCode, storageCode }) {
    const response = await fetch(API_ENDPOINTS.cart, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, colorCode, storageCode }),
    });
    if (!response.ok) throw new Error('Failed to add product to cart');

    return response.json();
}
