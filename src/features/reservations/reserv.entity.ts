import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn} from 'typeorm'
import { IReservations } from './reserv.interface';
import { UserEntity } from '../user/user.entity';
import { RestarauntEntity } from '../restaraunt/restaraunt.entity';


@Entity('reservations')
export class ReservationsEntity implements IReservations{
    @PrimaryGeneratedColumn()
    id:number;


    @Column({})
    date:Date;

    @Column()
    count:number;

    @Column()
    restarauntId:number;

    @Column() // Добавляем колонку для хранения идентификатора пользователя
    authorId: number;
  

    @ManyToOne(() => UserEntity, user => user.reservations,{
        onDelete:"CASCADE",onUpdate:"CASCADE"
    }) 
    @JoinColumn({ name: 'authorId' }) // Уточняем имя колонки для связи
    author: UserEntity;


    @ManyToOne(() => RestarauntEntity, post => post.reservations,{
        onDelete: 'RESTRICT', onUpdate: 'CASCADE'   
    }) 
    @JoinColumn({ name: 'restarauntId' }) // Уточняем имя колонки для связи
    restaraunt: RestarauntEntity;


    constructor(reserv:IReservations){
        if(reserv){
            this.date = reserv.date;
            this.count =reserv.count ;
            this.restarauntId =reserv.restarauntId;
            this.authorId =reserv.authorId;
        }
    }
  
}
