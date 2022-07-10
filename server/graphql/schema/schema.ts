import { gql } from 'apollo-server';

import { statementResolvers } from '../resolvers/statements';

import { User } from './user';
import { Statement } from './statement';
import { Income } from './income';
import { Expense } from './expense';

const typeDefs = gql`
    # Types
    ${Income}
    ${Expense}
    ${Statement}
    ${User}
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
