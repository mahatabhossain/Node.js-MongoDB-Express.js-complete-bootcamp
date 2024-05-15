"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const userModel_1 = require("../models/userModel");
exports.resolvers = {
    Query: {
        hello: () => {
            return 'Hello GraphQl';
        },
        getAllUser: () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield userModel_1.userModel.find();
            console.log(users);
            return users;
        }),
    },
    Mutation: {
        createUser: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            const { userName, email, password } = args.user;
            const user = new userModel_1.userModel({ userName, email, password }).save();
            return user;
        }),
        updateUser: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const { userName, email, password } = args.user;
            const updatedDetails = yield userModel_1.userModel.findByIdAndUpdate(id, { userName, email, password }, { new: true });
            return updatedDetails;
        }),
        deleteUser: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const deleteIfo = yield userModel_1.userModel.findByIdAndDelete({ _id: id });
            return 'Deleted';
        }),
    },
};
//# sourceMappingURL=resolver.js.map