"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../page.module.css';

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // You can add additional logic or fetch data here
    // For demonstration, I'm using setTimeout to mimic a loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the timeout duration as needed
  };

  return (
    <div className={isLoading ? `${styles.cardContainerCustom} ${styles.blur}` : styles.cardContainerCustom}>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}
      <div className={styles.cardCustom}>
        <h1 className={styles.summaryHeading}>Application Summary</h1>
        <ul className={styles.linkList}>
        <li>
            <Link href="/summary/PerYear/">
              <button className={styles.linkButton} onClick={handleClick}>Sales Analysis Over Years</button>
            </Link>
          </li>
          <li>
            <Link href="/summary/perLocation/">
              <button className={styles.linkButton} onClick={handleClick}>Regional Sales Analysis</button>
            </Link>
          </li>
          <li>
            <Link href="/summary/PerProduct/">
              <button className={styles.linkButton} onClick={handleClick}>Purchases Per Product</button>
            </Link>
          </li>
          <li>
            <Link href="/summary/TopCustomer/">
              <button className={styles.linkButton} onClick={handleClick}>Top 3 Active Customers</button>
            </Link>
          </li>
          <li>
            <Link href="/summary/TopProduct/">
              <button className={styles.linkButton} onClick={handleClick}>Top 3 Selling Products</button>
            </Link>
          </li>
          <li>
            <Link href="/summary/TopSeller/">
              <button className={styles.linkButton} onClick={handleClick}>Top Revenue Generating Sellers</button>
            </Link>
          </li>
          
          <li>
            <Link href="/summary/NeverPurchased/">
              <button className={styles.linkButton} onClick={handleClick}>Items Never Purchased</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}