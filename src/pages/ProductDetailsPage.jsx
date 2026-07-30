import { useState } from 'react';
import { Link, useParams } from 'react-router';

import { mockProducts } from '../mocks/products';
import styles from './ProductDetailsPage.module.css';

export function ProductDetailsPage() {
    const { id } = useParams();
    const product = mockProducts.find((item) => item.id === id);

    const [selectedStorage, setSelectedStorage] = useState(product?.storageOptions[0].code);
    const [selectedColor, setSelectedColor] = useState(product?.colorOptions[0].code);

    if (!product) {
        return (
            <section>
                <p>Product not found.</p>
                <Link to="/">Back to product list</Link>
            </section>
        );
    }

    const {
        brand,
        model,
        price,
        cpu,
        ram,
        os,
        screenResolution,
        battery,
        cameras,
        dimensions,
        weight,
        storageOptions,
        colorOptions,
    } = product;

    const handleAddToCart = () => {
        console.log('Add to cart', {
            id: product.id,
            colorCode: selectedColor,
            storageCode: selectedStorage,
        });
    };

    return (
        <section aria-labelledby="product-details-title">
            <Link className={styles.backLink} to="/">
                &larr; Back to product list
            </Link>

            <div className={styles.detailsView}>
                <div className={styles.imagePlaceholder} aria-hidden="true" />

                <div className={styles.info}>
                    <div className={styles.description}>
                        <h1 id="product-details-title" className={styles.title}>
                            {brand} {model}
                        </h1>
                        <p className={styles.price}>{price} €</p>

                        <dl className={styles.specList}>
                            <div className={styles.specRow}>
                                <dt>Brand</dt>
                                <dd>{brand}</dd>
                            </div>
                            <div className={styles.specRow}>
                                <dt>Model</dt>
                                <dd>{model}</dd>
                            </div>
                            <div className={styles.specRow}>
                                <dt>CPU</dt>
                                <dd>{cpu}</dd>
                            </div>
                            <div className={styles.specRow}>
                                <dt>RAM</dt>
                                <dd>{ram}</dd>
                            </div>
                            <div className={styles.specRow}>
                                <dt>Operating system</dt>
                                <dd>{os}</dd>
                            </div>
                            <div className={styles.specRow}>
                                <dt>Screen resolution</dt>
                                <dd>{screenResolution}</dd>
                            </div>
                            <div className={styles.specRow}>
                                <dt>Battery</dt>
                                <dd>{battery}</dd>
                            </div>
                            <div className={styles.specRow}>
                                <dt>Cameras</dt>
                                <dd>{cameras}</dd>
                            </div>
                            <div className={styles.specRow}>
                                <dt>Dimensions</dt>
                                <dd>{dimensions}</dd>
                            </div>
                            <div className={styles.specRow}>
                                <dt>Weight</dt>
                                <dd>{weight}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className={styles.actions}>
                        <fieldset className={styles.optionGroup}>
                            <legend>Storage</legend>
                            {storageOptions.map((option) => (
                                <label key={option.code} className={styles.optionLabel}>
                                    <input
                                        type="radio"
                                        name="storage"
                                        value={option.code}
                                        checked={selectedStorage === option.code}
                                        onChange={() => setSelectedStorage(option.code)}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </fieldset>

                        <fieldset className={styles.optionGroup}>
                            <legend>Color</legend>
                            {colorOptions.map((option) => (
                                <label key={option.code} className={styles.optionLabel}>
                                    <input
                                        type="radio"
                                        name="color"
                                        value={option.code}
                                        checked={selectedColor === option.code}
                                        onChange={() => setSelectedColor(option.code)}
                                    />
                                    <span
                                        className={styles.colorSwatch}
                                        style={{ backgroundColor: option.hex }}
                                        aria-hidden="true"
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </fieldset>

                        <button type="button" className={styles.addButton} onClick={handleAddToCart}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
