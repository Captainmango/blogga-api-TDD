import { define } from 'typeorm-seeding'
import Faker from 'faker'
import { Comment } from '../entities/Comment'

define(Comment, (faker: typeof Faker) => {
    const name = faker.hacker.noun()
    const email = faker.internet.exampleEmail()
    const content = faker.lorem.lines(5)

   
    const comment = new Comment()
    
    comment.name = name
    comment.email = email
    comment.content = content
    return comment
})


