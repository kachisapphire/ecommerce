import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./userEntities";
import { OrderItems } from "./orderItems";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    orderId: number;

    @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
    user: User;

    @OneToMany(() => OrderItems, (orderItems) => orderItems.order)
    orderItems: OrderItems[]
}