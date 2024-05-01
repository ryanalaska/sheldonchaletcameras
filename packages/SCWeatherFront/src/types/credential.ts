import credentials from "../json/credentials.json"


export type User = typeof credentials[number];

export type LoginCredential = Pick<User, "username" | "password">;