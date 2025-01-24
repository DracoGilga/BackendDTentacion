import { gql } from 'graphql-tag';

export const OrderSchema = gql`
    type Order {
        id: ID!
        totalPrice: Float!
        client: Client
        products: [Product!]
        branches: Branch
    }

    input OrderInput {
        totalPrice: Float!
        clientId: ID!
    }

    input UpdateOrderInput {
        totalPrice: Float
        clientId: ID
    }

    type Query {
        getOrderById(id: ID!): Order
        getAllOrders: [Order!]!
    }

    type Mutation {
        createOrder(input: OrderInput!): Order!
        updateOrder(id: ID!, input: UpdateOrderInput!): Order
        deleteOrder(id: ID!): Boolean!
    }

    type Client {
        id: ID!
        name: String!
        lastName: String!
        phone: String!
        birthDate: String!
        email: String!
        role: String!
    }

    type Product {
        id: ID!
        name: String!
        description: String!
        price: Float!
        stock: Int!
    }

    type Branch {
        id: ID!
        branchName: String!
    }
`;