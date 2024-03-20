import { Injectable } from '@nestjs/common';
import {  RestarauntRepository } from './repo/restaraunt.repository';
import { RestarauntEntity } from './restaraunt.entity';
import { IRestaraunt } from './restaraunt.interface';

@Injectable()
export class RestarauntService {

    constructor(
            private readonly restRepo:RestarauntRepository
    ){}


    async create(data:IRestaraunt){
        const newEntity = await new RestarauntEntity(data);
        return await this.restRepo.create(newEntity);
    }

    async findAll(){
        return await this.restRepo.findAll();
    }

    async delete(id:number){
        return await this.restRepo.delete(id);
    }


}
