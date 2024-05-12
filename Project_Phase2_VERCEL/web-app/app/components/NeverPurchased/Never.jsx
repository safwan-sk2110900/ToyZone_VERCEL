import React from 'react'
import styles from '../../page.module.css'
export default function Never({items}) {

  return (
    <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th colSpan="3" className={styles.tableSellerHeader}>
                            Products Never Purchased
                        </th>
                    </tr>
                    <tr>
                        <th className={styles.tableSellerCell}>Product Name</th>
                        <th className={styles.tableSellerCell}>Image</th>
                        <th className={styles.tableSellerCell}>Seller</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(product => (
                        <tr className={styles.tableSellerRow}>
                            <td className={styles.tableSellerCell}>{product.name}</td>
                            <td className={styles.tableSellerCell}><img src={`../../${product.image}` } alt={product.name} width="60%" height="25%" /></td>
                            <td className={styles.tableSellerCell}>{product.seller}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


  )
}
