import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./productEntities";
import {Order} from "./orderEntities";

@Entity()
export class OrderItems{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.orderItems, {  cascade: true,  onDelete: 'CASCADE'  })
    order: Order

    @ManyToOne(() => Products, (product) => product.orderItems, {  cascade: true, onDelete: 'CASCADE'})
    product: Products

    @Column()
    quantity: number
}

