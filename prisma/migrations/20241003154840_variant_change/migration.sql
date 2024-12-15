/*
  Warnings:

  - You are about to drop the column `colorId` on the `Variant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_colorId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_sizeId_fkey";

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "colorId",
ALTER COLUMN "sizeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE SET NULL ON UPDATE CASCADE;
