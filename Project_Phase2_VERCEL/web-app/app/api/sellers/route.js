import toysRepo from "../../repo/toysrepo"

export async function GET(request) {
    const sellers = await toysRepo.getSellers(); 
    return Response.json(sellers);
}

export async function POST(request){
    const item=await request.json();
   
    return Response.json(item,{status: 200})
}