/*
  Warnings:

  - Made the column `productId` on table `Variant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sizeId` on table `Variant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `variantGroupId` on table `Variant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `colorId` on table `VariantGroup` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_productId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "VariantGroup" DROP CONSTRAINT "VariantGroup_colorId_fkey";

-- AlterTable
ALTER TABLE "Variant" ALTER COLUMN "productId" SET NOT NULL,
ALTER COLUMN "sizeId" SET NOT NULL,
ALTER COLUMN "variantGroupId" SET NOT NULL;

-- AlterTable
ALTER TABLE "VariantGroup" ALTER COLUMN "colorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "VariantGroup" ADD CONSTRAINT "VariantGroup_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
