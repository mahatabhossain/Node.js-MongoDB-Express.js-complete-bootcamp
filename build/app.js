"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbCon_1 = require("./config/dbCon");
const userRouter_1 = require("./routers/userRouter");
const app = (0, express_1.default)();
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./doc/swagger_output.json"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
app.use("/user", userRouter_1.router);
app.listen(4000, () => {
    console.log("server running on 4000");
});
(0, dbCon_1.connectDb)();
module.exports = app;
//# sourceMappingURL=app.js.map