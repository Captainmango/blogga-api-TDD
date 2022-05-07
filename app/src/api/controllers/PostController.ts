import * as express from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { Post } from '../../database/entities/Post';
import { PostRepository } from '../repositories/PostRepository';

export const postController: express.Router = express.Router();

// put the index route ("/" only) here

postController.get("/", async function (req: express.Request, res: express.Response): Promise<void> {
    res.status(200).send({message: "bingo bango"})
})


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
        res.status(500).send(error)
    })
})

postController.get("/posts/:id", async function (req: express.Request, res: express.Response): Promise<void> {
    const postRepository = getCustomRepository(PostRepository)
    const postId = req.params.id
    
    postRepository.findOneOrFail(postId)
    .then(post => {
        res.status(200).send(post)
    })
    .catch(error => {
        res.status(404).send(error)
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
        res.status(404).send(error)
    })
})

postController.patch("/posts/:id", async function (req: express.Request, res: express.Response): Promise<void> {
    const postRepository = getCustomRepository(PostRepository)
    const postId = req.params.id
    const postBody = req.body
    
    postRepository.findOneOrFail(postId)
    .then(async (post) => {
        await postRepository.update(post.id, postBody)
        const updatedPost = await postRepository.findOne(post.id)
        res.status(200).send(updatedPost)
    })
    .catch(error => {
        res.status(404).send(error)
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