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
        # === STATEMENTS ===
        allStatements(userId: String): [Statement]!
        statement(userId: String, statementId: String): Statement!
    }
    # Mutations
    type Mutation {
        # === STATEMENTS ===
        createStatement(userId: String, label: String): Statement!
        updateStatement(userId: String, statementId: String): Statement!
        deleteStatement(userId: String, statementId: String): Boolean!
    }
`;

const resolvers = {
    Query: {
        // === STATEMENTS === //
        allStatements: statementResolvers.Queries.allStatements,
        statement: statementResolvers.Queries.statement,
    },
    Mutation: {
        // === STATEMENTS === //
        createStatement: statementResolvers.Mutations.createStatement,
        updateStatement: statementResolvers.Mutations.updateStatement,
        deleteStatement: statementResolvers.Mutations.deleteStatement,
    },
};

export { typeDefs, resolvers };
