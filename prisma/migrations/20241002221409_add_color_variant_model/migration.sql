-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_colorId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_productId_fkey";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "colorVariantId" INTEGER;

-- AlterTable
ALTER TABLE "Variant" ADD COLUMN     "colorVariantId" INTEGER,
ALTER COLUMN "productId" DROP NOT NULL,
ALTER COLUMN "colorId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ColorVariant" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ColorVariant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ColorVariant" ADD CONSTRAINT "ColorVariant_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorVariant" ADD CONSTRAINT "ColorVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_colorVariantId_fkey" FOREIGN KEY ("colorVariantId") REFERENCES "ColorVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_colorVariantId_fkey" FOREIGN KEY ("colorVariantId") REFERENCES "ColorVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
