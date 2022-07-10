import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const statementResolvers = {
    Query: {
        allStatements: async (_: any, args: { userId: string }) => {
            const { userId } = args;
            // Queries the DB via prisma for all of a users full statements
            const allStatements = await prisma.statements.findMany({
                where: {
                    userId,
                },
                include: {
                    incomes: true,
                    expenses: true,
                },
            });

            if (!allStatements) return [];
            return allStatements;
        },
    },
    // Mutation: () => { },
};

export { statementResolvers };
