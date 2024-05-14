"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
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
    createUser(user:userInput):user
  }

`;
//# sourceMappingURL=typeDef.js.map