import { IsNumber, IsString } from "class-validator"

export class ProductDto {
    
    @IsString()
    productName: string
    
    @IsString()
    description: string

    @IsNumber()
    price: number
}