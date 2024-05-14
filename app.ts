import express, { Application } from "express";
import cors from "cors";
import { connectDb } from "./config/dbCon";
import { router } from "./routers/userRouter";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './doc/swagger_output.json';
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDef";
import { resolvers } from "./graphql/resolver";



const startServer = async () => {
  const app: any = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })
  app.listen(4000, () => {
    console.log("server running on 4000");
  });
  await connectDb();

}

startServer()

// app.use(express.json());
// app.use(cors());

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use("/user", router);




// module.exports = app;
