import { gql } from 'graphql-tag';

export const typeDefs = gql`
    type Client {
        id: ID!
        name: String!
        lastName: String!
        phone: String!
        birthDate: String!
        email: String!
        password: String!
        role: String!
    }

    input ClientInput {
        name: String!
        lastName: String!
        phone: String!
        birthDate: String!
        email: String!
        password: String!
        role: String!
    }

    input UpdateClientInput {
        name: String
        lastName: String
        phone: String
        birthDate: String
        email: String
        password: String
        role: String
    }

    type Query {
        getClientById(id: ID!): Client
        getAllClients: [Client!]!
    }

    type Mutation {
        createClient(input: ClientInput!): Client!
        updateClient(id: ID!, input: UpdateClientInput!): Client
        deleteClient(id: ID!): Boolean!
    }
`;
