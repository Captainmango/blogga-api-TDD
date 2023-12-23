import * as express from 'express';
import { Post } from '../../database/entities/Post';
import { PostRepository } from '@repositories/PostRepository';
import { Deps } from 'app/src/app';

export const postController: express.Router = express.Router();

// put the index route ("/" only) here

postController.get("/posts", async function (req: express.Request, res: express.Response): Promise<void> {
    const postRepository = Deps.em.getRepository(Post)

    postRepository.find({}, {
        orderBy: {
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
    const postRepository = Deps.em.getRepository(Post)
    const postId = parseInt(req.params.id)

    postRepository.findOneOrFail({id: postId})
        .then(() => {
            postRepository.nativeDelete(postId)
            res.status(204).send()
        })
        .catch(error => {
            res.send(error)
        })
})

postController.post("/posts", async function (req: express.Request, res: express.Response): Promise<void> {
    const postRepository = Deps.em.getRepository(Post)
    const postBody = req.body

    const post = postRepository.create({
        title: postBody.title,
        body: postBody.body
    })

    res.status(201).send(post)
})
