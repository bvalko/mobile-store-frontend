import { useState } from 'react';

import { CartContext } from './CartContext';

const CART_COUNT_STORAGE_KEY = 'cartCount';

function readStoredCartCount() {
    const stored = Number(localStorage.getItem(CART_COUNT_STORAGE_KEY));
    return Number.isFinite(stored) ? stored : 0;
}

export function CartProvider({ children }) {
    const [cartCount, setCartCount] = useState(readStoredCartCount);

    const updateCartCount = (count) => {
        setCartCount(count);
        localStorage.setItem(CART_COUNT_STORAGE_KEY, String(count));
    };

    return (
        <CartContext.Provider value={{ cartCount, updateCartCount }}>
            {children}
        </CartContext.Provider>
    );
}
