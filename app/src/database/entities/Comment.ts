import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from "./BaseEntity";
import { Post } from "./Post";
import { CommentRepository } from '@repositories/CommentRepository';

@Entity({
    tableName: "comments",
    customRepository: () => CommentRepository
})
export class Comment extends BaseEntity {
    @Property({
        name: "name",
        type: "varchar"
    })
    name!: string

    @Property({
        name: "email_address",
        type: "varchar"
    })
    email!: string

    @Property({
        name: "content",
        type: "text"
    })
    content!: string

    @ManyToOne(() => Post)
    post!: Post

    constructor(name: string, email: string, content: string) {
        super()
        
        this.content = content
        this.email = email
        this.name = name
    }
}
