import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity('posts')
export class Post {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 75
    })
    title!: string

    @Column({
        length: 300,
        type: "text"
    })
    body!:string
}
