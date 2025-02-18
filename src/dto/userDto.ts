import { IsEmail, IsString } from "class-validator";

export class UserDto{
    @IsString()
    firstname: string;

    @IsString()
    lastname: string;
    
    @IsEmail()
    email: string;
    
    @IsString()
    password: string
}