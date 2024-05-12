import Product from "@/app/components/PerProduct/Product"
import toysRepo from '../../repo/toysrepo';
import React from 'react'
import NavBar from '@/app/common/NavBar'
import Footer from '@/app/common/Footer'
export default async function Home() {
  
   
    const perProduct = await toysRepo.purchasePerProduct();
    const items = await toysRepo.getItems();
    
 
  return (
         <Product perProduct={perProduct} items={items}></Product>
  )
}
