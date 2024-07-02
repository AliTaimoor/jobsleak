-- AlterTable
ALTER TABLE "User" ADD COLUMN     "apikey" TEXT;

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "linkedin" TEXT,
    "twitter" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "upstreamId" TEXT NOT NULL,
    "extId" TEXT,
    "companyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "types" TEXT[],
    "cities" TEXT[],
    "countries" TEXT[],
    "regions" TEXT[],
    "hasRemote" BOOLEAN NOT NULL,
    "published" VARCHAR(10) NOT NULL,
    "description" TEXT NOT NULL,
    "experienceLevel" VARCHAR(50) NOT NULL,
    "applicationUrl" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "clearenceRequired" BOOLEAN NOT NULL,
    "salaryMin" INTEGER NOT NULL,
    "salaryMax" INTEGER NOT NULL,
    "salaryCurrency" VARCHAR(20) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Company_name_idx" ON "Company"("name");

-- CreateIndex
CREATE INDEX "Job_companyId_idx" ON "Job"("companyId");

-- CreateIndex
CREATE INDEX "Job_title_idx" ON "Job"("title");

-- CreateIndex
CREATE INDEX "Job_location_idx" ON "Job"("location");

-- CreateIndex
CREATE INDEX "Job_cities_idx" ON "Job"("cities");

-- CreateIndex
CREATE INDEX "Job_countries_idx" ON "Job"("countries");

-- CreateIndex
CREATE INDEX "Job_regions_idx" ON "Job"("regions");

-- CreateIndex
CREATE INDEX "Job_salaryMin_idx" ON "Job"("salaryMin");

-- CreateIndex
CREATE INDEX "Job_salaryMax_idx" ON "Job"("salaryMax");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
