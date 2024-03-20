import { Body, Controller, Get, Header, Headers, HttpException, HttpStatus, Inject, NotFoundException, Param, Post, Request, Res, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserService } from './user.service';
import { CookieOptions, Request as ExpressRequest, Response } from 'express';
import { IToken } from '@src/features/tokens/token.interface';

@Controller('user')
export class UserController {
    
    constructor(
        private userService:UserService,
    ){}

    @UsePipes(ValidationPipe)
    @Post("register")
    async register(@Body() userData:UserCreateDto,@Res() res){
        let result = await this.userService.register(userData);
        await this.setRefreshCookie(result.refresh_token,res);
        res.status(HttpStatus.CREATED).json({
            userId:result.user.id,
            access_token:result.access_token,
            refresh_token:result.refresh_token
        })
    }



    @Post("login")
    async login(@Body() userData:UserCreateDto,@Res() res){
        let tokens = await this.userService.login(userData.email,userData.password);
        await this.setRefreshCookie(tokens.refresh_token,res);
        res.status(HttpStatus.CREATED).json(tokens);
    }

    async setRefreshCookie(token:string,res:Response){
        if(!token){
            throw new UnauthorizedException({message:"Token not found"});
        }
        let cookieOptions:CookieOptions = {
            maxAge:30 * 24 *60 *60 ,// 30 days
            sameSite:'strict',
            secure:false
        }
        res.cookie("refresh_token",token,cookieOptions)
    }


    @Post("refresh_token")
    async refresh_token(@Body() userData:any){
        const tokens:IToken =  await this.userService.refresh_token(userData.refresh_token)
        return {
            ...tokens
        }
    
    }


    @Post("delete/:id")
    async delete(@Param("id") id:number){
        return await this.userService.delete(id);
    }
}
