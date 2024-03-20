import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IToken, ITokenPayload } from './token.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from './token.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {


    constructor(
        @InjectRepository(TokenEntity) private tokenRepo:Repository<TokenEntity>,
        private config:ConfigService,
        private jwtService:JwtService
        ){}


    async findToken(refresh_token:string){
        let findToken:TokenEntity = await this.tokenRepo.findOne({where:{refresh_token}})
        return findToken
    }    

    async generateTokens(payload:ITokenPayload){
        const tokens = {
            access_token: await this.jwtService.signAsync(payload,{
                secret:this.config.get<string>("JWT_SECRET"),
                expiresIn:this.config.get<string>("ACCESS_EXPIRED"),
            }),
            refresh_token: await this.jwtService.signAsync(payload,{
                secret:this.config.get<string>("JWT_REFRESH_SECRET"),
                expiresIn:this.config.get<string>("REFRESH_EXPIRED"),
            })
        }

        return tokens;
    }

    async saveTokens(data:Omit<TokenEntity,"id">):Promise<TokenEntity>{
        let findToken:TokenEntity = await this.tokenRepo.findOne({where:{user_id:data.user_id}})
        if(findToken){
            let res = await this.tokenRepo.update({user_id:data.user_id},{refresh_token:data.refresh_token})
            return findToken;
        }
        let saveToken = this.tokenRepo.save(data);
        return saveToken;
    }


    async refreshToken(payload:ITokenPayload,refresh_token:string){
        try{
            await this.jwtService.verifyAsync(refresh_token,{
                secret:this.config.get<string>("JWT_REFRESH_SECRET")
            })
            let newTokens = await this.generateTokens(payload)
            return newTokens;
        }
        catch(e){
            throw new UnauthorizedException({message:"Refresh token expired"})
        }
    }

}
