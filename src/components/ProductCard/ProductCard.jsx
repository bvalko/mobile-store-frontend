import { Link } from 'react-router';
import styles from './ProductCard.module.css';

export function ProductCard({ product }) {
    const { id, brand, model, price, image } = product;

    return (
        <Link to={`/product/${id}`} className={styles.card}>
            <img className={styles.image} src={image} alt={`${brand} ${model}`} loading="lazy" />
            <div className={styles.info}>
                <p className={styles.brand}>{brand}</p>
                <p className={styles.model}>{model}</p>
                <p className={styles.price}>{price} €</p>
            </div>
        </Link>
    );
}
