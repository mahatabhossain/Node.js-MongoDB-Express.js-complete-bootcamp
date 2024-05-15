import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type user {
    id: ID
    userName: String
    email: String
  }

  type Query {
    hello: String
    getAllUser: [user]
  }

  input userInput {
    userName: String
    email: String
    password: String
  }

  type Mutation {
    createUser(user: userInput): user
    updateUser(id: String, user: userInput): user
    deleteUser(id: String): String
  }
`;
