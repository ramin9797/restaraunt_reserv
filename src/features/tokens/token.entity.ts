import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'


@Entity('tokens')
export class TokenEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    refresh_token:string;

    @Column({unique:true})
    user_id:number;
}
