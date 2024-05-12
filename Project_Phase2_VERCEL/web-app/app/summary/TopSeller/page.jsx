'use client'
import React, { useState, useEffect } from 'react';
import styles from '../../page.module.css';

export default function Page() {
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        async function fetchSellers() {
            try {
                const response = await fetch('/api/summary/topseller', { method: 'GET' });
                const data = await response.json();
                setSellers(data);
            } catch (error) {
                console.error('Failed to fetch sellers:', error);
            }
        }

        fetchSellers();
    }, []);

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th colSpan="2" className={styles.tableSellerHeader}>
                            Top Seller
                        </th>
                    </tr>
                    <tr>
                        <th className={styles.tableSellerCell}>Company Name</th>
                        <th className={styles.tableSellerCell}>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {sellers.map(seller => (
                        <tr className={styles.tableSellerRow} key={seller.companyName}>
                            <td className={styles.tableSellerCell}>{seller.companyName}</td>
                            <td className={styles.tableSellerCell}>{seller.account}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
