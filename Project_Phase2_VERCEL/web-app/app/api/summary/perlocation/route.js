import toysRepo from "../../../repo/toysrepo.js"

export async function GET(request) {
    const location = await toysRepo.getLocation(); 
    return Response.json(location);
}

export async function POST(request){
    const item=await request.json();
   
    return Response.json(item,{status: 200})
}