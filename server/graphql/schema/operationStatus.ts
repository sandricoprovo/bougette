import { gql } from 'apollo-server';

export const OperationStatus = gql`
    type OperationStatus {
        succeeded: Boolean
    }
`;
