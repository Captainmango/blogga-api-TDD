import { Factory, Faker } from '@mikro-orm/seeder';
import { Comment } from '@entities/Comment'
import { EntityData } from '@mikro-orm/core';
import { PostFactory } from './PostFactory';

export class CommentFactory extends Factory<Comment>
{
    model = Comment

    protected definition(faker: Faker): EntityData<Comment>
    {
        return {
            content: faker.lorem.sentences(2),
            email: faker.name.firstName("male"),
            name: faker.name.lastName("female"),
        }
    }
}
