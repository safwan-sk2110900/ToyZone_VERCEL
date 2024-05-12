import toysRepo from "../../../repo/toysrepo"


export async function GET(request,{params}){
    const username=(params.userName);
    const customer=await toysRepo.getCustomerwithUname(username);
    return Response.json(customer,{status: 200})
}

export async function PUT(request, {params}) {
    const username=(params.userName);
    const data = await request.json()
    const updatedCustomer = await toysRepo.updateCustomer(username,data)
    return Response.json(updatedCustomer,{status : 200})
}