import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const statementResolvers = {
    Query: {
        allStatements: async () => {
            const allStatements = await prisma.statements.findMany();
            console.log(allStatements);
            return [];
        },
    },
    // Mutation: () => { },
};

export { statementResolvers };
