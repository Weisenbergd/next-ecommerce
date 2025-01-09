/*
  Warnings:

  - A unique constraint covering the columns `[productId,colorId]` on the table `VariantGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VariantGroup_productId_colorId_key" ON "VariantGroup"("productId", "colorId");
