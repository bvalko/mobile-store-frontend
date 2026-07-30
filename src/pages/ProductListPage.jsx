import { useState } from 'react';

import { SearchBar } from '../components/SearchBar/SearchBar';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { mockProducts } from '../mocks/products';
import styles from './ProductListPage.module.css'



export function ProductListPage(){
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <section className={styles.page} aria-labelledby="product-list-title">
            <header className={styles.pageHeader}>
                <h1 className={styles.title}>Mobile devices</h1>
                <div className={styles.search}>
                    <SearchBar id="product-list-search" value={searchTerm} onChange={setSearchTerm} />
                </div>
            </header>

             <div className={styles.productGrid}>
                {mockProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            
            {/* <div className={styles.productGrid}>
                <div className={styles.emptyState}>
                    <p>Products will appear here</p>

                    {searchTerm && (
                        <p>
                            Current search: <strong>{searchTerm}</strong>
                        </p>
                    )}
                </div>
            </div> */}
        </section>
    )
}

