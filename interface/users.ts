export interface User {
    userName: string,
    email: string, 
    password: string
}

export interface TokenDetails {
    isError: boolean,
    msg?: string,
    verifiedToken?: any,
    err?: string
}