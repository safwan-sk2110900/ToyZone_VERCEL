
import React from 'react'
import styles1 from '../../../public/node_modules/bootstrap/dist/css/bootstrap.css'
import styles from "../../page.module.css"

export default function Product({perProduct,items}) {
  const filteredProduct = []
  items.forEach(item=>{
    perProduct.forEach(product=>{
      if(item.id==product.productid){
        product.productid=item.name
        filteredProduct.push(product)
      }
    })
  })
  
  
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