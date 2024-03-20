import { Injectable } from '@nestjs/common';
import {  ReservRepository } from './repo/reserv.repository';
import { IReservations } from './reserv.interface';
import { ReservationsEntity } from './reserv.entity';

@Injectable()
export class ReservService {

    constructor(
            private readonly reservRepo:ReservRepository
    ){}


    async create(data:IReservations){
        const newEntity = await new ReservationsEntity(data);
        return await this.reservRepo.create(newEntity);
    }

    async findAll(query?:any){
        return await this.reservRepo.findAll(query);
    }


}
