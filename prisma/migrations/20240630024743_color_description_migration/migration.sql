/*
  Warnings:

  - Added the required column `detailedColor` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Variant" ADD COLUMN     "detailedColor" TEXT NOT NULL;
