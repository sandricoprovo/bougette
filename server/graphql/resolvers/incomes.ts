import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const incomeResolvers = {
    Queries: {},
    Mutations: {
        addStatementIncome: async (
            _: any,
            args: {
                userId: string;
                statementId: string;
            }
        ) => {
            const { statementId, userId } = args;

            try {
                const statementWithNewIncomes = await prisma.statements.update({
                    where: { id: statementId },
                    data: {
                        User: { connect: { id: userId } },
                        incomes: {
                            createMany: {
                                data: [1].map(() => {
                                    // TODO: Loop over array of incomes below
                                    const createdIncome = {
                                        amount: 3000,
                                        depositDate: 'Today',
                                        isRecurring: true,
                                        label: 'Side Hustle',
                                        type: 'business',
                                        statementId,
                                    };
                                    return createdIncome;
                                }),
                            },
                        },
                    },
                });

                return statementWithNewIncomes;
            } catch (error) {
                return error;
            }
        },
    },
};

export { incomeResolvers };
