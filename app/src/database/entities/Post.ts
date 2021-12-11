import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity({
    name: "posts"
})
export class Post {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        length: 75
    })
    title!: string

    @Column({
        type: "text"
    })
    body!:string

    @CreateDateColumn({
        name: "created_at",
        type: "datetime"
    })
    createdAt!: Date

    @UpdateDateColumn({
        name: "updated_at",
        type: "datetime"
    })
    UpdatedAt!: Date
}
