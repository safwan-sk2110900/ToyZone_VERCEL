import toysRepo from "../../../repo/toysrepo.js"

export async function GET(request) {
    const topSeller = await toysRepo.getTopSeller(); 
    return Response.json(topSeller);
}

export async function POST(request){
    const item=await request.json();
   
    return Response.json(item,{status: 200})
}