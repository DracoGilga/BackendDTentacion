import { gql } from 'graphql-tag';

export const LogSchema = gql`
    type Log {
        id: ID!
        username: String!
        action: String!
        dateTime: String!
        ipAddress: String!
        macAddress: String!
    }

    input LogInput {
        username: String!
        action: String!
        ipAddress: String!
        macAddress: String!
    }

    type Query {
        getAllLogs: [Log!]
        getLogsByUsername(username: String!): [Log!]
        getLogsByDateRange(startDate: String!, endDate: String!): [Log!]
    }

    type Mutation {
        createLog(input: LogInput!): Log
    }
`;