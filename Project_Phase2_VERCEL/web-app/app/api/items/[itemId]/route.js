import toysRepo from "../../../repo/toysrepo"

export async function GET(request,{params}){
    const id=parseInt(params.itemId);
    const item=await toysRepo.getItemwithID(id);
    return Response.json(item,{status: 200})
}

export async function PUT(request, {params}) {
    const data = await request.json()
    const id = parseInt(params.itemId);
    const updatedItem = await toysRepo.updateItem(id, data)
    return Response.json(updatedItem,{status : 200})
}



