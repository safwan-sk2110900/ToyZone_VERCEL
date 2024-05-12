import toysRepo from "../../repo/toysrepo"

export async function GET(request) {
    const customers = await toysRepo.getCustomers(); 
    return Response.json(customers);
}

export async function POST(request){
    const item=await request.json();
   
    return Response.json(item,{status: 200})
}