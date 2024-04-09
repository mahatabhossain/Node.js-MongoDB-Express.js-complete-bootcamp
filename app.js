const express = require("express");
const app = express();
const connectDb = require("./dbCon");
const { router } = require("./routers/userRouter");
const cors = require("cors");
const { userModel } = require("./models/userModel");
const { verifyToken } = require("./middleware/validateToken");

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./doc/swagger_output.json');


app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/user", router);

app.get('/get/data', verifyToken, async (req, res) => {
  try{
    const userDetails = await userModel.find();
    return res.status(200).json({status: 'success', userDetails}) 
  }catch(e){
    console.log(e.message)
  }
})

app.listen(4000, () => {
  console.log("server running on 4000");
});
connectDb();

module.exports = app;
