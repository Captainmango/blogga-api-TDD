import { Seeder, Factory } from "typeorm-seeding"
import { Connection } from "typeorm"
import { Comment } from "../entities/Comment"
import 'reflect-metadata'


/**
 * Don't touch this, kthx
 */
export default class CreatePosts implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      await factory(Comment)().createMany(10)
    }
}