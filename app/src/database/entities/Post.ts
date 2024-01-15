import { BaseEntity } from "./BaseEntity";
import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';

import { Comment } from "./Comment";
import { PostRepository } from "@repositories/PostRepository";

@Entity({
    tableName: 'posts',
    customRepository: () => PostRepository
})
export class Post extends BaseEntity {
    @Property({
        length: 75,
    })
    title!: string

    @Property({
        type: "text"
    })
    body!: string

    @OneToMany(() => Comment, comment => comment.post)
    comments: Collection<Comment> = new Collection<Comment>(this)

    constructor(title: string, body: string) {
        super()
        this.title = title
        this.body = body
    }
}
