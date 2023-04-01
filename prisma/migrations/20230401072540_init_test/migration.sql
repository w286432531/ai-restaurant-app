-- CreateTable
CREATE TABLE "SiteMain" (
    "id" SERIAL NOT NULL,
    "siteName" TEXT,
    "brandImageUrl" TEXT,
    "onlineOrderToggle" BOOLEAN NOT NULL DEFAULT false,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "phone" TEXT NOT NULL,
    "menuVersion" INTEGER NOT NULL,

    CONSTRAINT "SiteMain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessHour" (
    "id" SERIAL NOT NULL,
    "weekDay" TEXT NOT NULL,
    "openTime" TIME NOT NULL,
    "closeTime" TIME NOT NULL,
    "timeZone" TEXT,

    CONSTRAINT "BusinessHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "alternativeRoleName" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "roleId" INTEGER NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cart" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "userId" INTEGER NOT NULL,
    "address1" TEXT,
    "address2" TEXT,
    "state" TEXT,
    "city" TEXT,
    "zipCode" TEXT,
    "Latitude" TEXT,
    "Longtitude" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "orderCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paymentConfirmation" TEXT NOT NULL,
    "discountAmount" INTEGER NOT NULL DEFAULT 0,
    "paymentAmount" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderedItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "itemOptionId" INTEGER NOT NULL,
    "itemTotal" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "additionalRequest" TEXT,
    "feedback" TEXT,

    CONSTRAINT "OrderedItem_pkey" PRIMARY KEY ("id","orderId","itemOptionId")
);

-- CreateTable
CREATE TABLE "OrderedItemAddOn" (
    "orderedItemId" INTEGER NOT NULL,
    "itemAddOnId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "OrderedItemAddOn_pkey" PRIMARY KEY ("orderedItemId","itemAddOnId")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "itemName" TEXT NOT NULL,
    "alternativeItemName" TEXT,
    "description" TEXT,
    "categoryId" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "customizable" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "alternativeName" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "ingredientName" TEXT NOT NULL,
    "alternativeIngredientName" TEXT,
    "isAddOn" BOOLEAN NOT NULL DEFAULT true,
    "defaultPrice" INTEGER NOT NULL DEFAULT 0,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientType" (
    "id" SERIAL NOT NULL,
    "ingredientTypeName" TEXT NOT NULL,
    "isUnique" BOOLEAN NOT NULL DEFAULT false,
    "alternativeIngredientTypeName" TEXT,

    CONSTRAINT "IngredientType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemIngredient" (
    "itemId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "ItemIngredient_pkey" PRIMARY KEY ("itemId","ingredientId")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "optionName" TEXT NOT NULL,
    "alternativeOptionName" TEXT,
    "description" TEXT,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemOption" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "optionId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "ItemOption_pkey" PRIMARY KEY ("id","itemId")
);

-- CreateTable
CREATE TABLE "ItemAddOn" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "customPrice" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ItemAddOn_pkey" PRIMARY KEY ("id","itemId","ingredientId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_key" ON "Role"("role");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderedItem_id_key" ON "OrderedItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_itemName_key" ON "Item"("itemName");

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryName_key" ON "Category"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_ingredientName_key" ON "Ingredient"("ingredientName");

-- CreateIndex
CREATE UNIQUE INDEX "IngredientType_ingredientTypeName_key" ON "IngredientType"("ingredientTypeName");

-- CreateIndex
CREATE UNIQUE INDEX "Option_optionName_key" ON "Option"("optionName");

-- CreateIndex
CREATE UNIQUE INDEX "ItemOption_id_key" ON "ItemOption"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemAddOn_id_key" ON "ItemAddOn"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedItem" ADD CONSTRAINT "OrderedItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedItem" ADD CONSTRAINT "OrderedItem_itemOptionId_fkey" FOREIGN KEY ("itemOptionId") REFERENCES "ItemOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedItemAddOn" ADD CONSTRAINT "OrderedItemAddOn_orderedItemId_fkey" FOREIGN KEY ("orderedItemId") REFERENCES "OrderedItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedItemAddOn" ADD CONSTRAINT "OrderedItemAddOn_itemAddOnId_fkey" FOREIGN KEY ("itemAddOnId") REFERENCES "ItemAddOn"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "IngredientType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemIngredient" ADD CONSTRAINT "ItemIngredient_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemIngredient" ADD CONSTRAINT "ItemIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemOption" ADD CONSTRAINT "ItemOption_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemOption" ADD CONSTRAINT "ItemOption_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemAddOn" ADD CONSTRAINT "ItemAddOn_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemAddOn" ADD CONSTRAINT "ItemAddOn_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
