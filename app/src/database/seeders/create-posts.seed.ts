import { Seeder, Factory } from "typeorm-seeding"
import { Connection } from "typeorm"
import { Post } from "../entities/Post"
import 'reflect-metadata'

/**
 * No need to touch this or any other seeders. They just work. 
 * If you want to learn more about these, visit the typeorm-seeding github page
 */
export default class CreatePosts implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      await factory(Post)().createMany(10)
    }
}