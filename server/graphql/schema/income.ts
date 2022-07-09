import { gql } from 'apollo-server';

export const Income = gql`
    type Income {
        id: Int
        label: String
        amount: Int
        type: String
        depositDate: String
        isRecurring: Boolean
        statementId: Int
    }
`;
