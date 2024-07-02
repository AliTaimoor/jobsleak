/*
  Warnings:

  - You are about to drop the column `messageType` on the `Message` table. All the data in the column will be lost.
  - Added the required column `title` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serialized` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "messageType",
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "serialized" TEXT NOT NULL;
