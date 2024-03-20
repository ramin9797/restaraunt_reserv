import {  HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from '@src/features/tokens/token.service';
import { IToken } from '@src/features/tokens/token.interface';
import { Gender, UserRole } from './user.interface';
import { UserRepository } from './repo/user.repository';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {

    constructor(
            private readonly userRepo:UserRepository,
            private jwtService:JwtService,
            private config:ConfigService,
            private tokenService:TokenService,
    ){}


    async register({email,name,password,role}:UserCreateDto){
        // check if already user with email
        let candidate = await this.userRepo.findUser(email);
        if(candidate){
            throw new RpcException({message:"User with this email already exists",status:HttpStatus.FOUND})
        }
       
        const newUserEntity = await new UserEntity({
            email,
            name,
            gender:Gender.Male,
            role:role || UserRole.User
        }).setPassword(password);


        const newUser = await this.userRepo.createUser(newUserEntity);
        let tokens:IToken = await this.tokenService.generateTokens({email,id:newUser.id,role:newUser.role})
        await this.tokenService.saveTokens({
            user_id:newUser.id,
            refresh_token:tokens.refresh_token
        })
        return {
            user:newUser,
            access_token:tokens.access_token,
            refresh_token:tokens.refresh_token
        };
    }


    async login(email:string,password:string){
        const user = await this.validate(email,password);
        let tokens:IToken = await this.tokenService.generateTokens({email,id:user.id,role:user.role})
        await this.tokenService.saveTokens({
            user_id:user.id,
            refresh_token:tokens.refresh_token
        })
        return tokens;
    }

    async validate(email:string,password:string){
        const user = await this.userRepo.findUser(email);
        if(!user){
            throw new NotFoundException({message:"User with email not found"})
        }

        const userEntity = await new UserEntity(user);
        await userEntity.setHashPassword(user.password);
        const isCorrectPassword = await userEntity.validatePassword(password);
        if(!isCorrectPassword){
            throw new NotFoundException({message:"Email or password not valid"})
        }
        return userEntity;
    }
    

    async refresh_token(refreshToken:string){
        const token = await this.tokenService.findToken(refreshToken);
        
        if(!token){
            throw new UnauthorizedException()
        }
        const user = await this.userRepo.findById(token.user_id);
        if(!user){
            throw new UnauthorizedException()
        }

        const tokens = await this.tokenService.refreshToken({email:user.email,id:user.id},refreshToken);
        await this.tokenService.saveTokens({
            user_id:user.id,
            ...tokens
        })
        return tokens;
    }


    async findAll(){
        return await this.userRepo.findAll();
    }

    async findUserByEmail(email:string){
        return await this.userRepo.findUser(email);
    }

    async delete(id:number){
        return await this.userRepo.delete(id);
    }

    
}
