-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_variantGroupId_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_variantGroupId_fkey" FOREIGN KEY ("variantGroupId") REFERENCES "VariantGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
