import * as express from 'express';
import { getCustomRepository } from 'typeorm';
import { Post } from '../../database/entities/Post';
import { PostRepository } from '../repositories/PostRepository';

export const postController: express.Router = express.Router();
postController.use(express.json())
const postRepository = getCustomRepository(PostRepository)

// put the index route here

postController.get("/posts", async function (req: express.Request, res: express.Response): Promise<void>
{
    const posts = await postRepository.find()
    res.type('json').send({'posts': posts}).status(200)
})