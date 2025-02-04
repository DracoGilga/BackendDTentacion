import { gql } from 'graphql-tag';

export const BranchSchema = gql`
    type Branch {
        id: ID!
        branchName: String!
        ubication: Ubication
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
        getUbicationByBranchId(branchId: ID!): Ubication
    }

    type Mutation {
        createBranch(input: BranchInput!): Branch
        updateBranch(id: ID!, input: BranchUpdateInput!): Branch
        deleteBranch(id: ID!): Boolean
    }
`;