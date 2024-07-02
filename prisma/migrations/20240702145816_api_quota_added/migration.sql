-- CreateTable
CREATE TABLE "ApiQuota" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalQuota" INTEGER NOT NULL,
    "usedQuota" INTEGER NOT NULL DEFAULT 0,
    "resetDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApiQuota_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiQuota_userId_key" ON "ApiQuota"("userId");

-- AddForeignKey
ALTER TABLE "ApiQuota" ADD CONSTRAINT "ApiQuota_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
