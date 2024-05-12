import toysRepo from "../../repo/toysrepo"

export async function GET(request) {
    const items = await toysRepo.getItems(); 
    return Response.json(items);
}

export async function POST(request){
    const item=await request.json();
    const newitem=await toysRepo.addItem(item);
    return Response.json(newitem,{status: 200})
}