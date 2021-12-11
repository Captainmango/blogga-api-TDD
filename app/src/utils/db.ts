import { Connection, createConnection, getConnection } from 'typeorm';
import 'reflect-metadata'
import { runSeeder, useSeeding } from 'typeorm-seeding';
import CreatePosts from '../database/seeders/create-posts.seed';

export async function createDatabase(): Promise<void>
{
    await createConnection()
    await useSeeding()
    await runSeeder(CreatePosts)
}

