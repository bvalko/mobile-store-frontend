import { Outlet } from 'react-router';

import { Header } from '../Header/Header.jsx';
import { CartProvider } from '../../context/CartProvider';
import { BreadcrumbProvider } from '../../context/BreadcrumbProvider';
import styles from './AppLayout.module.css';

export function AppLayout() {
    return (
        <CartProvider>
            <BreadcrumbProvider>
                <div className={styles.shell}>
                    <Header />

                    <main className={styles.main}>
                        <Outlet />
                    </main>
                </div>
            </BreadcrumbProvider>
        </CartProvider>
    );
}