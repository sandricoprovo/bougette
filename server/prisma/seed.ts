import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    const userStatement = await prisma.statement.create({
        data: {
            income: {
                create: {
                    label: 'Pay Check',
                    amount: 3000.0,
                    type: 'employment',
                    isRecurring: true,
                    depositDate: '28',
                },
            },
            expenses: {
                createMany: {
                    data: [
                        {
                            label: 'rent',
                            amount: 1000.0,
                            type: 'essential',
                            isRecurring: true,
                            withdrawDate: '14',
                        },
                        {
                            label: 'spotify',
                            amount: 10.0,
                            type: 'subscription',
                            withdrawDate: '29',
                            isRecurring: true,
                        },
                        {
                            label: 'crunchyRoll',
                            amount: 10.0,
                            type: 'subscription',
                            withdrawDate: '30',
                            isRecurring: true,
                        },
                        {
                            label: 'softball',
                            amount: 80.0,
                            type: 'leisure',
                            withdrawDate: '18',
                            isRecurring: false,
                        },
                    ],
                },
            },
        },
    });
}

seed()
    .catch((error) => {
        console.log('Seed Error', error);
        process.exit(1);
    })
    .finally(() => {
        // Disconnect from the prisma client
        prisma.$disconnect();
    });
