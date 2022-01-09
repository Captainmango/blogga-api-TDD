import express from 'express'
import { Express } from 'express-serve-static-core'
import { postController } from '../api/controllers/PostController'


/**
 * Basic server creation. You'll need to add the controllers in her like how the postController alread is.
 * 
 * @returns Promise<Express>
 */

export async function createServer(): Promise<Express> {
  const server: Express = express()
  server.use(express.json())
  server.use(postController)
  // Put controllers here. copy the above example replacing the arg for the controller in question
  return server
}