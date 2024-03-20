import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { RestarauntEntity } from "../restaraunt.entity";

@Injectable()
export class RestarauntRepository{
    constructor(
        @InjectRepository(RestarauntEntity) private restRepo:Repository<RestarauntEntity>
    ){}

    async create(user:RestarauntEntity){
        return await this.restRepo.save(user) 
    }

    async findAll(){
        return await this.restRepo.find({
            relations:{
                author:true
            }
        });
    }


    async findById(id:number){
        return await this.restRepo.findOne({where:{id}});
    }

    async delete(id:number){
        return await this.restRepo.delete({id})
    }
}