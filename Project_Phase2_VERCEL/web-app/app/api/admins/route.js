import toysRepo from "../../repo/toysrepo"

export async function GET(request) {
    const admins = await toysRepo.getAdmins(); 
    return Response.json(admins);
}

export async function POST(request){
    const item=await request.json();
   
    return Response.json(item,{status: 200})
}