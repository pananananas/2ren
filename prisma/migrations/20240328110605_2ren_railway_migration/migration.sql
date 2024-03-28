-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "color" VARCHAR(255) NOT NULL,
    "price" VARCHAR(255) NOT NULL,
    "currency" VARCHAR(255) NOT NULL,
    "amount" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "material" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "authorID" TEXT NOT NULL,
    "display" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemImage" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(255) NOT NULL DEFAULT '',
    "imageUrl" VARCHAR(255) NOT NULL DEFAULT '',
    "itemId" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ItemImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Item_material_idx" ON "Item"("material");

-- CreateIndex
CREATE INDEX "ItemImage_itemId_idx" ON "ItemImage"("itemId");
