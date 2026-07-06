/*
  Warnings:

  - Made the column `password` on table `AuthUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AuthUser" ALTER COLUMN "password" SET NOT NULL;

-- CreateTable
CREATE TABLE "Orders" (
    "order_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("order_id")
);
