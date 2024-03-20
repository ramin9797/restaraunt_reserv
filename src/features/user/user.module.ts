import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from '@src/features/tokens/token.service';
import { TokenEntity } from '@src/features/tokens/token.entity';
import { UserRepository } from './repo/user.repository';
import { AuthGuard } from '@src/guards/auth.guard';

@Module({
    imports:[
        ConfigModule,
        TypeOrmModule.forFeature([UserEntity,TokenEntity]),
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:(config:ConfigService)=>({
                secret:config.get<string>("JWT_SECRET")
            })
        })
    ],
    providers: [UserService,TokenService,UserRepository],
    controllers:[UserController],
    exports:[JwtModule,ConfigModule,UserService]
})
export class UserModule {}
