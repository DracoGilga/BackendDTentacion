import { gql } from 'graphql-tag';

export const typeDefs = gql`
    type Product {
        id: ID!
        productName: String!
        stock: Int!
        finalPrice: Float!
        expirationDate: String!
        category: CategoryProduct
        ingredients: [Ingredient!]
    }

    input ProductInput {
        productName: String!
        stock: Int!
        finalPrice: Float!
        expirationDate: String!
        categoryId: ID!
    }

    input UpdateProductInput {
        productName: String
        stock: Int
        finalPrice: Float
        expirationDate: String
        categoryId: ID
    }

    type Query {
        getProductById(id: ID!): Product
        getAllProducts: [Product!]!
    }

    type Mutation {
        createProduct(input: ProductInput!): Product!
        updateProduct(id: ID!, input: UpdateProductInput!): Product
        deleteProduct(id: ID!): Boolean!
    }

    type CategoryProduct {
        id: ID!
        categoryName: String!
        categoryDescription: String!
    }

    type Ingredient {
        id: ID!
        name: String!
        quantity: Int!
        unitPrice: Float!
    }
`;