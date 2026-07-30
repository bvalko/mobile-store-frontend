import { Link, useLocation } from "react-router";

import { useCart } from '../../context/useCart';
import { useBreadcrumb } from '../../context/useBreadcrumb';
import styles from './Header.module.css';

export function Header() {
    const { pathname } = useLocation();
    const { cartCount } = useCart();
    const { breadcrumbLabel } = useBreadcrumb();

    const isProductList = pathname === '/';
    const isProductDetails = pathname.startsWith('/product/');

    let currentPage = 'Page not found';

    if (isProductDetails) {
        currentPage = breadcrumbLabel ?? 'Product details';
    }

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link className={styles.brand} to="/">
                    Mobile Store
                </Link>

                <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                    <ol className={styles.breadcrumbList}>
                        <li>
                            {isProductList ? (
                                <span aria-current="page">Products</span>
                            ) : (
                                <Link to="/">Products</Link>
                            )}
                        </li>

                        {!isProductList && (
                            <>
                                <li aria-hidden="true">/</li>
                                <li aria-current="page">{currentPage}</li>
                            </>
                            )}
                    </ol>
                </nav>

                <div className={styles.cart} aria-label={`${cartCount} items in cart`}>
                    Cart: <strong>{cartCount}</strong>
                </div>
            </div>
        </header>
    );
}