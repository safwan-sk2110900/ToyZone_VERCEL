import React from 'react'
import toysRepo from '../../repo/toysrepo';
import Never from '../../components/NeverPurchased/Never'
export default async function page() {
    const nvrItems = await toysRepo.getNeverPurchased()
  return (
    <Never items={nvrItems}></Never>
  )
}


export async function POST(request){
  const item=await request.json();
 
  return Response.json(item,{status: 200})
}