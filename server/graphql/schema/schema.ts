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
        allStatements(userId: String): [Statement]!
        statement(userId: String, statementId: String): Statement!
    }
    # Mutations
    type Mutation {
        createStatement(userId: String, label: String): Statement!
    }
`;

const resolvers = {
    Query: {
        allStatements: statementResolvers.Query.allStatements,
        statement: statementResolvers.Query.statement,
    },
    Mutation: {
        createStatement: statementResolvers.Mutation.createStatement,
    },
};

export { typeDefs, resolvers };
