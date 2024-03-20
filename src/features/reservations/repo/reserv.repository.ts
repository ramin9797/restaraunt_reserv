import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { IReservations } from "../reserv.interface";
import { ReservationsEntity } from "../reserv.entity";

@Injectable()
export class ReservRepository{
    constructor(
        @InjectRepository(ReservationsEntity) private reservRepo:Repository<ReservationsEntity>
    ){}

    async create(reserv:IReservations){
        console.log(reserv);
        return await this.reservRepo.save(reserv) 
    }

    async findAll(query:any){
        return await this.reservRepo.find({
            where:{
                ...query
            },
            relations:{
                author:true,
                restaraunt:true
            }
        });
    }

    
}