import { IS_LENGTH, IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class RestarauntCreateDto{
    @IsString()
    @IsNotEmpty()
    name:string;
    
    @IsString()
    description:string;    
}