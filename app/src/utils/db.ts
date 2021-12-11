import { createConnection } from 'typeorm';
import 'reflect-metadata'

export async function createDatabase(env: env)
{
    await createConnection(env)
}

export enum env {
    dev = "default",
    test = "test"
}
