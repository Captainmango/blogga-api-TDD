import { Comment } from '@entities/Comment';
import { Post } from '@entities/Post';
import { Deps } from '@main';
import { Json } from '@utils/server';
import * as express from 'express';

export const postCommentController: express.Router = express.Router();

postCommentController.patch("/posts/:postId/comments/:commentId", async function (req: express.Request, res: express.Response): Promise<Json> {
    const postRepository = Deps.em.getRepository(Post)
    const commentRepository = Deps.em.getRepository(Comment)
    const { postId, commentId } = req.params
    const payload = req.body

    postRepository.findOneOrFail({id: parseInt(postId)})
        .then((post) => {
            // Looks like we need some logic to check if the commentId sent belongs to the post we found

            commentRepository.findOneOrFail({id: parseInt(commentId)})
                .then(async (comment) => {
                    await commentRepository.upsert({
                        id: comment.id,
                        ...payload
                    })
                    
                    const updatedComment = await commentRepository.findOne(comment.id)
            
                    return res.status(202).send(updatedComment)
                })
                .catch(error => {
                    return res.status(404).send(error.message)
                })
        })
        .catch(error => {
            return res.status(404).send(error.message)
        })
})
