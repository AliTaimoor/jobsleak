-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_teamId_fkey";

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "teamId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
