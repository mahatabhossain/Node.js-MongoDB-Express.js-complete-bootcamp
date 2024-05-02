import { User } from "../interface/users"

function genericExp<T>(value: T): T {
    return value
}

console.log(genericExp<User>({userName: 'abc', password: 'abbc', email: 'adk'}))