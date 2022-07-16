import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const statementResolvers = {
    Query: {
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
    Mutation: {
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
    },
};

export { statementResolvers };
