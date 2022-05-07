import request from 'supertest'
import { Express } from 'express-serve-static-core'
import { createServer } from '../../../src/utils/server'
import connection, { dbEnvs } from '../../../src/utils/db'
import { useSeeding, tearDownDatabase, factory } from 'typeorm-seeding'
import { Post } from '../../../src/database/entities/Post'
import { Comment } from '../../../src/database/entities/Comment'
import { getCustomRepository } from 'typeorm'
import { CommentRepository } from '../../../src/api/repositories/CommentRepository'

let server: Express

beforeAll(async () => {
    await connection.createAll()
    connection.get(dbEnvs.dev)    
    server = await createServer()
    await useSeeding()
})
  
afterAll(async () => {
    await tearDownDatabase()
})

beforeEach(async () => {
    await connection.clear(dbEnvs.dev)
})

describe("NESTED ROUTES", () => {

    it("PATCH /posts/{post_id}/comments/{comment_id} is able to update a post's comments", async () => {
        const post: Post = await factory(Post)().create()
        const comment: Comment = await factory(Comment)().create({ post: post })
        const payload = {
            name: "Mikey2022",
            content: "Some guff I guess",
            email: "test@test.com"
        }

        const res = await request(server).patch(`/posts/${post.id}/comments/${comment.id}`)
            .send(payload)

        expect(res.statusCode).toEqual(202)
        expect(res.body).toMatchObject(payload)
    })

    it("PATCH /posts/{post_id}/comments/{comment_id} returns 404 if no post found", async () => {
        const payload = {
            name: "Mikey2022",
            content: "Some guff I guess",
            email: "test@test.com"
        }

        const res = await request(server).patch("/posts/2003/comments/2003")
            .send(payload)

        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('message')
    })

    it("PATCH /posts/{post_id}/comments/{comment_id} verifies that comment found belongs to post", async () => {
        const postOne: Post = await factory(Post)().create()
        const postTwo: Post = await factory(Post)().create()
        const comment: Comment = await factory(Comment)().create({ post: postTwo })

        const payload = {
            name: "Mikey2022",
            content: "Some guff I guess",
            email: "test@test.com"
        }

        const res = await request(server).patch(`/posts/${postOne.id}/comments/${comment.id}`)
            .send(payload)

        expect(res.statusCode).toEqual(422)
        expect(res.body).toHaveProperty('message')
    })

    it("POST /posts/{post_id}/comments is able to create a new comment for a post", async () => {
        const post: Post = await factory(Post)().create()
        const comment: Comment = await factory(Comment)().create({ post: post })
        const payload = {
            name: "Mikey2022",
            content: "Some guff I guess",
            email: "test@test.com"
        }

        const res = await request(server).post(`/posts/${post.id}/comments/`)
            .send(payload)

        expect(res.statusCode).toEqual(201)
        expect(res.body).toMatchObject(payload)
    })

    it("POST /posts/{post_id}/comments returns 404 if post does not exist", async () => {
        const payload = {
            name: "Mikey2022",
            content: "Some guff I guess",
            email: "test@test.com"
        }

        const res = await request(server).post("/posts/2003/comments")
            .send(payload)

        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('message')
    })
})