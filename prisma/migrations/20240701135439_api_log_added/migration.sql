/*
  Warnings:

  - A unique constraint covering the columns `[upstreamId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `upstreamId` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `upstreamId` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `companyId` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_companyId_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "upstreamId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "upstreamId",
ADD COLUMN     "upstreamId" INTEGER NOT NULL,
DROP COLUMN "companyId",
ADD COLUMN     "companyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ApiLog" (
    "id" BIGSERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "request" TEXT NOT NULL,

    CONSTRAINT "ApiLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_upstreamId_key" ON "Company"("upstreamId");

-- CreateIndex
CREATE INDEX "Company_upstreamId_idx" ON "Company"("upstreamId");

-- CreateIndex
CREATE INDEX "Job_companyId_idx" ON "Job"("companyId");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("upstreamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiLog" ADD CONSTRAINT "ApiLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
