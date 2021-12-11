import * as express from 'express';
import { getRepository } from 'typeorm';
import { Post } from '../database/entities/Post';

export const postController: express.Router = express.Router();
postController.use(express.json())

// put the index route here

postController.get("/posts", async function (req: express.Request, res: express.Response): Promise<void>
{
    const postRepository = getRepository(Post);
    const posts = await postRepository.find()
    res.type('json').send({'posts': posts}).status(200)
})