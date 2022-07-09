const mockStatement = {
    income: [
        {
            label: 'Pay Check',
            amount: 3000.0,
            type: 'employment',
            isRecurring: true,
            depositDate: '28',
        },
    ],
    expenses: [
        { label: 'rent', amount: 1000.0, type: 'essential', isRecurring: true },
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
};

export { mockStatement };
