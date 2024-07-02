/*
  Warnings:

  - You are about to drop the `ApiQuota` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApiQuota" DROP CONSTRAINT "ApiQuota_userId_fkey";

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "totalQuota" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "usedQuota" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "ApiQuota";
