/*
  Warnings:

  - You are about to drop the column `colorVariantId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `variantId` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_colorVariantId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "colorVariantId",
DROP COLUMN "variantId",
ADD COLUMN     "variantGroupId" INTEGER;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_variantGroupId_fkey" FOREIGN KEY ("variantGroupId") REFERENCES "VariantGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
