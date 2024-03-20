import {Entity,Column,PrimaryGeneratedColumn,OneToMany} from 'typeorm'
import { Gender, IUser, UserRole } from './user.interface';
import { compare, compareSync, genSalt, hash } from 'bcryptjs';
import {  RestarauntEntity } from '../restaraunt/restaraunt.entity';
import { ReservationsEntity } from '../reservations/reserv.entity';



@Entity('users')
export class UserEntity implements IUser {

    @PrimaryGeneratedColumn()
    id:number;


    @Column()
    name:string;

    @Column({unique:true})
    email:string;

    @Column({})
    password:string;


    @Column("enum",{enum:Gender})
    gender:Gender;

    @Column("enum",{enum:UserRole})
    role: UserRole;

    @OneToMany(() => RestarauntEntity, reserv => reserv.authorId,{cascade:true}) // Уточнение названия поля, которое представляет отношение
    restaraunts: RestarauntEntity[];


    @OneToMany(() => ReservationsEntity, reserv => reserv.author,{cascade:true}) // Уточнение названия поля, которое представляет отношение
    reservations: ReservationsEntity[];


    constructor(user:Omit<IUser,"password">){
        if(user){
            this.id = user.id;
            this.name = user.name;
            this.email = user.email;
            this.role = user.role;
            this.gender = user.gender
        }
    }


    public async setPassword(password:string) {
        const salt = await genSalt(10);
        this.password = await hash(password,salt);
        return this;
    }

    public async setHashPassword(password:string){
        this.password = password;
        return this;
    }

    public async validatePassword(password:string){
        console.log("compare error",password,this.password);
        return await compare(password,this.password);
    }
}
