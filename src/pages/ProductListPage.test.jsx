import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProductListPage } from './ProductListPage';
import { getProducts } from '../api/products';

vi.mock('../api/products', () => ({
    getProducts: vi.fn(),
}));

const PRODUCTS = [
    { id: '1', brand: 'Acer', model: 'Iconia Talk S', price: 170, image: 'acer.jpg' },
    { id: '2', brand: 'Samsung', model: 'Galaxy S23', price: 899, image: 'samsung.jpg' },
    { id: '3', brand: 'Google', model: 'Pixel 8', price: 799, image: 'google.jpg' },
];

function renderPage() {
    return render(
        <MemoryRouter>
            <ProductListPage />
        </MemoryRouter>
    );
}

describe('ProductListPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('shows a loading state before the products arrive', () => {
        getProducts.mockReturnValue(new Promise(() => {}));

        renderPage();

        expect(screen.getByText(/loading products/i)).toBeInTheDocument();
    });

    it('renders every product once the request resolves', async () => {
        getProducts.mockResolvedValue(PRODUCTS);

        renderPage();

        expect(await screen.findByText('Iconia Talk S')).toBeInTheDocument();
        expect(screen.getByText('Galaxy S23')).toBeInTheDocument();
        expect(screen.getByText('Pixel 8')).toBeInTheDocument();
    });

    it('shows an error message when the request fails', async () => {
        getProducts.mockRejectedValue(new Error('network error'));

        renderPage();

        expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
    });

    it('filters the list by brand as the user types', async () => {
        getProducts.mockResolvedValue(PRODUCTS);
        const user = userEvent.setup();

        renderPage();
        await screen.findByText('Iconia Talk S');

        await user.type(screen.getByRole('searchbox', { name: /search products/i }), 'sam');

        expect(screen.getByText('Galaxy S23')).toBeInTheDocument();
        expect(screen.queryByText('Iconia Talk S')).not.toBeInTheDocument();
        expect(screen.queryByText('Pixel 8')).not.toBeInTheDocument();
    });

    it('filters the list by model too, case-insensitively', async () => {
        getProducts.mockResolvedValue(PRODUCTS);
        const user = userEvent.setup();

        renderPage();
        await screen.findByText('Iconia Talk S');

        await user.type(screen.getByRole('searchbox', { name: /search products/i }), 'PIXEL');

        expect(screen.getByText('Pixel 8')).toBeInTheDocument();
        expect(screen.queryByText('Galaxy S23')).not.toBeInTheDocument();
    });

    it('shows an empty-results message when nothing matches the search', async () => {
        getProducts.mockResolvedValue(PRODUCTS);
        const user = userEvent.setup();

        renderPage();
        await screen.findByText('Iconia Talk S');

        await user.type(screen.getByRole('searchbox', { name: /search products/i }), 'nokia');

        expect(await screen.findByText(/no products match your search/i)).toBeInTheDocument();
    });
});
