import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from "./BaseEntity";
import { Post } from "./Post";
import { CommentRepository } from '@repositories/CommentRepository';

@Entity({
    tableName: "comments",
    customRepository: () => CommentRepository
})
export class Comment extends BaseEntity
{
    @Property({
        name: "name"
    })
    name!:string

    @Property({
        name: "email_address"
    })
    email!:string

    @Property({
        name: "content"
    })
    content!:string

    @ManyToOne(() => Post)
    post!: Post
}
