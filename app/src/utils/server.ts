import express from 'express'
import { Express } from 'express-serve-static-core'
import { postCommentController } from '../api/controllers/PostCommentController'
import { commentController } from '../api/controllers/CommentController'
import { postController } from '../api/controllers/PostController'


/**
 * Basic server creation. You'll need to add the controllers in here like how the postController already is.
 * 
 * @returns Promise<Express>
 */

export async function createServer(): Promise<Express> {
  const server: Express = express()
  server.use(express.json())
  server.use(postController)
  

  /**
   * Put controllers here. copy the above example replacing the arg for the controller in question
   * 
   * for example, using the comment controller would look like:
   * server.use(commentController)
   */  
  return server
}