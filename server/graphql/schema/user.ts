import { gql } from 'apollo-server';

export const User = gql`
    type User {
        id: String
        firstName: String
        lastName: String
        email: String
    }
`;
