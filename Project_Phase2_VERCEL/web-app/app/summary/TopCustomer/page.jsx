'use client'
import React, { useState, useEffect } from 'react';
import styles from '../../page.module.css';

export default function Page() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        async function getCustomer() {
            try {
                const response = await fetch('/api/summary/topcustomer', { method: 'GET' });
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error('Failed to fetch customers:', error);
            }
        }

        getCustomer();
    }, []);

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th colSpan="2" className={styles.tableSellerHeader}>
                            Top Active Customers
                        </th>
                    </tr>
                    <tr>
                        <th className={styles.tableSellerCell}>Username</th>
                        <th className={styles.tableSellerCell}>Total Spent</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr className={styles.tableSellerRow}>
                            <td className={styles.tableSellerCell}>{customer.username}</td>
                            <td className={styles.tableSellerCell}>{customer._sum.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}
