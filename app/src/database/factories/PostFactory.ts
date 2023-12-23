import { EntityData } from '@mikro-orm/core';
import { Post } from '../entities/Post'
import { Factory, Faker } from '@mikro-orm/seeder';

export class PostFactory extends Factory<Post>
{
    model = Post

    protected definition(faker: Faker): EntityData<Post>
    {
        return {
            title: faker.name.middleName(),
            body: faker.lorem.sentences(2),
        }
    }
}

