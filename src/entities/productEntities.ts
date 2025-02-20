import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { OrderItems } from "./orderItems"
//import { Order } from "./orderEntities"

@Entity()
export class Products{
    @PrimaryGeneratedColumn()
    productId: number

    @Column()
    productName: string

    @Column()
    description: string

    @Column()
    price: number

    @OneToMany(() => OrderItems, (orderItem) => orderItem.product)
    orderItems: OrderItems[]
}