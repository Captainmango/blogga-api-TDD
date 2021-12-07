import express from 'express'
import {Express} from 'express-serve-static-core'
import { postController } from '../api/PostController'

export async function createServer(): Promise<Express> 
{
  const server: Express = express()
  server.use(postController)
  return server
}