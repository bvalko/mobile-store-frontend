import { useEffect, useMemo, useState } from 'react';

import { SearchBar } from '../components/SearchBar/SearchBar';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { getProducts } from '../api/products';
import styles from './ProductListPage.module.css'

export function ProductListPage(){
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        getProducts()
            .then((data) => {
                setProducts(data);
                setStatus('success');
            })
            .catch(() => setStatus('error'));
    }, []);

    const filteredProducts = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return products;

        return products.filter(
            (product) =>
                product.brand.toLowerCase().includes(term) ||
                product.model.toLowerCase().includes(term)
        );
    }, [products, searchTerm]);

    return (
        <section className={styles.page} aria-labelledby="product-list-title">
            <header className={styles.pageHeader}>
                <h1 className={styles.title}>Mobile devices</h1>
                <div className={styles.search}>
                    <SearchBar id="product-list-search" value={searchTerm} onChange={setSearchTerm} />
                </div>
            </header>

            {status === 'error' && (
                <div className={styles.productGrid}>
                    <div className={styles.emptyState}>
                        <p>Something went wrong while loading the products.</p>
                    </div>
                </div>
            )}

            {status !== 'error' && filteredProducts.length === 0 && (
                <div className={styles.productGrid}>
                    <div className={styles.emptyState}>
                        <p>{status === 'loading' ? 'Loading products…' : 'No products match your search.'}</p>
                    </div>
                </div>
            )}

            {status !== 'error' && filteredProducts.length > 0 && (
                <div className={styles.productGrid}>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    )
}
