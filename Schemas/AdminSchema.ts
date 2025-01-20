import { gql } from 'graphql-tag';

export const typeDefs = gql`
    type Admin {
        id: ID!
        firstName: String!
        lastName: String!
        username: String!
        password: String!
        phone: String!
        role: String!
    }

    input AdminInput {
        firstName: String!
        lastName: String!
        username: String!
        password: String!
        phone: String!
        role: String
    }

    type Query {
        getAdminById(id: ID!): Admin
        getAdminsByFirstName(firstName: String!): [Admin!]
    }

    type Mutation {
        createAdmin(input: AdminInput!): Admin
        updateAdmin(id: ID!, input: AdminInput!): Admin
        deleteAdmin(id: ID!): Boolean
    }
`;