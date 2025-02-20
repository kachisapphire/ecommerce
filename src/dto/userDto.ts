import { IsEmail, IsOptional, IsString } from "class-validator";
import { Role } from "enums/userEnums";

export class UserDto{
    
    @IsString()
    firstname: string;

    @IsString()
    lastname: string;
    
    @IsEmail()
    email: string;
    
    @IsString()
    password: string

    @IsOptional()
    @IsString()
    role?: Role
}