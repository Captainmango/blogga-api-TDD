import { define } from 'typeorm-seeding'
import { Post } from '../entities/Post'
import Faker from 'faker'

define(Post, (faker: typeof Faker) => {
    const title = faker.random.words(7)
    const body = faker.lorem.sentences(4)
   
    const post = new Post()
    post.title =  title
    post.body = body
    return post
  })


