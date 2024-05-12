'use client'
import React, { useState, useEffect } from 'react';
import styles from '../../page.module.css';
export default async function Home() {
  
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredProduct] = useState([]);

  useEffect(() => {
      async function fetchProducts() {
          try {
              const response = await fetch('/api/summary/perproduct', { method: 'GET' });
              const response1 = await fetch('/api/items', { method: 'GET' });
              const data = await response.json();
              const data1 = await response1.json();
              setProducts(data);
              setItems(data1)
              items.forEach(item=>{
                products.forEach(product=>{
                  if(item.id==product.productid){
                    product.productid=item.name
                    filteredProduct.push(product)
                  }
                })
              })
          } catch (error) {
              console.error('Failed to fetch data:', error);
          }
      }

      fetchProducts();

  }, []);


  
  
    
 
    return (
      <div className={styles.tableContainer}>
              <table className={styles.table}>
                  <thead>
                      <tr>
                          <th colSpan="2" className={styles.tableSellerHeader}>
                              Purchases Per Product
                          </th>
                      </tr>
                      <tr>
                          <th className={styles.tableSellerCell}>Product Name</th>
                          <th className={styles.tableSellerCell}>Total Quantity</th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredProduct.map(product => (
                          <tr className={styles.tableSellerRow}>
                              <td className={styles.tableSellerCell}>{product.productid}</td>
                              <td className={styles.tableSellerCell}>{product._sum.qty}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
  
    )
  
}

