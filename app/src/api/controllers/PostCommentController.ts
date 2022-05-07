import * as express from 'express';
import { getCustomRepository } from 'typeorm';
import { CommentRepository } from '../repositories/CommentRepository';
import { PostRepository } from '../repositories/PostRepository';
import { Comment } from '../../database/entities/Comment';

export const postCommentController: express.Router = express.Router();

postCommentController.patch("/posts/:postId/comments/:commentId", async function (req: express.Request, res: express.Response): Promise<void>
{
    const postRepository = getCustomRepository(PostRepository)
    const commentRepository = getCustomRepository(CommentRepository)
    const { postId, commentId } = req.params
    const payload = req.body

    postRepository.findOneOrFail(postId)
    .then((post) => {
        const doesPostOwnComment = post.comments.find(comment => comment.id === Number(commentId))

        if (!doesPostOwnComment) {
            res.status(422).send(
                {
                    message: "This comment being updated does not belong to the post sent in the request"
                }
            )

            return
        }

        commentRepository.findOneOrFail(commentId)
        .then(async (comment) => {
            await commentRepository.update(comment.id, payload)
            const updatedComment = await commentRepository.findOne(comment.id)

            res.status(202).send(updatedComment)
        })
        .catch(error => {
            res.status(404).send(error)
        })
    })
    .catch(error => {
        res.status(404).send(error)
    })
})

postCommentController.post("/posts/:postId/comments", async function (req: express.Request, res: express.Response): Promise<void>
{
    const postRepository = getCustomRepository(PostRepository)
    const commentRepository = getCustomRepository(CommentRepository)
    const postId = req.params.postId
    const payload = req.body

    postRepository.findOneOrFail(postId)
    .then(async (post) => {
        const comment = new Comment()
        comment.post = post
        const newComment = await commentRepository.merge(comment, payload)
        res.status(201).send(newComment)
    })
    .catch(error => {
        res.status(404).send(error)
    })
})