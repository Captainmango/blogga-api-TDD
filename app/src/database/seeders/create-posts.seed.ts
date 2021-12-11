import { Seeder, Factory } from "typeorm-seeding"
import { Connection } from "typeorm"
import { Post } from "../entities/Post"
import 'reflect-metadata'

export default class CreatePosts implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      await factory(Post)().createMany(3)
    }
}