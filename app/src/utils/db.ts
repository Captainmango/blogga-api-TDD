import { createConnection } from 'typeorm';
import 'reflect-metadata'
import { Post } from '../database/entities/Post';

export async function createDatabase()
{
    await createConnection({
    name: "default",
    type: "sqlite",
    database: "./database.sqlite",
    logging: true,
    synchronize: true,
    entities: [Post]
    })
}
