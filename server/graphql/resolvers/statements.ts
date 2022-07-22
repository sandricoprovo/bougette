import { PrismaClient } from '@prisma/client';

import { StatementInput } from '../../../shared/types/statementInput';

const prisma = new PrismaClient();

const statementResolvers = {
    Queries: {
        allStatements: async (_: any, args: { userId: string }) => {
            try {
                const { userId } = args;
                // Queries the DB via prisma for all of a users full statements.
                const allStatements = await prisma.statements.findMany({
                    where: {
                        userId,
                    },
                    include: {
                        incomes: true,
                        expenses: true,
                    },
                });

                // TODO: Handle error.
                if (!allStatements) return [];

                return allStatements;
            } catch (error) {
                return error;
            }
        },
        statement: async (
            _: any,
            args: { userId: string; statementId: string }
        ) => {
            try {
                const { userId, statementId } = args;

                // Locates a single statement owned by the user.
                const statement = await prisma.statements.findFirst({
                    where: { id: statementId, userId },
                    include: {
                        incomes: true,
                        expenses: true,
                    },
                });

                if (!statement) return {};
                return statement;
            } catch (error) {
                return error;
            }
        },
    },
    Mutations: {
        createStatement: async (
            _: any,
            args: { userId: string; label: string }
        ) => {
            try {
                const { userId, label } = args;

                // Creates new statement ith empty incomes & expenses.
                const newStatement = await prisma.statements.create({
                    data: {
                        User: {
                            connect: {
                                id: userId,
                            },
                        },
                        label,
                    },
                    include: {
                        incomes: true, // Starts empty
                        expenses: true, // Starts empty
                    },
                });

                return newStatement;
            } catch (error) {
                // TODO: Handle error
                return error;
            }
        },
        updateStatement: async (
            _: any,
            args: {
                userId: string;
                statementId: string;
                updates: StatementInput;
            }
        ) => {
            try {
                // TODO: Pass in values needed here
                const {
                    statementId,
                    userId,
                    updates: { label: updatedLabel },
                } = args;

                // Finds previous statement so old values can be used as fallbacks
                const upsertedStatement = await prisma.statements.upsert({
                    where: {
                        id: statementId,
                    },
                    update: {
                        label: updatedLabel,
                    },
                    create: {
                        label: updatedLabel,
                        User: {
                            connect: {
                                id: userId,
                            },
                        },
                    },
                    include: {
                        incomes: true,
                        expenses: true,
                    },
                });

                return upsertedStatement;
            } catch (error) {
                // TODO: Handle error
                return error;
            }
        },
        deleteStatement: async (
            _: any,
            args: { userId: string; statementId: string }
        ) => {
            const { statementId } = args;

            try {
                // Due to mandatory relations, we have to bubble up statement deletions.
                const deleteIncomes = prisma.incomes.deleteMany({
                    where: { statementId },
                });
                const deleteExpenses = prisma.expenses.deleteMany({
                    where: { statementId },
                });
                const deleteStatement = prisma.statements.delete({
                    where: { id: statementId },
                });

                // Deletes the statement moving inside out via a SQL transaction
                await prisma.$transaction([
                    deleteIncomes,
                    deleteExpenses,
                    deleteStatement,
                ]);

                return {
                    succeeded: true,
                };
            } catch (error) {
                // TODO: Handle Error
                return error;
            }
        },
    },
};

export { statementResolvers };
