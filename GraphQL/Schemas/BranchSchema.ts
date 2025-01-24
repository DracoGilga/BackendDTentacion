import { gql } from 'graphql-tag';

export const BranchSchema = gql`
    type Branch {
        id: ID!
        branchName: String!
        ubication: Ubication
    }

    type Ubication {
        id: ID!
        description: String!
        latitude: Float!
        longitude: Float!
    }

    input BranchInput {
        branchName: String!
        ubicationId: Int!
    }

    input BranchUpdateInput {
        branchName: String
        ubicationId: Int
    }

    type Query {
        getBranchById(id: ID!): Branch
        getAllBranches: [Branch!]
        getOrdersByBranchId(branchId: ID!): [Order!]
        getUbicationByBranchId(branchId: ID!): Ubication
    }

    type Mutation {
        createBranch(input: BranchInput!): Branch
        updateBranch(id: ID!, input: BranchUpdateInput!): Branch
        deleteBranch(id: ID!): Boolean
    }
`;