/*
  Warnings:

  - Made the column `statementId` on table `Expenses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `statementId` on table `Incomes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Statements` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_statementId_fkey";

-- DropForeignKey
ALTER TABLE "Incomes" DROP CONSTRAINT "Incomes_statementId_fkey";

-- DropForeignKey
ALTER TABLE "Statements" DROP CONSTRAINT "Statements_userId_fkey";

-- AlterTable
ALTER TABLE "Expenses" ALTER COLUMN "statementId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Incomes" ALTER COLUMN "statementId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Statements" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Incomes" ADD CONSTRAINT "Incomes_statementId_fkey" FOREIGN KEY ("statementId") REFERENCES "Statements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_statementId_fkey" FOREIGN KEY ("statementId") REFERENCES "Statements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statements" ADD CONSTRAINT "Statements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
