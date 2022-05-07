import * as express from 'express';
import { getCustomRepository } from 'typeorm';
import { CommentRepository } from '../repositories/CommentRepository';

export const commentController: express.Router = express.Router();

commentController.get("/comments", async function (req: express.Request, res: express.Response): Promise<void> 
{
    const commentRepository = getCustomRepository(CommentRepository)

    commentRepository.find()
    .then(comments => {
        res.status(200).send(comments)
    })
    .catch(error => {
        console.log(error)
        res.status(500).send(error)
    })
})

commentController.get("/comments/:id", async function (req: express.Request, res: express.Response): Promise<void>
{
    const commentRepository = getCustomRepository(CommentRepository)
    const commentId = req.params.id

    commentRepository.findOneOrFail(commentId)
    .then(comment => {
        res.status(200).send(comment)
    })
    .catch(error => {
        res.status(404).send(error)
    })
})

commentController.delete("/comments/:id", async function (req: express.Request, res: express.Response): Promise<void>
{
    const commentRepository = getCustomRepository(CommentRepository)
    const commentId = req.params.id

    commentRepository.findOneOrFail(commentId)
    .then(() => {
        commentRepository.delete(commentId)
        res.status(204).send()
    })
    .catch(error => {
        res.status(404).send(error)
    })
})