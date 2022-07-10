import { gql } from 'apollo-server';

export const Expense = gql`
    type Expense {
        id: String
        label: String
        amount: Int
        type: String
        withdrawDate: String
        isRecurring: Boolean
        statementId: String
    }
`;
