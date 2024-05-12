export async function POST(request){
    const item=await request.json();
   
    return Response.json(item,{status: 200})
}