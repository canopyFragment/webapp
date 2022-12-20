import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";


@Entity('Website')
export class Website extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column()
    category: string;
}