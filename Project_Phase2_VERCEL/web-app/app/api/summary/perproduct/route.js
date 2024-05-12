import toysRepo from "../../../repo/toysrepo"

export async function GET(request) {
    const perProduct = await toysRepo.purchasePerProduct(); 
    return Response.json(perProduct);
}

export async function POST(request){
    const item=await request.json();
   
    return Response.json(item,{status: 200})
}