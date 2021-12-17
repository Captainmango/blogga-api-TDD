import { define } from 'typeorm-seeding'
import { Post } from '../entities/Post'
import Faker from 'faker'

/**
 * These make the testing a dream to do. Implementing factories without typeorm-seeding isn't difficult, but requires
 * Lots of messing about with design patterns. These are a convenience. Check the tests implemented in postControllert.test.ts
 * to see how to use these.
 */

define(Post, (faker: typeof Faker) => {
    const title = faker.random.words(7)
    const body = faker.lorem.sentences(4)
   
    const post = new Post()
    
    post.title =  title
    post.body = body
    return post
})


