import { gql } from 'apollo-server';

export const Statement = gql`
    type Statement {
        id: Int
        income: [Income]!
        expenses: [Expense]!
    }
`;
