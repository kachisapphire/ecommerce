import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Role} from "../enums/userEnums";
import { Order } from "./orderEntities"

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string

    @Column({type: 'enum', enum: Role, default: Role.USER})
    role: Role

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]
}