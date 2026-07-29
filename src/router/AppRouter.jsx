import { Route, Routes, Link } from 'react-router';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { ProductListPage } from '../pages/ProductListPage';

function NotFoundPage() {
    return (
        <main>
            <h1>Page not found</h1>
            <p>The page you are looking for does not exist.</p>

            <Link to="/">Back to product list</Link>
        </main>
    );
}

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

