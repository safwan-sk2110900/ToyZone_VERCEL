import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class toysrepo {

    async getItems() {
        try {
            return  prisma.item.findMany({
                include : {paymenthistory : true}
        });
        } catch (error) {
            return { error: error.message }
        }
    }

    async getCustomers(){
        try {
            return  prisma.customer.findMany({
                include : {paymenthistory : true}

            });
        } catch (error) {
            return { error: error.message }
        }
    }

    async addItem(item){
        try{
            return  prisma.item.create({data: item})

        }catch(error){
            return{error: error.message}
        }
    }

    async getCustomerwithUname(username){
        try{
            return  prisma.customer.findUnique(
                {where : {username},
                include : {paymenthistory : true}})

        }catch(error){
            return {error}
        }
    }

    async updateCustomer(username, customer) {
        try {
            const updatedCustomer =  prisma.customer.update({
                where: {username: username },
                data: {
                    name: customer.name,
                    surname: customer.surname,
                    shipping: customer.shipping,
                    password: customer.password,
                    balance: customer.balance,
                },
                include: {
                    paymenthistory: true // Include the updated payment history in the response
                }
            });
            return updatedCustomer;
        } catch (error) {
            console.error("Error updating customer:", error);
            return { error: error.message };
        }
    }
    async getPaymenthistory() {
        try {
            return  prisma.paymenthistory.findMany({
                include: {
                    customer: true,item :true
                }
            });
        } catch (error) {
            return { error };
        }
    }
    
    async getPaymenthistorywithUsername(username) {
        try {
            return  prisma.paymenthistory.findMany({
                where : {username:username},
                include: {
                    customer: true,item:true
                }
            });
        } catch (error) {
            return { error };
        }
    }



    async addPaymenthistory(paymenthistory){
        try {
            
            return  prisma.paymenthistory.create({
                data: {
                    productid: paymenthistory.productid,
                    qty: paymenthistory.qty,
                    amount: paymenthistory.amount,
                    username: paymenthistory.username,
                    location : paymenthistory.location,
                    purchaseDate: paymenthistory.purchaseDate
                }
            });
        } catch (error) {
            return { error: error.message };
        }
    }

    async getAdmins(){
        try {
            return  prisma.admin.findMany();
        } catch (error) {
            return { error: error.message }
        }
    }

    async getsellerwithName(companyName){
        try{
            return  prisma.seller.findUnique(
                {where : {companyName}})

        }catch(error){
            return {error}
        }
    }

    async getSellers(){
        try {
            return  prisma.seller.findMany();
        } catch (error) {
            return { error: error.message }
        }
    }

    async updateSeller(sellerName, seller){
        try{
            return  prisma.seller.update(
                {where : {companyName : sellerName},
                data : seller})

        }catch(error){
            return {error}
        }
    }


    async getItemwithID(id){
        try{
            return  prisma.item.findUnique(
                {where : {id:id},include : {salehistory : true}})

        }catch(error){
            return {error}
        }
    }
    async updateItem(id, item) {
        try {
            const updatedItem =  prisma.item.update({
                where: { id },
                data: {
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    desc: item.desc,
                    seller: item.seller,
                    stock: item.stock,
                    type: item.type,
                    discount: item.discount,
                    gender: item.gender}
                })
            return updatedItem;
            }
            catch(error){
                return { error: error.message }
            }
        }
        


        async getLocation(){
            try{
                return  prisma.paymenthistory.groupBy({
                    by:["location"], _count:true
                })
            }catch(error){
                return { error: error.message };
            }
        }
       
        
        

        async  getNeverPurchased(){
            try {
                return  prisma.item.findMany({
                    where: {
                        paymenthistory: {
                            none: {}
                        }
                    }
                });
            } catch(error) {
                return { error: error.message };
            }
        }


        async  getTop() {
            try {
                const date = new Date();
                date.setMonth(date.getMonth() - 6);
                const getlist = await prisma.paymenthistory.groupBy({
                    by: ["productid"],
                    where: {
                        purchaseDate: {
                            gte: date
                        }
                    },
                    orderBy: {
                        _sum: {
                            qty: "desc"
                        }
                    },
                    take: 3
                });
                const ids = getlist.map(item => item.productid);
                const products = await prisma.item.findMany({
                    where: {
                        id: {
                            in: ids
                        }
                    },
                    select: {
                        name: true,
                        image:true,
                        seller:true
                    }
                });
                return products;
                
            } catch (error) {
                return { error: error.message };
            }
        }
        async  getYear() {
            try {
                const paymentHistory = await prisma.paymenthistory.findMany();
                const year = paymentHistory.map(item => new Date(item.purchaseDate).getFullYear());
                const getProduct = year.reduce((acc, year) => {
                    if (!acc[year]) {
                        acc[year] = 0;
                    }
                    acc[year]++;
                    return acc;
                }, {});
                return getProduct;
            } catch (error) {
                return { error: error.message };
            }
        }
        async getTopSeller(){
            try {
                const topSeller =  prisma.seller.findMany({
                    select: {
                        companyName: true,
                        account: true
                    },orderBy: {
                        account: 'desc' 
                    }, take:2
                });
                return topSeller;
            }catch(error){
                return { error: error.message };
            }
            
        }
        async getTopCustomer(){
            try{
                return  prisma.paymenthistory.groupBy({
                    by:["username"],
                    _sum:{
                        amount:true
                    },
                    orderBy:{
                        _sum:{
                            amount:'desc'
                        }
                    },take:3
        
                })
            }
            catch(error){
                return { error: error.message };
            }
        }
        async purchasePerProduct(){
            try {
                return  prisma.paymenthistory.groupBy({by:["productid"],_sum:{qty:true}})
                
            } catch (error) {
                return { error: error.message };
            }
        }
}

export default new toysrepo()