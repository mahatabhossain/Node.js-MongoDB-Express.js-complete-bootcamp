import { userModel } from "../models/userModel";

export const resolvers = {
    Query: {
      hello: () => {
        return 'Hello GraphQl';
      },
      getAllUser: async () => {
        const users = await userModel.find()
        console.log(users)
        return users
      }
    },
    Mutation: {
        createUser: async (parent, args, context, info) => {
            const { userName, email, password } = args.user
            const user = new userModel({userName, email, password }).save()
            return user
        }
    }
  };