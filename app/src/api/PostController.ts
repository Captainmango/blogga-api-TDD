import * as express from 'express';
import { getConnection, getRepository } from 'typeorm';
import { Post } from '../database/entities/Post';

export const postController: express.Router = express.Router();
postController.use(express.json())

// put the index route here

postController.get("/posts", function (req: express.Request, res: express.Response): void
{
    const postRepository = getRepository(Post);
    const posts = postRepository.find
    res.type('json').send({'posts': posts}).status(200)
})