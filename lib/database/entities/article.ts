import "reflect-metadata";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";


@Entity('Article')
export class Article extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    date: string;

    @Column()
    url: string;

    @Column()
    website: string;
}