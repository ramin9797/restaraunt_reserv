import { Body, Controller, Get, Header, Headers, HttpException, HttpStatus, Inject, NotFoundException, Post, Query, Req, Request, Res, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext, RpcException, TcpContext } from '@nestjs/microservices';
import { AuthGuard } from '@src/guards/auth.guard';
import { ReservService } from './reserv.service';
import { ReservCreateDto } from './dto/reserv-create.dto';
import { ReservationsEntity } from './reserv.entity';

@Controller('reserv')
export class ReservController {
    
    constructor(
        private reservService:ReservService,
    ){}

    @UseGuards(AuthGuard)
    // @UsePipes(ValidationPipe)
    @Post("create")
    async createPost(@Body() data:ReservCreateDto,@Req() req){
        console.log('rrrrrr232323232',req.user);
        let post = {
            ...data,
            date:new Date(),
            authorId:req.user.id,
        }
        let result = await this.reservService.create(post);
        return result;
    }

    @Get("all")
    async findAll(){
        return await this.reservService.findAll();
    }

    @Get('search')
    async findByFilter(@Query() query): Promise<ReservationsEntity[]> {
        return await this.reservService.findAll(query);
    }

}
