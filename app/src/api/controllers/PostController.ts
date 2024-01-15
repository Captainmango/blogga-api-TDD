import * as express from 'express';
import { Post } from '@entities/Post';
import { Deps } from '@main';
import { Json } from '@utils/server';

export const postController: express.Router = express.Router();

// put the index route ("/" only) here

postController.get("/posts", async function (req: express.Request, res: express.Response): Promise<void> {
    const postRepository = Deps.em.getRepository(Post)

    const posts = await postRepository.find({}, {
        orderBy: {
            id: 'ASC'
        }
    })

    if (posts.length > 0) {
        res.status(200).send(posts)
    } else {
        res.status(404).send()
    }
})

postController.delete("/posts/:id", async function (req: express.Request, res: express.Response): Promise<Json>
{
    const postRepository = Deps.em.getRepository(Post)
    const postId = parseInt(req.params.id)

    const post = await postRepository.findOne({id: postId})

    if (!post) {
        return res.status(404).send({"message": "hello"})
    }

    await postRepository.nativeDelete({id: post?.id})

    return res.status(204).send()
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
