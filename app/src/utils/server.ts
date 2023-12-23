import express from 'express'
import { Express } from 'express-serve-static-core'
import { postCommentController } from '../api/controllers/PostCommentController'
import { commentController } from '../api/controllers/CommentController'
import { postController } from '../api/controllers/PostController'
import { Deps } from '../app'
import { RequestContext } from '@mikro-orm/core'


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

  server.use(
    function onError(err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void
    {
      console.error(err)
      res.statusCode = 500;
      res.end
    }
  )

  return server
}
