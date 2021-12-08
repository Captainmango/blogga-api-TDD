import { createConnection } from 'typeorm';
import 'reflect-metadata'
import { Post } from '../database/entities/Post';

export async function createDatabase()
{
    await createConnection()
    
}
