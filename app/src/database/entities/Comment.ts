import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Post } from "./Post";

@Entity({
    name: "comments"
})
export class Comment {

    @PrimaryGeneratedColumn()
    id!:number

    @Column({
        name: "name"
    })
    name!:string

    @Column({
        name: "email_address"
    })
    email!:string

    @Column({
        name: "content"
    })
    content!:string

    @ManyToOne(() => Post, post => post.comments)
    @JoinColumn({name: "post_id"})
    post!: Post

    @CreateDateColumn({
        name: "created_at",
        type: "datetime"
    })
    createdAt!: Date

    @UpdateDateColumn({
        name: "updated_at",
        type: "datetime"
    })
    updatedAt!: Date
}
