import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    await prisma.users.create({
        data: {
            firstName: 'Kakashi',
            lastName: 'Hatake',
            email: 'khatake@example.com',
            statements: {
                create: {
                    label: 'Personal',
                    incomes: {
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
                                    label: 'kunai',
                                    amount: 10.0,
                                    type: 'subscription',
                                    withdrawDate: '29',
                                    isRecurring: true,
                                },
                                {
                                    label: 'ramen',
                                    amount: 10.0,
                                    type: 'leisure',
                                    withdrawDate: '30',
                                    isRecurring: true,
                                },
                                {
                                    label: 'book club',
                                    amount: 80.0,
                                    type: 'subscription',
                                    withdrawDate: '18',
                                    isRecurring: false,
                                },
                            ],
                        },
                    },
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
