import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

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

    @Column({
        name: "post_id",
        nullable: true
    })
    postId!: number | null

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
