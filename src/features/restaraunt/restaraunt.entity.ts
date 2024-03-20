import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn,OneToMany} from 'typeorm'
import { IRestaraunt } from './restaraunt.interface';
import { UserEntity } from '../user/user.entity';
import { ReservationsEntity } from '../reservations/reserv.entity';


@Entity('restaraunt')
export class RestarauntEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({})
    description:string;


    @Column() // Добавляем колонку для хранения идентификатора пользователя
    authorId: number;

    @ManyToOne(() => UserEntity, user => user.restaraunts,{
        onDelete:"CASCADE",onUpdate:"CASCADE"
    }) 
    @JoinColumn({ name: 'authorId' }) // Уточняем имя колонки для связи
    author: UserEntity;

    @OneToMany(() => ReservationsEntity, reserv => reserv.restaraunt, { cascade: true }) // Уточнение названия поля, которое представляет отношение
    reservations: ReservationsEntity[];

    constructor(post:IRestaraunt){
        if(post){
            this.name = post.name;
            this.description = post.description;
            this.authorId = post.author;
        }
    }
  
}
