/*
  Warnings:

  - You are about to drop the `ColorVariant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ColorVariant" DROP CONSTRAINT "ColorVariant_colorId_fkey";

-- DropForeignKey
ALTER TABLE "ColorVariant" DROP CONSTRAINT "ColorVariant_productId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_colorVariantId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_variantId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_colorVariantId_fkey";

-- DropTable
DROP TABLE "ColorVariant";

-- CreateTable
CREATE TABLE "VariantGroup" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "colorId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VariantGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VariantGroup" ADD CONSTRAINT "VariantGroup_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantGroup" ADD CONSTRAINT "VariantGroup_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_colorVariantId_fkey" FOREIGN KEY ("colorVariantId") REFERENCES "VariantGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_colorVariantId_fkey" FOREIGN KEY ("colorVariantId") REFERENCES "VariantGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
