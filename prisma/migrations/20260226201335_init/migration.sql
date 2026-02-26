/*
  Warnings:

  - You are about to drop the column `productName` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `productTitle` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "productName",
ADD COLUMN     "productTitle" TEXT NOT NULL;
