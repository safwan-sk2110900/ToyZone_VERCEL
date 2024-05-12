import toysRepo from "../../../repo/toysrepo"

export async function GET(request,{params}){
    const sellername=(params.sellerName);
    const seller=await toysRepo.getsellerwithName(sellername);
    return Response.json(seller,{status: 200})
}

export async function PUT(request, {params}) {
    const data = await request.json()
    const sellername=(params.sellerName);
    const updatedSeller = await toysRepo.updateSeller(sellername, data)
    return Response.json(updatedSeller,{status : 200})
}