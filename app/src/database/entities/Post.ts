import { BaseEntity } from "./BaseEntity";
import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';

import { Comment } from "./Comment";
import { PostRepository } from "@repositories/PostRepository";

/**
 * Very common pattern here in the modern back end world. Entities or models help us map data to table rows.
 * No need to touch what exists, but you will need to add mapping to comments when you build the relationship.
 * Do so at the bottom of the file.
 */
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
