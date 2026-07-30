import { Route, Routes, Link, useParams } from 'react-router';

import { AppLayout } from '../components/AppLayout/AppLayout';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { ProductListPage } from '../pages/ProductListPage';

function ProductDetailsRoute() {
    const { id } = useParams();
    return <ProductDetailsPage key={id} />;
}

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
                <Route path="/product/:id" element={<ProductDetailsRoute />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

