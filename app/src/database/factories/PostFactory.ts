import { EntityData } from '@mikro-orm/core';
import { Post } from '../entities/Post'
import { Factory, Faker } from '@mikro-orm/seeder';

/**
 * These make the testing a dream to do. Implementing factories without typeorm-seeding isn't difficult, but requires
 * Lots of messing about with design patterns. These are a convenience. Check the tests implemented in postControllert.test.ts
 * to see how to use these.
 */

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

