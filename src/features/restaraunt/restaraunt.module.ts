import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  RestarauntEntity } from './restaraunt.entity';
import {  RestarauntService } from './restaraunt.service';
import {  RestarauntController } from './restaraunt.controller';
import {  RestarauntRepository } from './repo/restaraunt.repository';
import { UserModule } from '@src/features/user/user.module';
import { TokensModule } from '@src/features/tokens/tokens.module';
@Module({
    imports:[
        UserModule,
        TokensModule,
        TypeOrmModule.forFeature([RestarauntEntity]),
    ],
    providers: [
        RestarauntService,RestarauntRepository
    ],
    controllers:[RestarauntController]
})
export class RestarauntModule {}
