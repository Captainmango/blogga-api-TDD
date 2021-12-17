import * as express from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { Post } from '../../database/entities/Post';
import { PostRepository } from '../repositories/PostRepository';

export const postController: express.Router = express.Router();

// put the index route ("/" only) here

postController.get("/posts", async function (req: express.Request, res: express.Response): Promise<void>
{   
    const postRepository = getCustomRepository(PostRepository)
    const posts = await postRepository.find()
    res.status(200)
    res.type('json').send({posts})
})

postController.delete("/posts/:id", async function(req: express.Request, res: express.Response): Promise<void>
{
    const postRepository = getCustomRepository(PostRepository)
    const postId = req.params.id
    const post = await postRepository.findOneOrFail(postId)
    if (!post) {
        res.type('json').send({message: `Post with ID ${postId} not deleted as not found`}).status(404)
        return
    }
    await postRepository.delete(postId)
    res.status(204)
    res.type('json').send({message: `Post with ID ${postId} deleted`})
})

postController.post("/posts", async function(req: express.Request, res: express.Response): Promise<void>
{
    const postRepository = getCustomRepository(PostRepository)
    const postBody = req.body
    const postToSave = new Post()
    postToSave.title = postBody.title
    postToSave.body = postBody.body

    await postRepository.save(postToSave)
    
    res.status(201)
    res.type('json').send(postToSave)
})