const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
    products: `${API_BASE_URL}/api/product`,
    productById: (id) => `${API_BASE_URL}/api/product/${id}`,
    cart: `${API_BASE_URL}/api/cart`,
};
