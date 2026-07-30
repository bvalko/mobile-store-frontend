import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProductDetailsPage } from './ProductDetailsPage';
import { addToCart, getProductById } from '../api/products';
import { CartProvider } from '../context/CartProvider';
import { BreadcrumbProvider } from '../context/BreadcrumbProvider';
import { useCart } from '../context/useCart';

vi.mock('../api/products', () => ({
    getProductById: vi.fn(),
    addToCart: vi.fn(),
}));

const PRODUCT = {
    id: '1',
    brand: 'Acer',
    model: 'Iconia Talk S',
    price: 170,
    image: 'acer.jpg',
    cpu: 'Quad-core 1.3 GHz Cortex-A53',
    ram: '2 GB RAM',
    os: 'Android 6.0',
    screenResolution: '720 x 1280 pixels',
    battery: '3400 mAh',
    cameras: '13 MP',
    dimensions: '191.7 x 101 x 9.4 mm',
    weight: '260 g',
    storageOptions: [
        { code: '2000', label: '16 GB' },
        { code: '2001', label: '32 GB' },
    ],
    colorOptions: [
        { code: '1000', label: 'Black' },
        { code: '1001', label: 'Gold' },
    ],
};

function CartCountProbe() {
    const { cartCount } = useCart();
    return <span data-testid="cart-count">{cartCount}</span>;
}

function renderPage(id = '1') {
    return render(
        <MemoryRouter initialEntries={[`/product/${id}`]}>
            <CartProvider>
                <BreadcrumbProvider>
                    <CartCountProbe />
                    <Routes>
                        <Route path="/product/:id" element={<ProductDetailsPage />} />
                    </Routes>
                </BreadcrumbProvider>
            </CartProvider>
        </MemoryRouter>
    );
}

describe('ProductDetailsPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('shows a loading state before the product arrives', () => {
        getProductById.mockReturnValue(new Promise(() => {}));

        renderPage();

        expect(screen.getByText(/loading product/i)).toBeInTheDocument();
    });

    it('shows a not-found message when the request fails', async () => {
        getProductById.mockRejectedValue(new Error('not found'));

        renderPage();

        expect(await screen.findByText(/product not found/i)).toBeInTheDocument();
    });

    it('selects the first storage and color option by default', async () => {
        getProductById.mockResolvedValue(PRODUCT);

        renderPage();

        expect(await screen.findByRole('radio', { name: '16 GB' })).toBeChecked();
        expect(screen.getByRole('radio', { name: '32 GB' })).not.toBeChecked();
        expect(screen.getByRole('radio', { name: 'Black' })).toBeChecked();
        expect(screen.getByRole('radio', { name: 'Gold' })).not.toBeChecked();
    });

    it('lets the user change the selected storage and color', async () => {
        getProductById.mockResolvedValue(PRODUCT);
        const user = userEvent.setup();

        renderPage();
        await screen.findByRole('radio', { name: '16 GB' });

        await user.click(screen.getByRole('radio', { name: '32 GB' }));
        await user.click(screen.getByRole('radio', { name: 'Gold' }));

        expect(screen.getByRole('radio', { name: '32 GB' })).toBeChecked();
        expect(screen.getByRole('radio', { name: 'Gold' })).toBeChecked();
    });

    it('sends the selected options to addToCart and updates the cart count', async () => {
        getProductById.mockResolvedValue(PRODUCT);
        addToCart.mockResolvedValue({ count: 3 });
        const user = userEvent.setup();

        renderPage();
        await screen.findByRole('radio', { name: '16 GB' });

        await user.click(screen.getByRole('radio', { name: '32 GB' }));
        await user.click(screen.getByRole('button', { name: /add to cart/i }));

        await waitFor(() =>
            expect(addToCart).toHaveBeenCalledWith({
                id: '1',
                colorCode: '1000',
                storageCode: '2001',
            })
        );
        expect(await screen.findByTestId('cart-count')).toHaveTextContent('3');
    });

    it('leaves the cart count untouched when addToCart fails', async () => {
        getProductById.mockResolvedValue(PRODUCT);
        addToCart.mockRejectedValue(new Error('server error'));
        const user = userEvent.setup();

        renderPage();
        await screen.findByRole('radio', { name: '16 GB' });

        await user.click(screen.getByRole('button', { name: /add to cart/i }));

        await waitFor(() => expect(addToCart).toHaveBeenCalled());
        expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    });
});
