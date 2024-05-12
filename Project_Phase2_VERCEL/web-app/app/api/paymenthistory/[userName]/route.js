import toysRepo from "../../../repo/toysrepo"

export async function GET(request,{params}){
    const username=(params.userName);
    const paymenthistory=await toysRepo.getPaymenthistorywithUsername(username);
    return Response.json(paymenthistory,{status: 200})
}