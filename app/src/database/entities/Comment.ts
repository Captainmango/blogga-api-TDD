import { Collection, Entity, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from "./BaseEntity";
import { Post } from "./Post";

@Entity({ tableName: "comments" })
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
