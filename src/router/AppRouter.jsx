import { Route, Routes, Link } from 'react-router';

import { AppLayout } from '../components/AppLayout/AppLayout';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { ProductListPage } from '../pages/ProductListPage';

function NotFoundPage() {
    return (
        <section>
            <h1>Page not found</h1>
            <p>The page you are looking for does not exist.</p>

            <Link to="/">Back to product list</Link>
        </section>
    );
}

export function AppRouter() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route index element={<ProductListPage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

