import toysRepo from "../../../repo/toysrepo.js"

export async function GET(request) {
    const product= await toysRepo.getNeverPurchased(); 
    return Response.json(product);
}

export async function POST(request){
    const item=await request.json();
   
    return Response.json(item,{status: 200})
}