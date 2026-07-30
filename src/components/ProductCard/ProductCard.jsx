import { Link } from 'react-router';
import styles from './ProductCard.module.css';

export function ProductCard({ product }) {
    const { id, brand, model, price } = product;

    return (
        <Link to={`/product/${id}`} className={styles.card}>
            <div className={styles.imagePlaceholder} aria-hidden="true" />
            <p className={styles.brand}>{brand}</p>
            <p className={styles.model}>{model}</p>
            <p className={styles.price}>{price} €</p>
        </Link>
    );
}
