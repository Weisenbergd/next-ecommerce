/*
  Warnings:

  - You are about to drop the column `isUsed` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `isVariant` on the `Image` table. All the data in the column will be lost.
  - Made the column `productId` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `variantGroupId` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_variantGroupId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "isUsed",
DROP COLUMN "isVariant",
ALTER COLUMN "productId" SET NOT NULL,
ALTER COLUMN "variantGroupId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_variantGroupId_fkey" FOREIGN KEY ("variantGroupId") REFERENCES "VariantGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
