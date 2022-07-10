/*
  Warnings:

  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Income` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Statement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_statementId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_statementId_fkey";

-- DropForeignKey
ALTER TABLE "Statement" DROP CONSTRAINT "Statement_userId_fkey";

-- DropTable
DROP TABLE "Expense";

-- DropTable
DROP TABLE "Income";

-- DropTable
DROP TABLE "Statement";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incomes" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "depositDate" TEXT NOT NULL,
    "isRecurring" BOOLEAN NOT NULL,
    "statementId" TEXT,

    CONSTRAINT "Incomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expenses" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "withdrawDate" TEXT NOT NULL,
    "isRecurring" BOOLEAN NOT NULL,
    "statementId" TEXT,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statements" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "Statements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Incomes" ADD CONSTRAINT "Incomes_statementId_fkey" FOREIGN KEY ("statementId") REFERENCES "Statements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_statementId_fkey" FOREIGN KEY ("statementId") REFERENCES "Statements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statements" ADD CONSTRAINT "Statements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
