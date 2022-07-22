import { gql } from 'apollo-server';

export const Statement = gql`
    type Statement {
        id: String
        label: String
        createdOn: String
        userId: String
        incomes: [Income]!
        expenses: [Expense]!
    }
`;

export const StatementInput = gql`
    input StatementInput {
        label: String!
    }
`;
