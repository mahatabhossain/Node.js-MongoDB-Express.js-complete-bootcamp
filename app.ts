import express from "express";
import cors from "cors";
import { connectDb }  from "./config/dbCon";
import { router } from "./routers/userRouter";

const app = express();

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './doc/swagger_output.json';

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/user", router); 

app.listen(4000, () => {
  console.log("server running on 4000");
});

connectDb();

module.exports = app;
