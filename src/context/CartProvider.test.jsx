import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { CartProvider } from './CartProvider';
import { useCart } from './useCart';

function CartCountProbe() {
    const { cartCount, updateCartCount } = useCart();

    return (
        <>
            <span data-testid="count">{cartCount}</span>
            <button onClick={() => updateCartCount(5)}>set to 5</button>
        </>
    );
}

describe('CartProvider', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('starts at 0 when nothing is stored yet', () => {
        render(
            <CartProvider>
                <CartCountProbe />
            </CartProvider>
        );

        expect(screen.getByTestId('count')).toHaveTextContent('0');
    });

    it('reads the initial count from localStorage', () => {
        localStorage.setItem('cartCount', '7');

        render(
            <CartProvider>
                <CartCountProbe />
            </CartProvider>
        );

        expect(screen.getByTestId('count')).toHaveTextContent('7');
    });

    it('updates the count and persists it to localStorage', () => {
        render(
            <CartProvider>
                <CartCountProbe />
            </CartProvider>
        );

        act(() => screen.getByText('set to 5').click());

        expect(screen.getByTestId('count')).toHaveTextContent('5');
        expect(localStorage.getItem('cartCount')).toBe('5');
    });
});
