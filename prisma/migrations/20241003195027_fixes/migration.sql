/*
  Warnings:

  - You are about to drop the column `colorVariantId` on the `Variant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_colorVariantId_fkey";

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "colorVariantId",
ADD COLUMN     "variantGroupId" INTEGER;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_variantGroupId_fkey" FOREIGN KEY ("variantGroupId") REFERENCES "VariantGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
