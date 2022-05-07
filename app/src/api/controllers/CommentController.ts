import * as express from 'express';
import { getCustomRepository } from 'typeorm';
import { CommentRepository } from '../repositories/CommentRepository';

export const commentController: express.Router = express.Router();

commentController.get("/comments", async function (req: express.Request, res: express.Response): Promise<void> 
{
    const commentRepository = getCustomRepository(CommentRepository)

    commentRepository.find(
        {
            order: {
                id: "ASC"
            }
        }
    )
    .then(comments => {
        res.status(200).send(comments)
    })
    .catch(error => {
        res.status(500).send(error)
    })
})