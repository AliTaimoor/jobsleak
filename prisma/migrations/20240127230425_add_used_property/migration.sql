-- AlterTable
ALTER TABLE "EmailVerification" ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ResetPassword" ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;
