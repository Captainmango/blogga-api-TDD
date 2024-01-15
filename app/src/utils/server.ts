import express from 'express'
import { Express } from 'express-serve-static-core'
import { postCommentController } from '../api/controllers/PostCommentController'
import { commentController } from '../api/controllers/CommentController'
import { postController } from '../api/controllers/PostController'
import { Deps } from '..'
import { RequestContext } from '@mikro-orm/core'

export type Json = Record<string, any>

export async function createServer(): Promise<Express> {
  const server: Express = express()
  server.use(express.json())
  server.use((req, res, next) => RequestContext.create(Deps.orm.em, next))

  server.use(postController)


  /**
   * Put controllers here. copy the above example replacing the arg for the controller in question
   *
   * for example, using the comment controller would look like:
   * server.use(commentController)
   */

  /**
   * This handler will be invoked if you don't handle errors. Anything that enters the API
   * and does not return a response to the client will eventually end up here.
   */
  server.use(
    function onError(err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void
    {
      console.error(err)
      res.status(500).send({
        "error": err.name,
        "message": err.message,
        "stackTrace": err.stack
      })
    }
  )

  return server
}
