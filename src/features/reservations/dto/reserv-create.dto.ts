import { IS_LENGTH, IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MinLength } from "class-validator";

export class ReservCreateDto{
    @IsDate()
    @IsNotEmpty()
    date:Date;
    
    @IsNumber()
    count:number;  
    
    
    @IsNumber()
    restarauntId:number;  
}