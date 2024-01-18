import { PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity
{
    @PrimaryKey({
        type: "bigint"
    })
    id!: number;

    @Property({
        type: "timestamp",
        onCreate: () => new Date()
    })
    createdAt?: Date = new Date();

    @Property({
        type: "timestamp",
        onUpdate: () => new Date() 
    })
    updatedAt?: Date = new Date();
}
