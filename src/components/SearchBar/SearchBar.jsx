import styles from './SearchBar.module.css';

export function SearchBar({ value, onChange }) {
    return (
      <label className={styles.search}>
            <span className={styles.label}>Search products</span>
            <input
                className={styles.input}
                type="search"
                value={value}
                placeholder="Search by name"
                onChange={(event) => onChange(event.target.value)}
            />
      </label>  
    );
}