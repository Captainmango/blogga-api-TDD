import * as express from 'express';
import { getCustomRepository } from 'typeorm';
import { CommentRepository } from '../../database/repositories/CommentRepository';
import { PostRepository } from '../../database/repositories/PostRepository';

export const postCommentController: express.Router = express.Router();

postCommentController.patch("/posts/:postId/comments/:commentId", async function (req: express.Request, res: express.Response): Promise<void> {
    const postRepository = getCustomRepository(PostRepository)
    const commentRepository = getCustomRepository(CommentRepository)
    const { postId, commentId } = req.params
    const payload = req.body

    postRepository.findOneOrFail(postId)
        .then((post) => {

            // Looks like we need some logic to check if the commentId sent belongs to the post we found

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
            res.send(404).send(error)
        })
})
