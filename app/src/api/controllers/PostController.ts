import * as express from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { Post } from '../../database/entities/Post';
import { PostRepository } from '../../database/repositories/PostRepository';

export const postController: express.Router = express.Router();

// put the index route ("/" only) here

postController.get("/posts", async function (req: express.Request, res: express.Response): Promise<void> {
    const postRepository = getCustomRepository(PostRepository)

    postRepository.find({
        order: {
            id: 'ASC'
        }
    })
        .then(posts => {
            res.status(200).send(posts)
        })
        .catch(error => {
            res.send(error)
        })
})

postController.delete("/posts/:id", async function (req: express.Request, res: express.Response): Promise<void> {
    const postRepository = getCustomRepository(PostRepository)
    const postId = req.params.id

    postRepository.findOneOrFail(postId)
        .then(() => {
            postRepository.delete(postId)
            res.status(204).send()
        })
        .catch(error => {
            res.send(error)
        })
})

postController.post("/posts", async function (req: express.Request, res: express.Response): Promise<void> {
    const postRepository = getCustomRepository(PostRepository)
    const postBody = req.body

    const postToSave = new Post()
    postToSave.title = postBody.title
    postToSave.body = postBody.body

    postRepository.save(postToSave)
        .then(post => {
            res.status(201).send(post)
        })
        .catch(error => {
            res.send(error)
        })
})
