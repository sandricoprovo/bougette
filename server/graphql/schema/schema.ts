import { gql } from 'apollo-server';

import { statementResolvers } from '../resolvers/statements';
import { incomeResolvers } from '../resolvers/incomes';

import { User } from './user';
import { Statement, StatementInput } from './statement';
import { Income, IncomeInput } from './income';
import { Expense, ExpenseInput } from './expense';
import { OperationStatus } from './operationStatus';

const typeDefs = gql`
    # Types
    ${Income}
    ${IncomeInput}
    ${Expense}
    ${ExpenseInput}
    ${Statement}
    ${StatementInput}
    ${User}
    ${OperationStatus}
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
        updateStatement(
            userId: String
            statementId: String
            updates: StatementInput
        ): Statement!
        deleteStatement(userId: String, statementId: String): OperationStatus!
        # === INCOMES ===
        addStatementIncome(userId: String, statementId: String): Statement!
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
        // === INCOMES === //
        addStatementIncome: incomeResolvers.Mutations.addStatementIncome,
    },
};

export { typeDefs, resolvers };
