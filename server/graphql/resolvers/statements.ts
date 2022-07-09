import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const statementResolvers = {
    Query: {
        allStatements: async () => {
            const statements = await prisma.statement.findMany();
            console.log(statements);
            return [];
        },
    },
    // Mutation: () => { },
};

export { statementResolvers };
