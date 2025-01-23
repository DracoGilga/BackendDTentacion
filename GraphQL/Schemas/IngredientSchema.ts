import { gql } from 'graphql-tag';

export const IngredientSchema = gql`
    type Ingredient {
        id: ID!
        name: String!
        quantity: Float!
        unitPrice: Float!
    }

    input IngredientInput {
        name: String!
        quantity: Float!
        unitPrice: Float!
    }

    input UpdateIngredientInput {
        name: String
        quantity: Float
        unitPrice: Float
    }

    type Query {
        getIngredientById(id: ID!): Ingredient
        getAllIngredients: [Ingredient!]!
    }

    type Mutation {
        createIngredient(input: IngredientInput!): Ingredient!
        updateIngredient(id: ID!, input: UpdateIngredientInput!): Ingredient
        deleteIngredient(id: ID!): Boolean!
    }
`;