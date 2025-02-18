import { DataSource } from "typeorm"
import { User } from "../entities/userEntities";
import { Products } from "../entities/productEntities";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5000,
    username: "postgres",
    password: "Kachi5599",
    database: "newnode",
    synchronize: true,
    logging: true,
    entities: [User, Products],
    migrations: [],
    subscribers: []
})