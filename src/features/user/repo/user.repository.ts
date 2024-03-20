import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(UserEntity) private userRepo:Repository<UserEntity>
    ){}

    async createUser(user:UserEntity){
        return await this.userRepo.save(user) 
    }

    async findAll(){
        return await this.userRepo.find();
    }


    async findById(id:number){
        return await this.userRepo.findOne({where:{id}});
    }

    async findUser(email:string){
        return await this.userRepo.findOne({where:{email}});
    }

    async deleteUser(email:string){
        return await this.userRepo.delete({email});
    }

    async delete(id:number){
        return await this.userRepo.delete({id});
    }
}