import { Comment } from '@entities/Comment';
import { Post } from '@entities/Post';
import { Deps } from '@main';
import { Json } from '@utils/server';
import * as express from 'express';

export const postCommentController: express.Router = express.Router();

postCommentController.patch("/posts/:postId/comments/:commentId", async function (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const postRepository = Deps.em.getRepository(Post)
    const commentRepository = Deps.em.getRepository(Comment)
    const { postId, commentId } = req.params
    const payload = req.body

    // What happens if either the post or comment do not exist?
    const post = await postRepository.findOneOrFail({id: parseInt(postId)})
    const comment = await commentRepository.findOneOrFail({id: parseInt(commentId)})

    // Looks like we need some logic to check if the comment we want to change belongs to the post we found

    const updatedComment = await commentRepository.upsert({
        id: comment.id,
        ...payload
    })

    res.status(202).send(updatedComment)
})
