import { createConnection } from 'typeorm';
import 'reflect-metadata'
import { runSeeder, useSeeding } from 'typeorm-seeding';
import CreatePosts from '../database/seeders/create-posts.seed';

export async function createDatabase(env: env): Promise<void>
{
    await createConnection(env)
    await useSeeding()
    await runSeeder(CreatePosts)
}

export enum env {
    dev = "default",
    test = "test"
}
