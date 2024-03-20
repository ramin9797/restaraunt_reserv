import { IS_LENGTH, IsArray, IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { UserRole } from "../user.interface";

export class UserCreateDto{
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    name:string;
    
    @IsNotEmpty()
    @Matches(/[a-zA-Z0-9\d]{5,}/,{message:"Too weak password"})    
    password:string

    @IsString()
    role:UserRole;
}