import { gql } from 'graphql-tag';

export const typeDefs = gql`
    type Ubication {
        id: ID!
        description: String!
        latitude: Float!
        longitude: Float!
    }

    input UbicationInput {
        description: String!
        latitude: Float!
        longitude: Float!
    }

    input UpdateUbicationInput {
        description: String
        latitude: Float
        longitude: Float
    }

    type Query {
        getUbicationById(id: ID!): Ubication
        getAllUbications: [Ubication!]!
    }

    type Mutation {
        createUbication(input: UbicationInput!): Ubication!
        updateUbication(id: ID!, input: UpdateUbicationInput!): Ubication
        deleteUbication(id: ID!): Boolean!
    }
`;