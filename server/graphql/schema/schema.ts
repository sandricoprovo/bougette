import { gql } from 'apollo-server';

import { statementResolvers } from '../resolvers/statements';

import { Income } from './income';
import { Expense } from './expense';
import { Statement } from './statement';

const typeDefs = gql`
    # Types
    ${Income}
    ${Expense}
    ${Statement}
    # Queries
    type Query {
        allStatements: [Statement]!
    }
    # Mutations
`;

const resolvers = {
    Query: {
        allStatements: statementResolvers.Query.allStatements,
    },
};

export { typeDefs, resolvers };
