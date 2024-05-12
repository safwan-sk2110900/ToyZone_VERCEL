import toysRepo from "../../../repo/toysrepo.js"

export async function GET(request) {
    const topProduct = await toysRepo.getTop(); 
    return Response.json(topProduct);
}

export async function POST(request){
    const item=await request.json();
   
    return Response.json(item,{status: 200})
}