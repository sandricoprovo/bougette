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

export const ExpenseInput = gql`
    input ExpenseInput {
        label: String
        amount: Int
        type: String
        withdrawDate: String
        isRecurring: Boolean
    }
`;
