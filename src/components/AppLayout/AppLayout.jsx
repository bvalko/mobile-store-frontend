import { Outlet } from 'react-router';

import { Header } from '../Header/Header.jsx';
import styles from './AppLayout.module.css';

export function AppLayout() {
    return (
        <div className={styles.shell}>
            <Header cartCount={0} />

            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
}