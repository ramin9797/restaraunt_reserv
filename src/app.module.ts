import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './ormconfig';
import { UserModule } from './features/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TokensModule } from './features/tokens/tokens.module';
import { ReservModule } from './features/reservations/reserv.module';
import { RestarauntModule } from './features/restaraunt/restaraunt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'./.development.env'
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:()=>dataSource.options
    }),
    UserModule,
    JwtModule,
    TokensModule,
    RestarauntModule,
    ReservModule
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule {}
