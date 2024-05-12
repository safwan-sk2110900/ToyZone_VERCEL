-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "seller" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "shipping" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Paymenthistory" (
    "pid" SERIAL NOT NULL,
    "qty" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "productid" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paymenthistory_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "Seller" (
    "companyName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "account" INTEGER NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Admin" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("username")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seller_companyName_key" ON "Seller"("companyName");

-- AddForeignKey
ALTER TABLE "Paymenthistory" ADD CONSTRAINT "Paymenthistory_username_fkey" FOREIGN KEY ("username") REFERENCES "Customer"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paymenthistory" ADD CONSTRAINT "Paymenthistory_productid_fkey" FOREIGN KEY ("productid") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
