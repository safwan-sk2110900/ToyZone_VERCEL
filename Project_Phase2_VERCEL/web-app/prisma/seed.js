import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const itemsPath = path.join(process.cwd(), 'app/data/items.json')
const CustomersPath=path.join(process.cwd(), 'app/data/customers.json')
const AdminsPath=path.join(process.cwd(), 'app/data/admins.json')
const SellersPath=path.join(process.cwd(), 'app/data/sellers.json')


async function main() {
    try {
        const items = await fs.readJSON(itemsPath)
        const customers = await fs.readJSON(CustomersPath)
        const sellers=await fs.readJSON(SellersPath)
        const admins= await fs.readJSON(AdminsPath)

        for (const item of items) await prisma.item.create({ data: item })
        for (const customer of customers) await prisma.customer.create({ data: customer })
        for (const admin of admins) await prisma.admin.create({ data: admin })
        for (const seller of sellers) await prisma.seller.create({ data: seller })  

    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })