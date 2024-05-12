import toysRepo from "../../repo/toysrepo"

export async function POST(request){
    const paymenthistory=await request.json();
    const newpaymenthistory=await toysRepo.addPaymenthistory(paymenthistory);
    return Response.json(newpaymenthistory,{status: 200})
}

export async function GET(request) {
    const paymenthistory = await toysRepo.getPaymenthistory(); 
    return Response.json(paymenthistory);
}