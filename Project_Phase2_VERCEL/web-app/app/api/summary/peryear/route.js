import toysRepo from "../../../repo/toysrepo.js"

export async function GET(request) {
    const year = await toysRepo.getYear(); 
    return Response.json(year);
}

export async function POST(request){
    const item=await request.json();
   
    return Response.json(item,{status: 200})
}