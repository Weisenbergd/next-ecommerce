/*
  Warnings:

  - A unique constraint covering the columns `[variantGroupId,sizeId]` on the table `Variant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Variant_variantGroupId_sizeId_key" ON "Variant"("variantGroupId", "sizeId");
