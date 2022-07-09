import { gql } from 'apollo-server';

export const Expense = gql`
    type Expense {
        id: Int
        label: String
        amount: Int
        type: String
        withdrawDate: String
        isRecurring: Boolean
        statementId: Int
    }
`;
