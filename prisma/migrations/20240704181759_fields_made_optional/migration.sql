-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "clearenceRequired" DROP NOT NULL,
ALTER COLUMN "salaryMin" DROP NOT NULL,
ALTER COLUMN "salaryMax" DROP NOT NULL,
ALTER COLUMN "salaryCurrency" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Job_creationDate_idx" ON "Job"("creationDate");
