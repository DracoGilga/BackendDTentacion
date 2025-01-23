import { gql } from 'graphql-tag';

export const LoginSchema = gql`
    type LoginResponse {
        response: String!
    }

    type Mutation {
        login(user: String!, password: String!): LoginResponse!
    }
`;