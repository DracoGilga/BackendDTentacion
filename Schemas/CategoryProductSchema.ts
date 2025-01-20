import { gql } from 'graphql-tag';

export const typeDefs = gql`
    type CategoryProduct {
        id: ID!
        categoryName: String!
        categoryDescription: String!
    }

    input CategoryProductInput {
        categoryName: String!
        categoryDescription: String!
    }

    input CategoryProductUpdateInput {
        categoryName: String
        categoryDescription: String
    }

    type Query {
        getCategoryProductById(id: ID!): CategoryProduct
        getAllCategoryProducts: [CategoryProduct!]
    }

    type Mutation {
        createCategoryProduct(input: CategoryProductInput!): CategoryProduct
        updateCategoryProduct(id: ID!, input: CategoryProductUpdateInput!): CategoryProduct
        deleteCategoryProduct(id: ID!): Boolean
    }
`;