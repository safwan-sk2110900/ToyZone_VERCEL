'use client'
import React, { useState, useEffect } from 'react';
import styles from '../../page.module.css';

export default function Page() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('/api/summary/topproduct', { method: 'GET' });
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch sellers:', error);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th colSpan="3" className={styles.tableSellerHeader}>
                            Top Products
                        </th>
                    </tr>
                    <tr>
                        <th className={styles.tableSellerCell}>Product Name</th>
                        <th className={styles.tableSellerCell}>Image</th>
                        <th className={styles.tableSellerCell}>Seller</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr className={styles.tableSellerRow}>
                            <td className={styles.tableSellerCell}>{product.name}</td>
                            <td className={styles.tableSellerCell}><img src={`../../${product.image}` } alt={product.name} width="60%" height="25%" /></td>
                            <td className={styles.tableSellerCell}>{product.seller}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
