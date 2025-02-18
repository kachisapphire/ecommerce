import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}