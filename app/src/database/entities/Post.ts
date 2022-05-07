import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { Comment } from "./Comment";

/**
 * Very common pattern here in the modern back end world. Entities or models help us map data to table rows.
 * No need to touch what exists, but you will need to add mapping to comments when you build the relationship. 
 * Do so at the bottom of the file.
 */
@Entity({
    name: "posts"
})
export class Post {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 75
    })
    title!: string

    @Column({
        type: "text"
    })
    body!:string

    @OneToMany(() => Comment, comment => comment.post)
    comments!: Comment[]

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
