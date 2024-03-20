import { Body, Controller, Get, Header,Param, Headers, HttpException, HttpStatus, Inject, NotFoundException, Post, Req, Request, Res, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { RestarauntService } from './restaraunt.service';
import { AuthGuard } from '@src/guards/auth.guard';
import { Roles } from '@src/decorators/roles.decorator';
import { UserRole } from '@src/features/user/user.interface';
import { RolesGuard } from '@src/guards/role.guard';
import { RestarauntCreateDto } from './dto/restaraunt-create.dto';

@Controller('restaraunt')
export class RestarauntController {
    
    constructor(
        private service:RestarauntService,
    ){}

    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Post("create")
    async createPost(@Body() data:RestarauntCreateDto,@Req() req){
        console.log('rrrrrr',req.user);
        let post = {
            ...data,
            author:req.user.id
        }
        let result = await this.service.create(post);
        return result;
    }

    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    @Get("all")
    async findAll(){
        return await this.service.findAll();
    }

    @Post("delete/:id")
    async delete(@Param("id") id:number){
        return await this.service.delete(id);
    }





   

}
